/*
Coding Exercise 26.

nestedEvenSum

Write a recursive function called nestedEvenSum. Return the sum of
all even numbers in an object which may contain nested objects.

nestedEvenSum(obj1); // 6
nestedEvenSum(obj2); // 10

*/

function nestedEvenSum(obj) {
  let sum = 0;
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "number" && val % 2 === 0) {
      sum += val;
    } else if (typeof val === "object" && val !== null) {
      sum += nestedEvenSum(val);
    }
  }
  return sum;
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

// sum 2
// sum 0
// sum 2
// sum 2

var obj3 = {};
var obj4 = { foo: true, bar: "baz", fad: null, give: 4, koo: { lop: 6 } };
var obj5 = { foo: 3, bar: 2, fad: 4 };

nestedEvenSum(obj1); // 6
nestedEvenSum(obj2); // 10
nestedEvenSum(obj3); // 0
nestedEvenSum(obj4); // 10
nestedEvenSum(obj5); // 6
