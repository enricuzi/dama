import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useEvents } from './utils'
import { EventType, GameState } from './types/client-types'
import { GameClient } from './client'
import { useService } from './services/GameService'

function App() {
  const [gameState, setGameState] = useState(null as unknown as GameState)
  const { get } = useService()

  const loadGameState = useCallback(async (): Promise<GameState> => {
    return await get() as GameState
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
