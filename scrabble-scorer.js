// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function checkNumeric(word) {
  return word.match(/\d+/);
}

function initialPrompt() {
   let word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");

   return word;
 }

let simpleScore = function(word){
  word = word.trim().split(" ").join("");
  if (checkNumeric(word)) {
    return `0. Invalid word entered.`;
  }
  return word.length;
};

let vowelBonusScore = function(word){
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  let score = 0;

  if (checkNumeric(word)) {
    return `0. Invalid word entered.`;
  }

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }

  return score;
};

let scrabbleScore = function(word) {
  word = word.trim().split(" ").join("").toLowerCase();
  let score = 0;
 
	for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];	  
	}
	return score;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm",
    scorerFunction: scrabbleScore // oldScrabbleScorer
  }
];

function scorerPrompt() {
  let scorer;
  
  console.log(
    "Which scoring algorithm would you like to use?\n\n" + "0 - Simple: One point per character\n" + "1 - Vowel Bonus: Vowels are worth 3 points\n" + "2 - Scrabble: Uses scrabble point system"
  );
  
  while (scorer !== 0 && scorer !== 1 && scorer !== 2) {
    scorer = Number(input.question("Enter 0, 1, or 2: "));
  }

  return scorer;
}

function transform(pointsObj) {
  let oldPointsArr = [];
  let newPointObj = {};
  
  for (point in pointsObj) {
    oldPointsArr.push(point);
  }
  
  for (let i = 0; i < oldPointsArr.length; ++i) {
    for (let j = 0; j < pointsObj[oldPointsArr[i]].length; ++j) {
      let letter = pointsObj[oldPointsArr[i]][j].toLowerCase();
      newPointObj[letter] = Number(oldPointsArr[i]);

      // console.log(oldPointsArr[i] + ": " + pointsObj[oldPointsArr[i]][j]);
    }
    // console.log();
  }

  return newPointObj;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  let scorerChoice = scorerPrompt();

  console.log(`Score for '${word}': ${scoringAlgorithms[scorerChoice].scorerFunction(word)}`);
  // console.log(newPointStructure);
  // console.log(oldPointStructure);
  // console.log(oldScrabbleScorer(word));
  // console.log(`simple score = ${simpleScore(word)}`);
  // console.log(`vowelBonusScore = ${vowelBonusScore(word)}`);
  //console.log(scoringAlgorithms[0].description);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

