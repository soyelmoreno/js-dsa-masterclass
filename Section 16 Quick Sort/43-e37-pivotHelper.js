/*
Exercise 37.

Sorting Exercise - pivot helper

In this exercise, your goal is to implement a function called pivot. This
function contains nearly all of the logic you'll need in order to implement
Quick Sort in the next exercise.

The pivot function is responsible for taking an array, setting the pivot value,
and mutating the array so that all values less than the pivot wind up to the
left of it, and all values greater than the pivot wind up to the right of it.
It's also helpful if this helper returns the index of where the pivot value
winds up.

For example, if we decide the pivot will always be the first element in the
array, it should behave in the following way:

var arr = [4, 2, 5, 3, 6];
pivot(arr); // 2
arr; // [3, 2, 4, 5, 6];

In this code, the specifics of how the arr variable gets mutated are not
important. All that matters is that 4 winds up at index 2, with 3 and 2 to the
left of it (in any order), and with 5 and 6 to the right of it (in any order).

Hint: When we get to Quick Sort, it will be helpful for the pivot helper to
accept not only an array and an optional comparator, but also an optional start
and end index. These should default to 0 and the array length minus 1,
respectively. We've provided these to you in the starter code, but their utility
may not be apparent yet. That's okay! When you get to implementing Quick Sort,
their usefulness will become clearer.
*/

// First time, very simple. Start at 0. No comparator.
function pivot1(arr) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivotVal = arr[0];
  let swapIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivotVal) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, 0, swapIdx);
  return swapIdx;
}

// Add start parameter
function pivot2(arr, start = 0) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivotVal = arr[start];
  let swapIdx = 0;
  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i] < pivotVal) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}

var arr = [4, 2, 5, 3, 6];
pivot(arr); // 2
arr; // [3, 2, 4, 5, 6]

var arr = [11, 40, 40, 50, 43, 10, 30, 42, 20, 6, 19, 32, 20, 41, 23, 27];
pivot(arr);
arr; // [6, 10, 11, 40, 40, 50, 43, 30, 42, 20, 19, 32, 20, 41, 23, 27]

var arr = [5, 2, 1, 8, 4, 7, 6, 3];
pivot(arr); // 4
arr; // [3, 2, 1, 4, 5, 7, 6, 8]

var arr = [4, 8, 2, 1, 5, 7, 6, 3];
pivot(arr); // 3
arr; // [3, 2, 1, 4, 5, 7, 6, 8]

// One more time with the comparator parameter and also the start and end
// parameters
function pivot(arr, comparator, start = 0, end = arr.length - 1) {
  if (typeof comparator !== "function") {
    comparator = function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivotVal = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (comparator(arr[i], pivotVal) < 0) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}

quickSort([11, 40, 40, 50, 43, 10, 30, 42, 20, 6, 19, 32, 20, 41, 23, 27]);
// [6, 10, 11, 19, 20, 20, 23, 27, 30, 32, 40, 40, 41, 42, 43, 50]

// Examples

var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
var arr3 = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strLength(a, b) {
  return a.length - b.length;
}

pivot(arr1); // 3
pivot(arr2); // 4
pivot(arr3, strLength); // 1

arr1.slice(0, 3).sort((a, b) => a - b); // [2, 3, 4]
arr1.slice(3).sort((a, b) => a - b); // [5, 7, 8, 9, 10, 20]

arr2.slice(0, 4).sort((a, b) => a - b); // [0, 2, 4, 5]
arr2.slice(4).sort((a, b) => a - b); // [8, 10, 11, 12, 13, 16]

arr3.slice(0, 1).sort(strLength); // ["Blue"]
arr3.slice(1).sort(strLength); // ["LilBub", "Grumpy", "Garfield", "Heathcliff"]
