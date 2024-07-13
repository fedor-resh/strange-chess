import {Game} from "./Game.js";

export class Cell {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.color = (x + y) % 2 ? 'darkGray' : 'lightGray';
        this.chessman = null;
        this.beaten = false;
        this.canMove = false;
        this.game = game
    }

    getMoved(x, y) {
        if (this.x + x < 0 || this.x + x > 7 || this.y - y < 0 || this.y - y > 7) return null;
        return this.game.board[this.y - y][this.x + x];
    }

    setChessman(chessmanClass, color) {
        if (!chessmanClass) {
            this.chessman = null;
            return
        }
        this.chessman = new chessmanClass(color, this);
    }

    click() {
        this.game.clearBeaten()
        if(this.game.clickedCell?.chessman) {
            if (this.game.clickedCell === this) {
                this.game.clickedCell = null
            } else if (this.game.clickedCell.chessman.getBeatenCells().includes(this) && this.chessman) {
                this.game.clickedCell.chessman.moveTo(this)
            } else if (this.game.clickedCell.chessman.getMoveCells().includes(this) && !this.chessman) {
                this.game.clickedCell.chessman.moveTo(this)
            }
            this.game.clickedCell = null
            return
        }
        if(!this.chessman) return
        this.chessman.getBeatenCells().forEach(cell => cell && (cell.beaten = true));
        this.chessman.getMoveCells().forEach(cell => cell && (cell.canMove = true));
        this.game.clickedCell = this
    }
}