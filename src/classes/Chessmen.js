import {COLOR, D, DIRECTIONS} from "../consts.js";

const ChessmenIcons = {
    Pawn: '♟',
    Rook: '♜',
    Knight: '♞',
    Bishop: '♝',
    Queen: '♛',
    King: '♚'
}

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
        this.getBeatenCells().filter(cell => !cell.chessman);
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
            console.log(this)
            if(cell?.chessman?.color !== this.color) {
                cells.push(cell);
            }
            if (!cell || cell.chessman && !ignoreChessman) break
        }
        return cells.filter(Boolean);
    }
}

export class Pawn extends Chessman {
    constructor(color, currentCell = null) {
        super(color, currentCell);
        this.isFirstMove = true;
    }

    getBeatenCells() {
        if (this.color === COLOR.WHITE){
            return [
                this.currentCell.getMoved(1, 1),
                this.currentCell.getMoved(-1, 1),
            ];
        }
        return [
            this.currentCell.getMoved(1, -1),
            this.currentCell.getMoved(-1, -1),
        ];
    }

    getMoveCells() {
        if (this.color === COLOR.WHITE){
            const ans = [
                this.currentCell.getMoved(0, 1),
            ];

            if (this.isFirstMove) {
                ans.push(this.currentCell.getMoved(0, 2));
            }
            return ans.filter(Boolean).filter(cell => !cell.chessman);
        }
        const ans = [
            this.currentCell.getMoved(0, -1),
        ];

        if (this.isFirstMove) {
            ans.push(this.currentCell.getMoved(0, -2));
        }

        return ans.filter(Boolean).filter(cell => !cell.chessman);
    }
}

export class Rook extends Chessman {
    constructor(color, currentCell = null) {
        super(color, currentCell);
    }

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
    constructor(color, currentCell = null) {
        super(color, currentCell);
    }

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
        ];
    }
}

export class Bishop extends Chessman {
    constructor(color, currentCell = null) {
        super(color, currentCell);
    }

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
    constructor(color, currentCell = null) {
        super(color, currentCell);
    }

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
    constructor(color, currentCell = null) {
        super(color, currentCell);
    }

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





