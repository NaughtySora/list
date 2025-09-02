'use strict';

const assert = require("node:assert");
const { describe, it, beforeEach } = require("node:test");
const { misc } = require("naughty-util");
const SentinelCircularDLL = require("../lib/DLL/circular-sentinel.js");
const SortedDLL = require("../lib/DLL/sorted-sentinel.js");
const AdjustedSLL = require("../lib/SLL/adjusted.js");
const SLL = require("../lib/SLL/sll.js");

describe('CSDLL', () => {
  it('push/pop', () => {
    const list = new SentinelCircularDLL();
    list.push(1);
    assert.strictEqual(list.size, 1);
    list.push(2);
    assert.strictEqual(list.size, 2);
    list.push(3);
    assert.strictEqual(list.size, 3);
    const n = list.pop();
    assert.strictEqual(n, 3);
    assert.strictEqual(list.size, 2);
    const n2 = list.pop();
    assert.strictEqual(n2, 2);
    assert.strictEqual(list.size, 1);
    const n3 = list.pop();
    assert.strictEqual(n3, 1);
    assert.strictEqual(list.size, 0);
    const n4 = list.pop();
    assert.strictEqual(n4, null);
    assert.strictEqual(list.size, 0);
    const n5 = list.pop();
    assert.strictEqual(n5, null);
    assert.strictEqual(list.size, 0);
    const n6 = list.pop();
    assert.strictEqual(n6, null);
    assert.strictEqual(list.size, 0);
    list.push(42);
    assert.strictEqual(list.size, 1);
    const n8 = list.pop();
    assert.strictEqual(n8, 42);
    assert.strictEqual(list.size, 0);
    const n9 = list.pop();
    assert.strictEqual(n9, null);
    assert.strictEqual(list.size, 0);
  });

  it('unshift/shift', () => {
    const list = new SentinelCircularDLL();
    list.unshift(1);
    assert.strictEqual(list.size, 1);
    list.unshift(2);
    assert.strictEqual(list.size, 2);
    list.unshift(3);
    assert.strictEqual(list.size, 3);
    const n = list.shift();
    assert.strictEqual(n, 3);
    assert.strictEqual(list.size, 2);
    const n2 = list.shift();
    assert.strictEqual(n2, 2);
    assert.strictEqual(list.size, 1);
    const n3 = list.shift();
    assert.strictEqual(n3, 1);
    assert.strictEqual(list.size, 0);
    const n4 = list.shift();
    assert.strictEqual(n4, null);
    assert.strictEqual(list.size, 0);
    const n5 = list.shift();
    assert.strictEqual(n5, null);
    assert.strictEqual(list.size, 0);
    const n6 = list.shift();
    assert.strictEqual(n6, null);
    assert.strictEqual(list.size, 0);
    list.unshift(42);
    assert.strictEqual(list.size, 1);
    const n8 = list.shift();
    assert.strictEqual(n8, 42);
    assert.strictEqual(list.size, 0);
    const n9 = list.shift();
    assert.strictEqual(n9, null);
    assert.strictEqual(list.size, 0);
  });

  it('[Symbol.iterator]', () => {
    const list = new SentinelCircularDLL();
    [7, 2, 5].forEach(v => list.unshift(v));
    assert.deepStrictEqual([...list], [5, 2, 7]);
  });

  it('before', () => {
    const list = new SentinelCircularDLL();
    list.unshift(1);
    assert.strictEqual(list.size, 1);
    const node = list.unshift(2);
    assert.strictEqual(list.size, 2);
    list.unshift(3);
    assert.strictEqual(list.size, 3);
    list.before(node, 42);
    assert.strictEqual(list.size, 4);
    const node2 = list.pop();
    const node3 = list.pop();
    const node4 = list.pop();
    assert.strictEqual(node2, 1);
    assert.strictEqual(node3, 2);
    assert.strictEqual(node4, 42);
    assert.strictEqual(list.size, 1);
    const node5 = list.shift();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(node5, 3);
  });

  it('after', () => {
    const list = new SentinelCircularDLL();
    list.unshift(1);
    assert.strictEqual(list.size, 1);
    const node = list.unshift(2);
    assert.strictEqual(list.size, 2);
    list.unshift(3);
    assert.strictEqual(list.size, 3);
    list.after(node, 42);
    assert.strictEqual(list.size, 4);
    const node2 = list.pop();
    const node3 = list.pop();
    const node4 = list.pop();
    assert.strictEqual(node2, 1);
    assert.strictEqual(node3, 42);
    assert.strictEqual(node4, 2);
    assert.strictEqual(list.size, 1);
    const node5 = list.shift();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(node5, 3);
  });

  it('delete', () => {
    {
      const list = new SentinelCircularDLL();
      list.push(1);
      const node = list.push(2);
      list.push(3);
      assert.strictEqual(list.delete(node), true);
      assert.strictEqual(list.size, 2);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.size, 0);
    }
    {
      const list = new SentinelCircularDLL();
      const node2 = list.push(42);
      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.delete(node2), true);
      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.delete(node2), false);
    }
  });

  it('search', () => {
    const list = new SentinelCircularDLL();
    let target;
    for (const i of misc.range(255)) {
      const value = misc.random(1000);
      if (i === 42) target = value
      list.push(value);
    }
    const node = list.search(target);
    assert.strictEqual(node.value, target);
    const node2 = list.search('a');
    assert.strictEqual(node2, null);
  });

  it('forward', () => {
    const list = new SentinelCircularDLL();
    for (const _ of misc.range(25)) {
      list.push(misc.random(1000));
    }
    const expected = [];
    list.forward(value => expected.push(value));
    assert.deepStrictEqual([...list], expected);
  });

  it('backward', () => {
    const list = new SentinelCircularDLL();
    for (const _ of misc.range(25)) {
      list.push(misc.random(1000));
    }
    const expected = [];
    list.backward(value => expected.push(value));
    assert.deepStrictEqual([...list].reverse(), expected);
  });

  describe('makeFirst', () => {
    it('simple', () => {
      const list = new SentinelCircularDLL();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      assert.deepStrictEqual(list.size, 4);
      assert.strictEqual(list.pop(), 4);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.deepStrictEqual(list.size, 0);
      list.push(1);
      list.push(2);
      const node = list.push(3);
      list.push(4);
      assert.deepStrictEqual(list.size, 4);
      list.makeFirst(node);
      assert.deepStrictEqual(list.size, 4);
      assert.strictEqual(list.pop(), 4);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.pop(), 3);
      assert.deepStrictEqual(list.size, 0);
    });

    it('makeFirst on head node should keep order', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(1);
      list.push(2);
      list.push(3);

      list.makeFirst(n1);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.size, 0);
    });

    it('makeFirst on tail node should rotate list', () => {
      const list = new SentinelCircularDLL();
      list.push(1);
      list.push(2);
      const n3 = list.push(3);

      list.makeFirst(n3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.size, 0);
    });

    it('makeFirst in the middle should reorder correctly', () => {
      const list = new SentinelCircularDLL();
      list.push(10);
      const n20 = list.push(20);
      list.push(30);
      list.push(40);

      list.makeFirst(n20);
      assert.strictEqual(list.pop(), 40);
      assert.strictEqual(list.pop(), 30);
      assert.strictEqual(list.pop(), 10);
      assert.strictEqual(list.pop(), 20);
      assert.strictEqual(list.size, 0);
    });

    it('makeFirst repeatedly should cycle nodes correctly', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(1);
      const n2 = list.push(2);
      const n3 = list.push(3);

      list.makeFirst(n2);
      list.makeFirst(n3);
      list.makeFirst(n1);

      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.size, 0);
    });

    it('makeFirst two nodes', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(1);
      const n2 = list.push(2);
      list.makeFirst(n2);
      list.makeFirst(n1);
      list.makeFirst(n2);
      list.makeFirst(n1);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.size, 0);
    });

    it('makeFirst on single-element list should be safe', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(42);

      list.makeFirst(n1);
      list.makeFirst(n1);
      assert.strictEqual(list.pop(), 42);
      assert.strictEqual(list.pop(), null);
      assert.strictEqual(list.size, 0);
    });
  });

  describe('makeLast', () => {
    it('tail node should keep order', () => {
      const list = new SentinelCircularDLL();
      list.push(1);
      list.push(2);
      const n3 = list.push(3);

      list.makeLast(n3);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.size, 0);
    });

    it(' head node should move to tail', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(1);
      list.push(2);
      list.push(3);
      list.makeLast(n1);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.size, 0);
    });

    it('the middle should reorder correctly', () => {
      const list = new SentinelCircularDLL();
      list.push(10);
      const n20 = list.push(20);
      list.push(30);
      list.push(40);
      list.makeLast(n20);
      assert.strictEqual(list.pop(), 20);
      assert.strictEqual(list.pop(), 40);
      assert.strictEqual(list.pop(), 30);
      assert.strictEqual(list.pop(), 10);
      assert.strictEqual(list.size, 0);
    });

    it('should cycle nodes correctly', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(1);
      const n2 = list.push(2);
      const n3 = list.push(3);
      list.makeLast(n2);
      list.makeLast(n3);
      list.makeLast(n1);
      assert.strictEqual(list.pop(), 1);
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.pop(), 2);
      assert.strictEqual(list.size, 0);
    });

    it('single-element list should be safe', () => {
      const list = new SentinelCircularDLL();
      const n1 = list.push(42);
      list.makeLast(n1);
      assert.strictEqual(list.pop(), 42);
      assert.strictEqual(list.size, 0);
    });
  });

  it('reset', () => {
    const list = new SentinelCircularDLL();
    list.push(1);
    list.push(2);
    assert.strictEqual(list.size, 2);
    list.reset();
    assert.strictEqual(list.size, 0);
  });
});

