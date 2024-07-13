import {Fragment, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {create} from "zustand";
import {app} from "./firebaseInit.js";
import {writeData} from "./firebase.js";
import {Game} from "./Game.js";
import {Pawn} from "./Chessmen.js";
import {Cell} from "./Cell.js";
import classNames from "classnames";

const colors = {
    black: 'black',
    white: 'white',
    darkGray: '#717171',
    lightGray: '#bbbbbb'
}


function App() {
    const [game, setGame] = useState(new Game().copyGame());
    const render = () => {
        setGame(game.copyGame());
    }
    useEffect(() => {
        game.board[1][4].setChessman(Pawn, colors.white);
        game.board[5][5].setChessman(Pawn, colors.black);
        render();
    }, []);

    return (
        <div className='game'>
            <div className='board'>
                {game.board.map((row, i) => <Fragment key={i}>
                        {row.map((cell, j) => <div
                            key={j}
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: (i + j) % 2 ? colors.darkGray : colors.lightGray,
                                color: cell.chessman?.color,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 80,
                                cursor: cell.chessman ? 'pointer' : 'default',
                            }}
                            onClick={() => {
                                game.board[i][j].click();
                                render();
                            }}
                        >
                            <div>{cell.chessman?.icon}</div>
                            <div className={classNames({
                                circle: true,
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
