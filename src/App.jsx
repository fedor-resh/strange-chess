import {Fragment, useCallback, useEffect, useState} from 'react'
import './App.css'
import {Game} from "./classes/Game.js";
import {Cell} from "./Cell.jsx";
import {COLOR} from "./consts.js";
import {ChessmanCard} from "./ChessmanCard.jsx";
import {firebase} from "./firebase.js";
import {makeMoveFromObj} from "./classes/utils.js";
const Cells = ({row, cellProps, withPrice}) => (
    <>{row.map((cell, j) => <Cell {...cellProps(cell)} key={j} withPrice={withPrice}/>)}</>
)

function App() {
    const [game, setGame] = useState(new Game());
    const {board} = game;
    const render = () => {
        setGame(game.copyGame());
    }
    useEffect(() => {
        board.initBoard();
        render();
        console.log('move')
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('room');
        if (roomId) {
            firebase.connect(roomId)
        } else {
            const roomId = Math.random().toString(36).substring(7);
            firebase.connect(roomId)
            window.location.search = `?room=${roomId}`
        }
        firebase.listen('history', history => {
            game.history = history || []
            game.history.forEach(move => makeMoveFromObj(game, move))
            render()
        })
    }, []);

    const cellProps = useCallback((cell) => ({
        game,
        cell,
        render
    }), [game, render])



    return (
        <div className='game'>
            <div className='game_data'>
                <h1>White coins: {game.players[COLOR.WHITE].coins.toString()}</h1>
                <h1>Black coins: {game.players[COLOR.BLACK].coins.toString()}</h1>
            </div>
            <div className='total_board'>
                <div className='whiteColorBar'>
                    <Cells row={game.players[COLOR.WHITE].stock} cellProps={cellProps} withPrice/>
                </div>
                <div className='blackColorBar'>
                    <Cells row={game.players[COLOR.BLACK].stock} cellProps={cellProps} withPrice/>
                </div>
                <div className='board'>
                    {board.matrix.map((row, i) =>
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
