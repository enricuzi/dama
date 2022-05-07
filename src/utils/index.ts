import { useLogger } from './Logger'
import { useEvents } from './EventManager'
import * as GameRules from './GameRules'
import { Color, Coords } from '../type-defs'

export const flatDoubleArray = <T>(a: Array<Array<T>>) => ([] as Array<T>).concat(...a)

export const matchCoords = (src: Coords, dest: Coords) => src[0] === dest[0] && src[1] === dest[1]

export const getCellColor = (i: number, j: number) => {
  const isPairRow = i % 2 === 0
  const isPairCell = j % 2 === 0
  return (isPairRow && !isPairCell) || (!isPairRow && isPairCell) ? Color.BLACK : Color.WHITE
}

export {
  useLogger,
  useEvents,
  GameRules
}
