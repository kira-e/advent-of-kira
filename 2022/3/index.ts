import fs from "fs";
import _ from "lodash";

const input = fs.readFileSync("3/input", "utf-8");

const rows = input.split("\n").map((row) => row.trim());

// task 1
const intersectionsInBags = rows
  .flatMap((row) => {
    const bag1 = row.slice(0, row.length / 2);
    const bag2 = row.slice(row.length / 2);

    const bag1Set = new Set(bag1.split(""));
    const bag2Set = new Set(bag2.split(""));

    return [...bag1Set].filter((x) => bag2Set.has(x));
  })

const A = "A".charCodeAt(0);
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const charDistance = z - a;

const charToScore = (char: string) => {
  const charCode = char.charCodeAt(0);
  if (charCode >= a) {
    // then lowercase - they have higher ascii value
    return (a - charCode) * -1 + 1;
  }
  return (A - charCode) * -1 + 2 + charDistance;
};

const scoreSum = intersectionsInBags
  .map((char) => charToScore(char))
  .reduce((prev, curr) => prev + curr);

console.log(`char distance = ${charDistance}`);
console.log(`Task 1. Sum = ${scoreSum}`);

// task 2
const groupsScoreSum = _.chunk(rows, 3)
  .flatMap((chunk) =>
    _.intersection(...chunk.map((bag) => Array.from(new Set(bag.split("")))))
  )
  .map((intersectionChar) => charToScore(intersectionChar))
  .reduce((prev, curr) => prev + curr);

console.log(`Task 2. Groups' sum = ${groupsScoreSum}`);
