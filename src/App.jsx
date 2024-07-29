import {Fragment, useCallback, useEffect, useState} from 'react'
import './App.css'
import {Game} from "./classes/Game.js";
import {Cell} from "./Cell.jsx";
import {COLOR} from "./consts.js";
import {ChessmanCard} from "./ChessmanCard.jsx";
import {firebase} from "./firebase.js";
import {makeMoveFromObj} from "./classes/utils.js";
import {get} from "firebase/database";

const Cells = ({row, cellProps, withPrice}) => (
    <>{row.map((cell, j) => <Cell {...cellProps(cell)} key={j} withPrice={withPrice}/>)}</>
)
const audio = new Audio('sound.mp3');

const playSound = () => {
    audio.play();
}

const getRandomHash = () => {
    const hash = () => Math.random().toString(36).substring(Math.random().toString(36).length - 8)
    return hash() + hash()
}

const getParam = key => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

const setParam = (key, value) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + urlParams.toString();
    window.history.pushState({path: newUrl}, '', newUrl);
}

function handleRoomState() {
    let roomId = getParam('room')
    let color = getParam('color')
    if (roomId) {
        firebase.connect(roomId)
        color = color ?? COLOR.BLACK
    } else {
        roomId = getRandomHash()
        firebase.connect(roomId)
        setParam('room', roomId)
        color = color ?? COLOR.WHITE
    }
    if (color === 'both') color = false
    return {roomId, color}
}

function reverseIfBlack(color, matrix) {
    return color === COLOR.BLACK ? matrix.toReversed().map(row => row.toReversed()) : matrix
}


function App() {
    const [game, setGame] = useState(new Game());
    const {board} = game;
    const render = () => {
        setGame(game.copyGame());
    }
    useEffect(() => {
        const {color, roomId: hash} = handleRoomState();
        setGame(new Game([], hash, color));
        firebase.listen('history', (history) => {
            setGame(new Game(history || [], hash, color));
            playSound()
        })
    }, []);

    const cellProps = useCallback((cell) => ({game, cell, render}), [game, render])

    return (
        <div className='game'>
            <div className='game_data'>
                <h1>White coins: {game.players[COLOR.WHITE].coins}</h1>
                <h1>Black coins: {game.players[COLOR.BLACK].coins}</h1>
            </div>
            <div className='total_board'>
                <div className='whiteColorBar'>
                    <Cells row={game.players[COLOR.WHITE].stock} cellProps={cellProps} withPrice/>
                </div>
                <div className='blackColorBar'>
                    <Cells row={game.players[COLOR.BLACK].stock} cellProps={cellProps} withPrice/>
                </div>
                <div className='board'>
                    {reverseIfBlack(game.yourColor, board.matrix.slice(0, 8)).map((row, i) =>
                        <Fragment key={i}>
                            <Cells row={row} cellProps={cellProps}/>
                        </Fragment>
                    )}
                </div>
                <ChessmanCard chessman={game.board.focusedCell?.chessman}/>
            </div>
        </div>

    )
}

export default App
