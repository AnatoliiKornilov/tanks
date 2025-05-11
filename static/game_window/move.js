export function moveUp(tank, fieldSize, playerTanks, enemyTanks, objects) {
    if (tank[2] != 0) {
        tank[2] = 0;
        return tank;
    }
    const columnNumber = tank[0];
    const rowNumber = tank[1];
    if (!checkObjects(columnNumber, rowNumber, fieldSize, objects, playerTanks, enemyTanks, 0)) {
        return tank;
    }
    --tank[1];
    return tank;
}

export function moveRight(tank, fieldSize, playerTanks, enemyTanks, objects) {
    if (tank[2] != 1) {
        tank[2] = 1;
        return tank;
    }
    const columnNumber = tank[0];
    const rowNumber = tank[1];
    if (!checkObjects(columnNumber, rowNumber, fieldSize, objects, playerTanks, enemyTanks, 1)) {
        return tank;
    }
    ++tank[0];
    return tank;
}

export function moveDown(tank, fieldSize, playerTanks, enemyTanks, objects) {
    if (tank[2] != 2) {
        tank[2] = 2;
        return tank;
    }
    const columnNumber = tank[0];
    const rowNumber = tank[1];
    if (!checkObjects(columnNumber, rowNumber, fieldSize, objects, playerTanks, enemyTanks, 2)) {
        return tank;
    }
    ++tank[1];
    return tank;
}

export function moveLeft(tank, fieldSize,  playerTanks, enemyTanks, objects) {
    if (tank[2] != 3) {
        tank[2] = 3;
        return tank;
    }
    const columnNumber = tank[0];
    const rowNumber = tank[1];
    if (!checkObjects(columnNumber, rowNumber, fieldSize, objects, playerTanks, enemyTanks, 3)) {
        return tank;
    }
    --tank[0];
    return tank;
}

function checkObjects(tankColumnNumber, tankRowNumber, fieldSize, objects, playerTanks, enemyTanks, direction) {
    // direction: 0, 1, 2, 3 - верх, право, низ, лево
    let checkRowNumber1 = 0;
    let checkColumnNumber1 = 0;
    let checkColumnNumber2 = 0;
    let checkRowNumber2 = 0;
    if (direction == 0) {
        checkRowNumber1 = tankRowNumber - 1;
        checkColumnNumber1 = tankColumnNumber;
        checkRowNumber2 = checkRowNumber1;
        checkColumnNumber2 = checkColumnNumber1 + 4;
    } else if (direction == 1) {
        checkRowNumber1 = tankRowNumber;
        checkColumnNumber1 = tankColumnNumber + 5;
        checkRowNumber2 = tankRowNumber + 4;
        checkColumnNumber2 = checkColumnNumber1;
    } else if (direction == 2) {
        checkRowNumber1 = tankRowNumber + 5;
        checkColumnNumber1 = tankColumnNumber;
        checkRowNumber2 = checkRowNumber1;
        checkColumnNumber2 = checkColumnNumber1 + 4;
    } else {
        checkRowNumber1 = tankRowNumber;
        checkColumnNumber1 = tankColumnNumber - 1;
        checkRowNumber2 = checkRowNumber1 + 4;
        checkColumnNumber2 = checkColumnNumber1;
    }
    if (checkColumnNumber1 < 0 || checkRowNumber1 < 0 || checkColumnNumber1 >= fieldSize * 5 || checkRowNumber1 >= fieldSize * 5) {
        return false;
    }
    if (checkColumnNumber2 < 0 || checkRowNumber2 < 0 || checkColumnNumber2 >= fieldSize * 5 || checkRowNumber2 >= fieldSize * 5) {
        return false;
    }
    const cellRowNumber1 = Math.floor(checkRowNumber1 / 5);
    const cellColumnNumber1 = Math.floor(checkColumnNumber1 / 5);
    const cellRowNumber2 = Math.floor(checkRowNumber2 / 5);
    const cellColumnNumber2 = Math.floor(checkColumnNumber2 / 5);
    if (!((objects[cellRowNumber1][cellColumnNumber1] == 0 || objects[cellRowNumber1][cellColumnNumber1] == -2) &&
        (objects[cellRowNumber2][cellColumnNumber2] == 0 || objects[cellRowNumber2][cellColumnNumber2] == -2))) {
        return false;
    }
    for (let i = 0; i < playerTanks.length; ++i) {
        if (playerTanks[i][3] <= 0) {
            continue;
        }
        const enemyTankLeftColumn = playerTanks[i][0];
        const enemyTankRightColumn = enemyTankLeftColumn + 4;
        const enemyTankUpRow = playerTanks[i][1];
        const enemyTankDownRow = enemyTankUpRow + 4;
        if (checkRowNumber1 >= enemyTankUpRow && checkRowNumber1 <= enemyTankDownRow &&
             checkColumnNumber1 >= enemyTankLeftColumn && checkColumnNumber1 <= enemyTankRightColumn) {
            return false;
        }
        if (checkRowNumber2 >= enemyTankUpRow && checkRowNumber2 <= enemyTankDownRow &&
             checkColumnNumber2 >= enemyTankLeftColumn && checkColumnNumber2 <= enemyTankRightColumn) {
            return false;
        }
    }
    for (let i = 0; i < enemyTanks.length; ++i) {
        if (enemyTanks[i][3] <= 0) {
            continue;
        }
        const enemyTankLeftColumn = enemyTanks[i][0];
        const enemyTankRightColumn = enemyTankLeftColumn + 4;
        const enemyTankUpRow = enemyTanks[i][1];
        const enemyTankDownRow = enemyTankUpRow + 4;
        if (checkRowNumber1 >= enemyTankUpRow && checkRowNumber1 <= enemyTankDownRow &&
             checkColumnNumber1 >= enemyTankLeftColumn && checkColumnNumber1 <= enemyTankRightColumn) {
            return false;
        }
        if (checkRowNumber2 >= enemyTankUpRow && checkRowNumber2 <= enemyTankDownRow &&
             checkColumnNumber2 >= enemyTankLeftColumn && checkColumnNumber2 <= enemyTankRightColumn) {
            return false;
        }
    }
    return true;
}
