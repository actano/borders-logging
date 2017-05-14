import testLogging from '../spec/logging-backend.es6'
import loggingBackend from '../src/backends/console'

describe('borders-logging', () => {
  testLogging(loggingBackend())
})
