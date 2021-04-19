import { test } from 'mocha';
import { expect } from 'chai';
import { get } from '@fardel/utils';

const obj = {
  a: false,
  b: {
    foo: {
      bar: 'bar',
    }
  },
};

describe('Utils/object', () => {
  test('get', () => {
    expect(get(null, 'x', 0)).to.equals(0);
    expect(get(undefined, 'x', 1)).to.equals(1);
    expect(get([], 'length')).to.equals(0);
    expect(get(obj, 'a', true)).to.equals(false);
    expect(get(obj, 'a.c.d', -1)).to.equals(-1);
    expect(get(obj, 'a.b.c', -1)).to.equals(-1);
    expect(get(obj, 'a.b.c')).to.equals(undefined);
    expect(get(obj, 'b.foo.bar')).to.equals('bar');
  });
});
