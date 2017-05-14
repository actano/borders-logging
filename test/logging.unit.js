import testLogging from '../spec/logging-backend'
import loggingBackend from '../src/backends/console'

describe('borders-logging', () => {
  testLogging(loggingBackend())
})
