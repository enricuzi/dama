import { Ctx } from 'boardgame.io'

export type Callback = (data?: any) => void

export type MaybeNull<T> = T | null

export type MaybeUndefined<T> = T | undefined

export type MaybeExists<T> = T | null | undefined

export type MaybeEmpty<Array> = Array | []

export type MaybeReturn<T> = T | void

export type Coords = Array<number>

export type UiEvent = { component: string, callback: Callback }

export enum Direction {
  TOP = -1,
  BOTTOM = 1,
  LEFT = -1,
  RIGHT = 1
}

export enum EventType {
  DATA_LOADED = 'DataLoaded',
  END_TURN = 'EndTurn',
  CELL_CLICKED = 'CellClicked',
  ALLOW_MOVE_START = 'AllowMoveStart',
  ALLOW_MOVE_END = 'AllowMoveEnd',
  PAWN_MOVED = 'PawnMoved'
}

export enum StageType {
  PLAY = 'Stage_Play',
  WAIT = 'Stage_Wait'
}

export enum PhaseType {
  PLAY = 'Phase_Play'
}

export enum MoveType {
  MOVE_PAWN = 'MovePawn',
}

export enum Color {
  BLACK = 'BLACK',
  WHITE = 'WHITE'
}

export type Pawn = {
  id: string,
  color: Color,
  isSuperPawn?: boolean
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

export type SimpleBoard = Array<Array<CellStatus>>

export type GameState = {
  board: SimpleBoard,
  turn: Color
}

export type GameContext = Ctx

export type GameMoves = Record<string, (...args: any[]) => void>

export type GameEvents = Record<string, unknown>

export type Row = Array<LinkedCell>

export type Board = Array<Row>
