'use strict';

class AdjustedSLL {
  #head = null;

  unshift(value) {
    const node = { value, next: null };
    if (this.#head === null) return this.#head = node;
    node.next = this.#head;
    this.#head = node;
    return node;
  }

  shift() {
    if (this.#head === null) return null;
    const node = this.#head;
    this.#head = node.next;
    return node.value;
  }

  delete(node) {
    if (this.#head === null) return false;
    let pointer = this.#head;
    while (pointer !== null) {
      if (node === pointer.next) {
        pointer.next = node.next;
        return true;
      }
      pointer = pointer.next;
    }
    return false;
  }

  search(value) {
    if (this.#head === null) return null;
    let pointer = this.#head;
    let prev = null;
    while (pointer !== null) {
      if (pointer.value === value) {
        if (pointer === this.#head) return pointer;
        prev.next = pointer.next;
        pointer.next = this.#head;
        this.#head = pointer;
        return pointer;
      }
      prev = pointer;
      pointer = pointer.next;
    }
    return null;
  }

  reset() {
    this.#head = null;
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