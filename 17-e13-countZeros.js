/*
Coding Exercise 13.

Divide and Conquer - countZeroes

Given an array of 1s and 0s which has all 1s first followed by all 0s, write a
function called countZeroes, which returns the number of zeroes in the array.

countZeroes([1,1,1,1,0,0]) // 2
countZeroes([1,0,0,0,0]) // 4
countZeroes([0,0,0]) // 3
countZeroes([1,1,1,1]) // 0

Time Complexity - O(log n)
*/

// Start 2:37
// End 3:39
// Total 1:02

// This works fine, but there is too much if/else logic.
function countZeroes_WORKS(arr) {
  let left = 0;
  let right = arr.length - 1;
  // Test for all ones or all zeroes
  if (arr[right] === 1) return 0;
  if (arr[left] === 0) return arr.length;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === 0) {
      if (arr[mid - 1] === 1) {
        return arr.length - mid; // DONE
      } else {
        right = mid;
      }
    } else if (arr[mid] === 1) {
      if (arr[mid + 1] === 0) {
        return arr.length - (mid + 1); // DONE
      } else {
        left = mid;
      }
    }
  }
}

//           m
countZeroes([1, 1, 1, 1, 1, 1, 1, 1, 0, 0]); // 2
countZeroes([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]); // 8
countZeroes([1, 1, 1, 1, 0, 0]); // 2
countZeroes([1, 0, 0, 0, 0]); // 4
countZeroes([0, 0, 0]); // 3
countZeroes([1, 1, 1, 1]); // 0
