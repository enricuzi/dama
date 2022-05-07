import moves from '../moves'
import plugins from '../plugins'
import turn from '../turn'
import phases from '../phases'
import { useLogger } from '../../utils'
import { GameContext, GameState } from '../../type-defs'

const { log, error } = useLogger('GameController')

export const GameController = (gameState: GameState) => ({
  setup: (ctx: GameContext): GameState => {
    log('setup', gameState)
    return gameState
  },
  moves,
  plugins,
  turn,
  phases
})
