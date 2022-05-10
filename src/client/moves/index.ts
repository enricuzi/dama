import { MoveMap } from 'boardgame.io'
import { GameContext, GameState, LinkedCell, MoveType } from '../../type-defs'
import { useLogger } from '../../utils'

const { log } = useLogger('Move')

export default {
  [MoveType.MOVE_PAWN]: (G, ctx, cell: LinkedCell) => {
    log('Moving pawn', cell)
    ctx.events?.endTurn()
  },
  [MoveType.EAT_PAWN]: (G, ctx, playerCell: LinkedCell, opponentCell: LinkedCell) => {
    log('Eating pawn', playerCell, opponentCell)
  },
} as MoveMap<GameState, GameContext>
