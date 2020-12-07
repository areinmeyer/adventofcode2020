
import { readModuleListAsString } from '../utils'

const countTreesInGrid = (grid: Array<string>) => {

    const grid3d = grid.map(row => row.split(''));
    const gridLength = grid3d[0].length;
    let x = 3, y = 1;
    let trees = 0;
    do {
        if (grid3d[y][x] === '#')
            trees++;
        x = x + 3 < gridLength ? x + 3 : x + 3 - gridLength;
        y += 1;
    } while (y < grid3d.length )
    console.log(`Tree count is ${trees}`)
    return trees;

}

countTreesInGrid(readModuleListAsString(`${__dirname}/input.txt`));