
interface DLLNode {
  prev: DLLNode;
  next: DLLNode;
  value: any;
}

type Callback = (value: any) => any;

export class SentinelCircularDLL {
  push(value: any): DLLNode;
  pop(): null | any;
  unshift(value: any): DLLNode;
  shift(): null | any;
  before(node: DLLNode, value: any): DLLNode | null;
  after(node: DLLNode, value: any): DLLNode | null;
  delete(node: DLLNode): boolean;
  search(value: any): null | DLLNode;
  forward(callback: Callback): null | DLLNode;
  backward(callback: Callback): null | DLLNode;
  makeFirst(node: DLLNode): void;
  makeLast(node: DLLNode): void;
  reset(): void;
  [Symbol.iterator](): Iterator<any>
  size: number;
}
