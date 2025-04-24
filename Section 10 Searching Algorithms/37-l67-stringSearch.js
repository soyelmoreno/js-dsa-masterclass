/*
Lecture 67.

String Search

Write a function stringSearch that takes a string and a smaller string and
returns the number of times the smaller string appears in a longer string.

stringSearch('wowomgzomg', 'omg'); // 2
*/

function stringSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (long[i + j] !== short[j]) break;
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

stringSearch("lorie loled", "lol"); // 1
stringSearch("wowomgzomg", "omg"); // 2
