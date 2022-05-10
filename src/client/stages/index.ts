import { StageMap } from 'boardgame.io'
import { GameContext, GameState, MoveType, StageType } from '../../type-defs'
import moves from '../moves'

export default {
  [StageType.PLAY]: {
    moves: {
      [MoveType.MOVE_PAWN]: moves[MoveType.MOVE_PAWN],
    },
  },
  [StageType.WAIT]: {
    moves: {}
  },
} as StageMap<GameState, GameContext>
