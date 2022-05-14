import React from 'react'
import { Board, Callback } from '../../type-defs'
import { CellComponent } from './cell.component'
import './board.component.css'

export function BoardComponent ({ board, onClick }: { board: Board, onClick: Callback }) {
  console.log('Drawing board component', board)
  return <div className={'board'}>
    {
      board.map((row, i) =>
        <div key={i} className={`row ${i}`}>{
          row.map((cell) => {
            const { id } = cell
            return <CellComponent key={id} cell={cell} onClick={() => onClick(cell)}/>
          })
        }</div>
      )
    }
  </div>
}
