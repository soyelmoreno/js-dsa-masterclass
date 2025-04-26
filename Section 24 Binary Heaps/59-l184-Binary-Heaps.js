/*

Lecture 184.

Binary heaps.

A heap is a tree that follows one of these rules:
- All children must be smaller than their parent
- All children must be greater than their parent

A binary heap means there are at most two children for each node.

You can store a binary heap in an array, following a mathematical formula to get
from the parent to the child or from the child to the parent

- Given a parent index, children are at:
  - 2n + 1
  - zn + 2

- Given a child index, the parent index is at:
  - Math.floor((n - 1) / 2)

We usually remove the root, because we know it is the max (or min). That's the
whole reason why the values are stored in a heap.

Insertion: O(log n) ??? Removal: O(log n) ???
*/

class MaxBinaryHeap {
  constructor(arr = []) {
    this.values = arr;
  }

  // Exercise 71.
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this.values;
  }

  bubbleUp() {
    const arr = this.values;
    let index = arr.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (arr[parentIndex] < arr[index] && parentIndex >= 0) {
      [arr[parentIndex], arr[index]] = [arr[index], arr[parentIndex]];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  extractMax() {
    // 1. Grab value of the old root
    // 2. Pop the last value (~lowest) and set it as the first element
    // 3. Sink that lowest value down. Aka: Sink down, down-heap, bubble-down,
    //    percolate-down, sift-down, heapify-down, etc.
    // Start with this: [55, 39, 41, 18, 27, 12, 33]
    // End up with this: [41, 39, 33, 18, 27, 12]

    // Grab 55
    const max = this.values[0];
    // Pop the end, leaving this: [55, 39, 41, 18, 27, 12]
    const end = this.values.pop();
    // If empty, we're done. But if not empty, set the first element, and
    // heapify
    if (this.values.length > 0) {
      // Set the first, leaving this: [33, 39, 41, 18, 27, 12]
      // Heapify the rest, leaving this: [ 41, 39, 33, 18, 27, 12 ]
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
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
        if (leftChild > element) {
          indexLarger = leftChildIndex;
        }
      }

      if (rightChildIndex < arr.length) {
        rightChild = arr[rightChildIndex];
        if (
          (indexLarger === null && rightChild > element) ||
          (indexLarger !== null && rightChild > leftChild)
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

  insertArr(arr) {
    arr.forEach((val) => this.insert(val));
    return this;
  }
}

var heap = new MaxBinaryHeap([41, 39, 33, 18, 27, 12]);
heap.insertArr([55, 1, 45, 199]);
heap.values; // [199, 55, 41, 39, 45, 12, 33,  1, 18, 27]

var heap = new MaxBinaryHeap();
heap.insertArr([41, 39, 33, 18, 27, 12, 55]);
heap.values; // [55, 39, 41, 18, 27, 12, 33]
heap.extractMax(); // 55
heap.values; // [41, 39, 33, 18, 27, 12]
