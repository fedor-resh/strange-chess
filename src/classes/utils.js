function cellToObj(cell) {
    return {
        x: cell.x,
        y: cell.y,
    }
}

export function moveToObj(move) {
    return {
        from: cellToObj(move.from),
        to: cellToObj(move.to)
    }
}

export function makeMoveFromObj(game, move) {
    game.raiseChessmen(game.board.cell(7-move.from.x, 7-move.from.y))
    game.putChessman(game.board.cell(7-move.to.x, 7-move.to.y))
}