import { readModuleListAsNumber } from "../utils";

const loop = (input: number[], preambleCount: number) => {
  let preamble = input.slice(0, preambleCount);
  let sumValues = input.slice(preambleCount);

  let badValue = 0;
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
      badValue = element;
      break;
    }

    preamble.shift();
    preamble = preamble.concat(element);
  }
  let adder = 0;
  let addList: number[] = [];
  for (let l = 0; l < input.length; l++) {
    let k = l;
    while (k < input.length) {
      adder += input[k];
      addList.push(input[k]);
      k++;

      if (adder === badValue) {
        addList.sort((a, b) => a - b);
        return addList[0] + addList[addList.length - 1];
      }
      if (adder > badValue) {
        adder = 0;
        addList = [];
        break;
      }
    }
  }
};
const badValue = loop(readModuleListAsNumber(`${__dirname}/input.txt`), 25);
console.log(`The encryption weakness is ${badValue}`);
