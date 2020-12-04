import { readModuleListAsNumber } from '../utils'

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

find2020with2numbers(readModuleListAsNumber(`${__dirname}/input.txt`));
find2020with3numbers(readModuleListAsNumber(`${__dirname}/input.txt`));
