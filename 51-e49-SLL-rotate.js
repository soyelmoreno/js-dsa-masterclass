/*

Exercise 49.

Extra Challenge: SLL - rotate Exercise

Implement the following on the SinglyLinkedList class

rotate

This function should rotate all the nodes in the list by some number passed in.
For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you rotate by 2,
the list should be modified to 3 -> 4 -> 5 -> 1 -> 2. The number passed in to
rotate can be any integer.

Time Complexity: O(N), where N is the length of the list.

Space Complexity: O(1)

Examples

(Note: push is implemented to help you test your rotate function)

var singlyLinkedList = new SinglyLinkedList;
singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25;
 
singlyLinkedList.rotate(3);
singlyLinkedList.head.val; // 20
singlyLinkedList.head.next.val; // 25
singlyLinkedList.head.next.next.val; // 5
singlyLinkedList.head.next.next.next.val; // 10
singlyLinkedList.head.next.next.next.next.val; // 15
singlyLinkedList.tail.val; // 15
singlyLinkedList.tail.next; // null
var singlyLinkedList = new SinglyLinkedList;
singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25;
 
singlyLinkedList.rotate(-1);
singlyLinkedList.head.val; // 25
singlyLinkedList.head.next.val; // 5
singlyLinkedList.head.next.next.val; // 10
singlyLinkedList.head.next.next.next.val; // 15
singlyLinkedList.head.next.next.next.next.val; // 20
singlyLinkedList.tail.val; // 20
singlyLinkedList.tail.next // null
var singlyLinkedList = new SinglyLinkedList;
singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25;
 
singlyLinkedList.rotate(1000);
singlyLinkedList.head.val; // 5
singlyLinkedList.head.next.val; // 10
singlyLinkedList.head.next.next.val; // 15
singlyLinkedList.head.next.next.next.val; // 20
singlyLinkedList.head.next.next.next.next.val; // 25
singlyLinkedList.tail.val; // 25
singlyLinkedList.tail.next // null

*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  rotate(num) {
    // Calculate the number of traversals to get to the node that will become
    // the new head
    const count = (num + this.length) % this.length;

    // If number of shifts would result in the same list, just return
    if (count === 0) return;

    // Store old head
    const oldHead = this.head;

    // Traverse to get to the node before the new head
    let before = oldHead;
    for (let i = 0; i < count - 1; i++) {
      before = before.next;
    }

    // Make new head be the head
    this.head = before.next;

    // Make the old tail point to the old head
    this.tail.next = oldHead;

    // Make `before` be the new tail (and set .next to null)
    before.next = null;
    this.tail = before;
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
}

// Examples:

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.rotate(3);
singlyLinkedList.print(); // [20, 25, 5, 10, 15]
singlyLinkedList.head.val; // 20
singlyLinkedList.tail.val; // 15
singlyLinkedList.tail.next; // null

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25;

singlyLinkedList.rotate(-1);
singlyLinkedList.print(); // [25, 5, 10, 15, 20]
singlyLinkedList.head.val; // 25
singlyLinkedList.tail.val; // 20
singlyLinkedList.tail.next; // null

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25;

singlyLinkedList.rotate(1000);
singlyLinkedList.print(); // [5, 10, 15, 20, 25]
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 25
singlyLinkedList.tail.next; // null

// 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50 -> 99 -> 132
// rotate(4)
// 25 -> 30 -> 50 -> 99 -> 132 -> 5 -> 10 -> 15 -> 20
var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25, 30, 50, 99, 132];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 132;

singlyLinkedList.rotate(4);
singlyLinkedList.print(); // [25, 30, 50, 99, 132, 5, 10, 15, 20]
singlyLinkedList.head.val; // 25
singlyLinkedList.tail.val; // 20
singlyLinkedList.tail.next; // null

// 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50 -> 99 -> 132
// rotate(-2)
// 99 -> 132 -> 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25, 30, 50, 99, 132];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 132;

singlyLinkedList.rotate(-2);
singlyLinkedList.print(); // [99, 132, 5, 10, 15, 20, 25, 30, 50]
singlyLinkedList.head.val; // 99
singlyLinkedList.tail.val; // 50
singlyLinkedList.tail.next; // null

// 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50 -> 99 -> 132
// rotate(14)
// 30 -> 50 -> 99 -> 132 -> 5 -> 10 -> 15 -> 20 -> 25

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25, 30, 50, 99, 132];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 132;

singlyLinkedList.rotate(14);
singlyLinkedList.print(); // [30, 50, 99, 132, 5, 10, 15, 20, 25]
singlyLinkedList.head.val; // 30
singlyLinkedList.tail.val; // 25
singlyLinkedList.tail.next; // null

// 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50 -> 99 -> 132
// rotate(18)
// 5 -> 10 -> 15 -> 20 -> 25 -> 30 -> 50 -> 99 -> 132

var singlyLinkedList = new SinglyLinkedList();
var input = [5, 10, 15, 20, 25, 30, 50, 99, 132];
input.forEach((val) => singlyLinkedList.push(val));
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 132;

singlyLinkedList.rotate(18);
singlyLinkedList.print(); // [5, 10, 15, 20, 25, 30, 50, 99, 132]
singlyLinkedList.head.val; // 5
singlyLinkedList.tail.val; // 132
singlyLinkedList.tail.next; // null
