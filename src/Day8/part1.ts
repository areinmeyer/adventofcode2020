import { readModuleListAsString } from "../utils";

const readProgram = (input: string[]) => {
  const opTracker = new Map();
  let accumulator = 0;
  let iPointer = 0;
  let fullAction = input[0].split(" ");
  let action = fullAction[0];
  while (!opTracker.get(iPointer) && (opTracker.get(iPointer) || 0) <= 1) {
    if (!opTracker.has(iPointer)) {
      opTracker.set(iPointer, 1);
    } else {
      opTracker.set(iPointer, opTracker.get(iPointer) + 1);
    }

    const modifier = fullAction[1];
    const sign = modifier[0];
    const number = parseInt(modifier.slice(1), 10);
    switch (action) {
      case "nop":
        iPointer += 1;
        break;
      case "acc":
        if (sign === "+") accumulator += number;
        else accumulator -= number;
        iPointer += 1;
        break;
      case "jmp":
        if (sign === "+") iPointer += number;
        else iPointer -= number;
        break;
    }
    fullAction = input[iPointer].split(" ");
    action = fullAction[0];
  }
  console.log(`accumulator: ${accumulator}`);
  return accumulator;
};

readProgram(readModuleListAsString(`${__dirname}/input.txt`));
