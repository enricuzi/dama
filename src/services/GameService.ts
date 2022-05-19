import { CellStatus, GameResponse, GameState } from '../types/client-types'
import { GetAvailableMovesResponse } from '../types/server-types'

const BASE_URL = 'http://localhost:3001/checkers/games/1/'

export const useService = () => ({
  async getMoves(): Promise<GetAvailableMovesResponse> {
    return await getMoves()
  },
  async get(path = ''): Promise<GameState | GetAvailableMovesResponse> {
    if (path === 'moves') {
      return await getMoves()
    }
    return await getGameState()
  },
  async post(data: any, path = '') {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const response = await fetch(BASE_URL + path, requestOptions)
    return await response.json()
  }
})

const getGameState = async (): Promise<GameState> => {
  const response = await fetch(BASE_URL)
  const data = await response.json() as GameResponse
  return {
    board: data.board.map((row, i) => row.map((cell, j) => {
      if (cell === 'W') {
        return CellStatus.WHITE
      }
      if (cell === 'B') {
        return CellStatus.BLACK
      }
      return CellStatus.BLOCKED
    })),
    playerID: data.turn,
  }
}

const getMoves = async (): Promise<GetAvailableMovesResponse> => {
  const response = await fetch(BASE_URL + 'moves')
  return await response.json()
}
