/*
Coding Exercise 27.

capitalizeWords

Write a recursive function called capitalizeWords. Given an array of words,
return a new array containing each word capitalized.

// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']

*/

function capitalizeWords(arr) {
  if (arr.length === 1) {
    return [arr[0].toUpperCase()];
  }
  return capitalizeWords([arr[0]]).concat(capitalizeWords(arr.slice(1)));
}

let words = ["i", "am", "learning", "recursion"];
capitalizeWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
