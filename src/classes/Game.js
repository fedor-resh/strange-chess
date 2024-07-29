import {Board} from "../Board.js";
import {COLOR} from "../consts.js";
import {Player} from "./Player.js";
import {firebase} from "../firebase.js";
import {makeMoveFromObj, moveToObj} from "./utils.js";

export class Game {
    constructor(history = [], hash = '0'.repeat(16)) {
        this.board = new Board();
        this.board.initBoard();
        this.players = {
            [COLOR.WHITE]: new Player(COLOR.WHITE, hash.substring(0, 8)),
            [COLOR.BLACK]: new Player(COLOR.BLACK, hash.substring(8, 16))
        }
        this.board.matrix[9] = this.players[COLOR.WHITE].stock
        this.board.matrix[10] = this.players[COLOR.BLACK].stock
        this.currentColor = COLOR.WHITE;
        this.yourColor = COLOR.WHITE;
        this.history = history;
        this.history.forEach(move => makeMoveFromObj(this, move))
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
        const canBeat = cell.beaten && cell.chessman && cell.chessman?.color !== this.currentColor
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
        }
        this.board.clearBeaten()
        this.board.focusedCell = null
        return {from: fromCell, to: cell}
    }

    changeColor() {
        this.currentColor = this.currentColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE
    }

    addToHistory(move) {
        console.log({move})
        const obj = moveToObj(move)
        if(!this.history || JSON.stringify(this.history[this.history.length - 1]) !== JSON.stringify(obj)) {
            this.history.push(obj)
        }
    }
}
