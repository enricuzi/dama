import fixture from './game_context_dama.json'
import { GameState } from '../type-defs'

class GameService {
  data: GameState

  constructor () {
    this.data = fixture.gameContextHolder.context as GameState
  }

  async save (data: GameState) {
    this.data = data
  }

  async load () {
    if (!this.data) {
      this.data = fixture.gameContextHolder.context as GameState
    }
    return this.data
  }

  async clear () {
    return {}
  }
}

export default GameService
