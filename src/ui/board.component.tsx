import React, { useMemo, useState } from 'react'
import { CellStatus, Direction, EventType, LinkedCell, MaybeExists, MaybeNull } from '../type-defs'
import { CellComponent } from './cell.component'
import './board.component.css'
import { useEvents, useLogger } from '../utils'
import { areCellsConnected } from '../utils/GameRules'

export function BoardComponent ({ boardState }: { boardState: Array<Array<LinkedCell>>}) {
  const { log } = useLogger(BoardComponent.name)
  const { trigger } = useEvents(BoardComponent.name)

  const [board, setBoard] = useState(boardState)

  const availableCells = useMemo((): { cells: Array<LinkedCell>, hasToEat: boolean } => ({
    cells: [],
    hasToEat: false
  }), [])

  const drawBoard = () => setBoard(board.map((row) => row))

  const clearCellStatuses = () => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.NO_STATUS
    })
    drawBoard()
  }

  const filterOnlyEatMoves = () => {
    if (availableCells.hasToEat) {
      availableCells.cells.forEach((cell) => {
        if (cell.status !== CellStatus.PAWN_OPPONENT && pawnToMove.fromCell && areCellsConnected(pawnToMove.fromCell, cell)) {
          cell.status = CellStatus.NO_STATUS
        }
      })
    }
  }

  const updateAvailableCells = (cell: LinkedCell) => {
    const checkCell = checkLinkedCell(cell)
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

  const doPawnMove = (cell: LinkedCell) => {
    if (pawnToMove.fromCell) {
      pawnToMove.toCell = cell
      log('Moving pawn', pawnToMove)

      const { coords: fromCoords } = pawnToMove.fromCell
      const { coords: toCoords } = pawnToMove.toCell

      const { pawn } = board[fromCoords[0]][fromCoords[1]]
      if (pawn) {
        board[toCoords[0]][toCoords[1]].pawn = {
          id: pawn.id,
          color: pawn.color,
          coords: toCoords
        }
      }
      board[fromCoords[0]][fromCoords[1]].pawn = null

      const eatCoords = pawnToMove.toEat?.coords
      if (eatCoords) {
        board[eatCoords[0]][eatCoords[1]].pawn = null
      }

      clearCellStatuses()

      trigger(EventType.PAWN_MOVED)
    }
  }

  const checkLinkedCell = (cell: LinkedCell) => (rowDirection: Direction.TOP | Direction.BOTTOM, columnDirection: Direction.LEFT | Direction.RIGHT): MaybeExists<LinkedCell> => {
    if (cell.pawn) {
      const linkedCell = cell.cells[rowDirection][columnDirection]
      if (linkedCell) {
        if (linkedCell.pawn) {
          if (linkedCell.pawn.color !== cell.pawn.color) {
            const otherLinkedCell = linkedCell.cells[rowDirection][columnDirection]
            if (otherLinkedCell && !otherLinkedCell.pawn) {
              linkedCell.status = CellStatus.PAWN_OPPONENT
              pawnToMove.toEat = linkedCell
              otherLinkedCell.status = CellStatus.AVAILABLE
              availableCells.cells.push(otherLinkedCell)
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

  const prepareLinkedPawnMove = (cell: LinkedCell) => {
    availableCells.cells.forEach((cell) => {
      cell.status = CellStatus.NO_STATUS
    })
    availableCells.cells.length = 0
    availableCells.hasToEat = false

    updateAvailableCells(cell)

    drawBoard()
  }

  const pawnToMove = useMemo(() => ({
    fromCell: null as MaybeNull<LinkedCell>,
    toCell: null as MaybeNull<LinkedCell>,
    toEat: null as MaybeNull<LinkedCell>
  }), [])

  const onClickCell = (cell: LinkedCell) => {
    if (cell.pawn) {
      pawnToMove.fromCell = cell
      pawnToMove.toCell = null
      pawnToMove.toEat = null
      prepareLinkedPawnMove(cell)
    } else if (cell.status === CellStatus.AVAILABLE) {
      doPawnMove(cell)
    }
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
