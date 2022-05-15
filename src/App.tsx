import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useEvents } from './utils'
import GameService from './services/GameService'
import { EventType, GameState } from './type-defs'
import { GameClient } from './client'

function App() {
  const [gameState, setGameState] = useState(null as unknown as GameState)

  const loadGameState = useCallback(async () => {
    const gameService = new GameService()
    return await gameService.load()
  }, [])

  const createAppClient = useCallback(() => {
    return <GameClient playerID={gameState?.playerID} board={gameState?.board}/>
  }, [gameState])

  const { trigger } = useEvents(App.name)

  useEffect(() => {
    loadGameState().then((gameState) => {
      console.log('Loaded gameState', gameState)
      setGameState(gameState)
      trigger(EventType.DATA_LOADED, gameState)
    })
  }, [loadGameState])

  return (
    <div className="App">
      { gameState ? <div className={'client-container'}>{ createAppClient() }</div> : null }
    </div>
  )
}

export default App
