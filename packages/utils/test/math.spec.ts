import { test } from 'mocha';
import { expect } from 'chai';
import { clamp } from '@fardel/utils';

describe('Utils/math', () => {
  test('clamp', () => {
    expect(clamp(0.5, 0, 1)).to.equal(0.5);
    expect(clamp(-1, 0, 1)).to.equal(0);
    expect(clamp(2, 0, 1)).to.equal(1);
    expect(clamp(2, 0, 0)).to.equal(0);
  });
});
