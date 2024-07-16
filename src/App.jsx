import {Fragment, memo, useCallback, useEffect, useState} from 'react'
import './App.css'
import {Game} from "./classes/Game.js";
import {Cell} from "./Cell.jsx";
import {COLOR} from "./consts.js";
import {ChessmanCard} from "./ChessmanCard.jsx";
const Cells = ({row, cellProps}) => (
    <>{row.map((cell, j) => <Cell {...cellProps(cell)} key={j}/>)}</>
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
    }, []);

    const cellProps = useCallback((cell) => ({
        game,
        cell,
        render
    }), [game, render])



    return (
        <div className='game'>
            <div className='whiteColorBar'>
                <Cells row={game.players[COLOR.WHITE].stock} cellProps={cellProps}/>
            </div>
            <div className='blackColorBar'>
                <Cells row={game.players[COLOR.BLACK].stock} cellProps={cellProps}/>
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

    )
}

export default App
