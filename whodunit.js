//Ones I got wrong: Scenarios 4, 7. Found the issue for each. Missed lets which created new variables. Oops!

//SCENARIO 1
const scenario = {
  murderer: 'Miss Scarlet',
  room: 'Library',
  weapon: 'Rope'
};

const declareMurderer = function() {
  return `The murderer is ${scenario.murderer}.`;
}

const verdict = declareMurderer();
console.log(verdict);

// I think the result will be: "The murderer is Miss Scarlet". The declareMurderer function has access to the scenario variable because they are both in the global scope (Global scope? I feel like this might not be the right word since we talked about global variables and them being bad. Either way, they're both in the least specific scope).

//SCENARIO 2
const murderer = 'Professor Plum';

const changeMurderer = function() {
  murderer = 'Mrs. Peacock';
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);

// I think that the changeMurderer function either created a global variable different from the first one we see, or will try (and fail) to change the murderer variable (from Professor Plum to Mrs. Peacock). I think that the verdict would therefore be Professor Plum.

 //SCENARIO 3
let murderer = 'Professor Plum';

const declareMurderer = function() {
  let murderer = 'Mrs. Peacock';
  return `The murderer is ${murderer}.`;
}

const firstVerdict = declareMurderer();
console.log('First Verdict: ', firstVerdict);

const secondVerdict = `The murderer is ${murderer}.`;
console.log('Second Verdict: ', secondVerdict);

//I thnk the first verdict will be "Mrs. Peacock" and the second verdict will be "Professor Plum". Reasoning:
//Mrs. Peacock: the murderer variable on line 35 exists only within the declareMurderer function. Outside of this block, this instance of "murderer" on line 35 does not exist.
//Professor Plum: For the secondVerdict variable, we are simple logging `The murderer is ${murderer}.` using the more broadly scoped murderer variable (line 32) because it cannot access anything in the declareMurderer function.

//SCENARIO 4
let suspectOne = 'Miss Scarlet';
let suspectTwo = 'Professor Plum';
let suspectThree = 'Mrs. Peacock';

const declareAllSuspects = function() {
  let suspectThree = 'Colonel Mustard';
  return `The suspects are ${suspectOne}, ${suspectTwo}, ${suspectThree}.`;
}

const suspects = declareAllSuspects();
console.log(suspects);
console.log(`Suspect three is ${suspectThree}.`);

// I think the first console.log will return "The suspects are Miss Scarlet, Professor Plum, Mrs. Peacock." This is because the variable suspectThree is declared using a let, meaning it can be reassigned. It then is within the declareAllSuspects function.
// Juuuust kidding! Ran it and got it wrong. Got to scenario 7 before I realized I'd missed a let. Came back to this one and noticed the let within the declareAllSuspects. This means that the declareAllSuspects function creates a new suspectThree variable that exists within that scope. The function is able to pull suspectOne and suspectTwo from the outer scope, but uses it's own variables first and therefore prioritizes the Colonel Mustard murderer variable.
// Answer: "The suspects are Miss Scarlet, Professor Plum, Colonel Mustard."
//"Suspect three is Mrs. Peacock"

//SCENARIO 5
const scenario = {
  murderer: 'Miss Scarlet',
  room: 'Kitchen',
  weapon: 'Candle Stick'
};

const changeWeapon = function(newWeapon) {
  scenario.weapon = newWeapon;
}

const declareWeapon = function() {
  return `The weapon is the ${scenario.weapon}.`;
}

changeWeapon('Revolver');
const verdict = declareWeapon();
console.log(verdict);

// I predict that the logged sentence will be: The weapon is the Revolver. The reason for this is that though the scenario variable is created with a const, you can still mutate information within an object or an array. The changeWeapon function does this.

//SCENARIO 6
let murderer = 'Colonel Mustard';

const changeMurderer = function() {
  murderer = 'Mr. Green';

  const plotTwist = function() {
    murderer = 'Mrs. White';
  }
  plotTwist();
}

const declareMurderer = function () {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);

//I believe the result will be "The murderer is Mrs. White." At first glance, I thought it might not be, because of what happened in story 3, but I think that that all happened because of the result of the function call being assigned to a variable. Here, it's just being called, so I think it'll change the murderer variable.
//UPDATE: That's not the correct reasoning (see above scenario 4 to see reason), buuut the answer here is correct. It has to do with "lets" and creating vs. reassigning variables.

//SCENARIO 7
let murderer = 'Professor Plum';

const changeMurderer = function() {
  murderer = 'Mr. Green';

  const plotTwist = function() {
    let murderer = 'Colonel Mustard';

    const unexpectedOutcome = function() {
      murderer = 'Miss Scarlet';
    }
    unexpectedOutcome();
  }
  plotTwist();
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

changeMurderer();
const verdict = declareMurderer();
console.log(verdict);

// "The murderer is Colonel Mustard." Reasoning: when called, the function changeMurder changes the murderer variable (created using let and therefore reassignabke) 3 times. My guess about the changes are as follows: Professor Plum -> Mr Green -> Miss Scarlet -> Colonel Mustard.
// Post running: oooo This one was tricksy! I didn't notice that the plotTwist function had a "let" in front of Colonel Mustard. That meant that it was creating a new murderer variable within that block, not changing any existing ones elsewhere. Then, because the unexpectedOutcome function is within the same block, it changes Colonel Mustard to Miss Scarlet. The outer scoped murderer therefore remains Mr. Green.

// SCENARIO 8
const scenario = {
  murderer: 'Mrs. Peacock',
  room: 'Conservatory',
  weapon: 'Lead Pipe'
};

const changeScenario = function() {
  scenario.murderer = 'Mrs. Peacock';
  scenario.room = 'Dining Room';

  const plotTwist = function(room) {
    if (scenario.room === room) {
      scenario.murderer = 'Colonel Mustard';
    }
    const unexpectedOutcome = function(murderer) {
      if (scenario.murderer === murderer) {
        scenario.weapon = 'Candle Stick';
      }
    }
    unexpectedOutcome('Colonel Mustard');
  }
  plotTwist('Dining Room');
}

const declareWeapon = function() {
  return `The weapon is ${scenario.weapon}.`
}

changeScenario();
const verdict = declareWeapon();
console.log(verdict);

// if (verdict === "The weapon is Candle Stick."){
//   console.log(true);
// } else {
//   console.log(false);
// }

// I think it will be Candle Stick. I'm writing a test this time to give myself more attempts.
//That passed! Logged the verdict to make sure my test wasn't faulty and it was indeed Candle Stick.

// SCENARIO 9

let murderer = 'Professor Plum';

if (murderer === 'Professor Plum') {
  let murderer = 'Mrs. Peacock';
}

const declareMurderer = function() {
  return `The murderer is ${murderer}.`;
}

const verdict = declareMurderer();
console.log(verdict);

// There now exist two murderer variables: the one on line 189 and the one in the block that spans lines 191 - 193. Line 192 isn't changing line 189. We know this because of the let in front of it.
// This means that Professor Plum remains.
