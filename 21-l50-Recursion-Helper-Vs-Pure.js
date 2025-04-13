/*
Lecture 50.

Helper method recursion: having an outer function that calls a helper function.

Helper function: a recursive function defined inside the outer function.

Commonly used when compiling some sort of result, like an array or some other
data structure.

function outer(input) {
  let outerScopeVariable = [];
  function helper(helperInput) {
    // Modify the outerScopeVariable
    helper(helperInput--);
  }
  helper(input);
  return outerScopeVariable;
}

*/

// Lecture 50.
function collectOddValues(arr) {
  let result = [];
  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    helper(helperInput.slice(1));
  }
  helper(arr);
  return result;
}

collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]); // [1, 3, 5, 7, 9]

/*
Pure recursion: no helper method.

Can always do it this way. But often the helper approach is easier to
understand.

Tips:
- For arrays: use methods like slice, the spread operator, and concat that make
  copies of arrays so you do not mutate them.
- Remember that strings are immutable so you will need to use methods like
  slice, substr, or substring to make copies of strings.
- To make copies of objects use Object.assign, or the spread operator.
*/

// Lecture 51.
function collectOddValues_PURE(arr) {
  let newArr = [];
  if (arr.length === 0) {
    return newArr;
  }
  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }
  newArr = newArr.concat(collectOddValues_PURE(arr.slice(1)));
  return newArr;
}

collectOddValues_PURE([1, 2, 3, 4, 5, 6, 7, 8, 9]); // [1, 3, 5, 7, 9]
