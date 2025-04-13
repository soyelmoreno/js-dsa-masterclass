/*
Coding Exercise 1.

Frequency Counter - validAnagram

Given two strings, write a function to determine if the second string is an
anagram of the first. An anagram is a word, phrase, or name formed by
rearranging the letters of another, such as cinema, formed from iceman.

Examples:

validAnagram('', '') // true
validAnagram('aaz', 'zza') // false
validAnagram('anagram', 'nagaram') // true
validAnagram("rat","car") // false) // false
validAnagram('awesome', 'awesom') // false
validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana') // false
validAnagram('qwerty', 'qeywrt') // true
validAnagram('texttwisttime', 'timetwisttext') // true

Note: You may assume the string contains only lowercase alphabets.

Time Complexity - O(n)

*/

// This solution uses only one hashmap, and decrements the count until it
// reaches zero, which is falsey.
function validAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const lookup = {}; // {character: count}

  // Using a for-of loop instead of normal for loop
  for (const letter of s) {
    lookup[letter] = lookup[letter] ? lookup[letter] + 1 : 1;
  }

  for (const letter of t) {
    // If we can't find the character or the count is zero then not anagram
    if (!lookup[letter]) {
      return false;
    } else {
      // Decrement the frequency. Lets us check that it is in there exactly the
      // right number of times.
      lookup[letter] -= 1;
    }
  }
  return true;
}

console.log(validAnagram("racecar", "carrace")); // true
console.log(validAnagram("jar", "jarjar")); // false
console.log(validAnagram("jar", "jam")); // false
