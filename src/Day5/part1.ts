import { readModuleListAsString } from "../utils";

const takeLowerBound = (rows: number[]) => {
    const half = rows.length / 2;
    return rows.slice(0,half);
}
const takeUpperBound = (rows: number[]) => {
    const half = rows.length / 2;
    return rows.slice(half);
}

const getSeatRow = (binaryIndicator: string, rows: number[]): number[] => {

    if (binaryIndicator.length === 1) {
        return binaryIndicator === 'F' ? takeLowerBound(rows) : takeUpperBound(rows);
    }
    const newRows = binaryIndicator[0] === 'F' ? takeLowerBound(rows) : takeUpperBound(rows);
    return getSeatRow(binaryIndicator.slice(1), newRows);
}

const getSeat = (binaryIndicator: string, rows: number[]): number[] => {

    if (binaryIndicator.length === 1) {
        return binaryIndicator === 'R' ? takeUpperBound(rows) : takeLowerBound(rows);
    }
    const newRows = binaryIndicator[0] === 'L' ? takeLowerBound(rows) : takeUpperBound(rows);
    return getSeat(binaryIndicator.slice(1), newRows);
}

const getSeatID = (boardingPass: string) => {
  const rowList = boardingPass.slice(0, 7);
  const seatList = boardingPass.slice(boardingPass.length - 3);
  const row = getSeatRow(rowList, [...Array(128).keys()]);
  const seat = getSeat(seatList, [...Array(8).keys()])
  const seatID = row[0] * 8 + seat[0];
  return seatID;
};

const processBoardingPasses = (input: string[]) => {
  const seatIDs = input.map((pass) => {
    return getSeatID(pass);
  });
  const seatID = seatIDs.reduce((seatID, next) => {
      return seatID >= next ? seatID : next;
  });
  console.log(seatID);
  return seatID;
};

processBoardingPasses(readModuleListAsString(`${__dirname}/input.txt`));
