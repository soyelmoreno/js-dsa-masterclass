/*
Suppose we want to write a function that calculates the sum of all numbers from
one up to (and including) some number n.
*/
function addUpToN(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
console.log(addUpToN(100));

// Let's time it.
let t1 = performance.now();
addUpToN(1000000000);
let t2 = performance.now();
console.log(`Time elapsed: ${t2 - t1 / 1000} seconds`);

// Now a different implementation. Basically a math formula. O(1)
function addUpToNSecond(n) {
  return (n * (n + 1)) / 2;
}
console.log(addUpToNSecond(6));

// Let's time it.
let t3 = performance.now();
addUpToNSecond(1000000000);
let t4 = performance.now();
console.log(`Time elapsed: ${t4 - t3 / 1000} seconds`);
