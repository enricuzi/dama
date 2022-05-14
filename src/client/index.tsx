import React, { useCallback, useMemo, useState } from 'react'
import { CellStatus, Color, Direction, GameState, LinkedCell, MaybeExists, MaybeNull, PawnStatus } from '../type-defs'
import { getCellColor } from '../utils'
import { BoardComponent } from './ui/board.component'

export const GameClient = (
  { playerID, board: boardState }: GameState) => {

  const [board, setBoard] = useState(boardState.map((rowStatus, rowIndex) => rowStatus.map((cellStatus, cellIndex) => {
    const pawn = cellStatus === CellStatus.BLACK || cellStatus === CellStatus.WHITE ? {
      id: `pawn_${rowIndex}-${cellIndex}`,
      color: cellStatus === CellStatus.BLACK ? Color.BLACK : Color.WHITE,
      status: PawnStatus.SINGLE
    } : null
    const cell: LinkedCell = {
      id: `cell_${rowIndex}-${cellIndex}`,
      coords: [rowIndex, cellIndex],
      color: getCellColor(rowIndex, cellIndex),
      status: cellStatus,
      pawn,
      cells: {
        top: {
          left: null,
          right: null
        },
        bottom: {
          left: null,
          right: null
        }
      }
    }
    return cell
  })))

  const addLinkedCells = useCallback(() => {
    board.forEach((row: LinkedCell[], rowIndex: number) => row.map((cell, cellIndex) => {
      const prevRow = board[rowIndex - 1]
      const nextRow = board[rowIndex + 1]
      cell.cells.top.left = prevRow ? prevRow[cellIndex - 1] : null
      cell.cells.top.right = prevRow ? prevRow[cellIndex + 1] : null
      cell.cells.bottom.left = nextRow ? nextRow[cellIndex - 1] : null
      cell.cells.bottom.right = nextRow ? nextRow[cellIndex + 1] : null
      return cell
    }))
  }, [board])

  const cellsToUpdate = useMemo(() => ({
    fromCell: null as MaybeNull<LinkedCell>,
    toCell: null as MaybeNull<LinkedCell>,
    toEat: null as MaybeNull<LinkedCell>
  }), [])

  const availableCells = useMemo((): { cells: Array<LinkedCell>, hasToEat: boolean } => ({
    cells: [],
    hasToEat: false
  }), [])

  const areCellsConnected = useCallback((sourceCell: LinkedCell, targetCell: LinkedCell) => {
    return sourceCell.cells.top.left === targetCell || sourceCell.cells.top.right === targetCell || sourceCell.cells.bottom.left === targetCell || sourceCell.cells.bottom.right === targetCell
  }, [board])

  const drawBoard = () => setBoard(board.map((row) => row))

  const onCLick = (cell: LinkedCell) => {
    if (cell.pawn) {
      cellsToUpdate.fromCell = cell
      cellsToUpdate.toCell = null
      cellsToUpdate.toEat = null
      showMoves(cell)
    } else {
      doMove(cell)
    }
  }

  const showMoves = (cell: LinkedCell) => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.EMPTY
    })
    availableCells.cells.length = 0
    availableCells.hasToEat = false

    updateAvailableCells(cell)

    drawBoard()
  }

  const updateAvailableCells = (cell: LinkedCell) => {
    const checkCell = checkMoves(cell)
    const topLeft = checkCell(Direction.TOP, Direction.LEFT)
    const topRight = checkCell(Direction.TOP, Direction.RIGHT)
    const bottomLeft = checkCell(Direction.BOTTOM, Direction.LEFT)
    const bottomRight = checkCell(Direction.BOTTOM, Direction.RIGHT)
    topLeft && availableCells.cells.push(topLeft)
    topRight && availableCells.cells.push(topRight)
    bottomLeft && availableCells.cells.push(bottomLeft)
    bottomRight && availableCells.cells.push(bottomRight)

    filterOnlyEatMoves()
  }

  const checkMoves = (cell: LinkedCell) => (rowDirection: Direction, columnDirection: Direction): MaybeExists<LinkedCell> => {
    if (cell.pawn) {
      const { coords: [rowIndex, columnIndex] } = cell
      const linkedCell = board[rowIndex + rowDirection][columnIndex + columnDirection]
      if (linkedCell) {
        if (linkedCell.pawn) {
          if (linkedCell.pawn.color !== cell.pawn.color) {
            const otherCell = board[rowIndex + (rowDirection * 2)][columnIndex + (columnDirection * 2)]
            if (otherCell && !otherCell.pawn) {
              linkedCell.status = CellStatus.PAWN_OPPONENT
              cellsToUpdate.toEat = linkedCell
              otherCell.status = CellStatus.AVAILABLE
              availableCells.cells.push(otherCell)
              availableCells.hasToEat = true
            }
          }
        } else {
          linkedCell.status = CellStatus.AVAILABLE
        }
      }
      return linkedCell
    }
  }

  const filterOnlyEatMoves = () => {
    if (availableCells.hasToEat) {
      availableCells.cells.forEach((cell) => {
        if (cell.status !== CellStatus.PAWN_OPPONENT && cellsToUpdate.fromCell && areCellsConnected(cellsToUpdate.fromCell, cell)) {
          cell.status = CellStatus.EMPTY
        }
      })
    }
  }

  const doMove = (cell: LinkedCell) => {
    if (cellsToUpdate.fromCell) {
      cellsToUpdate.toCell = cell
      console.log('Moving pawn', cellsToUpdate)

      const { coords: fromCoords } = cellsToUpdate.fromCell
      const { coords: toCoords } = cellsToUpdate.toCell

      const { pawn } = board[fromCoords[0]][fromCoords[1]]
      if (pawn) {
        board[toCoords[0]][toCoords[1]].pawn = {
          id: pawn.id,
          color: pawn.color,
          status: PawnStatus.SINGLE
        }
      }
      board[fromCoords[0]][fromCoords[1]].pawn = null

      const eatCoords = cellsToUpdate.toEat?.coords
      if (eatCoords) {
        board[eatCoords[0]][eatCoords[1]].pawn = null
      }

      clearAvailables()
    }
  }

  const clearAvailables = () => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.EMPTY
    })
    drawBoard()
  }

  addLinkedCells()

  return <div>
    { board.length ? <BoardComponent board={board} onClick={onCLick}/> : <span>Loading board...</span> }
  </div>
}
