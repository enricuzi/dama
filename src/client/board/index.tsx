import React, { useEffect } from 'react'
import {
  CellStatus,
  EventType,
  GameContext,
  GameEvents,
  GameMoves,
  GameState,
  LinkedCell,
  MaybeNull,
  MoveType,
} from '../../type-defs'
import { useEvents, useLogger } from '../../utils'
import { BoardComponent } from '../../ui/board.component'

export const BoardController = (
  { G, ctx, moves, events, playerID }:
  {
    G: GameState,
    ctx: GameContext,
    moves: GameMoves,
    events: GameEvents,
    playerID: MaybeNull<string>
  }) => {
  const { log } = useLogger(BoardController.name)
  const { on, trigger } = useEvents(BoardController.name)

  log('loading', { G, ctx, moves, events, playerID })

  useEffect(() => {
    on(EventType.PAWN_MOVED, (cell: LinkedCell) => {
      moves[MoveType.MOVE_PAWN](G, ctx, cell)
    })
    on(EventType.CELL_CLICKED, (cell: LinkedCell) => {
      if (G.turn === cell.pawn?.color) {
        trigger(EventType.ALLOW_MOVE_START, cell)
      }
      if (cell.status === CellStatus.AVAILABLE) {
        trigger(EventType.ALLOW_MOVE_END, cell)
      }
    })
  })

  return <div>
    { G.board.length ? <BoardComponent boardState={G.board}/> : <span>Loading board...</span> }
  </div>
}
