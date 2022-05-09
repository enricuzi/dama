import { useLogger } from './Logger'
import { useEvents } from './EventManager'
import * as GameRules from './GameRules'
import { Coords } from '../type-defs'

export const flatDoubleArray = <T>(a: Array<Array<T>>) => ([] as Array<T>).concat(...a)

export const matchCoords = (src: Coords, dest: Coords) => src[0] === dest[0] && src[1] === dest[1]

export {
  useLogger,
  useEvents,
  GameRules
}
