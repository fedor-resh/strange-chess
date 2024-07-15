import { COLOR, D, DIRECTIONS } from "../consts.js";
const ChessmenIcons = {
    Pawn: '♟',
    Rook: '♜',
    Knight: '♞',
    Bishop: '♝',
    Queen: '♛',
    King: '♚'
};
class Chessman {
    constructor(color, currentCell) {
        this.color = color;
        this.icon = ChessmenIcons[this.constructor.name];
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
        const direction = this.color === COLOR.WHITE ? 1 : -1;
        return [
            this.currentCell.getMoved(1, direction),
            this.currentCell.getMoved(-1, direction),
        ].filter(Boolean);
    }

    getMoveCells() {
        const direction = this.color === COLOR.WHITE ? 1 : -1;
        const cells = [
            this.currentCell.getMoved(0, direction),
        ];

        if (this.isFirstMove) {
            cells.push(this.currentCell.getMoved(0, 2 * direction));
        }

        return cells.filter(Boolean).filter(cell => !cell.chessman);
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
    getBeatenCells() {
        return [
            this.currentCell.getMoved(1, 2),
            this.currentCell.getMoved(-1, 2),
            this.currentCell.getMoved(1, -2),
            this.currentCell.getMoved(-1, -2),
            this.currentCell.getMoved(2, 1),
            this.currentCell.getMoved(-2, 1),
            this.currentCell.getMoved(2, -1),
            this.currentCell.getMoved(-2, -1),
        ].filter(Boolean);
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