describe('SortedDLL', () => {
  let list;

  beforeEach(() => {
    list = new SortedDLL((a, b) => a - b);
  });

  it('insert maintains sorted order', () => {
    list.insert(5);
    list.insert(1);
    list.insert(3);
    assert.deepStrictEqual([...list], [1, 3, 5]);
  });

  it('pop', () => {
    [10, 5, 20].forEach(v => list.insert(v));
    assert.strictEqual(list.pop(), 20);
    assert.deepStrictEqual([...list], [5, 10]);
    assert.strictEqual(list.pop(), 10);
    assert.strictEqual(list.pop(), 5);
  });

  it('shift', () => {
    [10, 5, 20].forEach(v => list.insert(v));
    assert.strictEqual(list.shift(), 5);
    assert.deepStrictEqual([...list], [10, 20]);
    assert.strictEqual(list.shift(), 10);
    assert.strictEqual(list.shift(), 20);
    assert.strictEqual(list.shift(), null);
  });

  describe('delete', () => {
    it('valid flow', () => {
      [1, 2, 3, 4].forEach(v => list.insert(v));
      const removed = list.delete(3);
      assert.strictEqual(removed, true);
      assert.deepStrictEqual([...list], [1, 2, 4]);
    });

    it('delete returns false if value not found', () => {
      [1, 2, 3].forEach(v => list.insert(v));
      assert.strictEqual(list.delete(99), false);
      assert.deepStrictEqual([...list], [1, 2, 3]);
      assert.deepStrictEqual((list.delete(2), [...list]), [1, 3]);
      assert.deepStrictEqual((list.delete(1), [...list]), [3]);
      assert.deepStrictEqual((list.delete(3), [...list]), []);
      assert.deepStrictEqual((list.delete(3), [...list]), []);
    });
  });

  it('find', () => {
    [10, 20, 30].forEach(v => list.insert(v));
    assert.strictEqual(list.find(20).value, 20);
    assert.strictEqual(list.find(33), null);
  });

  describe('has', () => {
    it('value exists', () => {
      [5, 10].forEach(v => list.insert(v));
      assert.strictEqual(list.has(10), true);
    });

    it('value doesn\'t exists', () => {
      [5, 10].forEach(v => list.insert(v));
      assert.strictEqual(list.has(99), false);
    });
  });

  it('forward', () => {
    [3, 1, 2].forEach(v => list.insert(v));
    const values = [];
    list.forward(v => values.push(v));
    assert.deepStrictEqual(values, [1, 2, 3]);
  });

  it('backward', () => {
    [3, 1, 2].forEach(v => list.insert(v));
    const values = [];
    list.backward(v => values.push(v));
    assert.deepStrictEqual(values, [3, 2, 1]);
  });

  it('[Symbol.iterator]', () => {
    [7, 2, 5].forEach(v => list.insert(v));
    const collected = [];
    for (const v of list) {
      collected.push(v);
    }
    assert.deepStrictEqual(collected, [2, 5, 7]);
  });

  it('edge cases', () => {
    assert.strictEqual(list.pop(), null);
    assert.strictEqual(list.shift(), null);
    assert.strictEqual(list.find(1), null);
    assert.strictEqual(list.delete(1), false);
    assert.strictEqual(list.has(1), false);
    assert.deepStrictEqual([...list], []);
  });
});

