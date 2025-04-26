/*

Lecture 184.

Priority queues.

Can implemented using a MaxBinaryHeap. But just for variety we'll implement a
MinBinaryHeap. In hospitals, and in Unix processes, a lower priority must be
served first.

And instead of just storing numbers we'll store nodes with these properties:
- value
- priority

*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    const arr = this.values;
    let index = arr.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (
      parentIndex >= 0 &&
      arr[parentIndex].priority > arr[index].priority
    ) {
      [arr[parentIndex], arr[index]] = [arr[index], arr[parentIndex]];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  // For commented version see "extractMax" in l184-Binary-heaps.js
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    const arr = this.values;
    let index = 0;
    const element = arr[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild;
      let rightChild;
      let indexLarger = null;

      if (leftChildIndex < arr.length) {
        leftChild = arr[leftChildIndex];
        if (leftChild.priority < element.priority) {
          indexLarger = leftChildIndex;
        }
      }

      if (rightChildIndex < arr.length) {
        rightChild = arr[rightChildIndex];
        if (
          (indexLarger === null && rightChild.priority < element.priority) ||
          (indexLarger !== null && rightChild.priority < leftChild.priority)
        ) {
          indexLarger = rightChildIndex;
        }
      }

      if (indexLarger === null) break;
      arr[index] = arr[indexLarger];
      arr[indexLarger] = element;
      index = indexLarger;
    }
  }

  // insertArr(arr) {
  //   arr.forEach((val) => this.enqueue(val));
  //   return this;
  // }
}

// Let's say we're in the hospital emergency room (ER)
var er = new PriorityQueue();
er.enqueue("common cold", 5);
er.enqueue("gunshot wound", 1);
er.enqueue("high fever", 4);
er.enqueue("broken arm", 2);
er.enqueue("glass in foot", 3);
er.dequeue(); // "gunshot wound", 1
er.dequeue(); // "broken arm", 2
er.dequeue(); // "glass in foot", 3
er.dequeue(); // "high fever", 4
er.dequeue(); // "common cold", 5
er.dequeue(); // undefined
