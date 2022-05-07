import { GameContext, GameState, MoveType, PhaseType } from '../../type-defs'
import { PhaseMap } from 'boardgame.io'
import { useLogger } from '../../utils'
import moves from '../moves'

const { log } = useLogger('Phase')

export default {
  [PhaseType.PLAY]: {
    moves: {
      [MoveType.MOVE_PAWN]: moves[MoveType.MOVE_PAWN]
    },
    start: true
  }
} as PhaseMap<GameState, GameContext>
