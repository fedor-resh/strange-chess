import classNames from "classnames";
const colors = {
    black: 'black',
    white: 'white',
    darkGray: '#717171',
    lightGray: '#bbbbbb'
}
export function Cell({game, cell, render}) {
    return <div className='hover_detector'>
        <div
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
        </div>
    </div>
}