describe('SLL adjusted', () => {
  it('shift/unshift', () => {
    const list = new AdjustedSLL();
    list.unshift(1);
    list.unshift(2);
    assert.strictEqual(list.shift(), 2);
    assert.strictEqual(list.shift(), 1);
    assert.strictEqual(list.shift(), null);
    assert.strictEqual(list.shift(), null);
    list.unshift(2);
    assert.strictEqual(list.shift(), 2);
    assert.strictEqual(list.shift(), null);
    assert.strictEqual(list.shift(), null);
  });

  it('delete', () => {
    const list = new AdjustedSLL();
    list.unshift(1);
    const node = list.unshift(2);
    list.unshift(3);
    list.unshift(4);
    assert.strictEqual(list.delete(node), true);
    list.unshift(42);
    assert.deepStrictEqual([...list], [42, 4, 3, 1]);
    list.shift();
    list.shift();
    list.shift();
    list.shift();
    assert.strictEqual(list.shift(), null);
    assert.strictEqual(list.shift(), null);
    assert.strictEqual(list.delete(node), false);
  });

  describe('search', () => {
    it('empty', () => {
      const list = new AdjustedSLL();
      assert.strictEqual(list.search(42), null);
    });

    it('one', () => {
      const list = new AdjustedSLL();
      list.unshift(1);
      assert.strictEqual(list.search(1).value, 1);
      assert.strictEqual(list.search(2), null);
    });

    it('adjusting', () => {
      const list = new AdjustedSLL();
      list.unshift(1);
      list.unshift(2);
      list.unshift(3);
      list.unshift(4);
      list.unshift(5);
      list.unshift(6);
      list.unshift(7);
      const four = list.search(4);
      assert.strictEqual(four.value, 4);
      assert.strictEqual(list.shift(), four.value);
      const six = list.search(6);
      assert.strictEqual(six.value, 6);
      assert.strictEqual(list.shift(), six.value);
      const three = list.search(3);
      assert.strictEqual(three.value, 3);
      assert.strictEqual(list.shift(), three.value);
      assert.strictEqual(list.shift(), 7);
      assert.strictEqual(list.shift(), 5);
      assert.strictEqual(list.shift(), 2);
      assert.strictEqual(list.shift(), 1);
      assert.strictEqual(list.shift(), null);
    })
  });

  it('[Symbol.iterator]', () => {
    const list = new AdjustedSLL();
    list.unshift(1);
    list.unshift(2);
    list.unshift(3);
    list.unshift(4);
    list.unshift(42);
    const expected = [42, 4, 3, 2, 1];
    assert.deepStrictEqual([...list], expected);
  });
});

