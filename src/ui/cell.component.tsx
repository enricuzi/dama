import React from 'react'
import { PawnComponent } from './pawn.component'
import { Callback, LinkedCell } from '../type-defs'
import './cell.component.css'

export function CellComponent ({ cell, onClick }: { cell: LinkedCell, onClick: Callback }) {

  return <div className={`cell ${cell.color} ${cell.status}`} onClick={() => onClick()}>
    {
      cell.pawn ? <PawnComponent color={cell.pawn.color}/> : null
    }
  </div>
}
