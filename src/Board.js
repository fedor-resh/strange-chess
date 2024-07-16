import {Cell} from "./classes/Cell.js";
import {Bishop, King, Knight, Pawn, Queen, Rook} from "./classes/Chessmen.js";
import {COLOR} from "./consts.js";

export class Board {
    constructor() {
        this.matrix = Array(8)
            .fill(null)
            .map((_, i) => Array(8).fill(null)
                .map((_, j) => new Cell(7-j, i, this)));
        this.focusedCell = null;
    }

    cell(x, y) {
        return this.matrix[7-y][x];
    }

    clearBeaten() {
        this.matrix.forEach(row => row.forEach(cell => cell.beaten = false));
        this.matrix.forEach(row => row.forEach(cell => cell.canMove = false));
    }

    setBeaten(cell) {
        cell.chessman.getBeatenCells().forEach(cell => cell && (cell.beaten = true));
        cell.chessman.getMoveCells().forEach(cell => cell && (cell.canMove = true));
    }

    getMoved(cell, dx, dy) {
        if (cell.x + dx < 0 || cell.x + dx > 7 || cell.y - dy < 0 || cell.y - dy > 7) return null;
        return this.matrix[cell.y - dy][7 - (cell.x + dx)];
    }

    raiseChessmen(cell) {
        this.clearBeaten();
        if(cell.isFromStock) {
            const kingCell = this.matrix.flat().find(c => c.chessman instanceof King && c.chessman.color === cell.chessman.color)
            this.setBeaten(kingCell)
        }
        this.setBeaten(cell)
        this.focusedCell = cell
    }

    putChessman(cell) {
        if (cell.beaten && cell.chessman) {
            this.focusedCell.chessman.moveTo(cell)
        } else if (cell.canMove && !cell.chessman) {
            this.focusedCell.chessman.moveTo(cell)
        }
        this.focusedCell = null
    }

    initBoard() {
        this.matrix.forEach((row, i) => row.forEach((cell, j) => {
            if (i < 2) {
                cell.setChessman(Pawn, COLOR.BLACK)
            } else if (i > 5) {
                cell.setChessman(Pawn, COLOR.WHITE)
            }
        }));

        this.cell(0, 0).setChessman(Rook, COLOR.WHITE)
        this.cell(7, 0).setChessman(Rook, COLOR.WHITE)
        this.cell(0, 7).setChessman(Rook, COLOR.BLACK)
        this.cell(7, 7).setChessman(Rook, COLOR.BLACK)

        this.cell(1, 0).setChessman(Knight, COLOR.WHITE)
        this.cell(6, 0).setChessman(Knight, COLOR.WHITE)
        this.cell(1, 7).setChessman(Knight, COLOR.BLACK)
        this.cell(6, 7).setChessman(Knight, COLOR.BLACK)

        this.cell(2, 0).setChessman(Bishop, COLOR.WHITE)
        this.cell(5, 0).setChessman(Bishop, COLOR.WHITE)
        this.cell(2, 7).setChessman(Bishop, COLOR.BLACK)
        this.cell(5, 7).setChessman(Bishop, COLOR.BLACK)

        this.cell(3, 0).setChessman(Queen, COLOR.WHITE)
        this.cell(4, 0).setChessman(King, COLOR.WHITE)
        this.cell(3, 7).setChessman(Queen, COLOR.BLACK)
        this.cell(4, 7).setChessman(King, COLOR.BLACK)

    }
}