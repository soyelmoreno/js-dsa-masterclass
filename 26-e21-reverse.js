/*
Coding Exercise 21.

reverse

Write a recursive function called reverse which accepts a string and returns a
new string in reverse.

// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'
*/

// My solution: grab the last letter, then append the reverse of the rest
function reverse(str) {
  if (str.length === 1) return str;
  return str[str.length - 1] + reverse(str.substring(0, str.length - 1));
}

reverse("awesome"); // 'emosewa'
reverse("rithmschool"); // 'loohcsmhtir'

// Alternative solution from DSA course. Reverse the rest of the string starting
// at the second letter, then append the first letter.
function reverse2(str) {
  if (str.length <= 1) return str;
  return reverse2(str.slice(1)) + str[0];
}
reverse2("awesome"); // 'emosewa'
reverse2("rithmschool"); // 'loohcsmhtir'
