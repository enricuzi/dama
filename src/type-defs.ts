/**
 * Common types
 */

export type Callback = (data?: any) => void

export type MaybeNull<T> = T | null

export type MaybeUndefined<T> = T | undefined

export type MaybeExists<T> = T | null | undefined

export type MaybeDefault<T, D> = T | D

export type MaybeEmpty<Array> = Array | []

export type MaybeReturn<T> = T | void

export enum EventType {
  DATA_LOADED = 'DataLoaded',
  END_TURN = 'EndTurn',
  CELL_CLICKED = 'CellClicked',
  ALLOW_MOVE_START = 'AllowMoveStart',
  ALLOW_MOVE_END = 'AllowMoveEnd',
  PAWN_MOVED = 'PawnMoved'
}

export type UiEvent = { component: string, callback: Callback }

/**
 * UI types
 */

export type Coords = Array<number>

export enum Direction {
  TOP = -1,
  BOTTOM = 1,
  LEFT = -1,
  RIGHT = 1
}

export enum Color {
  BLACK = 'BLACK',
  WHITE = 'WHITE'
}

export enum PawnStatus {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE'
}

export type Pawn = {
  id: string,
  color: Color,
  status: PawnStatus
}

export enum CellStatus {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  EMPTY = 'EMPTY',
  BLOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  PAWN_OPPONENT = 'PAWN_OPPONENT'
}

export type Cell = {
  id: string,
  coords: Coords,
  status: CellStatus
  color: Color,
  pawn: MaybeExists<Pawn>,
}

export type LinkedCell = Cell & {
  cells: {
    top: {
      left: MaybeExists<LinkedCell>
      right: MaybeExists<LinkedCell>
    },
    bottom: {
      left: MaybeExists<LinkedCell>
      right: MaybeExists<LinkedCell>
    }
  }
}

export type Board = Array<Array<LinkedCell>>

export type BoardState = Array<Array<CellStatus>>

export type GameState = {
  playerID: string,
  board: BoardState
}
