import {Grid} from "./types";

export function printGeneration(generation: number, grid: Grid): void {
    console.clear();
    printHeader(generation);
    printBoundaries(grid);
    printGrid(grid);
}

function printHeader(generation: number): void {
    console.log(generation === 0 ? 'Start:' : `Generation ${generation}:`);
}

function printBoundaries(grid: Grid): void {
    console.log(grid.length + ' ' + grid[0].length);
}

function printGrid(grid: Grid): void {
    grid.forEach(gridLine => console.log(gridLine.map(cell => cell ? '*' : '.').join('')));
}
