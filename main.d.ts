
interface DLLNode {
  prev: DLLNode;
  next: DLLNode;
  value: any;
}

type Callback = (value: any) => any;
type Compare = (a: any, b: any) => number;
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
  [Symbol.iterator](): Iterator<any>
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
  [Symbol.iterator](): Iterator<any>
}
