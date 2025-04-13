/*
Coding Exercise 14.

Divide and Conquer - sortedFrequency

Given a sorted array and a number, write a function called sortedFrequency that
counts the occurrences of the number in the array

sortedFrequency([1,1,2,2,2,2,3],2) // 4 
sortedFrequency([1,1,2,2,2,2,3],3) // 1 
sortedFrequency([1,1,2,2,2,2,3],1) // 2 
sortedFrequency([1,1,2,2,2,2,3],4) // -1

- Time Complexity - O(log n)
*/

// Start 10:29
// End 12:38
// Total 2:09

function sortedFrequency(arr, target) {
  function findFirstIndex(arr, target) {
    let firstIndex = -1;
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        // value equals target
        firstIndex = mid; // maybe an answer
        right = mid - 1; // continue searching on the left side
      } else if (arr[mid] > target) {
        // value greater than target
        right = mid - 1;
      } else {
        // value less than target
        left = mid + 1;
      }
    }
    return firstIndex;
  }

  function findLastIndex(arr, target) {
    let lastIndex = -1;
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        // value equals target
        lastIndex = mid; // maybe an answer
        left = mid + 1; // continue searching on the right side
      } else if (arr[mid] > target) {
        // value greater than target
        right = mid - 1;
      } else {
        // value less than target
        left = mid + 1;
      }
    }
    return lastIndex;
  }

  let first = findFirstIndex(arr, target);
  let last = findLastIndex(arr, target);
  return first === -1 ? -1 : last - first + 1;
}

//               m
sortedFrequency([1, 1, 2, 2, 2, 2, 7], 1); // 2
sortedFrequency([1, 1, 2, 2, 2, 2, 7], 2); // 4
sortedFrequency([1, 1, 2, 2, 2, 2, 7], 7); // 1
sortedFrequency([1, 1, 2, 2, 2, 2, 7], 8); // -1
sortedFrequency([4, 4, 5, 5, 5, 5, 7], 2); // -1
sortedFrequency([4, 4, 5, 5, 5, 5, 7], 6); // -1

sortedFrequency([1, 1, 1, 1, 1, 2, 9], 1); // 5
sortedFrequency([1, 1, 1, 1, 1, 2, 9], 2); // 1
sortedFrequency([1, 2, 3, 3, 3, 3, 3], 1); // 1
sortedFrequency([1, 2, 3, 3, 3, 3, 3], 2); // 1
sortedFrequency([1, 2, 3, 3, 3, 3, 3], 3); // 5

sortedFrequency([6, 6, 6, 6, 6, 6, 6], 6); // 7
sortedFrequency([], 3); // -1

sortedFrequency([1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 5, 6], 2); // 4
sortedFrequency([1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6], 2); // 9