describe("SSL", () => {
  it("unshift/shift", () => {
    const list = new SLL();
    const node = list.unshift(1);
    assert.strictEqual(list.size, 1);
    const node2 = list.unshift(2);
    assert.strictEqual(list.size, 2);
    const node3 = list.unshift(3);
    assert.strictEqual(list.size, 3);
    assert.deepStrictEqual(list.shift(), node3);
    assert.deepStrictEqual(list.size, 2);
    assert.deepStrictEqual(list.shift(), node2);
    assert.deepStrictEqual(list.size, 1);
    assert.deepStrictEqual(list.shift(), node);
    assert.deepStrictEqual(list.size, 0);
    assert.deepStrictEqual(list.shift(), null);
    assert.deepStrictEqual(list.size, 0);
  });

  it("push/pop", () => {
    const list = new SLL();
    const node = list.push(1);
    assert.strictEqual(list.size, 1);
    const node2 = list.push(2);
    assert.strictEqual(list.size, 2);
    const node3 = list.push(3);
    assert.strictEqual(list.size, 3);
    assert.deepStrictEqual(list.pop(), node3);
    assert.strictEqual(list.size, 2);
    assert.deepStrictEqual(list.pop(), node2);
    assert.strictEqual(list.size, 1);
    assert.deepStrictEqual(list.pop(), node);
    assert.strictEqual(list.size, 0);
    assert.deepStrictEqual(list.pop(), null);
    assert.strictEqual(list.size, 0);
    assert.deepStrictEqual(list.pop(), null);
    assert.strictEqual(list.size, 0);
  });

  it("delete", () => {
    const list = new SLL();
    const node = list.push(1);
    const node2 = list.unshift(2);
    const node3 = list.push(3);
    const node4 = list.unshift(4);
    const node5 = list.push(5);
    assert.deepStrictEqual([...list], [4, 2, 1, 3, 5]);
    assert.strictEqual(list.size, 5);
    list.delete(node4);
    assert.deepStrictEqual([...list], [2, 1, 3, 5]);
    assert.strictEqual(list.size, 4);
    list.delete(node3);
    assert.deepStrictEqual([...list], [2, 1, 5]);
    assert.strictEqual(list.size, 3);
    list.delete(node5);
    assert.deepStrictEqual([...list], [2, 1]);
    assert.strictEqual(list.size, 2);
    list.delete(node2);
    assert.deepStrictEqual([...list], [1]);
    assert.strictEqual(list.size, 1);
    list.delete(node);
    assert.deepStrictEqual([...list], []);
    assert.strictEqual(list.size, 0);
    const deleted = list.delete(node);
    assert.strictEqual(deleted, false);
    assert.strictEqual(list.size, 0);
  });

  describe("search", () => {
    it('empty', () => {
      const list = new SLL();
      assert.deepStrictEqual(list.search(42), null);
      const node = list.push(1);
      assert.deepStrictEqual(list.search(1), node);
      list.shift();
      assert.deepStrictEqual(list.search(1), null);
    });

    it('with items', () => {
      const list = new SLL();
      const node = list.push(1);
      const node2 = list.unshift(2);
      const node3 = list.push(3);
      const node4 = list.unshift(4);
      const node5 = list.push(5);
      assert.deepStrictEqual(list.search(5), node5);
      assert.deepStrictEqual(list.search(4), node4);
      assert.deepStrictEqual(list.search(2), node2);
      assert.deepStrictEqual(list.search(1), node);
      assert.deepStrictEqual(list.search(3), node3);
      assert.deepStrictEqual(list.search(42), null);
    })

  });

  it("reverse", () => {
    const list = new SLL();
    const node = list.push(1);
    const node2 = list.push(3);
    const node3 = list.push(5);
    list.reverse();
    assert.strictEqual(list.pop(), node);
    assert.strictEqual(list.pop(), node2);
    assert.strictEqual(list.pop(), node3);
  });

  it("concat", () => {
    it('with items', () => {
      const list = new SLL();
      list.push(1);
      list.push(3);
      list.push(5);
      const list2 = new SLL();
      list2.push(42);
      list2.push(69);
      list.concat(list2);
      assert.strictEqual(list.size, 5);
      assert.strictEqual(list.shift().value, 1);
      assert.strictEqual(list.shift().value, 3);
      assert.strictEqual(list.shift().value, 5);
      assert.strictEqual(list.shift().value, 42);
      assert.strictEqual(list.shift().value, 69);
    });

    it('empty base', () => {
      const list = new SLL();
      const list2 = new SLL();
      list2.push(42);
      list2.push(69);
      list.concat(list2);
      assert.strictEqual(list.size, 2);
      assert.strictEqual(list.shift().value, 42);
      assert.strictEqual(list.shift().value, 69);
    });

    it('empty list arg', () => {
      const list = new SLL();
      list.push(1);
      list.push(3);
      list.push(5);
      const list2 = new SLL();
      list.concat(list2);
      assert.strictEqual(list.size, 3);
      assert.strictEqual(list.shift().value, 1);
      assert.strictEqual(list.shift().value, 3);
      assert.strictEqual(list.shift().value, 5);
    });
  });

  describe("merge", () => {
    it('presorted - ideal', () => {
      const list = new SLL();
      list.push(-2);
      list.push(1);
      list.push(5);
      list.push(42);
      const list2 = new SLL();
      list2.push(3);
      list2.push(69);
      list2.push(333);
      const merged = list.merge(list2);
      assert.strictEqual(merged.size, 7);
      assert.strictEqual(merged.shift().value, -2);
      assert.strictEqual(merged.shift().value, 1);
      assert.strictEqual(merged.shift().value, 3);
      assert.strictEqual(merged.shift().value, 5);
      assert.strictEqual(merged.shift().value, 42);
      assert.strictEqual(merged.shift().value, 69);
      assert.strictEqual(merged.shift().value, 333);
    });
    it('empty a, b presorted', () => {
      const list = new SLL();
      const list2 = new SLL();
      list2.push(3);
      list2.push(69);
      list2.push(333);
      const merged = list.merge(list2);
      assert.strictEqual(merged.size, 3);
      assert.strictEqual(merged.shift().value, 3);
      assert.strictEqual(merged.shift().value, 69);
      assert.strictEqual(merged.shift().value, 333);
    });
    it('empty b, a presorted', () => {
      const list = new SLL();
      list.push(-2);
      list.push(1);
      list.push(5);
      list.push(42);
      const list2 = new SLL();
      const merged = list.merge(list2);
      assert.strictEqual(merged.size, 4);
      assert.strictEqual(merged.shift().value, -2);
      assert.strictEqual(merged.shift().value, 1);
      assert.strictEqual(merged.shift().value, 5);
      assert.strictEqual(merged.shift().value, 42);
    });
    it('empty a & b', () => {
      const list = new SLL();
      const list2 = new SLL();
      const merged = list.merge(list2);
      assert.strictEqual(merged.size, 0);
      assert.strictEqual(merged.shift(), null);
      assert.strictEqual(merged.shift(), null);
    });
  });

  describe('mergeSort', () => {
    it('empty', () => {
      const list = new SLL();
      const merged = list.mergeSort();
      assert.strictEqual(merged.size, 0);
      assert.strictEqual(merged.shift(), null);
      assert.strictEqual(merged.shift(), null);
    });
    it('one', () => {
      const list = new SLL();
      list.push(42);
      const merged = list.mergeSort();
      assert.strictEqual(merged.size, 1);
      assert.strictEqual(merged.shift().value, 42);
      assert.strictEqual(merged.shift(), null);
      assert.strictEqual(merged.shift(), null);
    });
    it('two', () => {
      const list = new SLL();
      list.push(42);
      list.push(33);
      const merged = list.mergeSort();
      assert.strictEqual(merged.size, 2);
      assert.strictEqual(merged.shift().value, 33);
      assert.strictEqual(merged.shift().value, 42);
      assert.strictEqual(merged.shift(), null);
      assert.strictEqual(merged.shift(), null);
    });
    it('not empty', () => {
      const list = new SLL();
      list.push(42);
      list.push(-2);
      list.push(1);
      list.push(69);
      list.push(5);
      list.push(333);
      list.push(3);
      const merged = list.mergeSort();
      assert.strictEqual(merged.size, 7);
      assert.strictEqual(merged.shift().value, -2);
      assert.strictEqual(merged.shift().value, 1);
      assert.strictEqual(merged.shift().value, 3);
      assert.strictEqual(merged.shift().value, 5);
      assert.strictEqual(merged.shift().value, 42);
      assert.strictEqual(merged.shift().value, 69);
      assert.strictEqual(merged.shift().value, 333);
      assert.strictEqual(merged.size, 0);
    });
  });

  it('clear', () => {
    const list = new SLL();
    list.push(1);
    list.push(2);
    assert.strictEqual(list.size, 2);
    list.clear();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(list.pop(), null);
  });

  describe('cut', () => {
    it('long', () => {
      const list = new SLL();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);
      list.push(6);
      list.push(7);
      assert.strictEqual(list.size, 7);
      list.cut(3);
      assert.strictEqual(list.size, 4);
      assert.strictEqual(list.pop().value, 4);
      assert.strictEqual(list.pop().value, 3);
      assert.strictEqual(list.pop().value, 2);
      assert.strictEqual(list.pop().value, 1);
    });

    it('empty', () => {
      const list = new SLL();
      list.cut(3);
    });

    it('one', () => {
      const list = new SLL();
      list.push(42);
      list.cut(3);
      assert.strictEqual(list.size, 0);
    });

    it('one/cut-one', () => {
      const list = new SLL();
      list.push(42);
      list.cut(1);
      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.pop(), null);
    });

    it('even', () => {
      const list = new SLL();
      list.push(42);
      list.push(43);
      assert.strictEqual(list.size, 2);
      list.cut(1);
      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.pop().value, 42);
    });
  });

  describe('remove Nth', () => {
    it('remove from empty list', () => {
      const list = new SLL();
      list.remove(1);
      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.pop(), null);
    });

    it('single element, valid n', () => {
      const list = new SLL();
      list.push(42);
      list.remove(1);
      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.pop(), null);
    });

    it('single element, invalid n', () => {
      const list = new SLL();
      list.push(42);
      list.remove(2);
      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.pop().value, 42);
    });

    it('remove head', () => {
      const list = new SLL();
      [1, 2, 3, 4].forEach(v => list.push(v));
      list.remove(4);
      assert.strictEqual(list.size, 3);
      assert.deepStrictEqual([...list], [2, 3, 4]);
    });

    it('remove tail', () => {
      const list = new SLL();
      [1, 2, 3, 4].forEach(v => list.push(v));
      list.remove(1);
      assert.strictEqual(list.size, 3);
      assert.deepStrictEqual([...list], [1, 2, 3]);
    });

    it('remove middle element', () => {
      const list = new SLL();
      [1, 2, 3, 4, 5].forEach(v => list.push(v));
      list.remove(3);
      assert.strictEqual(list.size, 4);
      assert.deepStrictEqual([...list], [1, 2, 4, 5]);
    });

    it('n larger than size', () => {
      const list = new SLL();
      [10, 20, 30].forEach(v => list.push(v));
      list.remove(5);
      assert.strictEqual(list.size, 3);
      assert.deepStrictEqual([...list], [10, 20, 30]);
    });

    it('massive random removals', () => {
      const N = 1000;
      const list = new SLL();
      for (let i = 1; i <= N; i++) list.push(i);
      for (let i = N; i > 0; i--) {
        list.remove(Math.floor(Math.random() * i) + 1);
      }
      assert.strictEqual(list.size, 0);
    });
  });

  describe('palindrome', () => {
    it('empty list', () => {
      const list = new SLL();
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('single element list', () => {
      const list = new SLL();
      list.push(42);
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('two elements palindrome', () => {
      const list = new SLL();
      list.push(1);
      list.push(1);
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('two elements non-palindrome', () => {
      const list = new SLL();
      list.push(1);
      list.push(2);
      assert.strictEqual(list.isPalindrome(), false);
    });

    it('odd-length palindrome', () => {
      const list = new SLL();
      [1, 2, 1].forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('even-length palindrome', () => {
      const list = new SLL();
      [1, 2, 2, 1].forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('odd-length non-palindrome', () => {
      const list = new SLL();
      [1, 2, 3].forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), false);
    });

    it('even-length non-palindrome', () => {
      const list = new SLL();
      [1, 2, 3, 4].forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), false);
    });

    it('large palindrome', () => {
      const list = new SLL();
      const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
      arr.forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), true);
    });

    it('large non-palindrome', () => {
      const list = new SLL();
      const arr = [1, 2, 3, 4, 5, 0, 3, 2, 1];
      arr.forEach(n => list.push(n));
      assert.strictEqual(list.isPalindrome(), false);
    });

    it('list is restored after check', () => {
      const arr = [1, 2, 3, 2, 1];
      const list = new SLL();
      arr.forEach(n => list.push(n));
      list.isPalindrome();
      const result = [];
      while (list.size > 0) result.push(list.pop().value);
      assert.deepStrictEqual(result.reverse(), arr);
    });
  });

  it("middle", () => {
    const list = new SLL();
    assert.deepStrictEqual(list.middle, null);
    const node = list.push(1);
    assert.deepStrictEqual(list.middle, node);
    const node2 = list.push(3);
    assert.deepStrictEqual(list.middle, node);
    const node3 = list.push(5);
    assert.deepStrictEqual(list.middle, node2);
    list.push(42);
    assert.deepStrictEqual(list.middle, node2);
    list.push(69);
    assert.deepStrictEqual(list.middle, node3);
  });

  it("[Symbol.iterator]", () => {
    const list = new SLL();
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    list.push(5);
    assert.deepStrictEqual([...list], [1, 2, 3, 4, 5]);

    const list2 = new SLL();
    list2.push(1);
    list2.unshift(2);
    list2.push(3);
    list2.unshift(4);
    list2.push(5);
    assert.deepStrictEqual([...list2], [4, 2, 1, 3, 5]);
  });
});