import { moveUp, moveRight, moveDown, moveLeft } from "./move.js";

export function moveBots(fieldSize, playerTank, enemyTanks, objects) {
    for (let i = 0; i < enemyTanks.length; ++i) {
        const tankCurrentColumn = enemyTanks[i][0];
        const tankCurrentRow = enemyTanks[i][1];
        const currentDirection = enemyTanks[i][2];
        if (currentDirection == 0) {
            enemyTanks[i] = moveUp(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else if (currentDirection == 1) {
            enemyTanks[i] = moveRight(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else if (currentDirection == 2) {
            enemyTanks[i] = moveDown(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else {
            enemyTanks[i] = moveLeft(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        }
        if (!(tankCurrentColumn == enemyTanks[i][0] && tankCurrentRow == enemyTanks[i][1])) {
            continue;
        }
        const direction = Math.abs(Math.floor(Math.random() * 10000)) % 4;
        if (direction == 0) {
            enemyTanks[i] = moveUp(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
            enemyTanks[i] = moveUp(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else if (direction == 1) {
            enemyTanks[i] = moveRight(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
            enemyTanks[i] = moveRight(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else if (direction == 2) {
            enemyTanks[i] = moveDown(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
            enemyTanks[i] = moveDown(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        } else {
            enemyTanks[i] = moveLeft(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
            enemyTanks[i] = moveLeft(enemyTanks[i], fieldSize, enemyTanks, playerTank, objects);
        }
    }
}
