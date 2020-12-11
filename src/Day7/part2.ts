import { readModuleListAsString } from "../utils";

const getContainerBag = (rule: string) => {
  return rule.substring(0, rule.indexOf("bags")).trim();
};

const parseBagStr = (bagStr: string): { [index: string]: number } => {
  const bagObj: { [index: string]: number } = {};
  let bag = bagStr.trim();
  const num: number = parseInt(bag.substring(0, bag.indexOf(" ")), 10);
  console.log(bag);
  const onlyBag: string = bag
    .substring(bag.indexOf(" ") + 1)
    .replace("bags", "")
    .replace("bag", "")
    .replace(".", "")
    .trim();
  bagObj[onlyBag] = num;
  return bagObj;
};

const getBagsWithin = (rule: string): { [index: string]: number } => {
  let innerBags = {};
  const bagStr = rule
    .substring(rule.indexOf("contain") + "contain".length)
    .trim();
  if (bagStr === "no other bags.") {
    return innerBags;
  }
  const bagArr = bagStr.split(", ");
  bagArr.map((bag) => {
    const parsed = parseBagStr(bag);
    innerBags = { ...innerBags, ...parsed };
  });
  return innerBags;
};

const parseRules = (input: string[]) => {
  const allBags: { [index: string]: { [index: string]: number } } = {};
  input.map((rule) => {
    const containerBag = getContainerBag(rule);
    const insideBags: { [index: string]: number } = getBagsWithin(rule);
    allBags[containerBag] = insideBags;
  });

  return allBags;
};

/**
 * Go thru each level of bags.  Have to keep a reference to the top level bag and add that.
 */
const findAllBags = (bag: string, parentBagNum = 1) => {
  if (!bag) return;
  const listOfBags = Object.keys(allBags[bag]);

  if (listOfBags.length === 0) return;
  const innerBags: { [index: string]: number } = allBags[bag];

  listOfBags.map((innerBag) => {
    const bagNum = (innerBags[innerBag] || 0) * parentBagNum;
    totalCount += bagNum;
    findAllBags(innerBag, bagNum);
  });
};

// main logic
const allBags = parseRules(readModuleListAsString(`${__dirname}/input.txt`));
const bags = new Set();
let totalCount = 0;
findAllBags("shiny gold");
console.log("total bags in shiny gold are: ", totalCount);
