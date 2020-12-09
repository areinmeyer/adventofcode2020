import { readModuleListAsString } from "../utils";

const defineGroups = (input: string[]) => {
  const groups = [];
  let current = "";
  for (let i = 0; i <= input.length; i++) {
    const row = input[i] || "";
    if (row.trim() === "") {
      current = current.trim().replace(/\s*/g, "");
      groups.push(current.trim());
      current = "";
    } else {
      current = current.concat(" ", row);
    }
  }
  return groups;
};

const countYes = (group: string) => {
  const distinct = new Set([...group.split("")]);
  return distinct.size;
};
const groups = defineGroups(readModuleListAsString(`${__dirname}/input.txt`));

const yesCounts: number[] = groups.map((group) => {
  return countYes(group);
});

const totalYes = yesCounts.reduce((total: number, count) => {
  return total + count;
}, 0);
console.log(`Yes totals are ${totalYes}`);
