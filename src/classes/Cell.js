

export class Cell {
    constructor(x, y, board) {
        this.x = x;
        this.y = y;
        this.color = (x + y) % 2 ? 'darkGray' : 'lightGray';
        this.chessman = null;
        this.beaten = false;
        this.canMove = false;
        this.getMoved = board?.getMoved?.bind(board, this) || (() => null);
        this.isFromStock = false;
    }



    setChessman(chessmanClass, color) {
        if (!chessmanClass) {
            this.chessman = null;
            return
        }
        this.chessman = new chessmanClass(color, this);
    }
}