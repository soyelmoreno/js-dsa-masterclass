/*
Exercise 34.

Insertion Sort

Can be good as an "online algorithm". I.e., it works as your data is coming in.
Doesn't have to all be present for sorting to work.

Write a function insertionSort that takes an array and sorts the values. 

The function takes an optional second parameter which is a comparator function.
The comparator function is a callback that will take two values from the array
to be compared. The function returns a negative value if the first value is less
than the second, a positive value if the first value is greater than the second,
and 0 if both values are equal. The default comparator you provide should assume
that the two parameters are numbers and that we are sorting the values from
smallest to largest.

Here's some guidance for how insertion sort should work:

- Start by picking the second element in the array (we will assume the first
  element is the start of the "sorted" portion)
- Now compare the second element with the one before it and swap if necessary.
- Continue to the next element and if it is in the incorrect order, iterate
  through the sorted portion to place the element in the correct place.
- Repeat until the array is sorted.

Implement insertion sort. Your function should accept an array and return an
array of sorted values.

Examples

insertionSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
insertionSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
insertionSort([1, 2, 3]); // [1, 2, 3]
insertionSort([]);
 
var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
insertionSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
 
var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
 
function strComp(a, b) {
  if (a < b) { return -1;}
  else if (a > b) { return 1;}
  return 0;
}
 
insertionSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
 
var moarKittyData = [{
  name: "LilBub",
  age: 7
}, {
  name: "Garfield",
  age: 40
}, {
  name: "Heathcliff",
  age: 45
}, {
  name: "Blue",
  age: 1
}, {
  name: "Grumpy",
  age: 6
}];
 
function oldestToYoungest(a, b) {
  return b.age - a.age;
}
 
insertionSort(moarKittyData, oldestToYoungest); // sorted by age in descending order

*/

function insertionSort(arr, comparator) {
  if (typeof comparator !== "function") {
    comparator = function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  for (let i = 1; i < arr.length; i++) {
    const currentVal = arr[i];
    let j = i - 1;
    // Normal, using "greater than"
    // while (j >= 0 && arr[j] > currentVal) {
    // Now use the custom comparator function
    while (j >= 0 && comparator(arr[j], currentVal) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
  }

  return arr;
}

insertionSort([5, 2, 8, 3, 9, 1]); // [1, 2, 3, 5, 8,9]
insertionSort([2, 1, 9, 76, 4]); // [1, 2, 9, 76, 4]
insertionSort([3, 44, 38, 5, 47, 15]); // [3, 5, 15, 38, 44, 47]
insertionSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
insertionSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
insertionSort([1, 2, 3]); // [1, 2, 3]
insertionSort([]);

var nums = [
  4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342,
  32,
];
insertionSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strComp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

insertionSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [
  {
    name: "LilBub",
    age: 7,
  },
  {
    name: "Garfield",
    age: 40,
  },
  {
    name: "Heathcliff",
    age: 45,
  },
  {
    name: "Blue",
    age: 1,
  },
  {
    name: "Grumpy",
    age: 6,
  },
];

function oldestToYoungest(a, b) {
  return b.age - a.age;
}

insertionSort(moarKittyData, oldestToYoungest); // sorted by age in descending order
