import { test } from 'mocha';
import { expect } from 'chai';
import { capitalize, camelize, hyphenate } from '@fardel/utils';

describe('Utils/string', () => {
  test('capitalize', () => {
    expect(capitalize('asd')).to.equal('Asd');
    expect(capitalize('')).to.equal('');
  });

  test('camelize', () => {
    expect(camelize('foo-bar')).to.equal('fooBar');
  });

  test('hyphenate', () => {
    expect(hyphenate('fooBar')).to.equal('foo-bar');
  });

});
