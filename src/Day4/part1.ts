import { readModuleListAsString } from "../utils";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
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

const passportIsValid = (passport_data: string) => {
  const rows = passport_data.split(" ");
  const fields = new Map();
  rows.map((field: string) => {
    const group = field.split(":");
    fields.set(group[0], group[1]);
  });

  const missingFields = requiredFields.filter((reqField) => {
    return (!fields.has(reqField) && reqField !== "cid");
  });

  return missingFields.length === 0;
};

const people: string[] = getDistinctPassports(
  readModuleListAsString(`${__dirname}/input.txt`)
);
let totalCount = 0;
let validCount: number = people.reduce((validCount, person) => {
  totalCount++;
  if (passportIsValid(person)) {
    validCount++;
  }
  return validCount;
}, 0);
console.log(`Valid # of passports: ${validCount} out of ${totalCount}`);
//TODO: Have MAP of fields, now need to validate against list and see which are valid.
