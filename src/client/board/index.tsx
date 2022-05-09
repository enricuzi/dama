import React from 'react'
import { GameContext, GameEvents, GameMoves, GameState, MaybeNull } from '../../type-defs'
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
  const { on } = useEvents(BoardController.name)

  log('loading', { G, ctx, moves, events, playerID })

  return <div>
    { G.board.length ? <BoardComponent boardState={G.board}/> : <span>Loading board...</span> }
  </div>
}
