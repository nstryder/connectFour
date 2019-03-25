/**
 * @description
 * The game Connect 4, playable in a browser.
 * Done to practice Typescript.
 *
 * @author nstryder
 * @version 0.1
 *
 */
// =============================================================================
// IMPORTS
// =============================================================================
import Column from "./classes/column.js";
import { Slot, FilledBy } from "./classes/slot.js";
import * as helper from "./helper.js";
// =============================================================================
// CONSTANTS
// =============================================================================
/** Number of rows in the game grid. */ const ROWS = 6;
/** Number of columns in the game grid. */ const COLS = 7;
// =============================================================================
// OBJECTS
// =============================================================================
/** Holds all HTML DOM elements. */
const DOM = {
    grid: document.getElementById("grid")
};
const Game = {};
// =============================================================================
// VARS
// =============================================================================
/** Represents game grid in code. */
Game.grid = helper.createArray2D(ROWS);
/** Clickable columns allowing player to drop a circle into the grid. */
const columns = [];
// =============================================================================
// METHODS
// =============================================================================
// -----------------------------------------------------------------------------
// GAME PREPARATION
// -----------------------------------------------------------------------------
/**
 * Creates DOM grid for both the code and the UI (Default: 6 rows x 7 cols)
 *
 * @param gridRows Number of rows in the grid
 * @param gridCols Number of columns in the grid
 */
function createGrid(gridRows, gridCols) {
    // Create DOM columns (7 columns)
    for (let col = 0; col < gridCols; ++col) {
        columns[col] = new Column(col);
        // Create DOM rows/Slots (6 rows)
        for (let row = 0; row < gridRows; ++row) {
            Game.grid[row][col] = new Slot();
            // Add a bunch of Slots to each column
            columns[col].element.appendChild(Game.grid[row][col].element);
        }
        // Add each column to the DOM Grid.
        DOM.grid.appendChild(columns[col].element);
    }
}
function allowClickOnAllColumns(columns) {
    columns.forEach(col => {
        col.addListen();
    });
}
function gameInit() {
    createGrid(ROWS, COLS);
    allowClickOnAllColumns(columns);
    // Listen for column index info
    window.addEventListener('columnClick', handleColumnClick);
}
gameInit();
// -----------------------------------------------------------------------------
// GAME CYCLE
// -----------------------------------------------------------------------------
function handleColumnClick(e) {
    let colIndex = e.detail.index;
    insertCircle(Game, colIndex, ROWS);
    // Check if top Slot is filled
    if (Game.grid[0][colIndex].state != FilledBy.none) {
        console.log(`column ${colIndex} has been filled`);
        // Remove clickability of this column
        columns[colIndex].removeListen();
    }
}
function insertCircle(Game, colIndex, rows) {
    // Check for an open slot at this column
    for (let row = rows - 1; row >= 0; --row) {
        // If open, fill it and switch players
        if (Game.grid[row][colIndex].state === FilledBy.none) {
            Game.grid[row][colIndex].changeState(Game.player);
            switchPlayers(Game);
            return;
        }
    }
}
function switchPlayers(Game) {
    (Game.player === FilledBy.player1)
        ? Game.player = FilledBy.player2
        : Game.player = FilledBy.player1;
}
