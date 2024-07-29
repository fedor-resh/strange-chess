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
    console.log('log', {move})
    game.raiseChessmen(game.board.cell(move.from.x, move.from.y))
    game.putChessman(game.board.cell(move.to.x, move.to.y))
}