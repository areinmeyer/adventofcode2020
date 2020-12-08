import { readModuleListAsString } from "../utils";

/**
 * Break the groupings of data into distinct passports.
 * A blank line indicates the start of a new passport
 * @param input input file split into lines for each array element
 */
const getDistinctPassports = (input: string[]) => {
  const passports = [];
  let current = "";
  for (let i = 0; i <= input.length; i++) {
    const row = input[i] || "";
    if (row.trim() === "") {
      passports.push(current.trim());
      current = "";
    } else {
      current = current.concat(" ", row);
    }
  }
  return passports;
};

/**
 * the hcl field should start with '#' then have 6 characters that
 * consist of only a-f or 0-9
 * @param input the hcl value
 */
const isHCLValid = (input: string) => {
  if (input[0] !== "#") return false;
  const test = input.slice(1);
  if (test.length !== 6) return false;
  const letterMatch = test.match(/[^a-f0-9]/);
  return !(letterMatch && letterMatch.length > 0);
};

/**
 * Check each passport for required and valid fields.
 * Split the passport string into a Map of fields
 * Then check for the presence of required fields
 * Then check each required field conforms to valid data
 * Make a list of the invalid fields.
 * If 1 or more invalid/missing fields are present, fail the check
 * @param passport_data
 */
const passportIsValid = (passport_data: string) => {
  const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    "cid",
  ];
  const rows = passport_data.split(" ");
  const fields = new Map();
  rows.map((field: string) => {
    const group = field.split(":");
    fields.set(group[0], group[1]);
  });

  const missingFields = requiredFields.filter((reqField) => {
    if (!fields.has(reqField) && reqField !== "cid") {
      return true;
    }
    if (fields.has(reqField)) {
      const value = fields.get(reqField);
      switch (reqField) {
        case "byr":
          const byr = parseInt(value, 10);
          return !(byr >= 1920 && byr <= 2002);
        case "iyr":
          const iyr = parseInt(value, 10);
          return !(iyr >= 2010 && iyr <= 2020);
        case "eyr":
          const eyr = parseInt(value, 10);
          return !(eyr >= 2020 && eyr <= 2030);
        case "hgt":
          const measure = value.substring(value.length - 2);
          const numStr = parseInt(value.replace(measure, ""), 10);
          if (measure === "cm") {
            return !(numStr >= 150 && numStr <= 193);
          }
          if (measure === "in") {
            return !(numStr >= 59 && numStr <= 76);
          }
          return true;
        case "hcl":
          return !isHCLValid(value);
        case "ecl":
          const valid = new Set([
            "amb",
            "blu",
            "brn",
            "gry",
            "grn",
            "hzl",
            "oth",
          ]);
          return !valid.has(value);
        case "pid":
          return !(value.length === 9 && value.match(/\d/));
      }
    }
  });
  return missingFields.length === 0;
};

const people: string[] = getDistinctPassports(
  readModuleListAsString(`${__dirname}/input.txt`)
);

let totalCount = 0;

/*
 * Reduce the list of passports into a count of which are valid.
*/
let validCount: number = people.reduce((validCount, person) => {
  totalCount++;
  if (passportIsValid(person)) {
    validCount++;
  }
  return validCount;
}, 0);
console.log(`Valid # of passports: ${validCount} out of ${totalCount}`);
