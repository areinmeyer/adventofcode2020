import { readModuleListAsString } from "../utils";

const countTreesInGrid = (grid: Array<string>) => {
  const grid3d = grid.map((row) => row.split(""));
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const treeCount = slopes.map(([x,y]) => {
    return countTrees(grid3d, x, y);
  });
  const answer = treeCount.reduce((total: number, trees) => {
    return total * trees;
  });
  console.log(answer);
  return answer;
};

const countTrees = (grid3d: string[][], x: number, y: number) => {
  const gridLength = grid3d[0].length;
  let trees = 0;
  let current_x = x;
  let current_y = y;
  do {
    if (grid3d[current_y][current_x] === "#") trees++;
    current_x =
      current_x + x < gridLength ? current_x + x : current_x + x - gridLength;
    current_y += y;
  } while (current_y < grid3d.length);
  console.log(`Tree count is ${trees}`);
  return trees;
};

countTreesInGrid(readModuleListAsString(`${__dirname}/input.txt`));
