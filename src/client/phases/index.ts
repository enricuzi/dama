import { GameContext, GameState } from '../../type-defs'
import { PhaseMap } from 'boardgame.io'
import { useLogger } from '../../utils'

const { log } = useLogger('Phase')

export default {
} as PhaseMap<GameState, GameContext>
