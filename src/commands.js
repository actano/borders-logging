import commandWithStackFrame from 'borders/command-with-stackframe'

export const TYPE = 'LOG'

export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

const createCommandForLevel = level => commandWithStackFrame((namespace, msg, ...args) => ({
  type: TYPE,
  payload: {
    namespace,
    level,
    msg,
    args,
  },
}))

export const debug = createCommandForLevel(LogLevel.DEBUG)
export const info = createCommandForLevel(LogLevel.INFO)
export const warn = createCommandForLevel(LogLevel.WARN)
export const error = createCommandForLevel(LogLevel.ERROR)

export default namespace => ({
  debug: debug.bind(null, namespace),
  info: info.bind(null, namespace),
  warn: warn.bind(null, namespace),
  error: error.bind(null, namespace),
})
