/*
Exercise 35.

Sorting Exercide - Merge Helper

Given two sorted arrays (both sorted in the same direction), write a function
called merge which accepts two SORTED arrays and returns a new array with both
of the values from each array sorted.

This function should run in O(n + m) time and O(n + m) space and should not
modify the parameters passed to it.

As before, the function should default to sorting numbers in ascending order. If
you pass in a comparator function as a third argument, this comparator is what
will be used. (Note that the input arrays will always be sorted according to the
comparator!)

Also, do not use the built in .sort method! We're going to use this helper to
implement a sort, so the helper itself shouldn't depend on a sort.

Time complexity: O(n + m)
Space complexity: O(n + m)

*/

// Works. But does all the comparisons.
function merge1(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] && arr2[j]) {
      if (arr1[i] < arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    } else if (!arr1[i] && arr2[j]) {
      result.push(arr2[j]);
      j++;
    } else if (arr1[i] && !arr2[j]) {
      result.push(arr1[i]);
      i++;
    }
  }
  return result;
}

// Once one array is exhausted just push the rest from the other
function merge2(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

// One more time but support a custom comparator as an optional third argument
function merge(arr1, arr2, comparator) {
  if (typeof comparator !== "function") {
    comparator = function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  const result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (comparator(arr1[i], arr2[j]) < 0) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

merge([1, 10, 50], [2, 14, 99, 100]); // [1, 2, 10, 14, 50, 99, 100]
merge([], [1, 3]); // [1, 3]

// Examples:

var arr1 = [1, 3, 4, 5];
var arr2 = [2, 4, 6, 8];
merge(arr1, arr2); // [1,2,3,4,4,5,6,8]

arr1; // [1,3,4,5];
arr2; // [2,4,6,8];

var arr3 = [-2, -1, 0, 4, 5, 6];
var arr4 = [-3, -2, -1, 2, 3, 5, 7, 8];

merge(arr3, arr4); // [-3,-2,-2,-1,-1,0,2,3,4,5,5,6,7,8]

var arr5 = [3, 4, 5];
var arr6 = [1, 2];

merge(arr5, arr6); // [1,2,3,4,5]

var names = ["Bob", "Ethel", "Christine"];
var otherNames = ["M", "Colt", "Allison", "SuperLongNameOMG"];

function stringLengthComparator(str1, str2) {
  return str1.length - str2.length;
}

merge(names, otherNames, stringLengthComparator); // ["M", "Bob", "Colt", "Ethel", "Allison", "Christine", "SuperLongNameOMG"]
