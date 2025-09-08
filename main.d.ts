
interface DLLNode {
  prev: DLLNode;
  next: DLLNode;
  value: any;
}

interface SLLNode {
  next: SLLNode;
  value: any;
}

type Callback = (value: any) => any;
type Compare<N> = (a: N, b: N) => number;

export class SentinelCircularDLL {
  push(value: any): DLLNode;
  pop(): null | any;
  unshift(value: any): DLLNode;
  shift(): null | any;
  before(node: DLLNode, value: any): DLLNode | null;
  after(node: DLLNode, value: any): DLLNode | null;
  delete(node: DLLNode): boolean;
  search(value: any): null | DLLNode;
  forward(callback: Callback): void;
  backward(callback: Callback): void;
  makeFirst(node: DLLNode): void;
  makeLast(node: DLLNode): void;
  reset(): void;
  [Symbol.iterator](): Iterator<DLLNode>
  size: number;
}

export class SortedDLL {
  constructor(compare: Compare);
  reset(): void;
  insert(value: any): DLLNode;
  pop(): null | any;
  shift(): null | any;
  delete(value: any): boolean;
  has(value: any): boolean;
  find(value: any): null | DLLNode;
  forward(callback: Callback): void;
  backward(callback: Callback): void;
  [Symbol.iterator](): Iterator<DLLNode>
}

export class AdjustedSLL {
  unshift(value: any): SLLNode;
  shift(): any;
  delete(node: SLLNode): boolean;
  search(value: any): SLLNode | null;
  reset(): void;
  [Symbol.iterator](): Iterator<SLLNode>;
}

export class SLL {
  push(value: any): SLLNode;
  pop(): null | SLLNode;
  unshift(value: any): SLLNode;
  shift(): null | SLLNode;
  delete(node: SLLNode): boolean;
  search(value: any): SLL | null;
  reverse(): this;
  concat(list: SLL): this;
  merge(list: SLL, cmp?: Compare<SLLNode>): SLL;
  mergeSort(compare: Compare<SLLNode>): this;
  clear(): this;
  cut(from: number): this;
  remove(n: number): this;
  isPalindrome(): boolean;
  [Symbol.iterator](): Iterator<SLLNode>
  size: number;
  middle: SLLNode;
}
