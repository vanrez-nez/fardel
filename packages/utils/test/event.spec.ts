import sinon from 'sinon';
import { test } from 'mocha';
import { expect } from 'chai';
import { EventEmitter } from '@fardel/utils';

describe('Utils/event', () => {
  test('EventEmitter', () => {
    {
      // Basic subscription
      const e = new EventEmitter();
      const call = sinon.fake();
      e.on('a', call);
      e.emit('a');
      e.emit('b');
      e.emit('a');
      expect(call.callCount).equal(2, 'Basic subscription');
    }

    {
      // Off w/ invalid subscription
      const e = new EventEmitter();
      expect(() => {
        e.off('a');
        e.off('foo');
        e.off('bar', () => 1);
      }).not.to.throw('Off w/ invalid subscription');
    }

    {
      // Multiple subscriptions with same callback
      const e = new EventEmitter();
      const call = sinon.fake();
      e.on('a', call);
      e.on('a', call);
      e.on('a', call);
      e.emit('a');
      expect(call.callCount).equal(1, 'Multiple subscriptions with same callback');
    }

    {
      // Once subscription w/ multiple calls
      const e = new EventEmitter();
      const call = sinon.fake();
      e.once('a', call);
      e.emit('a');
      e.emit('a');
      e.emit('a');
      expect(call.callCount).equal(1, 'Once subscription w/ multiple calls');
    }

    {
      // Once w/ multiple subscription
      const e = new EventEmitter();
      const call = sinon.fake();
      e.once('a', call);
      e.once('a', call);
      e.once('a', call);
      e.emit('a');
      e.emit('a');
      e.emit('a');
      expect(call.callCount).equal(1, 'Once w/ multiple subscription');
    }

    {
      // Should not call after global off
      const e = new EventEmitter();
      const c1 = sinon.fake();
      const c2 = sinon.fake();
      const c3 = sinon.fake();
      e.once('a', c1);
      e.on('b', c2);
      e.on('c', c3);
      e.off();
      e.emit('a');
      e.emit('b');
      e.emit('c');
      expect(c1.callCount).equal(0, 'Should not call after global off');
      expect(c2.callCount).equal(0, 'Should not call after global off');
      expect(c3.callCount).equal(0, 'Should not call after global off');
    }

  });
});
