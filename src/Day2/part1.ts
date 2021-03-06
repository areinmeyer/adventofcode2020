import { readModuleListAsString } from '../utils'

const countValidPasswords = (input: Array<string>) => {
    const passwords = parseInput(input);
    const validPasswords = passwords.filter(password => {
        let matchCount = 0;
        const letterRE = new RegExp(password.letter, 'g');
        const matches = password.password.matchAll(letterRE);
        for (const match of matches) {
            matchCount++;
        }
        return matchCount >= password.range[0] && matchCount <= password.range[1];
    });
    console.log(`There are ${validPasswords.length} valid passwords!`);
    return validPasswords.length;
}

/**
 * Passwords come in format 1-3 a: xxxxx
 * Number range is frequency of occurrence expected.
 * the letter after the range is the letter expected within the prior range
 * final token is the password itself.
 * @param input
 */
const parseInput = (input: Array<string>) => {
    return input.map(passInstructions => {
        const tokens = passInstructions.split(" ");
        const range = tokens[0].split("-").map(num => parseInt(num,10));

        return {
            range,
            letter: tokens[1].replace(':',''),
            password: tokens[2]
        }
    })
}
countValidPasswords(readModuleListAsString(`${__dirname}/input.txt`))