import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CellStatus, Color, Direction, EventType, LinkedCell, MaybeExists, MaybeNull, Board } from '../type-defs'
import { CellComponent } from './cell.component'
import './board.component.css'
import { useEvents, useLogger } from '../utils'

export function BoardComponent ({ boardState }: { boardState: Board}) {
  const { log } = useLogger(BoardComponent.name)
  const { on, trigger } = useEvents(BoardComponent.name)

  const getCellColor = useCallback((i: number, j: number) => {
    const isPairRow = i % 2 === 0
    const isPairCell = j % 2 === 0
    return (isPairRow && !isPairCell) || (!isPairRow && isPairCell) ? Color.WHITE : Color.BLACK
  }, [])

  const [board, setBoard] = useState(boardState.map((rowStatus, rowIndex) => rowStatus.map((cellStatus, cellIndex) => {
    const pawn = cellStatus === CellStatus.BLACK || cellStatus === CellStatus.WHITE ? {
      id: `pawn_${rowIndex}-${cellIndex}`,
      color: cellStatus === CellStatus.BLACK ? Color.BLACK : Color.WHITE,
      isSuperPawn: false
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

  useEffect(() => {
    setBoard(board.map((row, rowIndex) => row.map((cell, cellIndex) => {
      const prevRow = board[rowIndex - 1]
      const nextRow = board[rowIndex + 1]
      cell.cells.top.left = prevRow ? prevRow[cellIndex - 1] : null
      cell.cells.top.right = prevRow ? prevRow[cellIndex + 1] : null
      cell.cells.bottom.left = nextRow ? nextRow[cellIndex - 1] : null
      cell.cells.bottom.right = nextRow ? nextRow[cellIndex + 1] : null
      return cell
    })))
  }, [])

  useEffect(() => {
    on(EventType.ALLOW_MOVE_START, (cell: LinkedCell) => {
      if (cell.pawn) {
        cellsToUpdate.fromCell = cell
        cellsToUpdate.toCell = null
        cellsToUpdate.toEat = null
      }
      showMoves(cell)
    })
    on(EventType.ALLOW_MOVE_END, (cell: LinkedCell) => {
      doMove(cell)
    })
  }, [])

  const availableCells = useMemo((): { cells: Array<LinkedCell>, hasToEat: boolean } => ({
    cells: [],
    hasToEat: false
  }), [])

  const areCellsConnected = useCallback((sourceCell: LinkedCell, targetCell: LinkedCell) => {
    return sourceCell.cells.top.left === targetCell || sourceCell.cells.top.right === targetCell || sourceCell.cells.bottom.left === targetCell || sourceCell.cells.bottom.right === targetCell
  }, [board])

  const drawBoard = () => setBoard(board.map((row) => row))

  const clearAvailables = () => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.EMPTY
    })
    drawBoard()
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

  const doMove = (cell: LinkedCell) => {
    if (cellsToUpdate.fromCell) {
      cellsToUpdate.toCell = cell
      log('Moving pawn', cellsToUpdate)

      const { coords: fromCoords } = cellsToUpdate.fromCell
      const { coords: toCoords } = cellsToUpdate.toCell

      const { pawn } = board[fromCoords[0]][fromCoords[1]]
      if (pawn) {
        board[toCoords[0]][toCoords[1]].pawn = {
          id: pawn.id,
          color: pawn.color,
        }
      }
      board[fromCoords[0]][fromCoords[1]].pawn = null

      const eatCoords = cellsToUpdate.toEat?.coords
      if (eatCoords) {
        board[eatCoords[0]][eatCoords[1]].pawn = null
      }

      clearAvailables()

      trigger(EventType.PAWN_MOVED, cell)
    }
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

  const showMoves = (cell: LinkedCell) => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.EMPTY
    })
    availableCells.cells.length = 0
    availableCells.hasToEat = false

    updateAvailableCells(cell)

    drawBoard()
  }

  const cellsToUpdate = useMemo(() => ({
    fromCell: null as MaybeNull<LinkedCell>,
    toCell: null as MaybeNull<LinkedCell>,
    toEat: null as MaybeNull<LinkedCell>
  }), [])

  const onClickCell = (cell: LinkedCell) => {
    trigger(EventType.CELL_CLICKED, cell)
  }

  return <div className={'board'}>
    {
      board.map((row, i) =>
        <div key={i} className={`row ${i}`}>{
          row.map((cell) => {
            const { id } = cell
            return <CellComponent key={id} cell={cell} onClick={() => onClickCell(cell)}/>
          })
        }</div>
      )
    }
  </div>
}
