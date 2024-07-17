import {Board} from "../Board.js";
import {COLOR} from "../consts.js";
import {Player} from "./Player.js";

export class Game {
    constructor() {
        this.board = new Board();

        this.players = {
            [COLOR.WHITE]: new Player(COLOR.WHITE),
            [COLOR.BLACK]: new Player(COLOR.BLACK)
        }
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
        if (cell.chessman && cell.chessman.color === this.currentColor
            && (!cell.isFromStock || this.players[this.currentColor].coins >= cell.chessman?.price)) {
            this.board.raiseChessmen(cell)
        }
    }

    putChessman(cell) {
        if (this.board.focusedCell && (cell.canMove || cell.beaten && cell.chessman)) {
            this.board.putChessman(cell)
            this.currentColor = this.currentColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE
            cell.chessman.isFirstMove = false
            if (this.board.focusedCell?.isFromStock) {
                this.players[this.currentColor].coins -= this.board.focusedCell.price
            }
            this.players[this.currentColor].coins++
        }
        this.board.clearBeaten()
        this.board.focusedCell = null
    }
}
