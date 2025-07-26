/*

--- Lecture 242.

What is Dynamic Programming?

"A method for solving a complex problem by breaking it down into a collection of
simpler subproblems, solving each of those subproblems just once, and storing
their solutions."

Applies to some problems, not all problems. It only works on problems with both
1. Optimal substructure
2. Overlapping subproblems

Where does the name come from? Ha ha, not actual programming. More like coming
up with an optimal solution. Name was chosen to sound impressive. See wikipedia.

--- Lecture 243.

Overlapping subproblems: the problem can be broken down into subproblems which
are reused several times.

Overlapping: Calculating the same thing multiple times.

MergeSort: has subproblems, but the pieces **do not overlap**

--- Lecture 244.

Optimal substructure: an optimal solution can be constructed from optimal
solutions of its subproblems. 

Example: shortest path between vertices on a graph.

Non-example: Longest simple (no-repeating) path. Optimal solution does not
comprise optimal solutions of subproblems.

--- Lecture 245.

Fibonacci - using play old recursion
fib(n) = fib(n-1) + fib(n-2)
fib(2) is 1
fib(1) is 1

--- Lecture 246 and 247.

Big O of Fibonacci with recursion is terrible. O(2^n) There is tons of
repetition.

--- Lecture 248.

Do memoization! Store solutions to smaller problem. 

--- Lecture 249.

Time complexity of memoized Fibonacci: O(n). As n grows we do roughly that many
more calculations.

*/

// Bad Fibonacci
function fib_bad(n) {
  if (n <= 2) return 1;
  return fix(n - 1) + fib(n - 2);
}

// Good Fibonacci (Memoized)
function fib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  const res = fix(n - 1, memo) + fib(n - 2, memo);
  memo[n] = res;
  return res;
}
