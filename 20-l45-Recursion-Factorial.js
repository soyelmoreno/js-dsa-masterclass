/*
Lecture 45.

Two essential parts of a recursive function.
- Base case
- Different input

Common pitfalls
- Not having a base case
- Not returning from the base case
- Returning the wrong thing from the base case
- Not modifying the input for the next call

*/

// Simple recursion from Lecture 45. Count down and log the number.
function countDown(num) {
  if (num <= 0) {
    console.log("All done");
    return;
  }
  console.log(num);
  num--;
  countDown(num);
}

countDown(4); // 4 3 2 1 All done

// Recursive function that sums. From Lecture 46.
function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}

sumRange(4); // 10

// Function to find the factorial of a number. Iterative approach. Lecture 47.
function factorial_ITERATIVE(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total = total * i;
  }
  return total;
}

factorial_ITERATIVE(0); // 1
factorial_ITERATIVE(1); // 1
factorial_ITERATIVE(2); // 2
factorial_ITERATIVE(3); // 6
factorial_ITERATIVE(4); // 24
factorial_ITERATIVE(10); // 3628800

// Function to find the factorial of a number. Recursive approach. Lecture 48.
// Also Coding Exercise 17.
/*

Coding Exercise 17

factorial

Write a function factorial which accepts a number and returns the factorial of
that number. A factorial is the product of an integer and all the integers below
it; e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.
factorial zero (0!) is always 1.
*/
function factorial(num) {
  if (num === 0) return 1;
  return num * factorial(num - 1);
}

factorial(0); // 1
factorial(1); // 1
factorial(2); // 2
factorial(3); // 6
factorial(4); // 24
factorial(5); // 120
factorial(10); // 3628800
