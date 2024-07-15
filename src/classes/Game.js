import {Cell} from "./Cell.js";
import {Board} from "../Board.js";
import {COLOR} from "../consts.js";
import {Player} from "./Player.js";

export class Game {
    constructor() {
        this.board = new Board();

        this.currentColor = COLOR.WHITE;
        this.yourColor = COLOR.WHITE
    }

    copyGame() {
        const newGame = new Game();
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                newGame[key] = this[key];
            }
        }
        return newGame;
    }

    raiseChessmen(cell) {
        if (cell.chessman && cell.chessman.color === this.currentColor) {
            this.board.raiseChessmen(cell)
        }
    }

    putChessman(cell) {
        if (this.board.clickedCell && (cell.canMove || cell.beaten)) {
            this.board.putChessman(cell)
            this.currentColor = this.currentColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE
            cell.chessman.isFirstMove = false
        }
    }
}