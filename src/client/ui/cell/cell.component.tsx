import React from 'react'
import { PawnComponent } from '../pawn/pawn.component'
import { Cell, CellStatus, EventType } from '../../../types/client-types'
import './cell.component.css'
import { useEvents } from '../../../utils'

export function CellComponent ({ cell }: { cell: Cell }) {

  const { trigger } = useEvents(CellComponent.name)

  const onCellClick = () => {
    if (cell.status !== CellStatus.BLOCKED) {
      if (cell.pawn) {
        trigger(EventType.PAWN_SELECTED, cell)
        trigger(EventType.START_MOVE, cell)
      }
      if (cell.status === CellStatus.AVAILABLE) {
        trigger(EventType.END_MOVE, cell)
      }
    }
  }

  return <div className={`cell ${cell.color} ${cell.status}`} onClick={onCellClick}>
    {
      cell.pawn ? <PawnComponent color={cell.pawn.color}/> : null
    }
  </div>
}
