/*
Lecture 202.

A HashTable Class

Characteristics of a good hashing function:
- fast
- distribute keys uniformly
- deterministic

Collisions can be handled with
1. Separate chaining: storing multiple values at the same hash inside a nested data structure
2. Linear probing: when collision occurs look ahead for the next empty slot

Big O of Hash Tables
- Insert: O(1)
- Deletion: O(1)
- Access: O(1)

*/

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // 1. Accepts a key and a value
  // 2. Hashes the key
  // 3. Stores the key-value pair in the hash table array via separate chaining
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  // 1. Accepts a key
  // 2. Hashes the key
  // 3. Retrieves the key-value pair in the hash table
  // 4. Returns the value at that key
  // 5. If the key isn't found, returns undefined
  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  // 1. Loops through the hash table array and returns an array of keys in the table
  keys() {
    let keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return keysArr;
  }

  // 2. Loops through the hash table array and returns an array of values in the table
  values() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return valuesArr;
  }
}

const ht = new HashTable();
ht.set("hello world", "goodbye!!"); // 40
