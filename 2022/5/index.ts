import fs from "fs";
import _ from "lodash";

const input = fs.readFileSync("5/input", "utf-8");

const rows = input.split("\n\n")[1].split("\n");

const stacks = [
  ["D", "Z", "T", "H"],
  ["S", "C", "G", "T", "W", "R", "Q"],
  ["H", "C", "R", "N", "Q", "F", "B", "P"],
  ["Z", "H", "F", "N", "C", "L"],
  ["S", "Q", "F", "L", "G"],
  ["S", "C", "R", "B", "Z", "W", "P", "V"],
  ["J", "F", "Z"],
  ["Q", "H", "R", "Z", "V", "L", "D"],
  ["D", "L", "Z", "F", "N", "G", "H", "B"],
].map((stack) => stack.reverse());

const stacksTask2 = _.cloneDeep(stacks);

const moveRules = rows.map((row) =>
  row
    .replace("move", "")
    .replace("from ", "")
    .replace("to ", "")
    .trim()
    .split(" ")
    .map((value) => Number.parseInt(value))
);

// task 1
const moveCrates = (amount: number, from: number, to: number) => {
  for (let i = 0; i < amount; i++) {
    const movingCrate = stacks[from].pop();
    if (!movingCrate) {
      break;
    }
    stacks[to].push(movingCrate);
  }
};

moveRules.forEach((rules) => {
  moveCrates(rules[0], rules[1] - 1, rules[2] - 1);
});

const topCrates = stacks.map((stack) => stack.pop());

console.log(`Task 1: ${topCrates.join("")}`);

// task 2
const moveCrates9001 = (
  stacks: string[][],
  amount: number,
  from: number,
  to: number
) => {
  stacks[to] = stacks[to].concat(
    stacks[from].splice(stacks[from].length - amount)
  );
};
moveRules.forEach((rules) => {
  moveCrates9001(stacksTask2, rules[0], rules[1] - 1, rules[2] - 1);
});

const topCrates2 = stacksTask2.map((stack) => stack.pop());

console.log(`Task 2: ${topCrates2.join("")}`);
