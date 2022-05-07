import { MoveMap } from 'boardgame.io'
import { GameContext, GameState, LinkedCell, MoveType } from '../../type-defs'
import { useLogger } from '../../utils'

const { log } = useLogger('Move')

export default {
  [MoveType.MOVE_PAWN]: (G, ctx, cell: LinkedCell) => {
    log('Moving pawn', cell)
  }
} as MoveMap<GameState, GameContext>
