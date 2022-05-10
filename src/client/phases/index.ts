import { GameContext, GameState, MoveType, PhaseType } from '../../type-defs'
import { PhaseMap } from 'boardgame.io'
import moves from '../moves'

export default {
  [PhaseType.PLAY_GAME]: {
    moves: {
      [MoveType.MOVE_PAWN]: moves[MoveType.MOVE_PAWN]
    },
    start: true
  },
  [PhaseType.CHOOSE_COLOR]: {
    moves: {}
  }
} as PhaseMap<GameState, GameContext>
