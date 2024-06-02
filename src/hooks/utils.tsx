export function bandStopRandom() {
  const randomValue = Math.random();

  if (randomValue < 0.5) {
    return randomValue * -20 - 10;
  } else {
    return randomValue * 20 + 10; // Generates a number between 10 and 30
  }
}
