import {Fragment, useEffect, useState} from 'react'
import './App.css'
import {Game} from "./classes/Game.js";
import {Pawn} from "./classes/Chessmen.js";
import classNames from "classnames";

const colors = {
    black: 'black',
    white: 'white',
    darkGray: '#717171',
    lightGray: '#bbbbbb'
}


function App() {
    const [game, setGame] = useState(new Game());
    const {board} = game;
    const render = () => {
        setGame(game.copyGame());
        console.log(game.board)
    }
    useEffect(() => {
        board.initBoard();
        render();
    }, []);

    return (
        <div className='game'>
            <div className='board'>
                {board.matrix.map((row, i) => <Fragment key={i}>
                        {row.map((cell, j) => <div
                            key={j}
                            style={{
                                backgroundColor: (cell.x + cell.y) % 2 ? colors.darkGray : colors.lightGray,
                                color: cell.chessman?.color,
                            }}

                            className={classNames('cell', {
                                selectedColor: cell.chessman && cell.chessman.color === game.currentColor,
                                beaten: cell.beaten && cell.chessman && cell.chessman.color !== game.currentColor,
                                canMove: cell.canMove
                            })}

                            draggable={cell.chessman && cell.chessman.color === game.currentColor}

                            onDragStart={(e) => {
                                e.target.style.visibility = 'hidden';
                                game.raiseChessmen(cell);
                                render();
                            }}

                            onDragEnd={(e) => {
                                e.target.style.visibility = 'visible';
                            }}

                            onDrop={(e) => {
                                game.putChessman(cell);
                                render();
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div
                                style={{
                                    visibility: 'visible'
                                }}
                            >{cell.chessman?.icon}</div>
                            <div className={classNames('circle', {
                                beaten: cell.beaten,
                                canMove: cell.canMove
                            })}></div>
                        </div>)}
                    </Fragment>
                )}
            </div>
        </div>

    )
}

export default App
