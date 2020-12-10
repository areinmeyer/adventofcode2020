import { readModuleListAsString } from "../utils";

const getContainerBag = (rule: string) => {
  return rule.substring(0, rule.indexOf("bags")).trim();
};

const parseBagStr = (bagStr: string): { [index: string]: number } => {
  const bagObj: { [index: string]: number } = {};
  let bag = bagStr.trim();
  const num: number = parseInt(bag.substring(0, bag.indexOf(" ")), 10);
  const onlyBag: string = bag
    .substring(bag.indexOf(" "))
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
  if (bagStr.includes(",")) {
    const bagArr = bagStr.split(", ");
    bagArr.map((bag) => {
      const parsed = parseBagStr(bag);
      innerBags = { ...innerBags, ...parsed };
    });
    return innerBags;
  }
  return parseBagStr(bagStr);
};

const parseRules = (input: string[]) => {
  const allBags: { [index: string]: object } = {};
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
const findAllBags = (child: string, parent: string) => {
  if (!child) return;
  const THE_BAG = "shiny gold";
  const children = Object.keys(allBags[child]);

  if (children.length === 0) return;
  if (children.includes(THE_BAG)) {
    bags.add(parent);
  }

  for (let i = 0; i <= children.length; i++) {
    findAllBags(children[i], parent);
  }
};

// main logic
const allBags = parseRules(readModuleListAsString(`${__dirname}/input.txt`));

const bags = new Set();
const topLevel = Object.keys(allBags);
for (let i = 0; i <= topLevel.length; i++) {
  findAllBags(topLevel[i], topLevel[i]);
}
console.log(bags.size);
