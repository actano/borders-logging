'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _borders = require('borders');

var _borders2 = _interopRequireDefault(_borders);

var _commands = require('../src/commands');

var Commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);
const expect = _chai2.default.expect;

exports.default = loggingBackend => {
  const execute = generatorFunction => () => {
    const context = new _borders2.default().use(loggingBackend);
    return context.execute(generatorFunction());
  };

  beforeEach(() => {
    _sinon2.default.spy(loggingBackend, Commands.TYPE);
  });

  afterEach(() => {
    loggingBackend[Commands.TYPE].restore();
  });

  describe('commands for log levels', () => {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.values(Commands.LogLevel)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const level = _step.value;

        it(`should log with level ${level}`, execute(function* test() {
          yield Commands[level]('borders-logging/by-level', 'test', 42, 'foo');

          expect(loggingBackend[Commands.TYPE]).to.have.been.calledWith({
            namespace: 'borders-logging/by-level',
            msg: 'test',
            level,
            args: [42, 'foo']
          });
        }));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  describe('commands bound to a namespace', () => {
    const logger = Commands.default('borders-logging/by-namespace');

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.values(Commands.LogLevel)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        const level = _step2.value;

        it(`should log with level ${level}`, execute(function* test() {
          yield logger[level]('test2', 'foo', 42);

          expect(loggingBackend[Commands.TYPE]).to.have.been.calledWith({
            namespace: 'borders-logging/by-namespace',
            msg: 'test2',
            level,
            args: ['foo', 42]
          });
        }));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
};

module.exports = exports['default'];
