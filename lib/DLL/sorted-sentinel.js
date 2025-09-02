'use strict';

class SortedDLL {
  #head = null;
  #tail = null;
  #compare = null;

  constructor(compare = (a, b) => a - b) {
    this.reset();
    this.#compare = compare;
  }

  reset() {
    const sentinel = { value: null, next: null, prev: null };
    sentinel.next = sentinel.prev = sentinel;
    this.#head = this.#tail = sentinel;
  }

  insert(value) {
    const node = { value, prev: null, next: null };
    if (this.#head.next === this.#head) {
      this.#head.next = this.#tail.prev = node;
      node.next = this.#tail;
      node.prev = this.#head;
      return node;
    }
    let slow = this.#head.next;
    while (slow !== this.#head) {
      if (this.#compare(slow.value, value) > 0) {
        node.next = slow;
        node.prev = slow.prev;
        slow.prev.next = node;
        slow.prev = node;
        return node;
      }
      slow = slow.next;
    }
    node.prev = this.#tail.prev;
    this.#tail.prev = node;
    node.next = this.#tail;
    node.prev.next = node;
    return node;
  }

  pop() {
    if (this.#head.next === this.#head) return null;
    const node = this.#tail.prev;
    this.#tail.prev = this.#tail.prev.prev;
    this.#tail.prev.next = this.#tail;
    return node.value;
  }

  shift() {
    if (this.#head.next === this.#head) return null;
    const node = this.#head.next;
    this.#head.next = this.#head.next.next;
    this.#head.next.prev = this.#head;
    return node.value;
  }

  delete(value) {
    if (this.#head.next === this.#head) return false;
    const node = this.find(value);
    if (node === null) return false;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = null;
    node.prev = null;
    return true;
  }

  has(value) {
    if (this.find(value) === null) return false;
    return true;
  }

  find(value) {
    let slow = this.#head.next;
    while (slow !== this.#head) {
      if (slow.value === value) return slow;
      slow = slow.next;
    }
    return null;
  }

  backward(callback) {
    let slow = this.#tail.prev;
    while (slow !== this.#tail) {
      callback(slow.value);
      slow = slow.prev;
    }
  }

  forward(callback) {
    let slow = this.#head.next;
    while (slow !== this.#head) {
      callback(slow.value);
      slow = slow.next;
    }
  }

  [Symbol.iterator]() {
    const head = this.#head;
    let slow = head.next;
    return {
      next() {
        if (slow === head) return { done: true };
        const data = { value: slow.value, done: false };
        slow = slow.next;
        return data;
      }
    }
  }
}

module.exports = SortedDLL;