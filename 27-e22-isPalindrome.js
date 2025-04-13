/*
Coding Exercise 22.

isPalindrome

Write a recursive function called isPalindrome which returns true if the string
passed to it is a palindrome (reads the same forward and backward). Otherwise it
returns false.
// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false
*/

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str.length == 2 && str[0] == str[str.length - 1]) return true;
  if (str[0] != str[str.length - 1]) return false;
  return isPalindrome(str.substring(1, str.length - 1));
}

isPalindrome(""); // true
isPalindrome("awesome"); // false
isPalindrome("foobar"); // false
isPalindrome("faddaf"); // true
isPalindrome("tacocat"); // true
isPalindrome("amanaplanacanalpanama"); // true
isPalindrome("amanaplanacanalpandemonium"); // false
