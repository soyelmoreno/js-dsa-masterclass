/*

Lecture 152.

Stacks

Can be implemented in many ways. Just has to follow LIFO.

Array with push/pop works.

Array with unshift/shift works, but takes too long.

But array is a little heavy handed. We don't actually need to random access by
index that arrays give us. And we certainly don't need all the array methods
that are available. So just use a linked list.

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Exercise 59.
  // Like unshift() from SLL. Add onto the beginning.
  push(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }

  // Exercise 60.
  // Like shift() from SLL. Remove from the beginning.
  pop() {
    if (!this.first) return null;
    const oldFirst = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = oldFirst.next;
    }
    this.size--;
    return oldFirst.val;
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

var queue = new Stack();
queue.push(78);
queue.push(99);
queue.push(23);
queue.print();
queue.pop();
queue.print();
