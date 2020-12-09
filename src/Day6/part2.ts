import { readModuleListAsString } from "../utils";

const defineGroups = (input: string[]) => {
  const groups = [];
  let current = [];
  for (let i = 0; i <= input.length; i++) {
    const row = input[i] || "";
    if (row.trim() === "") {
      groups.push(current);
      current = [];
    } else {
      current.push(row.split(""));
    }
  }
  return groups;
};

const countYes = (group: string[][]) => {
  console.log(group);
  const users = group.length;
  const userMap = new Map();
  for (let i = 0; i < group.length; i++) {
    group[i].forEach((answer) => {
      if (userMap.has(answer)) userMap.set(answer, userMap.get(answer) + 1);
      else userMap.set(answer, 1);
    });
  }
  let totalCount = 0;
  userMap.forEach((answer) => {
    if (answer === users) totalCount++;
  });
  return totalCount;
};

const groups = defineGroups(readModuleListAsString(`${__dirname}/input.txt`));

const yesCounts = groups.map((group) => {
  return countYes(group);
});

const totalYes = yesCounts.reduce((total: number, count) => {
  return total + count;
}, 0);
console.log(`Yes totals are ${totalYes}`);
