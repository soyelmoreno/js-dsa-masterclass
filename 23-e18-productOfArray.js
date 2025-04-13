/*
Coding Exercise 18.

ProductOfArray

Write a function called productOfArray which takes in an array of numbers and
returns the product of them all.
*/

function productOfArray(arr) {
  if (arr.length === 1) return arr[0];
  return arr[0] * productOfArray(arr.slice(1));
}

productOfArray([1, 2, 3]); // 6
productOfArray([1, 2, 3, 10]); // 60
productOfArray([2, 3, 5, 3]); // 90

// DSA course solution. Go one step further until array is empty. Also works.
function productOfArray_COURSE(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}
