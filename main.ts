/**
 * @description
 * The game Connect 4, playable in a browser.
 * Done to practice Typescript.
 *  
 * @author nstryder
 * @version 0.1
 * 
 */

 /**
  * TODO: Start on menus and  polish victory
  */

// =============================================================================
// IMPORTS
// =============================================================================
import Column from "./classes/column.js";
import {Slot, FilledBy} from "./classes/slot.js";
import * as helper from "./helper.js";

// =============================================================================
// CONSTANTS
// =============================================================================

/** Number of rows in the game grid. */     const ROWS = 6; 
/** Number of columns in the game grid. */  const COLS = 7;
/** Number of circles to connect for win */ const TO_WIN = 4;        

// =============================================================================
// OBJECTS
// =============================================================================

/** Holds all HTML DOM elements. */
const DOM = 
{
    grid: document.getElementById("grid")
};

/** Holds various game variables */
interface IGame
{
    player? : FilledBy,
    gameIsWon? : boolean,
    /** 
     * 2D array representing connect 4 board. 
     * 
     * Traversed using [row][col] or (y, x).
     */
    grid?: Slot[][]
}
const Game: IGame = {};


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
 */
function createGrid()
{
    // Create DOM columns (7 columns)
    for (let col = 0; col < COLS; ++col)
    {
        columns[col] = new Column(col);
        // Create DOM rows/Slots (6 rows)
        for (let row = 0; row < ROWS; ++row)
        {
            Game.grid[row][col] = new Slot();

            // Add a bunch of Slots to each column
            columns[col].element.appendChild(Game.grid[row][col].element);
        }

        // Add each column to the DOM Grid.
        DOM.grid.appendChild(columns[col].element);
    }
}

function allowClickOnAllColumns()
{
    columns.forEach(col => {
        col.addListen();
    });
}

function gameInit()
{
    Game.player = FilledBy.player1;
    Game.gameIsWon = false;
    createGrid();
    allowClickOnAllColumns();
    
    // Listen for column index info
    window.addEventListener('columnClick', handleColumnClick);

}

gameInit();

// -----------------------------------------------------------------------------
// GAME CYCLE
// -----------------------------------------------------------------------------

function handleColumnClick(e: CustomEvent)
{
    console.log("== DROP BEGIN ==")
    let colIndex: number = e.detail.index;

    insertCircle(colIndex);

    checkVictory();

    switchPlayers();

    // Check if top Slot is filled
    if (Game.grid[0][colIndex].state != FilledBy.none)
    {
        console.log(`column ${colIndex} has been filled`);
        // Remove clickability of this column
        columns[colIndex].removeListen();
    }
}

function insertCircle(colIndex: number)
{
    // Check for an open slot at this column
    for (let row = ROWS - 1; row >= 0; --row)
    {
        // If open, fill it
        if (Game.grid[row][colIndex].state === FilledBy.none)
        {
            Game.grid[row][colIndex].changeState(Game.player);
            return;
        }
    }
}

function switchPlayers()
{
    (Game.player === FilledBy.player1) 
    ? Game.player = FilledBy.player2
    : Game.player = FilledBy.player1
}

function checkVictory()
{
    let winner: FilledBy;
    winner = checkRows();
    if (winner) { console.log("WINNER!: " + winner); return;} 
    winner = checkCols();
    if (winner) { console.log("WINNER!: " + winner); return;} 
    winner = checkDiags();
    if (winner) { console.log("WINNER!: " + winner); return;} 
}

function checkRows(): FilledBy
{
    // Go down the rows
    for (let y = 0; y < ROWS; ++y)
    {
        // Go right for each column (but stop [4] spaces before the end
        // for optimization)
        for (let x = 0; x < COLS - TO_WIN + 1; ++x)
        {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none) continue;
            if (scanRow(y, x)) return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    return FilledBy.none; /* Reached if no matches found */
}

/** Checks for consecutively placed circles */
function scanRow(y: number, x: number): boolean
{
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count)
    {
        winFlag = winFlag &&
            (Game.grid[y][x + count].state === 
            Game.grid[y][x + count + 1].state)
        if (!winFlag) break;
    }
    return winFlag;
}

function checkCols(): FilledBy
{
    // Go right for cols
    for (let x = 0; x < COLS; ++x)
    {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y)
        {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none) continue;
            if (scanCol(y, x)) return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    return FilledBy.none; /* Reached if no matches found */
}

/** Checks for consecutively placed circles */
function scanCol(y: number, x: number): boolean
{
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count)
    {
        winFlag = winFlag &&
            (Game.grid[y + count][x].state === 
            Game.grid[y + count + 1][x].state)
        if (!winFlag) break;
    }
    // Return winner if it exists
    return winFlag;
}

function checkDiags(): FilledBy
{
    /* Check Top Left to Bottom Right */
    // Go right for cols
    for (let x = 0; x < COLS - TO_WIN + 1; ++x)
    {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y)
        {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none) continue;
            if (scanDiagSE(y, x)) return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration

    /* Check Top Right to Bottom Left */
    // Go right for cols
    for (let x = COLS - 1; x >= TO_WIN - 1; --x)
    {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y)
        {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none) continue;
            if (scanDiagSW(y, x)) return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration

    return FilledBy.none; /* Reached if no matches found */
}

/** Checks for consecutively placed circles */
function scanDiagSE(y: number, x: number): boolean
{
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count)
    {
        winFlag = winFlag &&
            (Game.grid[y + count][x + count].state === 
            Game.grid[y + count + 1][x + count + 1].state)
        if (!winFlag) break;
    }
    // Return winner if it exists
    return winFlag;
}

function scanDiagSW(y: number, x: number): boolean
{
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count)
    {
        console.log(`before: ${winFlag} | coords: ${y+count},${x-count} | orig: ${Game.grid[y + count][x - count].state} next: ${Game.grid[y + count + 1][x - count - 1].state}`);
        winFlag = winFlag &&
            (Game.grid[y + count][x - count].state === 
            Game.grid[y + count + 1][x - count - 1].state)
        if (!winFlag) break;
    }
    // Return winner if it exists
    return winFlag;
}