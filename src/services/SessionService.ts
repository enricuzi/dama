import { Color, MaybeUndefined } from '../types/client-types'

export const useSession = () => ({
  session: {
    testing: SessionService.testing,
    player: {
      color: SessionService.playerColor
    }
  }
})

export class SessionService {
  static playerColor: MaybeUndefined<Color>
  static testing: MaybeUndefined<boolean>

  constructor({ playerColor, testing }: { playerColor?: Color, testing?: boolean }) {
    SessionService.playerColor = playerColor
    SessionService.testing = testing
  }
}
