/*

Exercise 66.

Extra Challenge: Binary Search Tree - remove Exercise

Implement the following function on the BinarySearchTree class. insert is
implemented to help with testing.

remove

This function should remove a node from a binary search tree. Your remove
function should be able to handle removal of the root node, removal of a node
with one child and removal of a node with two children. The function should
return the node removed.

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

  insertArr(arr) {
    arr.forEach((val) => this.insert(val));
    return this;
  }

  // Find the parent of the node with this value
  // - Case 1: If node is a leaf (has no children), delete it
  // - Case 2: If node has only one child, swap with child, then delete new leaf
  // - Case 3: If node has two children
  //   - Find next largest (in=order successor). Will be the left-most in the right subtree
  //   - Remove it
  //   - Replace target node with removed node

  // prettier-ignore
  remove(target) {
    let current = this.root;
    let parent = null;

    // Loop until we either get current undefined, meaning the target was not
    // found, or until we find the target value
    while (current !== null && target !== current.value) {
      parent = current;
      if (target < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Target value was not found
    if (current === null) {
      return undefined;
    }

    // If here then we have found the node to remove.

    // It's a leaf
    if (current.left === null && current.right === null) {
      if (current === parent.left) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // Has only one child, on the left
    else if (current.right === null) {
      // Handle root first
      if (parent === null) {
        this.root = current.left
      }
      // Handle other internal nodes
      else if (current === parent.left) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }
    
    // Has only one child, on the right
    else if (current.left === null) {
      // Handle root first
      if (parent === null) {
        this.root = current.right
      } 
      // Handle other internal nodes
      else if (current === parent.left) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }
    
    // Has two children
    else if (current.left && current.right) {
      const [successor, successorParent] = this.findSuccessor(current);

      // Successor is right child (i.e. right child has no left)
      if (current.right.left === null) {
        if (parent === null) {
          this.root = successor
        }
        else if (current === parent.left) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
        successor.left = current.left;


      // Successor is in left subtree (i.e. right child does have a left)
      } else {
        if (parent === null) {
          this.root = successor
        }
        else if (current === parent.left) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
        successor.left = current.left;
        
        // We need to patch these connections, too.
        successorParent.left = successor.right;
        successor.right = current.right;
      }
    }
    return this;
  }

  // Method to find the in-order successor of a node to be deleted
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
tree.remove(50);
tree.root.right.value; // 20
tree.root.right.right; // null
tree.remove(5);
tree.root.left.left.value; // 1
tree.root.left.left.right; // null

var tree = new BinarySearchTree();
var input = [15, 20, 10, 12, 1, 5, 50];
tree.insertArr(input);
tree.remove(1);
tree.root.left.left.value; // 5
tree.root.left.left.left; // null
tree.root.left.left.right; // null
tree.remove(20);
tree.root.right.value; // 50
tree.root.right.right; // null
tree.root.right.left; // null

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
tree.remove(10);
tree.root.left.value; // 12
tree.root.left.left.value; // 1
tree.root.left.left.right.value; // 5
tree.remove(50);
tree.root.right.value; // 20
tree.root.right.right.value; // 60
tree.root.right.right.left.value; // 30
tree.root.right.right.right.value; // 70

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
tree.remove(85);
// tree.findSuccessor(tree.find(85)); // [88, 90]
tree.root.right.right.value; // 88
tree.root.right.right.left.value; // 66
tree.root.right.right.right.left.left.value; // 89

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
// tree.findSuccessor(tree.find(15)); // [16, 17]
// tree.findSuccessor(tree.find(10)); // [12, 10]
// tree.findSuccessor(tree.find(30)); // [35, 40]
// tree.findSuccessor(tree.find(20)); // [23, 25]
// tree.findSuccessor(tree.find(40)); // [42, 40]
tree.remove(15);
// tree.findSuccessor(tree.find(85)); // [88, 90]
tree.root.value; // 16
tree.root.right.value; // 30
tree.root.right.right.value; // 40
tree.root.right.left.value; // 20
tree.root.right.left.left.value; // 17
tree.root.right.left.left.left; // null
tree.root.right.left.left.right; // null
tree.remove(30);
// tree.findSuccessor(tree.find(85)); // [88, 90]
tree.root.value; // 15
tree.root.right.value; // 35
tree.root.right.right.value; // 40
tree.root.right.right.left.value; // 37
tree.root.right.right.left.left; // null
tree.root.right.right.left.right; // null
tree.root.right.left.value; // 20
tree.root.right.left.left.value; // 17

function inorder(node) {
  if (node !== null) {
    inorder(node.left);
    console.log(node.value + " ");
    inorder(node.right);
  }
}
