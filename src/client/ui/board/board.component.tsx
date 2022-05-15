import React from 'react'
import { Board } from '../../../type-defs'
import { CellComponent } from '../cell/cell.component'
import './board.component.css'

export function BoardComponent ({ board }: { board: Board }) {
  return <div className={'board'}>
    {
      board.map((row, i) =>
        <div key={i} className={`row ${i}`}>{
          row.map((cell) => {
            const { id } = cell
            return <CellComponent key={id} cell={cell}/>
          })
        }</div>
      )
    }
  </div>
}
