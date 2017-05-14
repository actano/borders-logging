import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import Context from 'borders'
import * as Commands from '../../src/commands'

chai.use(sinonChai)
const { expect } = chai

export default (loggingBackend) => {
  const execute = generatorFunction => () => {
    const context = new Context().use(loggingBackend)
    return context.execute(generatorFunction())
  }

  beforeEach(() => {
    sinon.spy(loggingBackend, Commands.TYPE)
  })

  afterEach(() => {
    loggingBackend[Commands.TYPE].restore()
  })

  describe('commands for log levels', () => {
    for (const level of Object.values(Commands.LogLevel)) {
      it(`should log with level ${level}`, execute(function* test() {
        yield Commands[level]('borders-logging/by-level', 'test', 42, 'foo')

        expect(loggingBackend[Commands.TYPE]).to.have.been.calledWith({
          namespace: 'borders-logging/by-level',
          msg: 'test',
          level,
          args: [42, 'foo'],
        })
      }))
    }
  })

  describe('commands bound to a namespace', () => {
    const logger = Commands.default('borders-logging/by-namespace')

    for (const level of Object.values(Commands.LogLevel)) {
      it(`should log with level ${level}`, execute(function* test() {
        yield logger[level]('test2', 'foo', 42)

        expect(loggingBackend[Commands.TYPE]).to.have.been.calledWith({
          namespace: 'borders-logging/by-namespace',
          msg: 'test2',
          level,
          args: ['foo', 42],
        })
      }))
    }
  })
}
