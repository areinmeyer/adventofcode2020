import { readFileSync } from 'fs'
/*
    Read the puzzleInput as a string then split it into an array
    Create a new array converting the strings to ints.
    A more robust version would make sure the parseInt function doesn't blow up
*/
const readModuleList = (filename: string) => {
    const rawInput = readFileSync(filename, 'utf-8')
    const inputAsArray = rawInput.split('\n')
    const iModules = inputAsArray.map(function (item) {
        return parseInt(item, 10)
    })
    // console.log(iModules)
    return iModules
}


const find2020with2numbers = (numberArray: Array<number>) => {
    numberArray.forEach(element => {
        const clonedArray = new Set([...numberArray])
        clonedArray.delete(element);
        [...clonedArray].map(num => {
            if (num + element === 2020 ) {
                console.log(`${num} + ${element} is 2020`);
                console.log(num * element)
                return num * element;
            }
        })

    });
}

const find2020with3numbers = (numberArray: Array<number>) => {
    numberArray.forEach(element => {
        const clonedArray = new Set([...numberArray])
        clonedArray.delete(element);
        [...clonedArray].map(num => {
            if (num + element < 2020 ) {
                const smallerArray = new Set([...clonedArray])
                smallerArray.delete(num);
                [...smallerArray].map(thirdNum => {
                    if (num + element + thirdNum === 2020) {
                        console.log(`${num} + ${element} + ${thirdNum}`)
                        console.log(num * element * thirdNum)
                    }
                })
                return num * element;
            }
        })

    });
}

find2020with2numbers(readModuleList(`${__dirname}/input.txt`));
find2020with3numbers(readModuleList(`${__dirname}/input.txt`));