import { eagleIsDead } from "./game.js";

export function moveBullets(fieldSize, objects, playerTank, enemyTanks) {
    if (playerTank[0][4] == 1) {
        moveBullet(fieldSize, objects, playerTank[0], playerTank, enemyTanks);
    }
    for (let i = 0; i < enemyTanks.length; ++i) {
        if (enemyTanks[i][4] == 1 && enemyTanks[i][3] > 0) {
            moveBullet(fieldSize, objects, enemyTanks[i], enemyTanks, playerTank);
        }
    }
}

function moveBullet(fieldSize, objects, tank, playerTanks, enemyTanks) {
    let bulletColumn = tank[5];
    let bulletRow = tank[6];
    let bulletDirection = tank[7];
    if (bulletDirection == 0) {
        --bulletRow;
    } else if (bulletDirection == 1) {
        ++bulletColumn;
    } else if (bulletDirection == 2) {
        ++bulletRow;
    } else {
        --bulletColumn;
    }
    if (bulletColumn <= 0 || bulletColumn >= fieldSize * 5 || bulletRow <= 0 || bulletRow >= fieldSize * 5) {
        tank[4] = 0;
        tank[5] = -1;
        tank[6] = -1;
        tank[7] = -1;
        return;
    }
    if (checkTanksAndBullets(bulletColumn, bulletRow, tank, playerTanks, enemyTanks)) {
        if (checkObjects(bulletColumn, bulletRow, tank, objects)) {
            tank[5] = bulletColumn;
            tank[6] = bulletRow;
        }
    }
}

function checkTanksAndBullets(bulletColumn, bulletRow, tank, playerTanks, enemyTanks) {
    for (let i = 0; i < playerTanks.length; ++i) {
        if (playerTanks[i][3] <= 0) {
            continue;
        }
        const tankLeftColumn = playerTanks[i][0];
        const tankRightColumn = tankLeftColumn + 4;
        const tankUpRow = playerTanks[i][1];
        const tankDownRow = tankUpRow + 4;
        if (bulletColumn >= tankLeftColumn && bulletColumn <= tankRightColumn && bulletRow >= tankUpRow && bulletRow <= tankDownRow) {
            tank[4] = 0;
            tank[5] = -1;
            tank[6] = -1;
            tank[7] = -1;
            return false;
        }
        if (playerTanks[i][4] == 1) {
            if (bulletColumn == playerTanks[i][5] && bulletRow == playerTanks[i][6]) {
                tank[4] = 0;
                tank[5] = -1;
                tank[6] = -1;
                tank[7] = -1;
                playerTanks[i][4] = 0;
                playerTanks[i][5] = -1;
                playerTanks[i][6] = -1;
                playerTanks[i][7] = -1;
                return false;
            }
        }
    }
    for (let i = 0; i < enemyTanks.length; ++i) {
        if (enemyTanks[i][3] <= 0) {
            continue;
        }
        const tankLeftColumn = enemyTanks[i][0];
        const tankRightColumn = tankLeftColumn + 4;
        const tankUpRow = enemyTanks[i][1];
        const tankDownRow = tankUpRow + 4;
        if (bulletColumn >= tankLeftColumn && bulletColumn <= tankRightColumn && bulletRow >= tankUpRow && bulletRow <= tankDownRow) {
            tank[4] = 0;
            tank[5] = -1;
            tank[6] = -1;
            tank[7] = -1;
            --enemyTanks[i][3];
            return false;
        }
        if (enemyTanks[i][4] == 1) {
            if (bulletColumn == enemyTanks[i][5] && bulletRow == enemyTanks[i][6]) {
                tank[4] = 0;
                tank[5] = -1;
                tank[6] = -1;
                tank[7] = -1;
                enemyTanks[i][4] = 0;
                enemyTanks[i][5] = -1;
                enemyTanks[i][6] = -1;
                enemyTanks[i][7] = -1;
                return false;
            }
        }
    }
    return true;
}

function checkObjects(bulletColumn, bulletRow, tank, objects) {
    const cellColumn = Math.floor(bulletColumn / 5);
    const cellRow = Math.floor(bulletRow / 5);
    if (objects[cellRow][cellColumn] > 0) {
        --objects[cellRow][cellColumn];
        tank[4] = 0;
        tank[5] = -1;
        tank[6] = -1;
        tank[7] = -1;
        return false;
    }
    if (objects[cellRow][cellColumn] == -1) {
        tank[4] = 0;
        tank[5] = -1;
        tank[6] = -1;
        tank[7] = -1;
        return false;
    }
    if (objects[cellRow][cellColumn] == -4) {
        eagleIsDead['eagleIsDead'] = true;
        tank[4] = 0;
        tank[5] = -1;
        tank[6] = -1;
        tank[7] = -1;
        return false;
    }
    return true;
}
