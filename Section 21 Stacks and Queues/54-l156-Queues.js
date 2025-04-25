/*

Lecture 156.

Queues

Can be implemented in many ways. Just has to follow FIFO.

Array with push/shift works, but shift takes too long

Array with unshift/pop works, but unshift takes too long.

And array is a little heavy handed. We don't actually need to random access by
index that arrays give us. And we certainly don't need all the array methods
that are available. So just use a linked list.

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Exercise 61.
  // Like push() from SLL. Add onto the end.
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  // Exercise 62.
  // Like shift() from SLL. Remove from the beginning.
  // Identical code to pop() from Stack.
  dequeue() {
    if (!this.first) return null;

    var temp = this.first;
    if (this.size === 1) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }

  print() {
    const result = [];
    let current = this.first;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    console.log(result);
  }
}

var queue = new Queue();
queue.enqueue(78);
queue.enqueue(99);
queue.enqueue(23);
queue.print();
queue.dequeue();
queue.print();
