/*
Coding Exercise 10.

Sliding Window - maxSubarraySum

Given an array of integers and a number, write a function called maxSubarraySum,
which finds the maximum sum of a subarray with the length of the number passed
to the function.

Note that a subarray must consist of consecutive elements from the original
array. In the first example below, [100, 200, 300] is a subarray of the original
array, but [100, 300] is not.

maxSubarraySum([100,200,300,400], 2) // 700
maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39 
maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
maxSubarraySum([2,3], 3) // null

Constraints:
- Time Complexity - O(N)
- Space Complexity - O(1)
*/

// Naive solution. Time complexity O(n^2)
function maxSubarraySum_NAIVE(arr, n) {
  if (n > arr.length) return null;
  let maxSum = -Infinity;
  for (let i = 0; i < arr.length - n + 1; i++) {
    let localSum = 0;
    for (let j = 0; j < n; j++) {
      localSum += arr[i + j];
    }
    maxSum = Math.max(maxSum, localSum);
    console.log(localSum, maxSum);
  }
  return maxSum;
}

// Better solution. Time complexity O(n)
function maxSubarraySum(arr, n) {
  if (n > arr.length) return null;
  let maxSum = 0;
  let localSum = 0;
  // Start by setting maxSum to the first possible sum
  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  // Save that first sum in local, then modify it, before comparing to maxSum
  localSum = maxSum;
  for (let i = n; i < arr.length; i++) {
    // Sliding window. Subtract from the front, add from the back
    localSum = localSum - arr[i - n] + arr[i];
    maxSum = Math.max(maxSum, localSum);
  }
  return maxSum;
}

maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3); // 19
maxSubarraySum([4, 2, 1, 6], 1); // 6
maxSubarraySum([4, 2, 1, 6, 2], 4); // 13
maxSubarraySum([4, 2, 1, 6], 5); // null
maxSubarraySum([], 4); // null

maxSubarraySum([100, 200, 300, 400], 2); // 700
maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39
maxSubarraySum([-3, 4, 0, -2, 6, -1], 2); // 5
maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2); // 5
maxSubarraySum([2, 3], 3); // null
