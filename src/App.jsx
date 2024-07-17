import {Fragment, useCallback, useEffect, useState} from 'react'
import './App.css'
import {Game} from "./classes/Game.js";
import {Cell} from "./Cell.jsx";
import {COLOR} from "./consts.js";
import {ChessmanCard} from "./ChessmanCard.jsx";
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
