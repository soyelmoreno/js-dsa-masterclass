/*

Lecture 173.

Tree traversal

Lecture 182: When to use BFS and DFS

Time complexity is the same. So it depends on the shape of the tree.

If it's a wide tree, BFS will use a lot of space, store lots of node in the
queue. But DFS will only store frames in the call stack. So DFS is better.

If it's a very tall, skinny tree, BFS will be better, because it will use less
space.

So pretty much: use breadth-first for tall, skinny trees, and depth-first for
wide trees.

Variants of DFS:

- Pre-order: clone or duplicate a tree. Or flatten it out, freeze-dry it, store
  it so that you can reconstruct the BST.

- Post-order: 

- In-order: visited nodes are in order.

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

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return this;
    } else {
      var current = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = new Node(value);
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = new Node(value);
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }

  // For commented version see 57-e66-bstRemove.js
  remove(target) {
    let current = this.root;
    let parent = null;

    while (current !== null && target !== current.value) {
      parent = current;
      if (target < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) {
      return undefined;
    }

    if (current.left === null && current.right === null) {
      if (current === parent.left) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.right === null) {
      if (parent === null) {
        this.root = current.left;
      } else if (current === parent.left) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      if (parent === null) {
        this.root = current.right;
      } else if (current === parent.left) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.left && current.right) {
      const [successor, successorParent] = this.findSuccessor(current);

      if (current.right.left === null) {
        if (parent === null) {
          this.root = successor;
        } else if (current === parent.left) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
        successor.left = current.left;
      } else {
        if (parent === null) {
          this.root = successor;
        } else if (current === parent.left) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
        successor.left = current.left;
        successorParent.left = successor.right;
        successor.right = current.right;
      }
    }
    return this;
  }

  // Method to find the in-order successor of a node to be deleted. Copied from
  // bstRemove.js
  findSuccessor(node) {
    let successor = node;
    let successorParent = node;
    let current = node.right;
    while (current) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }
    return [successor, successorParent];
  }

  // Helper function to populate tree from an array. Copied from bstRemove.js
  insertArr(arr) {
    arr.forEach((val) => this.insert(val));
    return this;
  }

  // Helper function to find the node with a target value. Copied from BinarySearchTree.js
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

  // Exercise 69.
  bfs() {
    const visited = [];
    const q = [];
    q.push(this.root);
    let first;
    while (q.length > 0) {
      first = q.shift();
      // Do work on the node
      visited.push(first.value);
      // Push child nodes to queue for next time
      if (first.left) q.push(first.left);
      if (first.right) q.push(first.right);
    }
    return visited;
  }

  // Exercise 70.
  dfsPreOrder() {
    function traverse(node) {
      // Do work on the node
      visited.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    const visited = [];
    traverse(this.root);
    return visited;
  }

  dfsPostOrder() {
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.value);
    }
    const visited = [];
    traverse(this.root);
    return visited;
  }

  dfsInOrder() {
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    }
    const visited = [];
    traverse(this.root);
    return visited;
  }
}

//        15
//      /    \
//    10      20
//   /  \       \
//  1    12      50
//   \
//    5
var tree = new BinarySearchTree();
var input = [15, 20, 10, 12, 1, 5, 50];
tree.insertArr(input);
tree.bfs(); // [15, 10, 20, 1, 12, 50, 5]
tree.dfsPreOrder(); // [15, 10, 1, 5, 12, 20, 50]
tree.dfsPostOrder(); // [5, 1, 12, 10, 50, 20, 15]
tree.dfsInOrder(); // [1, 5, 10, 12, 15, 20, 50]

//         15
//      /     \
//    10       20
//   /  \             \
//  1    12                 50
//   \                     /  \
//    5                  30    60
//                      /        \
//                    25          70
//                  /
//               23
//                 \
//                  24
var tree = new BinarySearchTree();
var input = [15, 20, 10, 12, 1, 5, 50, 60, 30, 25, 23, 24, 70];
tree.insertArr(input);
tree.bfs(); // [15, 10, 20, 1, 12, 50, 5, 30, 60, 25, 70, 23, 24]
tree.dfsPreOrder(); // [15, 10, 1, 5, 12, 20, 50, 30, 25, 23, 24, 60, 70]

//       22
//         \
//          49
//              \
//                  85
//                /         \
//             66                 95
//                              /    \
//                           90       100
//                        /    \
//                     88       93
//                       \
//                        89
var tree = new BinarySearchTree();
var input = [22, 49, 85, 66, 95, 90, 100, 88, 93, 89];
tree.insertArr(input);
tree.bfs(); // [22, 49, 85, 66, 95, 90, 100, 88, 93, 89]
tree.dfsPreOrder(); // [22, 49, 85, 66, 95, 90, 88, 89, 83, 100]

//              15
//         /            \
//     10                      30
//   /   \                  /       \
//  1     12             20             40
//   \      \          /    \        /    \
//    5      13      17      25   35       42
//                  /       /       \
//                 16     23         37
var tree = new BinarySearchTree();
var input = [15, 10, 30, 40, 12, 20, 1, 35, 13, 17, 25, 5, 42, 37, 16, 23];
tree.insertArr(input);
tree.bfs(); // [15, 10, 30, 1, 12, 20, 40, 5, 13, 17, 25, 35, 42, 16, 23, 37]
tree.dfsPreOrder(); // [15, 10, 1, 5, 12, 13, 30, 20, 17, 16, 25, 23, 40, 35, 37, 42]
