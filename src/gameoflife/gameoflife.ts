import fs from 'fs';
import {randomInt} from "crypto";
import {Input, promptContinue, promptForInput} from "./prompt";
import {printGeneration} from "./print";
import {Grid, GridLine} from "./types";

runGameOfLife();

async function runGameOfLife() {
    const input = await promptForInput();
    await cycleGenerations(input);
}

async function cycleGenerations(input: Input): Promise<void> {
    let generation = 0;
    let grid = buildInitialGrid(input);
    printGeneration(generation, grid);

    while (await promptContinue()) {
        grid = nextGeneration(grid);
        printGeneration(++generation, grid);
    }
}

function buildInitialGrid({inputMode, gridHeight, gridWidth}: Input) {
    if (inputMode === 'r') {
        return spawnRandomGrid(gridHeight, gridWidth);
    } else {
        return readInputFileAsGrid(`src/gameoflife/input${inputMode}.txt`);
    }
}

function spawnRandomGrid(gridHeight: number, gridWidth: number): Grid {
    const randomGrid: Grid = [];

    for (let h = 0; h < gridHeight; h++) {
        const randomGridLine: GridLine = [];

        for (let w = 0; w < gridWidth; w++) {
            randomGridLine.push(randomInt(0, 10) > 7); // 30% change of a live cell
        }

        randomGrid.push(randomGridLine);
    }

    return randomGrid;
}

function readInputFileAsGrid(path: string): Grid {
    const fileContent = fs.readFileSync(path).toString();
    const stringGrid = fileContent
        .split('\n')
        .map(line => line.split(''));
    return stringGrid.map(gridLine => gridLine.map(cell => cell === '*'));
}

function nextGeneration(previousGrid: Grid): Grid {
    const newGrid: Grid = [];

    previousGrid.forEach((gridLine, lineIndex) => {
        const newGridLine: GridLine = [];

        gridLine.forEach((cell, columnIndex) => {
            const neighboursAlive: number = countNeighboursAlive(previousGrid, lineIndex, columnIndex);
            switch (neighboursAlive) {
                case 2:
                    newGridLine.push(cell);
                    break;
                case 3:
                    newGridLine.push(true);
                    break;
                default:
                    newGridLine.push(false);
            }
        });

        newGrid.push(newGridLine);
    });

    return newGrid;
}

function countNeighboursAlive(grid: Grid, lineIndex: number, columnIndex: number) {
    let count = 0;

    for (let i = lineIndex - 1; i <= lineIndex + 1; i++) {
        for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
            if (i !== lineIndex || j !== columnIndex) {
                const cellWithinBoundariesAndAlive = grid[i] && grid[i][j];
                count = count + (cellWithinBoundariesAndAlive ? 1 : 0);
            }
        }
    }

    return count;
}
