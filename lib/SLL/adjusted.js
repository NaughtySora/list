'use strict';

class AdjustedSLL {
  #head = null;

  constructor() {
    this.reset();
  }

  unshift(value) {
    const node = { value, next: this.#head.next };
    this.#head.next = node;
    return node;
  }

  shift() {
    const node = this.#head.next;
    this.#head.next = node.next;
    return node.value;
  }

  delete(node) {
    let pointer = this.#head.next;
    while (pointer !== null) {
      if (node === pointer.next) break;
      pointer = pointer.next;
    }
    pointer.next = node.next;
  }

  search(value) {
    let prev = this.#head;
    while (prev !== null) {
      if (prev.next.value === value) break;
      prev = prev.next;
    }
    const node = prev.next;
    prev.next = node.next;
    node.next = this.#head.next;
    this.#head.next = node;
    return node;
  }

  reset() {
    const node = { value: null, next: null };
    this.#head = node.next = node;
  }

  [Symbol.iterator]() {
    let pointer = this.#head;
    return {
      next() {
        if (pointer === null) return { done: true };
        const data = { value: pointer.value, done: false, };
        pointer = pointer.next;
        return data;
      }
    }
  }
}

module.exports = AdjustedSLL;