import { GameContext, GameState, StageType } from '../../type-defs'
import { TurnConfig } from 'boardgame.io'
import { useLogger } from '../../utils'
import stages from '../stages'

const { log } = useLogger('Turn')

export default {
  minMoves: 1,
  onBegin(G, ctx) {
    log('Starting turn', `player ${ctx.currentPlayer}`)
  },
  onEnd(G, ctx) {
    log('Ending turn', `player ${ctx.currentPlayer}`)
  },
  activePlayers: {
    currentPlayer: StageType.CHOOSE_MOVE
  },
  stages
} as TurnConfig<GameState, GameContext>
