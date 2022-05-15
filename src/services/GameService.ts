import { CellStatus, GameResponse, GameState, MaybeNull } from '../type-defs'

class GameService {
  data: MaybeNull<GameState> = null

  async save (data: GameState) {
    this.data = data
  }

  async load () {
    if (!this.data) {
      const response = await fetch('http://localhost:3001/checkers/games/1')
      const data = await response.json() as GameResponse
      this.data = {
        board: data.board.map((row) => row.map((cell) => {
          if (cell === 'W') {
            return CellStatus.WHITE
          }
          if (cell === 'B') {
            return CellStatus.BLACK
          }
          if (cell === 'X') {
            return CellStatus.BLOCKED
          }
        })),
        playerID: data.turn,
      } as GameState
    }
    return this.data
  }

  async clear () {
    return {}
  }
}

export default GameService
