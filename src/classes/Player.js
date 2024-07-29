import {allChessmen} from "./Chessmen.js";
import {Cell} from "./Cell.js";
import {COLOR} from "../consts.js";

export class Player {
    constructor(color, hash = '0'.repeat(8)) {
        this.color = color;
        this.stock = [];
        this.coins = 0;
        this.hash = hash;
        this.initStock();
    }

    initStock() {
        for (let i = 0; i < 8; i++) {
            this.stock.push(new Cell(i, this.color === COLOR.WHITE ? 9 : 10, null));
        }

        this.stock.forEach((cell, i) => {
            cell.setChessman(allChessmen[Number.parseInt(this.hash[i], 36) % allChessmen.length], this.color);
            cell.isFromStock = true;
        })
    }
}