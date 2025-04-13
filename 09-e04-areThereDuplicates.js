/*
Coding Exercise 4.

Frequency Counter / Multiple Pointers - areThereDuplicates

Implement a function called, areThereDuplicates which accepts a variable number
of arguments, and checks whether there are any duplicates among the arguments
passed in.  You can solve this using the frequency counter pattern OR the
multiple pointers pattern.

Examples:

areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true 

Restrictions:
- Time - O(n)
- Space - O(n)

Bonus:
- Time - O(n log n)
- Space - O(1)
*/

// Approach 1: use a set
function areThereDuplicates_SET(...args) {
  const seen = new Set();
  for (const arg of args) {
    if (seen.has(arg)) {
      return true;
    } else {
      seen.add(arg);
    }
  }
  return false;
}

// Approach 1b: use a set, one liner!
function areThereDuplicates_SET_ONELINE(...args) {
  return new Set(args).size !== args.length;
}

// Approach 2: frequency counter (from DSA course solution)
function areThereDuplicates_FREQ() {
  let collection = {};
  for (let val in arguments) {
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
  }
  for (let key in collection) {
    if (collection[key] > 1) return true;
  }
  return false;
}

// Approach 2: sort first, then and iterate
function areThereDuplicates(...args) {
  // For all integers use this sorting function
  // const sorted = args.sort((a, b) => a - b);
  // For mixed strings and integers, convert all to string, then sort
  const argsStr = args.map((x) => x.toString());
  const sorted = argsStr.sort();

  let i = 0;
  for (let j = 1; j < sorted.length; j++) {
    if (sorted[i] === sorted[j]) {
      return true;
    } else {
      i++;
    }
  }
  return false;
}

areThereDuplicates(3, 2, 1); // false
areThereDuplicates(1, 4, 5, 8, 8, 2, 3); // true
areThereDuplicates(9, 12, 15, 17, 17, 10, 11); // true
areThereDuplicates("a", "b", "c", "a"); // true
