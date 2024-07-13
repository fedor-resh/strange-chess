import {Cell} from "./Cell.js";

export class Game {
    constructor() {
        this.board = Array(8).fill(null).map((_, i) => Array(8).fill(null).map((_, j) => new Cell(j, i, this)));
        this.clickedCell = null;
    }

    clearBeaten() {
        this.board.forEach(row => row.forEach(cell => cell.beaten = false));
        this.board.forEach(row => row.forEach(cell => cell.canMove = false));
    }

    copyGame() {
        const newBoard = new Game();
        newBoard.board = this.board;
        newBoard.clickedCell = this.clickedCell;
        return newBoard;
    }
}
