import {Board} from "../Board.js";
import {COLOR} from "../consts.js";
import {Player} from "./Player.js";
import {firebase} from "../firebase.js";
import {moveToObj} from "./utils.js";

export class Game {
    constructor() {
        this.board = new Board();

        this.players = {
            [COLOR.WHITE]: new Player(COLOR.WHITE),
            [COLOR.BLACK]: new Player(COLOR.BLACK)
        }
        this.currentColor = COLOR.WHITE;
        this.yourColor = COLOR.WHITE;
        this.history = [];
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
        const fromCell = this.board.focusedCell;
        if(!fromCell) return
        const canMove = cell.canMove;
        const canBeat = cell.beaten && cell.chessman?.color !== this.currentColor
        if (canMove || canBeat) {
            if (fromCell?.isFromStock) {
                this.players[this.currentColor].coins -= fromCell.chessman.price
                fromCell.isFromStock = false
            }
            this.board.putChessman(cell)
            this.players[this.currentColor].coins++
            this.changeColor()
            if(cell.chessman){
                cell.chessman.isFirstMove = false
            }
            this.addToHistory({
                from: fromCell,
                to: cell
            })
        }
        this.board.clearBeaten()
        this.board.focusedCell = null
    }

    changeColor() {
        this.currentColor = this.currentColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE
    }

    addToHistory(move) {
        const obj = moveToObj(move)
        if(!this.history || JSON.stringify(this.history[this.history.length - 1]) !== JSON.stringify(obj)) {
            this.history.push(obj)
        }
    }
}
