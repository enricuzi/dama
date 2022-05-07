import { LinkedCell } from '../type-defs'

export const BOARD_SIZE = 8

export const areCellsConnected = (sourceCell: LinkedCell, targetCell: LinkedCell) => {
  return sourceCell.cells.top.left === targetCell || sourceCell.cells.top.right === targetCell || sourceCell.cells.bottom.left === targetCell || sourceCell.cells.bottom.right === targetCell
}
