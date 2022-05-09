import React from 'react'
import { PawnComponent } from './pawn.component'
import { Callback, Cell, CellStatus } from '../type-defs'
import './cell.component.css'

export function CellComponent ({ cell, onClick }: { cell: Cell, onClick: Callback }) {

  const color =
    cell.status === CellStatus.AVAILABLE ||
    cell.status === CellStatus.PAWN_OPPONENT ||
    cell.status === CellStatus.BLOCKED
      ? cell.status : cell.color

  return <div className={`cell ${color}`} onClick={() => cell.status !== CellStatus.BLOCKED && onClick()}>
    {
      cell.pawn ? <PawnComponent color={cell.pawn.color}/> : null
    }
  </div>
}
