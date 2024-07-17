import {allChessmen} from "./Chessmen.js";
import {Cell} from "./Cell.js";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export class Player {
    constructor(color) {
        this.color = color;
        this.stock = [];
        this.coins = 0;
        this.initStock();
    }

    initStock() {
        for (let i = 0; i < 8; i++) {
            this.stock.push(new Cell(0, 0, null));
        }

        this.stock.forEach((cell) => {
            cell.setChessman(allChessmen[randomInt(0, allChessmen.length - 1)], this.color);
            cell.isFromStock = true;
        })
    }
}