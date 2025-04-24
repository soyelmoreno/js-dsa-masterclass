/*
Coding Exercise 15.

Divide and Conquer - findRotatedIndex

Write a function called findRotatedIndex which accepts a rotated array of sorted
numbers and an integer. The function should return the index of the integer in
the array. If the value is not found, return -1.

Constraints:
- Time Complexity - O(log n)
- Space Complexity - O(1)

findRotatedIndex([3,4,1,2],4) // 1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
findRotatedIndex([37,44,66,102,10,22],14) // -1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
findRotatedIndex([11,12,13,14,15,16,3,5,7,9], 16) // 5
*/

// Start 11:35
// End    1:22
// Total  1:47

function findRotatedIndex(arr, target) {
  const pivot = findPivot(arr);
  if (pivot === 0) {
    return search(arr, target);
  } else if (target >= arr[0] && target <= arr[pivot]) {
    return search(arr, target, 0, pivot);
  } else {
    return search(arr, target, pivot + 1, arr.length - 1);
  }

  function findPivot(arr) {
    let left = 0;
    let right = arr.length - 1;
    if (arr[left] < arr[right]) return 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > arr[mid + 1]) {
        return mid;
      } else if (arr[mid] > arr[left]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return 0;
  }

  function search(arr, target, left = 0, right = arr.length - 1) {
    if (arr[left] > target || arr[right] < target) return -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }
}

findPivot([20, 30, 32, 5, 8, 10, 12, 14, 16]); // 2
findPivot([12, 14, 16, 20, 30, 32, 5, 8, 10]); // 5
findPivot([]); // 0
findPivot([8]); // 0
findPivot([3, 4, 1, 2]); // 1
findPivot([6, 7, 8, 9, 1, 2, 3, 4]); // 3
findPivot([37, 44, 66, 102, 10, 22]); // 3
findPivot([6, 7, 8, 9, 1, 2, 3, 4]); // 3
findPivot([11, 12, 13, 14, 15, 16, 3, 5, 7, 9]); // 5

search([5, 8, 10, 12, 14, 16, 20, 30, 32], 5); // 0
search([5, 8, 10, 12, 14, 16, 20, 30, 32], 14); // 4
search([5, 8, 10, 12, 14, 16, 20, 30, 32], 30); // 7
search([5, 8, 10, 12, 14, 16, 20, 30, 32], 40); // -1

//                                m
findRotatedIndex([20, 30, 32, 5, 8, 10, 12, 14, 16], 30) === 1;
findRotatedIndex([20, 30, 32, 5, 8, 10, 12, 14, 16], 5) === 3;
findRotatedIndex([20, 30, 32, 5, 8, 10, 12, 14, 16], 12) === 6;
findRotatedIndex([20, 30, 32, 5, 8, 10, 12, 14, 16], 40) === -1;

findRotatedIndex([5, 8, 10, 12, 14, 16, 20, 30, 32], 12) === 3;

findRotatedIndex([12, 14, 16, 20, 30, 32, 5, 8, 10], 16) === 2;
findRotatedIndex([12, 14, 16, 20, 30, 32, 5, 8, 10], 32) === 5;
findRotatedIndex([12, 14, 16, 20, 30, 32, 5, 8, 10], 8) === 7;
findRotatedIndex([], 8) === -1;
findRotatedIndex([8], 8) === 0;

findRotatedIndex([3, 4, 1, 2], 4) === 1;
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) === 2;
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) === 6;
findRotatedIndex([37, 44, 66, 102, 10, 22], 14) === -1;
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) === -1;
findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16) === 5;
