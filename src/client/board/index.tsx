import React, { useCallback, useEffect, useState } from 'react'
import {
  CellStatus,
  Color,
  EventType,
  GameContext,
  GameEvents,
  GameMoves,
  GameState,
  LinkedCell,
  MaybeExists,
  MaybeNull, MoveType,
  Pawn,
} from '../../type-defs'
import { getCellColor, useEvents, useLogger } from '../../utils'
import { BoardComponent } from '../../ui/board.component'
import { BOARD_SIZE } from '../../utils/GameRules'

export const BoardController = (
  { G, ctx, moves, events, playerID }:
  {
    G: GameState,
    ctx: GameContext,
    moves: GameMoves,
    events: GameEvents,
    playerID: MaybeNull<string>
  }) => {
  const { log } = useLogger(BoardController.name)
  const { on } = useEvents(BoardController.name)

  log('loading', { G, ctx, moves, events, playerID })

  const [board, setBoard] = useState([] as Array<Array<LinkedCell>>)

  const getPawn = useCallback((i: number, j: number): MaybeExists<Pawn> => {
    let pawn
    if (G.pawns) {
      pawn =
        G.pawns[Color.BLACK].find((pawn) => pawn && pawn.coords[0] === i && pawn.coords[1] === j) ||
        G.pawns[Color.WHITE].find((pawn) => pawn && pawn.coords[0] === i && pawn.coords[1] === j)
    }
    return pawn
  }, [G.pawns])

  useEffect(() => {
    on(EventType.PAWN_MOVED, (cell) => {
      moves[MoveType.MOVE_PAWN](G, ctx, cell)
    })
    const board: Array<Array<LinkedCell>> = []
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row: Array<LinkedCell> = []
      for (let j = 0; j < BOARD_SIZE; j++) {
        const id = `${i}-${j}`
        const color = getCellColor(i, j)
        const pawn = getPawn(i, j)
        const status = pawn ? CellStatus.PAWN_SOME : CellStatus.NO_STATUS
        const coords = [i, j]
        const cells = {
          top: { left: null, right: null },
          bottom: { left: null, right: null }
        }
        row.push({ id, color, pawn, status, coords, cells })
      }
      board.push(row)
    }
    board.forEach((row) => row.forEach((cell) => {
      const [row, column] = cell.coords
      if (board[row - 1]) {
        cell.cells.top.left = board[row - 1][column - 1]
        cell.cells.top.right = board[row - 1][column + 1]
      }
      if (board[row + 1]) {
        cell.cells.bottom.left = board[row + 1][column - 1]
        cell.cells.bottom.right = board[row + 1][column + 1]
      }
    }))
    log('Loading board', board)
    setBoard(board)
  }, [setBoard])

  return <div>
    { board.length ? <BoardComponent boardState={board}/> : <span>Loading board...</span> }
  </div>
}
