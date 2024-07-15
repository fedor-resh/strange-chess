export const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP_LEFT: 'UP_LEFT',
    UP_RIGHT: 'UP_RIGHT',
    DOWN_LEFT: 'DOWN_LEFT',
    DOWN_RIGHT: 'DOWN_RIGHT',
}

export const D = {
    [DIRECTIONS.UP]: [0, 1],
    [DIRECTIONS.DOWN]: [0, -1],
    [DIRECTIONS.LEFT]: [-1, 0],
    [DIRECTIONS.RIGHT]: [1, 0],
    [DIRECTIONS.UP_LEFT]: [-1, 1],
    [DIRECTIONS.UP_RIGHT]: [1, 1],
    [DIRECTIONS.DOWN_LEFT]: [-1, -1],
    [DIRECTIONS.DOWN_RIGHT]: [1, -1],
}

export const COLOR = {
    WHITE: 'white',
    BLACK: 'black',
}