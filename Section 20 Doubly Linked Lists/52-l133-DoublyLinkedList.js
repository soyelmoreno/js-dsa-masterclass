/*

Lecture 133.

Doubly linked list

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Exercise 50.
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // Exercise 51.
  pop() {
    if (!this.head) return;
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  // Exercise 52.
  shift() {
    if (!this.head) return;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // Exercise 53.
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }

  print() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    console.log(result);
  }

  // Exercise 54.
  get(index) {
    if (index < 0 || index >= this.length) return null;

    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current;
  }

  // Exercise 55.
  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  // Exercise 56.
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);

    const newNode = new Node(val);
    const before = this.get(index - 1);
    const after = before.next;

    before.next = newNode; //1
    newNode.prev = before; //2
    newNode.next = after; //3
    after.prev = newNode; //4

    this.length++;
    return true;
  }

  // Exercise 57.
  remove(index) {
    if (index < 0 || index >= this.length) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removed = this.get(index);
    const before = removed.prev;
    const after = removed.next;

    before.next = after;
    after.prev = before;
    removed.next = null;
    removed.prev = null;

    this.length--;
    return removed;
  }

  // Exercise 58.
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    let after;
    let before = null;
    while (current) {
      after = current.next;
      current.next = before;
      current.prev = after;
      before = current;
      current = after;
    }
    return this;
  }
}

// var first = new Node(12);
// first.next = new Node(13);
// first.next.prev = first;

var list = new DoublyLinkedList();
var input = ["HELLO", "GOODBYE", 99, "BOB", "LOU", "JULIO"];
input.forEach((val) => list.push(val));
list.print();
list.get(2).val; // 99
list.get(3).val; // "BOB"
list.get(4).val; // "LOU"

var list = new DoublyLinkedList();
var input = ["HELLO", "GOODBYE", 99, "BOB", "LOU", "JULIO", "MATT"];
input.forEach((val) => list.push(val));
list.print();
list.get(2).val; // 99
list.get(3).val; // "BOB"
list.get(4).val; // "LOU"
list.get(5).val; // "JULIO"

var list = new DoublyLinkedList();
var input = ["HELLO", "GOODBYE", 99, "BOB", "LOU", "JULIO"];
input.forEach((val) => list.push(val));
list.print();
list.insert(2, "REALLY");
list.print(); // ["HELLO", "GOODBYE", "REALLY", 99, "BOB", "LOU", "JULIO"]
list.get(2).next.val; // 99
list.get(2).prev.val; // "GOODBYE"
list.get(1).next.val; // "REALLY"
list.get(3).prev.val; // "REALLY"

var list = new DoublyLinkedList();
var input = ["HELLO", "GOODBYE", 99, "BOB", "LOU", "JULIO"];
input.forEach((val) => list.push(val));
list.print();
list.set(2, "REALLY");
list.print(); // ["HELLO", "GOODBYE", "REALLY", "BOB", "LOU", "JULIO"]
list.get(2).next.val; // "BOB""
list.get(2).prev.val; // "GOODBYE"
list.get(1).next.val; // "REALLY"
list.get(3).prev.val; // "REALLY"
list.set(-1, "GOOD"); // false
list.set(40, "GOOD"); // false

var doublyLinkedList = new DoublyLinkedList();
var input = [5, 10, 15, 20];
input.forEach((val) => doublyLinkedList.push(val));
doublyLinkedList.print();
doublyLinkedList.set(0, 10); // true
doublyLinkedList.length; // 4
doublyLinkedList.head.val; // 10
doublyLinkedList.print(); // [10, 10, 15, 20]

doublyLinkedList.set(10, 10); // false

doublyLinkedList.set(2, 100); // true
doublyLinkedList.head.next.next.val; // 100

var list = new DoublyLinkedList();
var input = ["HELLO", "GOODBYE", 99, "BOB", "LOU", "JULIO"];
input.forEach((val) => list.push(val));
list.print();
list.reverse();
list.print(); // ["JULIO", "LOU", "BOB", 99, "GOODBYE", "HELLO"]
list.get(2).val; // "BOB""
list.get(2).next.val; // 99
list.get(2).prev.val; // "LOU"
list.get(3).next.val; // "GOODBYE"
list.tail.val; // "HELLO"
list.tail.prev.val; // "GOODBYE"
list.head.val; // "JULIO"
list.head.next.val; // "LOU"
