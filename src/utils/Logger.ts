export type Logger = {
	log: (...logs: Array<unknown>) => void,
	error: (...logs: Array<unknown>) => void
}

export const useLogger = (component = '', ...props: Array<unknown>): Logger => {
  return {
    log: (...logs: Array<unknown>) => {
      LoggerUtils.log(component, ...props, ...logs)
    },
    error: (...logs: Array<unknown>) => {
      LoggerUtils.error(component, ...props, ...logs)
    }
  }
}

class LoggerUtils {
  static log (...logs: Array<unknown>) {
    console.log(...logs)
  }

  static error (...logs: Array<unknown>) {
    console.error(...logs)
  }
}
