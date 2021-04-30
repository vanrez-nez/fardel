import { test } from 'mocha';
import { expect } from 'chai';
import {
  isArguments,
  isArray,
  isBoolean,
  isDate,
  isError,
  isFunction,
  isMap,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isSet,
  isSymbol,
  isUndefined,
  isWeakMap,
  isPrimitive
} from '@fardel/utils';

const args = (function(p1, p2, p3) {
  // eslint-disable-next-line prefer-rest-params
  return arguments;
})(1, 2, 3);

const testTypes = [
  { val: [], type: 'array' },
  { val: true, type: 'boolean' },
  { val: false, type: 'boolean' },
  { val: {}, type: 'object' },
  { val: undefined, type: 'undefined' },
  { val: null, type: 'null' },
  { val: 0, type: 'number' },
  { val: 1, type: 'number' },
  { val: 'foo', type: 'string' },
  { val: () => 1, type: 'function' },
  { val: new Date, type: 'date' },
  { val: Symbol(), type: 'symbol' },
  { val: args, type: 'arguments' },
  { val: /a/, type: 'regexp' },
  { val: new RegExp('ab+c'), type: 'regexp' },
  { val: new Error('Foo'), type: 'error' },
  { val: new Map(), type: 'map' },
  { val: new WeakMap(), type: 'weakmap' },
  { val: new Set(), type: 'set' },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  { val: BigInt(1), type: 'bigint' }
]

describe('Utils/object', () => {
  test('isObject', () => {
    testTypes.forEach((test) => {
      const msg = `isObject on type(${test.type})`;
      const validTypes = [
        'object',
        'array',
        'function',
        'date',
        'arguments',
        'regexp',
        'error',
        'map',
        'set',
        'weakmap'
      ];
      expect(isObject(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isArray', () => {
    testTypes.forEach((test) => {
      const msg = `isArray on type(${test.type})`;
      const validTypes = ['array'];
      expect(isArray(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isBoolean', () => {
    testTypes.forEach((test) => {
      const msg = `isBoolean on type(${test.type})`;
      const validTypes = ['boolean'];
      expect(isBoolean(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isNumber', () => {
    testTypes.forEach((test) => {
      const msg = `isNumber on type(${test.type})`;
      const validTypes = ['number'];
      expect(isNumber(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isNull', () => {
    testTypes.forEach((test) => {
      const msg = `isNull on type(${test.type})`;
      const validTypes = ['null'];
      expect(isNull(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isUndefined', () => {
    testTypes.forEach((test) => {
      const msg = `isUndefined on type(${test.type})`;
      const validTypes = ['undefined'];
      expect(isUndefined(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isFunction', () => {
    testTypes.forEach((test) => {
      const msg = `isFunction on type(${test.type})`;
      const validTypes = ['function'];
      expect(isFunction(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isString', () => {
    testTypes.forEach((test) => {
      const msg = `isString on type(${test.type})`;
      const validTypes = ['string'];
      expect(isString(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isDate', () => {
    testTypes.forEach((test) => {
      const msg = `isDate on type(${test.type})`;
      const validTypes = ['date'];
      expect(isDate(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isSymbol', () => {
    testTypes.forEach((test) => {
      const msg = `isSymbol on type(${test.type})`;
      const validTypes = ['symbol'];
      expect(isSymbol(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isArguments', () => {
    testTypes.forEach((test) => {
      const msg = `isArguments on type(${test.type})`;
      const validTypes = ['arguments'];
      expect(isArguments(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isError', () => {
    testTypes.forEach((test) => {
      const msg = `isError on type(${test.type})`;
      const validTypes = ['error'];
      expect(isError(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isMap', () => {
    testTypes.forEach((test) => {
      const msg = `isMap on type(${test.type})`;
      const validTypes = ['map'];
      expect(isMap(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isWeakMap', () => {
    testTypes.forEach((test) => {
      const msg = `isWeakMap on type(${test.type})`;
      const validTypes = ['weakmap'];
      expect(isWeakMap(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isRegExp', () => {
    testTypes.forEach((test) => {
      const msg = `isRegExp on type(${test.type})`;
      const validTypes = ['regexp'];
      expect(isRegExp(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isSet', () => {
    testTypes.forEach((test) => {
      const msg = `isSet on type(${test.type})`;
      const validTypes = ['set'];
      expect(isSet(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });

  test('isPrimitive', () => {
    testTypes.forEach((test) => {
      const msg = `isPrimitive on type(${test.type})`;
      const validTypes = ['number', 'string', 'undefined', 'boolean', 'null', 'symbol', 'bigint'];
      expect(isPrimitive(test.val)).to.equal(validTypes.includes(test.type), msg);
    });
  });
});
