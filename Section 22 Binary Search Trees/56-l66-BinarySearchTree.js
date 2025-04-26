/*

Lecture 166.

*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Exercise 64.
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Exercise 65.
  find(target) {
    if (this.root === null) return undefined;
    let current = this.root;
    while (current) {
      if (target === current.value) return current;
      if (target < current.value) {
        if (current.left === null) return undefined;
        current = current.left;
      } else {
        if (current.right === null) return undefined;
        current = current.right;
      }
    }
  }
}

//        10
//      /    \
//    7        15
//     \
//      9
var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(15);
tree.insert(7);
tree.insert(9);
tree.root.left.value; // 7
tree.root.right.value; // 15
tree.root.left.right.value; // 9

//         10
//      /      \
//    5         13
//   / \       /  \
//  2   7    11    16
var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(13);
tree.insert(5);
tree.insert(7);
tree.insert(2);
tree.insert(16);
tree.insert(11);
tree.root.left.value; // 5
tree.root.right.value; // 13
tree.root.left.left.value; // 2
tree.root.left.right.value; // 7
tree.root.right.left.value; // 11
tree.root.right.right.value; // 16

tree.find(6); // undefined
tree.find(7); // Node { value: 7, left: null, right: null }
tree.find(13);
// Node {
//   value: 13,
//   left: Node { value: 11, left: null, right: null },
//   right: Node { value: 16, left: null, right: null }
// }
