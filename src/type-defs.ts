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
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum EventType {
  DATA_LOADED = 'DataLoaded',
  END_TURN = 'EndTurn',
  CELL_CLICKED = 'CellClicked',
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
  BLACK = 'black',
  WHITE = 'white'
}

export type Pawn = {
  id: number,
  coords: Coords,
  color: Color
}

export enum CellStatus {
  NO_STATUS = 'NoStatus',
  AVAILABLE = 'Available',
  PAWN_PLAYER = 'PawnPlayer',
  PAWN_OPPONENT = 'PawnOpponent',
  PAWN_SOME = 'PawnSome'
}

export type Cell = {
  id: string,
  coords: Coords,
  status: CellStatus
  color: Color,
  pawn: MaybeExists<Pawn>
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

export type GameState = {
  pawns: {
    [Color.BLACK]: Array<Pawn>
    [Color.WHITE]: Array<Pawn>
  }
}

export type GameContext = Ctx

export type GameMoves = Record<string, (...args: any[]) => void>

export type GameEvents = Record<string, unknown>

export type Row = Array<LinkedCell>

export type Board = Array<Row>
