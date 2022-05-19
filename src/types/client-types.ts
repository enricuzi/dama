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
  DATA_LOADED = 'DATA_LOADED',
  END_TURN = 'END_TURN',
  CELL_SELECTED = 'CELL_SELECTED',
  PAWN_SELECTED = 'PAWN_SELECTED',
  START_MOVE = 'START_MOVE',
  END_MOVE = 'END_MOVE',
  PAWN_MOVED = 'PAWN_MOVED'
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
  BLOCKED = 'BLOCKED',
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
  playerID: MaybeNull<string>,
  board: BoardState
}

export enum CellResponse {
  W = 'W',
  B = 'B',
  X = 'X'
}

export type GameResponse = {
  turn: Color,
  board: Array<Array<CellResponse>>
}
