# Linked lists

## SLL

- Simple SLL with tail and size.
  
```ts
class SLL {
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
```

- Self Adjusted, when node accessed by seach move it to the head
  
```ts
class AdjustedSLL {
  unshift(value: any): SLLNode;
  shift(): any;
  delete(node: SLLNode): boolean;
  search(value: any): SLLNode | null;
  reset(): void;
  [Symbol.iterator](): Iterator<SLLNode>;
}
```

## DLL
- Sentinel Circular uses additional dummy node to prevent cheking for empty nodes
```ts
class SentinelCircularDLL {
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
```
- Sorted Sentinel, uses compare function to sort the node when inserted

```ts
class SortedDLL {
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
```
