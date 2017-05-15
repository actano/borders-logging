import testLogging from '../src/logging-backend.spec'
import loggingBackend from '../src/backends/console'

describe('borders-logging', () => {
  testLogging(loggingBackend)
})
