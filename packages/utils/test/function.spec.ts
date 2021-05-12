import sinon from 'sinon';
import { test } from 'mocha';
import { expect } from 'chai';
import { memoize, MemoizeCacheKey } from '@fardel/utils';

describe('Utils/function', () => {
  let SysClock: sinon.SinonFakeTimers;

  before(() => {
    SysClock = sinon.useFakeTimers();
  });

  after(() => {
    SysClock.restore();
  });

  test('memoize', () => {
    function fn(a: number, b: number, c = 0) {
      return Math.max(a, b, c);
    }
    const memoizedFn = memoize(fn);
    expect(fn(1, 2)).equal(memoizedFn(1, 2), 'Results on memoized function and original functions should equal');
    expect(fn).not.equal(memoizedFn, 'Should be different functions');
    expect(memoizedFn(2, 1)).equals(memoizedFn(2, 1), 'Results on memoized functions should equal');

    // Providing own cache system
    function getCache() {
      type TReturn = ReturnType<typeof fn>;
      const m = new Map<MemoizeCacheKey, TReturn>();
      let _gets = 0;
      let _sets = 0;
      return {
        get sets() {
          return _sets
        },
        get gets() {
          return _gets
        },
        reset: () => {
          m.clear();
          _gets = 0;
          _sets = 0
        },
        methods: {
          get: (k: MemoizeCacheKey) => {
            _gets++;
            return m.get(k) as TReturn
          },
          set: (k: MemoizeCacheKey, v: number) => {
            _sets++
            return m.set(k, v)
          },
          has: (k: MemoizeCacheKey) => m.has(k)
        }
      }
    }

    const cache = getCache();
    const mFuncA = memoize(fn, { cache: cache.methods })
    const sampleArguments = [[1, 2, 3], [3, 2, 1], [Math.PI/2, Math.PI/3, Math.PI/4]];
    const sampleResults = [3, 3, Math.PI / 2];
    for (let i = 0; i < 50; i++) {
      sampleArguments.forEach((a, index) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(mFuncA(a[0]!, a[1]!, a[2])).equal(sampleResults[index]);
      })
    }
    expect(cache.gets).equal(50 * 3, 'Cache Hits');
    expect(cache.sets).equal(3, 'Cache Sets');

    // Handle once param
    cache.reset();
    const mFuncB = memoize((x: number) => {
      return Math.random() + x;
    }, { once: true, cache: cache.methods });

    const rnd = mFuncB(0); // +1 get call
    for (let i = 0; i < 10; i++) {
      mFuncB(i); // +11 get calls
    }
    expect(cache.gets).equal(11, 'All gets from cache');
    expect(cache.sets).equal(1, 'Only one allocation');
    expect(rnd).equal(mFuncB(Math.random()), 'Only one call to func, no re-eval from changing params');

    // Handle Objects via JSON.Stringify
    cache.reset();
    const mFuncC = memoize(({ a, b, c }: { a: number, b: number, c: number }) => {
      return Math.max(a, b, c);
    });
    expect(mFuncC({ a: 1, b: 2, c: 3 })).equal(mFuncC({ a: 1, b: 2, c: 3 }), 'Equal object params via JSON.stringify');
  });

  test('debounce', () => {
    // TODO: basic tests
    expect(0).eq(0);
  });

  test('throttle', () => {
    // TODO: basic tests
    expect(0).eq(0);
  });

});
