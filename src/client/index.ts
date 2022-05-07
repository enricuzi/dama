import { Client } from 'boardgame.io/react'
import { GameController } from './game'
import { BoardController } from './board'
import { GameState } from '../type-defs'

export const GameClient = (gameState: GameState) => {
  console.log('GameClient', 'create')
  return Client({
    game: GameController(gameState),
    board: BoardController,
  })
}
