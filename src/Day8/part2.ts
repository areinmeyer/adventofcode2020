import { readModuleListAsString } from "../utils";

const updateInput = (input: string[], updatedOp: number) => {
  const currentOp = input[updatedOp];
  const evalOp = currentOp.split(" ")[0];
  switch (evalOp) {
    case "nop":
      input[updatedOp] = currentOp.replace("nop", "jmp");
      break;

    case "jmp":
      input[updatedOp] = currentOp.replace("jmp", "nop");
      break;
    default:
      break;
  }
  return input;
};
const updateProgram = (input: string[]) => {
  let result = "";

  let updatedOp = 0;
  while (result !== "finished" && updatedOp <= input.length - 1) {
    if (input[updatedOp].match("nop") || input[updatedOp].match("jmp")) {
      const testInput = updateInput(input.slice(0), updatedOp);
      let result = readProgram(testInput);
      if (result.result === "finished") {
        console.log(`accumulator got to ${result.accumulator}`);
        break;
      }
    }
    updatedOp += 1;
  }
};

const readProgram = (input: string[]) => {
  const opTracker = new Map();
  let accumulator = 0;
  let iPointer = 0;
  let fullAction = input[0].split(" ");
  let action = fullAction[0];
  do {
    fullAction = input[iPointer].split(" ");
    action = fullAction[0];
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
  } while (
    !opTracker.get(iPointer) &&
    (opTracker.get(iPointer) || 0) <= 1 &&
    iPointer < input.length - 1
  );
  console.log(`accumulator: ${accumulator}`);
  const result = iPointer >= input.length - 1 ? "finished" : "infinite";
  return {result, accumulator};
};

updateProgram(readModuleListAsString(`${__dirname}/input.txt`));
