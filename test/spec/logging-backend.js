import Context from 'borders'
import * as Commands from '../../src/commands'

export default (loggingBackend) => {
  const execute = generatorFunction => () => {
    const context = new Context().use(loggingBackend({}))
    return context.execute(generatorFunction())
  }

  describe('commands for log levels', () => {
    for (const level of Object.values(Commands.LogLevel)) {
      it(`should log with level ${level}`, execute(function* test() {
        yield Commands[level]('data-access-logging', 'test')
      }))
    }
  })

  describe('commands bound to a namespace', () => {
    const logger = Commands.default('data-access-logging')

    for (const level of Object.values(Commands.LogLevel)) {
      it(`should log with level ${level}`, execute(function* test() {
        yield logger[level]('test')
      }))
    }
  })
}
