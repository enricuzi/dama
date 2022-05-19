type Coords = {
  x: number,
  y: number
}

type ErrorMessage = [
  {
    errorCode: string,
    errorContext: {
      additionalProp1: Record<string, unknown>,
      additionalProp2: Record<string, unknown>,
      additionalProp3: Record<string, unknown>
    }
  }
]

type Errors = Array<ErrorMessage>

type BaseResponse = {
  errors: Errors
}

export type GetAvailableMovesResponse = BaseResponse & {
  moves: Array<{
    target: Coords,
    moves: Array<Coords>
  }>
}

export type PostAvailableMovesRequest = {
  target: Coords,
  moves: Array<Coords>
}
