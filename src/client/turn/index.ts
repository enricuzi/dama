import { GameContext, GameState } from '../../type-defs'
import { TurnConfig } from 'boardgame.io'
import { useLogger } from '../../utils'

const { log } = useLogger('Turn')

export default {
  minMoves: 1,
  maxMoves: 1,
  onBegin(G, ctx) {
    log('Starting turn', `player ${ctx.currentPlayer}`)
  },
  onEnd(G, ctx) {
    log('Ending turn', `player ${ctx.currentPlayer}`)
  },
} as TurnConfig<GameState, GameContext>
