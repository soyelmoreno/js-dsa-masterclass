/*
Coding Exercise 5.

Frequency Counter - constructNote

Write a function called constructNote, which accepts two strings, a message and
some letters. The function should return true if the message can be built with
the letters that you are given, or it should return false.

Assume that there are only lowercase letters and no space or special characters
in both the message and the letters.

Bonus Constraints:

If M is the length of message and N is the length of letters:
- Time Complexity: O(M+N)

- Space Complexity: O(N)

Examples:

constructNote('aa', 'abc') // false
constructNote('abc', 'dcba') // true
constructNote('aabbcc', 'bcabcaddff') // true
*/

// My solution, with decrement
function constructNote(msg, letters) {
  const lettersCount = {};
  for (const letter of letters) {
    lettersCount[letter] = (lettersCount[letter] || 0) + 1;
  }
  for (const char of msg) {
    if (!lettersCount[char]) {
      return false;
    } else {
      lettersCount[char]--;
    }
  }
  return true;
}

// DSA course solution, with two hashmaps
function constructNote(message, letters) {
  var lettersCount = {};
  var msgCount = {};

  for (let i = 0; i < letters.length; i++) {
    lettersCount[letters[i]] = ++lettersCount[letters[i]] || 1;
  }

  for (let i = 0; i < message.length; i++) {
    msgCount[message[i]] = ++msgCount[message[i]] || 1;
  }

  for (let k in msgCount) {
    if (!lettersCount[k]) return false;
    if (msgCount[k] > lettersCount[k]) return false;
  }

  return true;
}

constructNote("aa", "abcd"); // false
constructNote("", "abc"); // true
constructNote("abcd", ""); // false
constructNote("abc", "dcba"); // true
constructNote("aabbcc", "bcabcaddff"); // true
constructNote("skbjjjvnnd", "fdjlkjfeburevjvnfnsjckjncjdnchbechbadhsd"); // true
