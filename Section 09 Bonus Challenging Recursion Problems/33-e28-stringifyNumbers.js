/*
Coding Exercise 28.

stringifyNumbers

Write a function called stringifyNumbers which takes in an object and finds all
of the values which are numbers and converts them to strings. Recursion would be
a great way to solve this!

The exercise intends for you to create a new object with the numbers converted
to strings, and not modify the original. Keep the original object unchanged.

*/

function stringifyNumbers(obj) {
  const output = {};
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "number") {
      output[key] = String(val);
    } else if (typeof val === "object" && val !== null) {
      if (Array.isArray(val)) {
        output[key] = val;
      } else {
        output[key] = stringifyNumbers(val);
      }
    } else {
      output[key] = val;
    }
  }
  return output;
}

let obj = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};

stringifyNumbers(obj); // should return this object:
/*
{
  num: "1",
  test: [],
  data: {
    val: "4",
    info: {
      isRight: true,
      random: "66"
    }
  }
}
*/
