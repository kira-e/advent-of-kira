import fs from "fs";

const input = fs.readFileSync("4/input", "utf-8");

const parseSection = (section: string) => {
  return section.split("-").map((x) => Number.parseInt(x));
};

const isInsideSection = (section: number[], target: number) => {
  return target >= section[0] && target <= section[1];
};

const isSectionInside = (sectionParent: number[], sectionChild: number[]) => {
  return (
    isInsideSection(sectionParent, sectionChild[0]) &&
    isInsideSection(sectionParent, sectionChild[1])
  );
};

console.log(`Given rows: ${input.split("\n").length}`);

// task 1
const fullyOverlapping = input
  .split("\n")
  .map((row) => row.split(","))
  .filter((pair) => {
    const section1 = parseSection(pair[0]);
    const section2 = parseSection(pair[1]);
    return (
      isSectionInside(section1, section2) || isSectionInside(section2, section1)
    );
  }).length;

console.log(`Fully overlapping: ${fullyOverlapping}`);

// task 2
const partiallyOverlapping = input
  .split("\n")
  .map((row) => row.split(","))
  .filter((pair) => {
    const section1 = parseSection(pair[0]);
    const section2 = parseSection(pair[1]);
    return (
      isInsideSection(section1, section2[0]) ||
      isInsideSection(section1, section2[1]) ||
      isInsideSection(section2, section1[0]) ||
      isInsideSection(section2, section1[1])
    );
  }).length;

console.log(`Partially overlapping: ${partiallyOverlapping}`);
