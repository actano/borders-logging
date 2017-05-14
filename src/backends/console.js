import { TYPE, LogLevel } from '../commands'

const logLevelToMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.INFO]: 'log',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error',
}

const log = ({ namespace, msg, level, args }) => {
  // eslint-disable-next-line no-console
  console[logLevelToMethod[level]](`${namespace}: ${msg}`, ...args)
}

export default () => ({ [TYPE]: log })
