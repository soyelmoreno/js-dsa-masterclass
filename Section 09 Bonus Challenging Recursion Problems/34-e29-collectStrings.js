/*
Coding Exercise 29.

collectStrings

Write a function called collectStrings which accepts an object and returns an
array of all the values in the object that have a typeof string
*/

function collectStrings(obj) {
  const result = [];
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "string") {
      result.push(val);
    } else {
      result.push(...collectStrings(val));
    }
  }
  return result;
}

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

collectStrings(obj); // ["foo", "bar", "baz"])
