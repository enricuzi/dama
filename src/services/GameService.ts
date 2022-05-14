import fixture from './game_context_dama.json'
import { BoardState, GameState } from '../type-defs'

class GameService {
  data: GameState

  constructor () {
    this.data = {
      board: fixture.gameContextHolder.context.board as BoardState,
      playerID: fixture.gameContextHolder.context.turn,
    }
  }

  async save (data: GameState) {
    this.data = data
  }

  async load () {
    if (!this.data) {
      this.data = {
        board: fixture.gameContextHolder.context.board as BoardState,
        playerID: fixture.gameContextHolder.context.turn,
      }
    }
    return this.data
  }

  async clear () {
    return {}
  }
}

export default GameService
