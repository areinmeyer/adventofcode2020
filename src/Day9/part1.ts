import { readModuleListAsNumber } from "../utils";

const loop = (input: number[], preambleCount: number) => {
  let preamble = input.slice(0, preambleCount);
  let sumValues = input.slice(preambleCount);

  for (let i = 0; i < sumValues.length; i++) {
    const element = sumValues[i];

    let badCount = 0;
    for (let j = 0; j < preamble.length; j++) {
      const first = preamble[j];
      const diff = element - first;
      const preMap = new Set([...preamble]);
      if (!preMap.has(diff)) {
        badCount++;
      }
    }
    if (badCount === preamble.length) {
      return element;
    }

    preamble.shift();
    preamble = preamble.concat(element);
  }
};
const badValue = loop(readModuleListAsNumber(`${__dirname}/input.txt`), 25);
console.log(`The first bad value is ${badValue}`)
