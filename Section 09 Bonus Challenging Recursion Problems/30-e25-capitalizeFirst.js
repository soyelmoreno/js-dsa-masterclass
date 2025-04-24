/*
Coding Exercise 25.

capitalizeFirst

Write a recursive function called capitalizeFirst. Given an array of strings,
capitalize the first letter of each string in the array.

// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']
*/

function capitalizeFirst(arr) {
  if (arr.length === 1) {
    const str = arr[0];
    return [str[0].toUpperCase() + str.slice(1)];
  }
  return capitalizeFirst([arr[0]]).concat(capitalizeFirst(arr.slice(1)));
}

capitalizeFirst(["car", "taco", "banana"]); // ['Car','Taco','Banana']
