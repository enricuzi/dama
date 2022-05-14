import React from 'react'
import { Color } from '../../type-defs'
import './pawn.component.css'

export function PawnComponent ({ color }: { color: Color }) {
  return <button className={`pawn ${color}`}/>
}
