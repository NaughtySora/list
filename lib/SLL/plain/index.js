'use strict';

const compare = (a, b) => a - b;

class SLL {
  #head = null;
  #tail = null;
  #size = 0;

  push(value) {
    const node = { value, next: null };
    if (this.#tail === null) this.#head = node;
    else this.#tail.next = node;
    this.#tail = node;
    this.#size++;
    return node;
  }

  pop() {
    const head = this.#head;
    if (head === null) return null;
    if (head.next === null) {
      this.#tail = this.#head = null;
      this.#size = 0;
      return head;
    }
    let node = head;
    const tail = this.#tail;
    while (node.next !== tail) node = node.next;
    this.#tail = node;
    node.next = null;
    this.#size--;
    return tail;
  }

  unshift(value) {
    const node = { value, next: null };
    if (this.#head === null) this.#tail = node;
    else node.next = this.#head;
    this.#head = node;
    this.#size++;
    return node;
  }

  shift() {
    if (this.#head === null) return null;
    const head = this.#head;
    const next = head.next;
    this.#head = next;
    head.next = null;
    if (this.#head === null) this.#tail = null;
    this.#size--;
    return head;
  }

  delete(node) {
    if (this.#size === 0) return false;
    if (node === this.#head) return (this.shift(), true);
    const prev = this.#prev(node);
    if (prev === null) return false;
    prev.next = node.next;
    node.next = null;
    if (node === this.#tail) this.#tail = prev;
    this.#size--;
    return true;
  }

  search(value) {
    let node = this.#head;
    while (true) {
      if (node.value === value) return node;
      if (node.next === null) return null;
      node = node.next;
    }
  }

  toArray() {
    const array = new Array(this.#size);
    let next = this.#head;
    for (let i = 0; i < this.#size; i++) {
      array[i] = next.value;
      next = next.next;
    }
    return array;
  }

  reverse() {
    let node = this.#head;
    if (node === null || node.next === null) return this;
    let prev = null;
    this.#tail = this.#head;
    while (node !== null) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    this.#head = prev;
    return this;
  }

  concat(list) {
    this.#tail.next = list.#head;
    this.#tail = list.#tail;
    this.#size += list.#size;
    list.#head = list.#tail = null;
    list.#size = 0;
    return this;
  }

  merge(list, cmp = compare) {
    const result = new SLL();
    let a = this.#head;
    let b = list.#head;
    while (a !== null && b !== null) {
      const factor = cmp(a.value, b.value);
      if (factor <= 0) (result.push(a.value), a = a.next);
      else (result.push(b.value), b = b.next);
    }
    let rest = a !== null ? a : b;
    while (rest !== null) (result.push(rest.value), rest = rest.next);
    return result;
  }

  mergeSort(compare) {
    this.#head = SLL.#sort(this.#head, compare);
    let node = this.#head;
    while (node.next !== null) node = node.next;
    this.#tail = node;
    return this;
  }

  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
    return this;
  }

  cut(from) {
    if (this.#head === null || from <= 0) return this;
    if (from >= this.#size) return this.clear();
    let pointer = this.#head
    let target = this.#head;
    while (pointer.next !== null) {
      pointer = pointer.next;
      if (from !== 0) (this.#size--, from--);
      else target = target.next;
    }
    this.#tail = target;
    target.next = null;
    return this;
  }

  remove(n) {
    if (this.#head === null || n <= 0) return this;
    if (this.#head.next == null && n === 1) return this.clear();
    let fast = this.#head;
    let target = this.#head;
    let prev = null;
    while (fast !== null) {
      fast = fast.next;
      if (n !== 0) n--;
      else (prev = target, target = target.next);
    }
    if (n !== 0) return this;
    if (prev === null) {
      this.#head = this.#head.next;
      this.#size--;
      return;
    }
    prev.next = target.next;
    if (target.next === null) this.#tail = prev;
    this.#size--;
    return this;
  }

  isPalindrome() {
    if (this.#head === null || this.#head.next === null) return true;
    let right = this.#head;
    let fast = this.#head.next.next;
    while (fast !== null) {
      right = right.next;
      fast = fast?.next?.next ?? null;
    }
    let head = this.#reverseSubList(right.next);
    let start = this.#head;
    let end = head;
    let equal = true;
    while (end !== null && start !== null) {
      if (end.value !== start.value) {
        equal = false;
        break;
      }
      end = end.next;
      start = start.next;
    }
    this.#tail = head;
    this.#reverseSubList(head);
    this.#tail.next = null;
    return equal;
  }

  #reverseSubList(list) {
    let head = null;
    while (list !== null) {
      const next = list.next;
      list.next = head;
      head = list;
      list = next;
    }
    return head;
  }

  #prev(target) {
    let node = this.#head;
    while (true) {
      if (node.next === target) return node;
      if (node.next === null) return null;
      node = node.next;
    }
  }

  static #sort(head, compare) {
    if (head === null || head.next === null) return head;
    let slow = head;
    let fast = head.next;
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    const right = slow.next;
    slow.next = null;
    return SLL.#merge(
      SLL.#sort(head, compare),
      SLL.#sort(right, compare),
      compare,
    );
  }

  static #merge(a, b, cmp = compare) {
    if (!a) return a;
    if (!b) return b;
    const result = new SLL();
    while (a !== null && b !== null) {
      const factor = cmp(a.value, b.value);
      if (factor <= 0) (result.push(a.value), a = a.next);
      else (result.push(b.value), b = b.next);
    }
    let rest = a !== null ? a : b;
    while (rest !== null) (result.push(rest.value), rest = rest.next);
    return result.#head;
  }

  [Symbol.iterator]() {
    let fast = this.#head;
    return {
      next() {
        if (fast === null) return { done: true };
        const data = { value: fast.value, done: false, };
        fast = fast.next;
        return data;
      }
    }
  }

  get size() {
    return this.#size;
  }

  get middle() {
    let slow = this.#head;
    if (slow === null || slow.next === null) return slow;
    let fast = slow.next.next;
    while (fast !== null) {
      slow = slow.next;
      fast = fast?.next?.next ?? null;
    }
    return slow;
  }
}

module.exports = SLL;