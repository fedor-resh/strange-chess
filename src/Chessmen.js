import {D, DIRECTIONS} from "./consts.js";

const Chessmen = {
    pawn: 'pawn',
    rook: 'rook',
    knight: 'knight',
    bishop: 'bishop',
    queen: 'queen',
    king: 'king'
}

const ChessmensIcons = {
    [Chessmen.pawn]: '♙',
    [Chessmen.rook]: '♖',
    [Chessmen.knight]: '♘',
    [Chessmen.bishop]: '♗',
    [Chessmen.queen]: '♕',
    [Chessmen.king]: '♔'
}

class Chessman {
    constructor(type, color, currentCell = null) {
        this.type = type;
        this.color = color;
        this.icon = ChessmensIcons[type];
        this.currentCell = currentCell;
    }

    getBeatenCells() {
        throw new Error('Method getBeatenCells is not implemented');
    }

    getMoveCells() {
        throw new Error('Method getMoveCells is not implemented');
    }

    moveTo(cell) {
        this.currentCell.setChessman(null);
        this.currentCell = cell;
        cell.chessman = this;
    }

    getBeatenStraight(direction, ignoreChessman = false, distance = 7) {
        const [dx, dy] = D[direction];

        const cells = [];
        for (let i = 1; i < distance+1; i++) {
            const cell = this.currentCell.getMoved(dx * i, dy * i);
            cells.push(cell);
            if (!cell || cell.chessman && !ignoreChessman) break
        }
        return cells;
    }
}

export class Pawn extends Chessman {
    constructor(color, currentCell = null) {
        super(Chessmen.pawn, color, currentCell);
    }

    getBeatenCells() {
        return [
           this.currentCell.getMoved(1, 1),
           this.currentCell.getMoved(-1, 1),
        ];
        return this.getBeatenStraight(DIRECTIONS.UP, true, 1);
    }

    getMoveCells() {
        return [
            this.currentCell.getMoved(0, 1),
        ];
    }
}
