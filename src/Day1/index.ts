import { readFileSync } from "fs";
/*
    Read the puzzleInput as a string then split it into an array
    Create a new array converting the strings to ints.
    A more robust version would make sure the parseInt function doesn't blow up
*/
const readModuleList = (filename: string) => {
  const rawInput = readFileSync(filename, "utf-8");
  const inputAsArray = rawInput.split("\n");
  const iModules = inputAsArray.map(function (item) {
    return parseInt(item, 10);
  });
  return iModules;
};

/**
 * Part 1
 * @param numberArray list of expenses
 */
const find2020with2numbers = (numberArray: Array<number>) => {
  console.log("Finding 2 numbers that sum 2020");
  for (let i = 0; i < numberArray.length; i++) {
    const startNumber = numberArray[i];
    const numberSet = new Set(numberArray);
    numberSet.delete(startNumber);
    const diff = 2020 - startNumber;
    if (numberSet.has(diff)) {
      console.log(`${startNumber} + ${diff} is 2020`);
      console.log(startNumber * diff);
      return startNumber * diff;
    }
  }
};

/**
 * Part 2
 * @param numberArray list of expenses
 */
const find2020with3numbers = (numberArray: Array<number>) => {
  console.log("Finding 3 numbers that sum 2020");
  for (let i = 0; i < numberArray.length; i++) {
    const startNumber = numberArray[i];
    for (let j = i + 1; j < numberArray.length; j++) {
      const secondNumber = numberArray[j];
      if (secondNumber + startNumber < 2020) {
        const numberSet = new Set(numberArray);
        numberSet.delete(secondNumber);
        numberSet.delete(startNumber);
        const diff = 2020 - secondNumber - startNumber;
        if (numberSet.has(diff)) {
          console.log(`${secondNumber} + ${startNumber} + ${diff}`);
          console.log(secondNumber * startNumber * diff);
          return secondNumber * startNumber * diff;
        }
      }
    }
  }
};

find2020with2numbers(readModuleList(`${__dirname}/input.txt`));
find2020with3numbers(readModuleList(`${__dirname}/input.txt`));
