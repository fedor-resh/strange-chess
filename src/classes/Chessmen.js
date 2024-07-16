import { COLOR, D, DIRECTIONS } from "../consts.js";
const ChessmenIcons = {
    Pawn: '♟',
    Rook: '♜',
    Knight: '♞',
    Bishop: '♝',
    Queen: '♛',
    King: '♚',
    Valkyrie: '♘'
};

export const ChessmenArts = {
    Pawn: 'https://1.downloader.disk.yandex.ru/preview/2a76f0e518ac091105561a799592b2b8138cc9325a427a5e878e040900758cfe/inf/JufJvMHQDK7aXLehN47EahEE9ktaNxpYw2kZwjz7n5kzbiX9mPGBCdoACU2qobSmcvWX5WWh-bYKc1-oOp21bw%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_47_28_A_gaunt_medieval_foot_soldier_walking.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    Bishop: 'https://4.downloader.disk.yandex.ru/preview/1fedd55131abffadd6334f76bb9464f2bd648e8662caa7129075ebba5a2ed018/inf/jNuYj3Sp0_adtxA9wfY3rIhWVCNziUps8ou2mC1xL1lLA4_S-9WakDEFztYw0bOSfaIpHdzxQJjEB8TbKgUkaQ%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_48_19_A_medieval_foot_soldier_aiming_a_musket.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    Knight: 'https://1.downloader.disk.yandex.ru/preview/3c37879623598ad2538de1b0783c5926765229c3c56297ae969f5a0cae20a34d/inf/O4x8_DCK7O3t3Aw7E0sxShEE9ktaNxpYw2kZwjz7n5lzNSl7ZeUS3GyaCSLxc6hJXafOk9J7dt-mf3jRYlTm9Q%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_50_34_A_medieval_warhorse_clad_in_ornate_armor.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    Rook: 'https://3.downloader.disk.yandex.ru/preview/2bc776a6aed1969e8276f94cce921c51da46b84a81555bee95283ad719f98923/inf/MIcqAi623FdcQA_lHBxN9REE9ktaNxpYw2kZwjz7n5kkRNXWFgxfV1JrMWqx4uXDqpR6f2X7SAo4AffEXnBY-Q%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_54_17_A_medieval_warrior_clad_in_extremely.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    Queen: 'https://4.downloader.disk.yandex.ru/preview/586847a3f3a760c03153e2cde07652e283ba314826f0d0dd563078e136218b43/inf/C3HVJh2CjXE0PVFAIHH6FBEE9ktaNxpYw2kZwjz7n5kk5Mz5rRnj2F3lo1MjsedUWdC5zJw6g4X0SmWmL0yFAw%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_52_13_A_medieval_queen_clad_in_elaborate_armor.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    King: 'https://4.downloader.disk.yandex.ru/preview/e296df9b7a60a397b6e3ef2a72d345aa565647bfd19133d0d0b7548fdbd8c0d5/inf/KQeIXoeBewm-iDoakdvmUxEE9ktaNxpYw2kZwjz7n5mZ3i65Nj024e2K2bJMgaLsmKr02GOhxJypzt8gl2aGEA%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_51_26_A_medieval_king_clad_in_elaborate_armor.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=910x918',
    Valkyrie: 'https://2.downloader.disk.yandex.ru/preview/e5abf64b70478d0ebf121b9a3385569b5b220d091b024af860b48723f83a2843/inf/TZoFDUKtDoNgrrht5FO6O9IDlSMEkvfnAqnfYgcr3oewbmAOy_PfNS7qjhYrIyslyiCHU3hgHSZOUNzTBPbRPw%3D%3D?uid=1616376605&filename=DALL·E_2024_07_16_13_41_13_A_majestic_valkyrie_riding_a_powerful.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1616376605&tknv=v2&size=1315x932'
}
class Chessman {
    constructor(color, currentCell) {
        this.color = color;
        this.type = this.constructor.name;
        this.icon = ChessmenIcons[this.type];
        this.image = ChessmenArts[this.type];
        this.currentCell = currentCell;
    }

    getBeatenCells() {
        throw new Error('Method getBeatenCells is not implemented');
    }

    getMoveCells() {
        return this.getBeatenCells().filter(cell => cell && !cell.chessman);
    }

    moveTo(cell) {
        if (this.currentCell) {
            this.currentCell.setChessman(null);
        }
        this.currentCell = cell;
        cell.chessman = this;
    }

    getBeatenStraight(direction, ignoreChessman = false, distance = 7) {
        const [dx, dy] = D[direction];
        const cells = [];

        for (let i = 1; i <= distance; i++) {
            const cell = this.currentCell.getMoved(dx * i, dy * i);
            if (!cell) break;
            if (cell.chessman) {
                if (cell.chessman.color !== this.color) {
                    cells.push(cell);
                }
                if (!ignoreChessman) break;
            } else {
                cells.push(cell);
            }
        }
        return cells;
    }
}

export class Pawn extends Chessman {
    constructor(color, currentCell) {
        super(color, currentCell);
        this.isFirstMove = true;
    }

    getBeatenCells() {
        const direction = this.color === COLOR.WHITE ? 1 : -1;
        return [
            this.currentCell.getMoved(1, direction),
            this.currentCell.getMoved(-1, direction),
        ].filter(Boolean);
    }

    getMoveCells() {
        const direction = this.color === COLOR.WHITE ? 1 : -1;
        const cells = [
            this.currentCell.getMoved(0, direction),
        ];

        if (this.isFirstMove) {
            cells.push(this.currentCell.getMoved(0, 2 * direction));
        }

        return cells.filter(Boolean).filter(cell => !cell.chessman);
    }
}

export class Rook extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP),
            ...this.getBeatenStraight(DIRECTIONS.DOWN),
            ...this.getBeatenStraight(DIRECTIONS.LEFT),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT),
        ];
    }
}

export class Knight extends Chessman {

    getKnightMovesFromCell(cell) {
        return [
            cell.getMoved(1, 2),
            cell.getMoved(-1, 2),
            cell.getMoved(1, -2),
            cell.getMoved(-1, -2),
            cell.getMoved(2, 1),
            cell.getMoved(-2, 1),
            cell.getMoved(2, -1),
            cell.getMoved(-2, -1),
        ].filter(Boolean);
    }
    getBeatenCells() {
        return this.getKnightMovesFromCell(this.currentCell);
    }
}

export class Bishop extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT),
        ];
    }
}

export class Queen extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP),
            ...this.getBeatenStraight(DIRECTIONS.DOWN),
            ...this.getBeatenStraight(DIRECTIONS.LEFT),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT),
        ];
    }
}

export class King extends Chessman {
    getBeatenCells() {
        return [
            ...this.getBeatenStraight(DIRECTIONS.UP, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.RIGHT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.UP_LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.UP_RIGHT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_LEFT, true, 1),
            ...this.getBeatenStraight(DIRECTIONS.DOWN_RIGHT, true, 1),
        ];
    }
}

export class Valkyrie extends Knight {
    getBeatenCells() {
        const cells = this.getKnightMovesFromCell(this.currentCell);

        [...cells].forEach(cell => {
            if (!cell.chessman) cells.push(...this.getKnightMovesFromCell(cell))
        })
        return cells.filter(cell => cell !== cells.currentCell)
    }
}

export const allChessmen = [Pawn, Rook, Knight, Bishop, Queen, Valkyrie];