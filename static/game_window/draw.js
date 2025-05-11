function drawObjects(context, cellSize, fieldSize, leftPadding, topPadding, images, objects) {
    for (let i = 0; i < fieldSize; ++i) {
        for (let j = 0; j < fieldSize; ++j) {
            const item = objects[i][j];
            const xCoord = leftPadding + j * cellSize;
            const yCoord = topPadding + i * cellSize;
            if (item == 0) {
                context.fillRect(xCoord, yCoord, cellSize, cellSize);
            } else if (item > 0) {
                context.drawImage(images["bricksImg"], xCoord, yCoord, cellSize, cellSize);
                drawNumber(context, cellSize, xCoord, yCoord, item);
            } else if (item == -1) {
                context.drawImage(images["indestructableWallImg"], xCoord, yCoord, cellSize, cellSize);
            } else if (item == -2) {
                context.drawImage(images["bushImg"], xCoord, yCoord, cellSize, cellSize);
            } else if (item == -3) {
                context.drawImage(images["waterImg"], xCoord, yCoord, cellSize, cellSize);
            } else {
                context.drawImage(images["eagleImg"], xCoord, yCoord, cellSize, cellSize);
            }
        }
    }
}

function drawBushes(context, cellSize, fieldSize, leftPadding, topPadding, images, objects) {
    for (let i = 0; i < fieldSize; ++i) {
        for (let j = 0; j < fieldSize; ++j) {
            const item = objects[i][j];
            const xCoord = leftPadding + j * cellSize;
            const yCoord = topPadding + i * cellSize;
            if (item == -2) {
                context.drawImage(images["bushImg"], xCoord, yCoord, cellSize, cellSize);
            }
        }
    }
}

function drawNumber(context, cellSize, xCoord, yCoord, number) {
    context.textAlign = 'center';
    context.textBaseLine = 'middle';
    context.fillStyle = 'black';
    const fontSize = cellSize * 0.7;
    context.font = `italic ${fontSize}px Verdana`;
    context.fillText(number.toString(), xCoord + cellSize * 0.5, yCoord + cellSize * 0.7);
}

function drawTanksAndBullets(context, cellSize, leftPadding, topPadding, images, playerTank, enemyTanks) {
    let image = null;
    const playerTankXCoord = playerTank[0][0];
    const playerTankYCoord = playerTank[0][1];
    const playerTankDirection = playerTank[0][2];
    if (playerTankDirection == 0) {
        image = images["playerTankUpImg"];
    } else if (playerTankDirection == 1) {
        image = images["playerTankRightImg"];
    } else if (playerTankDirection == 2) {
        image = images["playerTankDownImg"];
    } else {
        image = images["playerTankLeftImg"];
    }
    context.drawImage(image, leftPadding + playerTankXCoord * cellSize / 5, topPadding + playerTankYCoord * cellSize / 5, cellSize, cellSize);
    if (playerTank[0][4] == 1) {
        context.fillStyle = 'pink';
        context.fillRect(leftPadding + playerTank[0][5] * cellSize / 5, topPadding + playerTank[0][6] * cellSize / 5, cellSize / 5, cellSize / 5);
        context.fillStyle = 'black';
    }
    for (let i = 0; i < enemyTanks.length; ++i) {
        if (enemyTanks[i][3] <= 0) {
            continue;
        }
        const enemyTankXCoord = enemyTanks[i][0];
        const enemyTankYCoord = enemyTanks[i][1];
        const enemyTankDirection = enemyTanks[i][2];
        if (enemyTankDirection == 0) {
            image = images["enemyTankUpImg"];
        } else if (enemyTankDirection == 1) {
            image = images["enemyTankRightImg"];
        } else if (enemyTankDirection == 2) {
            image = images["enemyTankDownImg"];
        } else {
            image = images["enemyTankLeftImg"];
        }
        context.drawImage(image, leftPadding + enemyTankXCoord * cellSize / 5, topPadding + enemyTankYCoord * cellSize / 5, cellSize, cellSize);
        if (enemyTanks[i][4] == 1) {
            context.fillStyle = 'pink';
            context.fillRect(leftPadding + enemyTanks[i][5] * cellSize / 5, topPadding + enemyTanks[i][6] * cellSize / 5, cellSize / 5, cellSize / 5);
            context.fillStyle = 'black';
        }
    }
}

function drawDamageAndScore(context, cellSize, currentLevel, currentDamage, needDamage, score) {
    context.textAlign = 'left';
    context.textBaseLine = 'middle';
    context.fillStyle = 'black';
    const fontSize = cellSize * 0.7;
    context.font = `italic ${fontSize}px Verdana`;
    context.fillText("Уровень:", cellSize * 0.5 + cellSize * 0.5, cellSize * 0.5 + cellSize * 0.5)
    context.fillText(currentLevel.toString() + " / 5", cellSize * 0.5 + cellSize * 0.5, cellSize * 1.5 + cellSize * 0.5);
    context.fillText("Урон:", cellSize * 0.5 + cellSize * 0.5, cellSize * 2.5 + cellSize * 0.5)
    context.fillText(currentDamage.toString() + " / " + needDamage.toString(), cellSize * 0.5 + cellSize * 0.5, cellSize * 3.5 + cellSize * 0.5);
    context.fillText("Счёт:", cellSize * 0.5 + cellSize * 0.5, cellSize * 4.5 + cellSize * 0.5)
    context.fillText(score.toString(), cellSize * 0.5 + cellSize * 0.5, cellSize * 5.5 + cellSize * 0.5);
}

export function draw(context, cellSize, fieldSize, leftPadding, topPadding, images, objects, playerTank, enemyTanks, currentLevel, currentDamage, needDamage, score) {
    if (images == undefined) {
        return;
    }
    drawObjects(context, cellSize, fieldSize, leftPadding, topPadding, images, objects);
    drawTanksAndBullets(context, cellSize, leftPadding, topPadding, images, playerTank, enemyTanks);
    drawBushes(context, cellSize, fieldSize, leftPadding, topPadding, images, objects);
    drawDamageAndScore(context, cellSize, currentLevel, currentDamage, needDamage, score);
}
