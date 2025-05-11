import { moveUp, moveRight, moveDown, moveLeft } from "./move.js";
import { moveBullets } from "./bullet.js";
import { moveBots } from "./bot.js";

export function doActions(fieldSize, playerTank, enemyTanks, buttons, objects) {
    if (buttons['ArrowUp']) {
        playerTank[0] = moveUp(playerTank[0], fieldSize, playerTank, enemyTanks, objects);
    }
    if (buttons['ArrowRight']) {
        playerTank[0] = moveRight(playerTank[0], fieldSize, playerTank, enemyTanks, objects);
    }
    if (buttons['ArrowDown']) {
        playerTank[0] = moveDown(playerTank[0], fieldSize, playerTank, enemyTanks, objects);
    }
    if (buttons['ArrowLeft']) {
        playerTank[0] = moveLeft(playerTank[0], fieldSize, playerTank, enemyTanks, objects);
    }
    if (buttons['KeyZ']) {
        shoot(playerTank[0]);
    }
    moveBots(fieldSize, playerTank, enemyTanks, objects);
    for (let i = 0; i < enemyTanks.length; ++i) {
        const tank = enemyTanks[i];
        const isShooting = Math.abs(Math.floor(Math.random() * 10000)) % 5;
        if (isShooting == 1 && tank[3] > 0) {
            shoot(tank);
        }
    }
    for (let i = 0; i < 2; ++i) {
        moveBullets(fieldSize, objects, playerTank, enemyTanks);
    }
}

function shoot(tank) {
    if (tank[4] == 1) {
        return;
    }
    tank[4] = 1;
    if (tank[2] == 0) {
        tank[7] = 0;
        tank[5] = tank[0] + 2;
        tank[6] = tank[1];
    } else if (tank[2] == 1) {
        tank[7] = 1;
        tank[5] = tank[0] + 4;
        tank[6] = tank[1] + 2;
    } else if (tank[2] == 2) {
        tank[7] = 2;
        tank[5] = tank[0] + 2;
        tank[6] = tank[1] + 4;
    } else {
        tank[7] = 3;
        tank[5] = tank[0];
        tank[6] = tank[1] + 2;
    }
    return;
}
