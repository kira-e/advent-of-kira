import fs from "fs";

const input = fs.readFileSync("2/input", "utf-8");

enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

enum Winner {
  OPPONENT = "OPPONENT",
  PLAYER = "PLAYER",
  DRAW = "DRAW",
}

const shapesMap = new Map([
  ["A", Shape.ROCK],
  ["X", Shape.ROCK],
  ["B", Shape.PAPER],
  ["Y", Shape.PAPER],
  ["C", Shape.SCISSORS],
  ["Z", Shape.SCISSORS],
]);

const shapesPoints = new Map([
  [Shape.ROCK, 1],
  [Shape.PAPER, 2],
  [Shape.SCISSORS, 3],
]);

const gameResultPoints = new Map([
  [ Winner.DRAW, 3],
  [ Winner.OPPONENT, 0],
  [ Winner.PLAYER, 6],
]);


const loosingShapeMap = new Map([
  [Shape.ROCK, Shape.SCISSORS],
  [Shape.PAPER, Shape.ROCK],
  [Shape.SCISSORS, Shape.PAPER],
]);

const winningShapeMap = new Map<Shape,Shape>(Array.from(loosingShapeMap.entries()).map(([shape1, shape2]: [Shape, Shape]) => [shape2, shape1]));

const findStrategyShape = (opponent: Shape, playerCode: string) => {
  // X - need to lose
  // Y - need a draw
  // Z - need to win
  if (playerCode ==='X') {
    return loosingShapeMap.get(opponent);
  }
  if (playerCode === 'Y') {
    return opponent;
  } 
  if (playerCode === 'Z') {
    return winningShapeMap.get(opponent);
  }
  throw new Error(`Player code ${playerCode} is not supported`);
}

const decideWinner = (opponent: Shape, player: Shape) => {
  if (opponent === player) {
    return Winner.DRAW;
  }

  if (loosingShapeMap.get(opponent) === player) {
    return Winner.OPPONENT;
  } else {
    return Winner.PLAYER;
  }
};

const games = input
  .split("\n")
  .map((row) => row.split(" ")
    .map(shape => shape.trim()));


// task 1
const points1 = games.map((shapes) => {
  const elfShape = shapesMap.get(shapes[0]);
  const playerShape = shapesMap.get(shapes[1]);

  const winner = decideWinner(elfShape, playerShape);
  
  const playerPoints = shapesPoints.get(playerShape) + gameResultPoints.get(winner);

  // console.log(`>Elf: ${elfShape} vs Player: ${playerShape}`)
  // console.log(`Game winner: ${winner}`);
  // console.log(`Points earned: ${playerPoints}`);
  
  return playerPoints;
}).reduce((prev, curr) => prev+curr);

console.log(`Task1: Total player points: ${points1}`);

// task 2
const points2 = games.map((shapes) => {
  const elfShape = shapesMap.get(shapes[0]);
  const playerShape = findStrategyShape(elfShape, shapes[1]);

  const winner = decideWinner(elfShape, playerShape);
  
  const playerPoints = shapesPoints.get(playerShape) + gameResultPoints.get(winner);

  // console.log(`>Elf: ${elfShape} vs Player: ${shapes[1]} ${playerShape}`)
  // console.log(`Game winner: ${winner}`);
  // console.log(`Points earned: ${playerPoints}`);
  
  return playerPoints;
}).reduce((prev, curr) => prev+curr);

console.log(`Task2: Total player points: ${points2}`);
