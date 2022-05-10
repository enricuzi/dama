import { StageMap } from 'boardgame.io'
import { GameContext, GameState, MoveType, StageType } from '../../type-defs'
import moves from '../moves'

export default {
  [StageType.CHOOSE_MOVE]: {
    moves: {},
  },
  [StageType.MOVE_PAWN]: {
    moves: {
      [MoveType.MOVE_PAWN]: moves[MoveType.MOVE_PAWN],
      [MoveType.EAT_PAWN]: moves[MoveType.EAT_PAWN],
    },
  },
  [StageType.WAIT]: {
    moves: {}
  },
} as StageMap<GameState, GameContext>
