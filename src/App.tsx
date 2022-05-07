import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useEvents, useLogger } from './utils'
import { GameClient } from './client'
import GameService from './services/GameService'
import { Color, EventType, GameState } from './type-defs'

function App() {
  const { log } = useLogger(App.name)

  const [gameState, setGameState] = useState(null as unknown as GameState)

  const loadGameState = useCallback(async () => {
    const gameService = new GameService()
    return await gameService.load()
  }, [])

  const createAppClient = useCallback(() => {
    const AppClient = GameClient(gameState)
    return {
      master: <AppClient matchID={'dama'}/>,
      [Color.BLACK]: <AppClient matchID={'dama'} playerID={Color.BLACK}/>,
      [Color.WHITE]: <AppClient matchID={'dama'} playerID={Color.WHITE}/>,
    }
  }, [gameState])

  const { trigger } = useEvents(App.name)

  useEffect(() => {
    loadGameState().then((gameState) => {
      log('Loaded gameState', gameState)
      setGameState(gameState)
      trigger(EventType.DATA_LOADED, gameState)
    })
  }, [loadGameState])

  return (
    <div className="App">
      { gameState ? <div>
        <fieldset id={'master'}>
          <legend>Master</legend>
          <div className={'client-container'}>{ createAppClient()[Color.WHITE] }</div>
        </fieldset>
      </div> : null}
    </div>
  )
}

export default App
