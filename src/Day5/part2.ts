import { readModuleListAsString } from "../utils";

const takeLowerBound = (rows: number[]) => {
  const half = rows.length / 2;
  return rows.slice(0, half);
};
const takeUpperBound = (rows: number[]) => {
  const half = rows.length / 2;
  return rows.slice(half);
};

const getSeatRow = (binaryIndicator: string, rows: number[]): number[] => {
  if (binaryIndicator.length === 1) {
    return binaryIndicator === "F"
      ? takeLowerBound(rows)
      : takeUpperBound(rows);
  }
  const newRows =
    binaryIndicator[0] === "F" ? takeLowerBound(rows) : takeUpperBound(rows);
  return getSeatRow(binaryIndicator.slice(1), newRows);
};

const getSeat = (binaryIndicator: string, rows: number[]): number[] => {
  if (binaryIndicator.length === 1) {
    return binaryIndicator === "R"
      ? takeUpperBound(rows)
      : takeLowerBound(rows);
  }
  const newRows =
    binaryIndicator[0] === "L" ? takeLowerBound(rows) : takeUpperBound(rows);
  return getSeat(binaryIndicator.slice(1), newRows);
};

const getSeatLocation = (boardingPass: string): number[] => {
  const rowList = boardingPass.slice(0, 7);
  const seatList = boardingPass.slice(boardingPass.length - 3);
  const row = getSeatRow(rowList, [...Array(128).keys()]);
  const seat = getSeat(seatList, [...Array(8).keys()]);
  return [row[0], seat[0]];
};

const processBoardingPasses = (input: string[]) => {
  const allSeats = Array.from(Array(128), () => Array(8).fill(""));
  const seatIDs = input.map((pass) => {
    const location: number[] = getSeatLocation(pass);
    // console.log(`seat is ${location[0]} ${location[1]}`);
    return location;
  });

  for (let i = 0; i < seatIDs.length; i++) {
    const seat = seatIDs[i];
    const x = seat[0];
    const y = seat[1];
    allSeats[x][y] = "X";
  }
  let mySeatID = 0;
  let previousSeat = '';
  allSeats.filter((seats, rowNum) => {
    // console.log(seats)
    seats.map((seat, seatNum) => {
      if (seat === "" && previousSeat !== seat) {
        const merged = seats.join("").trim();

        if (merged !== "" && !mySeatID) {
          mySeatID = rowNum * 8 + seatNum;
          return true;
        }
      }
      previousSeat = seat;
    });
  });
  console.log(mySeatID)
};

processBoardingPasses(readModuleListAsString(`${__dirname}/input.txt`));
