/**
 * The game Connect 4, playable in a browser.
 * Done to practice Typescript.
 * 
 * [Game breakdown]:
 * 1. Player clicks on column
 * 2. Column fires event indicating which column was clicked
 * 3. Game receives event
 * 4. Game inserts current player's circle
 * 5. Game checks for victory (skip to [end state] upon win)
 * 6. If column is full, remove clickability
 * 7. Change current player
 * 8. Go back to step 1
 * 
 * [End state]
 * 1. Game displays winner
 * 2. Game removes all clickability
 * 3. Game displays buttons to replay
 * 4. On button click:
 * 4a. Reset grid and variables
 * 4b. Go back to step 1 of [Game breakdown]
 *  
 * @author nstryder
 * @version 0.1
 * 
 */

// =============================================================================
// IMPORTS
// =============================================================================
import Column from "./classes/column.js";
import Slot from "./classes/slot.js";
import * as helper from "./helper.js";

// =============================================================================
// CONSTANTS
// =============================================================================

/** Number of rows in the game grid. */     const ROWS = 6; 
/** Number of columns in the game grid. */  const COLS = 7;

// =============================================================================
// OBJECTS
// =============================================================================

/** Holds all HTML DOM elements. */
const DOM = 
{
    grid: document.getElementById("grid")
};

/** Holds various game variables */
const Game =
{
    player : 1,
    gameIsWon : false
};

// =============================================================================
// VARS
// =============================================================================

/** Represents game grid in code. */
const grid: Slot[][] = helper.createArray2D(ROWS);

/** Clickable columns allowing player to drop a circle into the grid. */
const columns = [];

// =============================================================================
// BEGIN
// =============================================================================

/* Create DOM grid for both the code and the UI (7 x 6) */
// Create DOM columns (7 columns)
for (let col = 0; col < COLS; ++col)
{
    columns[col] = new Column();
    // Create DOM rows (6 rows)
    for (let row = 0; row < ROWS; ++row)
    {
        grid[row][col] = new Slot();

        // Add a bunch of Slots to each column
        columns[col].element.appendChild(grid[row][col].element);

        
    }

    // Add each column to the Grid.
    DOM.grid.appendChild(columns[col].element);
}

function dropCircle()