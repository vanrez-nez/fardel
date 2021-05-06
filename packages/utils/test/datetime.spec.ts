/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import sinon from 'sinon';
import { test } from 'mocha';
import { expect } from 'chai';
import { Clock } from '@fardel/utils';

describe('Utils/datetime', () => {
  let SysClock: sinon.SinonFakeTimers;

  before(() => {
    SysClock = sinon.useFakeTimers();
  });

  after(() => {
    SysClock.restore();
  });

  test('clock', () => {
    const clk = new Clock();
    SysClock.tick(100);
    expect(clk.getDelta()).equal(0, 'Should be 0 if clock is not running');
    expect(clk.getElapsedTime()).equal(0, 'Should be 0 if clock is not running');
    clk.start();
    SysClock.tick(100);
    expect(clk.getDelta()).equal(100, 'Should get elapsed ms from start');
    SysClock.tick(100);
    expect(clk.getDelta()).equal(100, 'Should get elapsed ms from last call');
    expect(clk.getElapsedTime()).equal(200, 'Should get total elapsed time');
    SysClock.tick(100);
    clk.stop();
    expect(clk.getElapsedTime()).equal(300, 'Should keep elapsed time');
    clk.start();
    expect(clk.getDelta()).equal(0, 'Should restart counters');
    expect(clk.getElapsedTime()).equal(0, 'Should restart counters');

    // Auto start
    const clk2 = new Clock(true);
    expect(clk2.getDelta()).equal(0, 'Should start clock if autostart is setted');
    SysClock.tick(100);
    expect(clk2.getDelta()).equal(100, 'Should autostart since prev call');
  });
});
