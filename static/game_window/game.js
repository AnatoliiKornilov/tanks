import { draw } from "./draw.js";
import { doActions } from "./actions.js";
import { level1Objects, level1PlayerTank, level1EnemyTanks } from "./levels.js";
import { level2Objects, level2PlayerTank, level2EnemyTanks } from "./levels.js";
import { level3Objects, level3PlayerTank, level3EnemyTanks } from "./levels.js";
import { level4Objects, level4PlayerTank, level4EnemyTanks } from "./levels.js";
import { level5Objects, level5PlayerTank, level5EnemyTanks } from "./levels.js";
import { getLevelNeedDamage, getScore } from "./levels.js";

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}

async function preloadAllImages() {
    const imagePaths = {
        "bricksImg": "/static/images/bricks.png",
        "bushImg": "/static/images/bush.png",
        "indestructableWallImg": "/static/images/indestructable_wall.png",
        "waterImg": "/static/images/water.png",
        "eagleImg": "/static/images/eagle.png",
        "playerTankUpImg": "/static/images/player_tank_up.png",
        "playerTankRightImg": "/static/images/player_tank_right.png",
        "playerTankDownImg": "/static/images/player_tank_down.png",
        "playerTankLeftImg": "/static/images/player_tank_left.png",
        "enemyTankUpImg": "/static/images/enemy_tank_up.png",
        "enemyTankRightImg": "/static/images/enemy_tank_right.png",
        "enemyTankDownImg": "/static/images/enemy_tank_down.png",
        "enemyTankLeftImg": "/static/images/enemy_tank_left.png"
    };
    const images = {};
    const loadPromises = [];

    for (const [key, path] of Object.entries(imagePaths)) {
        const promise = loadImage(path)
            .then(img => {
                images[key] = img;
            });
        loadPromises.push(promise);
    }
    await Promise.all(loadPromises);
    
    return images;
}

function isDefeat() {
    if (eagleIsDead['eagleIsDead'] || currentLevelPlayerTank[0][3] <= 0) {
        return true;
    }
    return false;
}

function isVictory() {
    if (currentLevelDamage == currentLevelNeedDamage) {
        return true;
    }
    return false;
}

function nextLevel() {
    ++currentLevel;
    eagleIsDead['eagleIsDead'] = false;
    if (currentLevel == 1) {
        currentLevelObjects = level1Objects;
        currentLevelPlayerTank = level1PlayerTank;
        currentLevelEnemyTanks = level1EnemyTanks;
    } else if (currentLevel == 2) {
        currentLevelObjects = level2Objects;
        currentLevelPlayerTank = level2PlayerTank;
        currentLevelEnemyTanks = level2EnemyTanks;
    } else if (currentLevel == 3) {
        currentLevelObjects = level3Objects;
        currentLevelPlayerTank = level3PlayerTank;
        currentLevelEnemyTanks = level3EnemyTanks;
    } else if (currentLevel == 4) {
        currentLevelObjects = level4Objects;
        currentLevelPlayerTank = level4PlayerTank;
        currentLevelEnemyTanks = level4EnemyTanks;
    } else if (currentLevel == 5) {
        currentLevelObjects = level5Objects;
        currentLevelPlayerTank = level5PlayerTank;
        currentLevelEnemyTanks = level5EnemyTanks;
    }
    currentLevelNeedDamage = getLevelNeedDamage(currentLevelEnemyTanks);
}

function gameLoop(currentTime) {
    currentLevelDamage = currentLevelNeedDamage - getLevelNeedDamage(currentLevelEnemyTanks);
    score = getScore(previousLevelsScore, currentLevelNeedDamage, currentLevelEnemyTanks);
    if (currentLevel >= 6) {
        localStorage.setItem('finalScore', score.toString());
        window.location.href = "/save_score";
        return;
    }
    if (currentTime - lastTime < frameDelay) {
        requestAnimationFrame(gameLoop);
        return;
    }
    if (isDefeat()) {
        previousLevelsScore = score;
        nextLevel();
    } else if (isVictory()) {
        previousLevelsScore = score + 1000;
        nextLevel();
    } else {
        doActions(fieldSize, currentLevelPlayerTank, currentLevelEnemyTanks, buttons, currentLevelObjects);
        lastTime = currentTime;
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw(context, cellSize, fieldSize, leftPadding, topPadding, images,
            currentLevelObjects, currentLevelPlayerTank, currentLevelEnemyTanks, currentLevel, currentLevelDamage, currentLevelNeedDamage, score);
    }
    requestAnimationFrame(gameLoop);
}

const canvas = document.getElementById("field");
const screenWidth = window.screen.width - 100;
const screenHeight = window.screen.height - 150;
canvas.width = screenWidth;
canvas.height = screenHeight;
const fieldSize = 10;
let context = canvas.getContext("2d");
const cellSize = Math.floor(Math.min(screenWidth, screenHeight) / fieldSize);
const leftPadding = (screenWidth - fieldSize * cellSize) / 2;
const topPadding = (screenHeight - fieldSize * cellSize) / 2;

const buttons = {'ArrowUp': false, 'ArrowRight': false, 'ArrowDown': false, 'ArrowLeft': false, 'KeyZ': false};

window.addEventListener('keydown', (e) => {
    if (e.code in buttons) {
        buttons[e.code] = true;
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code in buttons) {
        buttons[e.code] = false;
        e.preventDefault();
    }
});

let lastTime = 0;
const frameRate = 60;
const frameDelay = 1000 / frameRate * 6;
const images = await preloadAllImages();
export const eagleIsDead = {'eagleIsDead': false};

let currentLevel = 0;
let currentLevelObjects = [[]];
let currentLevelPlayerTank = [[]];
let currentLevelEnemyTanks = [[]];
let currentLevelNeedDamage = -1;
let currentLevelDamage = -1;
let previousLevelsScore = 0;
let score = 0;

nextLevel();
requestAnimationFrame(gameLoop);
