import fs from "fs";

const input = fs.readFileSync("1/input", "utf-8");

const elvesCalories: number[] = [];

const values = input.split("\n");

let currentSum = 0;
for (let i = 0; i < values.length; i++) {
  if (values[i].trim().length === 0) {
    elvesCalories.push(currentSum);
    currentSum = 0;
    continue;
  }

  currentSum += Number.parseInt(values[i]);

  if (i + 1 === values.length) {
    elvesCalories.push(currentSum);
  }
}

const sortedElvesCalories = elvesCalories.sort((a, b) => b - a);

console.log(`1.1. Top 1: ${sortedElvesCalories[0]}`);
const sumTop3 = sortedElvesCalories
  .slice(0, 3)
  .reduce((prev, curr) => prev + curr, 0);
console.log(`1.2. Top 3 sum: ${sumTop3}`);
