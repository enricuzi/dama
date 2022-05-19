import React from 'react'
import { Color } from '../../../types/client-types'
import './pawn.component.css'

export function PawnComponent ({ color }: { color: Color }) {
  return <button className={`pawn ${color}`}/>
}
