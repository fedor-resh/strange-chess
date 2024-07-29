import { COLOR, D, DIRECTIONS } from "../consts.js";
const ChessmenIcons = {
    Pawn: '♟',
    Rook: '♜',
    Knight: '♞',
    Bishop: '♝',
    Queen: '♛',
    King: '♚',
    Valkyrie: '♘',
    Spearman: '+'
};

const ChessmenPrices = {
    Pawn: 2,
    Rook: 8,
    Knight: 5,
    Bishop: 5,
    Queen: 13,
    Valkyrie: 10,
    Spearman: 6
}


class Chessman {
    constructor(color, currentCell) {
        this.color = color;
        this.type = this.constructor.name;
        this.icon = ChessmenIcons[this.type];
        this.price = ChessmenPrices[this.type];
        this.img = `/${this.type}.webp`;
        this.currentCell = currentCell;
    }

    getBeatenCells() {
        throw new Error('Method getBeatenCells is not implemented');
    }

    getMoveCells() {
        return this.getBeatenCells().filter(cell => cell && !cell.chessman);
    }

    moveTo(cell) {
        if (this.currentCell) {
            this.currentCell.setChessman(null);
        }
        this.currentCell = cell;
        cell.chessman = this;
    }

    getBeatenStraight(direction, ignoreChessman = false, distance = 7) {
        const [dx, dy] = D[direction];
        const cells = [];

        for (let i = 1; i <= distance; i++) {
            const cell = this.currentCell.getMoved(dx * i, dy * i);
            if (!cell) break;
            if (cell.chessman) {
                if (cell.chessman.color !== this.color) {
                    cells.push(cell);
                }
                if (!ignoreChessman) break;
            } else {
                cells.push(cell);
            }
        }
        return cells;
    }
}

export class Pawn extends Chessman {
    constructor(color, currentCell) {
        super(color, currentCell);
        this.isFirstMove = true;
    }

    getBeatenCells() {
        const direction = this.color === COLOR.BLACK ? 1 : -1;
        return [
            this.currentCell.getMoved(1, direction),
            this.currentCell.getMoved(-1, direction),
        ].filter(Boolean);
    }

    getMoveCells() {
        const DIR = this.color === COLOR.WHITE ? DIRECTIONS.DOWN : DIRECTIONS.UP;
        if(!this.isFirstMove) return this.getBeatenStraight(DIR, false, 1)
        return this.getBeatenStraight(DIR, false, 2);
    }
}

export class Rook extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP),
            ...this.getBeatenStraight(DIRECTIONS.DOWN),
            ...this.getBeatenStraight(DIRECTIONS.LEFT),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT),
        ];
    }
}

export class Knight extends Chessman {

    getKnightMovesFromCell(cell) {
        return [
            cell.getMoved(1, 2),
            cell.getMoved(-1, 2),
            cell.getMoved(1, -2),
            cell.getMoved(-1, -2),
            cell.getMoved(2, 1),
            cell.getMoved(-2, 1),
            cell.getMoved(2, -1),
            cell.getMoved(-2, -1),
        ].filter(Boolean);
    }
    getBeatenCells() {
        return this.getKnightMovesFromCell(this.currentCell);
    }
}

export class Bishop extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT),
        ];
    }
}

export class Queen extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP),
            ...this.getBeatenStraight(DIRECTIONS.DOWN),
            ...this.getBeatenStraight(DIRECTIONS.LEFT),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT),
        ];
    }
}

export class King extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT, true, 1),
        ];
    }
}

export class Valkyrie extends Knight {
    getBeatenCells() {
        const cells = this.getKnightMovesFromCell(this.currentCell);

        [...cells].forEach(cell => {
            if (!cell.chessman) cells.push(...this.getKnightMovesFromCell(cell))
        })
        return cells.filter(cell => cell !== cells.currentCell)
    }
}

export class Spearman extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP, false, 2),
            ...this.getBeatenStraight(DIRECTIONS.DOWN, false, 2),
            ...this.getBeatenStraight(DIRECTIONS.LEFT, false, 2),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT, false, 2),
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT, false, 1),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT, false, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT, false, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT, false, 1),
        ];
    }
}

export const allChessmen = [Pawn, Rook, Knight, Bishop, Queen, Valkyrie, Spearman];