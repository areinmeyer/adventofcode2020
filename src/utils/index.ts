import { readFileSync } from "fs";
/*
    Read the puzzleInput as a string then split it into an array
    Create a new array converting the strings to ints.
    A more robust version would make sure the parseInt function doesn't blow up
*/
export const readModuleListAsNumber = (filename: string) => {
  const rawInput = readFileSync(filename, "utf-8");
  const inputAsArray = rawInput.split("\n");
  const iModules = inputAsArray.map(function (item) {
    return parseInt(item, 10);
  });
  return iModules;
};

/*
    Read the puzzleInput as a string then split it into an array
*/
export const readModuleListAsString = (filename: string) => {
  const rawInput = readFileSync(filename, "utf-8");
  const inputAsArray = rawInput.split("\n");
  return inputAsArray;
};