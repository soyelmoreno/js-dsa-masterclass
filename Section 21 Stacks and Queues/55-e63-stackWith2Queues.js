/*

Exercise 63.

Stack with 2 Queues - Exercise

Implement a stack using two queues:

You should implement the following functions:

- push (returns the stack)

- pop (returns the value popped)

Analyze your time complexity for all of these operations:

var s = new Stack()
s.push(10).push(20).push(30)
s.pop() // 30
s.pop() // 20
s.pop() // 10
s.pop() // null
s.push(30).push(40).push(50)
s.pop() // 50
s.push(60)
s.pop() // 60

*/

class Stack {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
  }

  push(val) {
    this.q1.enqueue(val);
    return this;
  }

  pop() {
    while (this.q1.size > 1) {
      this.q2.enqueue(this.q1.dequeue());
    }
    const removed = this.q1.dequeue();
    [this.q1, this.q2] = [this.q2, this.q1];
    return removed;
  }
}

// QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(data) {
    var node = new Node(data);

    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }

    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;

    var temp = this.first;
    if (this.first == this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

var s = new Stack();
s.push(10).push(20).push(30);
s.pop(); // 30
s.pop(); // 20
s.pop(); // 10
s.pop(); // null
s.push(30).push(40).push(50);
s.pop(); // 50
s.push(60);
s.pop(); // 60
