/*
Coding Exercise 12.

Sliding Window - findLongestSubstring

Write a function called findLongestSubstring, which accepts a string and returns
the length of the longest substring with all distinct characters.

findLongestSubstring('') // 0
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('longestsubstring') // 8
findLongestSubstring('thisishowwedoit') // 6

Time Complexity - O(n)
*/

function findLongestSubstring_COURSE(str) {
  let longest = 0;
  let seen = {}; // hashmap, letter: index where found
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }
    // index - beginning of substring + 1 (to include current in count)
    longest = Math.max(longest, i - start + 1);
    // store the index of the next char so as to not double count
    seen[char] = i + 1;
  }
  return longest;
}

// Start 1:09pm
// Finish 2:32pm
// Total 1:23

// My solution plus help from Neetcode video
//https://www.youtube.com/watch?v=wiGpQwVHdE0
function findLongestSubstring(str) {
  let maxLen = 0;
  let left = 0;
  const letterSet = new Set();
  for (let right = 0; right < str.length; right++) {
    const letter = str[right]; //i
    while (letterSet.has(letter)) {
      letterSet.delete(str[left]);
      left++;
    }
    letterSet.add(letter);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

findLongestSubstring(""); // 0
findLongestSubstring("rithmschool"); // 7
findLongestSubstring("thisisawesome"); // 6
findLongestSubstring("thecatinthehat"); // 7
findLongestSubstring("bbbbbb"); // 1
findLongestSubstring("longestsubstring"); // 8
findLongestSubstring("thisishowwedoit"); // 6
