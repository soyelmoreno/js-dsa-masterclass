/*

Lecture 106-109.

ES2015 class syntax overview.

Note that I'm going to write out all examples with both class syntax and prototype syntax.

*/

class DataStructure {
  constructor() {
    // What default properties should it have?
  }
  someInstanceMethod() {
    // What should each object created from this class be able to do?
  }
}

class Student {
  constructor(firstName, lastName, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = year;
    this.tardies = 0;
    this.scores = [];
  }
  // These are instance methods. Every instance can call them.
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  markLate() {
    this.tardies += 1;
    if (this.tardies >= 3) return "YOU ARE EXPELLED!";
    return `${this.firstName} ${this.lastName} has been late ${this.tardies} times.`;
  }
  addScore(score) {
    this.scores.push(score);
    return this.scores;
  }
  calculateAverage() {
    if (this.scores.length === 0) return 0;
    const sum = this.scores.reduce((acc, curr) => acc + curr, 0);
    return sum / this.scores.length;
  }

  // These are static or class methods. We make a method a class method by
  // adding the `static` keyword in front. Per MDN, static/class methods are
  // called without instantiating their class and *cannot* be called through a
  // class instance. Static methods are often used to create utility functions
  // for an application.
  static enrollStudents(students) {
    // Maybe send a email here to every student passed in
    return `ENROLLING ${students.length} STUDENTS!`;
  }
}

//////////////////////////////////////////////////////////////////////////////
// Same thing using prototype-based syntax
//////////////////////////////////////////////////////////////////////////////
// This is the constructor function
function ProtoStudent(firstName, lastName, year) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.grade = year;
  this.tardies = 0;
  this.scores = [];
}
// These are instance methods. Every instance can call them.
ProtoStudent.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
ProtoStudent.prototype.markLate = function () {
  this.tardies += 1;
  if (this.tardies >= 3) return "YOU ARE EXPELLED!";
  return `${this.firstName} ${this.lastName} has been late ${this.tardies} times.`;
};
ProtoStudent.prototype.addScore = function (score) {
  this.scores.push(score);
  return this.scores;
};
ProtoStudent.prototype.calculateAverage = function () {
  if (this.scores.length === 0) return 0;
  const sum = this.scores.reduce((acc, curr) => acc + curr, 0);
  return sum / this.scores.length;
};
// These are static or class methods. In prototype-based classes, static methods
// are added directly to the constructor function itself. They are not part of
// the prototype, so they are not inherited by instances.Per MDN, static/class
// methods are called without instantiating their class and *cannot* be called
// through a class instance. Static methods are often used to create utility
// functions for an application.

ProtoStudent.enrollStudents = function (students) {
  // Maybe send a email here to every student passed in
  return `ENROLLING ${students.length} STUDENTS!`;
};
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const firstStudent = new Student("Carlos", "Moreno", 16);
firstStudent.fullName();
firstStudent.grade;
const secondStudent = new ProtoStudent("Colt", "Steele", 18);
secondStudent.fullName();
secondStudent.grade;

firstStudent.addScore(92);
firstStudent.addScore(87);

secondStudent.addScore(75);
secondStudent.addScore(91);

firstStudent.calculateAverage();
secondStudent.calculateAverage();

firstStudent.markLate();
firstStudent.markLate();
firstStudent.markLate();
secondStudent.markLate();
secondStudent.markLate();
secondStudent.markLate();

// firstStudent.enrollStudents(); // --> not a function
// secondStudent.enrollStudents(); // --> not a function

Student.enrollStudents([firstStudent, secondStudent]);
ProtoStudent.enrollStudents([firstStudent, secondStudent, "asdf", 2345]);

// Working with chatgpt to build out some inheritance.

/*
- GradStudent:
  - researchTopic
  - advisor
- InternationalStudent:
  - countryOfOrigin
  - visaStatus
*/

class GradStudent extends Student {
  constructor(firstName, lastName, year, researchTopic, advisor) {
    super(firstName, lastName, year);
    this.researchTopic = researchTopic;
    this.advisor = advisor;
  }
  describeResearch() {
    return `${this.fullName()} is researching "${this.researchTopic}" under ${
      this.advisor
    }.`;
  }
}

class InternationalStudent extends Student {
  constructor(firstName, lastName, year, countryOfOrigin, visaStatus) {
    super(firstName, lastName, year);
    this.countryOfOrigin = countryOfOrigin;
    this.visaStatus = visaStatus;
  }
  getVisaInfo() {
    return `${this.fullName()} from ${this.countryOfOrigin} has a ${
      this.visaStatus
    } visa.`;
  }
}

// ProtoGradStudent subclass
function ProtoGradStudent(firstName, lastName, year, researchTopic, advisor) {
  ProtoStudent.call(this, firstName, lastName, year);
  this.researchTopic = researchTopic;
  this.advisor = advisor;
}
ProtoGradStudent.prototype = Object.create(ProtoStudent.prototype);
ProtoGradStudent.prototype.constructor = ProtoGradStudent;

ProtoGradStudent.prototype.describeResearch = function () {
  return `${this.fullName()} is researching "${this.researchTopic}" under ${
    this.advisor
  }.`;
};

// ProtoInternationalStudent subclass
function ProtoInternationalStudent(
  firstName,
  lastName,
  year,
  countryOfOrigin,
  visaStatus
) {
  ProtoStudent.call(this, firstName, lastName, year);
  this.countryOfOrigin = countryOfOrigin;
  this.visaStatus = visaStatus;
}
ProtoInternationalStudent.prototype = Object.create(ProtoStudent.prototype);
ProtoInternationalStudent.prototype.constructor = ProtoInternationalStudent;

ProtoInternationalStudent.prototype.getVisaInfo = function () {
  return `${this.fullName()} from ${this.countryOfOrigin} has a ${
    this.visaStatus
  } visa.`;
};

// Examples using class syntax
const alice = new GradStudent(
  "Alice",
  "Nguyen",
  2,
  "Quantum Computing",
  "Dr. Smith"
);
console.log(alice.describeResearch());

const bob = new InternationalStudent("Bob", "Lee", 1, "South Korea", "F-1");
console.log(bob.getVisaInfo());

// Examples using proto version
const charlie = new GradStudent(
  "Charlie",
  "Brown",
  3,
  "Neuroscience",
  "Dr. Adams"
);
console.log(charlie.describeResearch());

const diana = new InternationalStudent("Diana", "Martinez", 4, "Mexico", "J-1");
console.log(diana.getVisaInfo());
