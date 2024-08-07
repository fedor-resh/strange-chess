import classNames from "classnames";
import {firebase} from "./firebase.js";
import {moveToObj} from "./classes/utils.js";
const colors = {
    black: 'black',
    white: 'white',
    darkGray: '#717171',
    lightGray: '#bbbbbb'
}

export function Cell({game, cell, render, withPrice}) {
    const notDisabled = (!cell.isFromStock || game.players[game.currentColor].coins >= cell.chessman?.price);

    return <div className='hover_detector'>
        <div
            style={{
                backgroundColor: !cell.isFromStock && (cell.x + cell.y) % 2 ? colors.darkGray : colors.lightGray,
                color: notDisabled? cell.chessman?.color : colors.darkGray
            }}

            className={classNames('cell', {
                selectedColor: cell.chessman && cell.chessman.color === game.currentColor,
                beaten: cell.beaten && cell.chessman && cell.chessman.color !== game.currentColor,
                canMove: cell.canMove
            })}

            draggable={cell.chessman && cell.chessman.color === game.currentColor && (cell.currentColor === cell.yourColor || !cell.yourColor) && notDisabled}

            onDragStart={(e) => {
                e.target.style.visibility = 'hidden';
                game.raiseChessmen(cell);
                render();
            }}

            onDragEnd={(e) => {
                e.target.style.visibility = 'visible';
            }}

            onDrop={() => {
                const move = game.putChessman(cell);
                render()
                game.addToHistory(move)
                console.log(move)
                firebase.set('history', game.history)
                }}
            onDragOver={(e) => e.preventDefault()}
        >
            <div
                style={{
                    visibility: 'visible'
                }}
            >{cell.chessman?.icon}</div>
            <div className={classNames('circle', {
                beaten: cell.beaten && !cell.chessman,
                canMove: cell.canMove
            })}></div>
            {withPrice && cell.chessman && <div className='price'><p>{cell.chessman?.price}</p></div>}
        </div>
    </div>
}