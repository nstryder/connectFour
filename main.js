/**
 * @description
 * The game Connect 4, playable in a browser.
 * Done to practice Typescript.
 *
 * I'm sorry this code is not OOP enough.
 * I didn't realize I needed it til I started using modules.
 *
 * @author nstryder
 * @version 1.0
 *
 */
/**
 * TODO?: Make custom options collapsible
 * TODO?: Add winning line highlight
 * TODO?: Add music
 * TODO?: Refactor into #real OOP
 */
// =============================================================================
// IMPORTS
// =============================================================================
import Column from "./classes/column.js";
import { Slot, FilledBy } from "./classes/slot.js";
import * as helper from "./classes/helper.js";
import DOM from "./classes/dom.js";
import StartMenu from "./classes/startMenu.js";
import EndMenu from "./classes/endMenu.js";
StartMenu.activate();
EndMenu.activate();
// =============================================================================
// VARIABLES
// =============================================================================
/** Number of rows in the game grid. */ var ROWS = 6;
/** Number of columns in the game grid. */ var COLS = 7;
/** Number of circles to connect for win */ var TO_WIN = 4;
/** Number of moves made */ var moves;
/** Clickable columns allowing player to drop a circle into the grid. */
const columns = [];
const Game = {};
// =============================================================================
// METHODS
// =============================================================================
// -----------------------------------------------------------------------------
// GAME PREPARATION
// -----------------------------------------------------------------------------
/**
 * Creates DOM grid for both the code and the UI (Default: 6 rows x 7 cols)
 */
function createGrid() {
    // Refresh DOM Grid
    DOM.grid.innerHTML = "";
    /** Respresents game board in code */
    Game.grid = helper.createArray2D(ROWS);
    // Create DOM columns (7 columns)
    for (let col = 0; col < COLS; ++col) {
        columns[col] = new Column(col);
        // Create DOM rows/Slots (6 rows)
        for (let row = 0; row < ROWS; ++row) {
            Game.grid[row][col] = new Slot();
            // Add a bunch of Slots to each column
            columns[col].element.appendChild(Game.grid[row][col].element);
        }
        // Add each column to the DOM Grid.
        DOM.grid.appendChild(columns[col].element);
    }
}
/** Adds click event listeners to each board column. */
function allowClickOnAllColumns() {
    columns.forEach(col => {
        col.addListen();
    });
    window.addEventListener('columnClick', handleColumnClick);
}
/** Removes all click event listeners on the board. */
function removeClickOnAllColumns() {
    columns.forEach(col => {
        col.removeListen();
    });
    window.removeEventListener('columnClick', handleColumnClick);
}
/**
 * Initializes a round of the game.
 */
export function gameInit(rows = ROWS, cols = COLS, connects = TO_WIN) {
    // Insert custom parameters
    ROWS = rows;
    COLS = cols;
    TO_WIN = connects;
    // Init game parameters
    moves = 0;
    Game.player = FilledBy.player1;
    Game.gameIsWon = false;
    createGrid();
    allowClickOnAllColumns();
    // Hide winners from previous rounds
    EndMenu.hide();
    // Show P1 as the active player
    DOM.boxP1.classList.add("currentPlayer");
    DOM.boxP2.classList.remove("currentPlayer");
}
// -----------------------------------------------------------------------------
// GAME CYCLE
// -----------------------------------------------------------------------------
/**
 * This is where the main game logic is handled.
 *
 * @param e The custom event holding the column index clicked
 */
function handleColumnClick(e) {
    let colIndex = e.detail.index;
    insertCircle(colIndex);
    // Check winner
    let winner = checkVictory();
    if (winner) {
        endGame(winner);
        return;
    }
    // Check for draw
    if (moves === (ROWS * COLS)) {
        endGame(FilledBy.none);
        return;
    }
    switchPlayers();
    // Check if top Slot is filled
    if (Game.grid[0][colIndex].state != FilledBy.none) {
        // Remove clickability of this column
        columns[colIndex].removeListen();
    }
}
/**
 * Drops a circle into the game board. Called upon clicking a column.
 *
 * @param colIndex Marks which column a circle will be dropped in
 */
function insertCircle(colIndex) {
    // Check for an open slot at this column
    for (let row = ROWS - 1; row >= 0; --row) {
        // If open, fill it
        if (Game.grid[row][colIndex].state === FilledBy.none) {
            Game.grid[row][colIndex].changeState(Game.player);
            ++moves;
            return;
        }
    }
}
/**
 * Switches between player 1 and player 2,
 * updating it to show in the page as well.
 */
function switchPlayers() {
    (Game.player === FilledBy.player1)
        ? Game.player = FilledBy.player2
        : Game.player = FilledBy.player1;
    [DOM.boxP1, DOM.boxP2].forEach(playerBox => {
        playerBox.classList.toggle("currentPlayer");
    });
}
/**
 * Scans the board for any connected lines in various directions.
 */
function checkVictory() {
    let winner;
    let checkFuncs = [checkRows, checkCols, checkDiags];
    for (let check of checkFuncs) {
        winner = check();
        if (winner)
            return winner;
    }
    return FilledBy.none;
}
/**
 * Handles post-win logic.
 *
 * @param winner The player with the winning line
 */
function endGame(winner) {
    // Remove all event listeners
    removeClickOnAllColumns();
    // Show end menu
    EndMenu.show();
    // Show victor in UI
    switch (winner) {
        case FilledBy.player1:
            DOM.winText.innerHTML = "Player 1 wins!";
            break;
        case FilledBy.player2:
            DOM.winText.innerHTML = "Player 2 wins!";
            break;
        default:
            DOM.winText.innerHTML = "Draw.";
            break;
    }
}
// -----------------------------------------------------------------------------
// WIN CHECK METHODS
// -----------------------------------------------------------------------------
/**
 * Goes through each row and finds adjacent horizontal lines.
 */
function checkRows() {
    // Go down the rows
    for (let y = 0; y < ROWS; ++y) {
        // Go right for each column (but stop [4] spaces before the end
        // for optimization)
        for (let x = 0; x < COLS - TO_WIN + 1; ++x) {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none)
                continue;
            if (rowHasLine(y, x))
                return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    return FilledBy.none; /* Reached if no matches found */
}
/** Checks for horizontal consecutively placed circles */
function rowHasLine(y, x) {
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count) {
        winFlag = winFlag &&
            (Game.grid[y][x + count].state ===
                Game.grid[y][x + count + 1].state);
        if (!winFlag)
            break;
    }
    return winFlag;
}
/**
 * Goes through each column and finds adjacent vertical lines.
 */
function checkCols() {
    // Go right for cols
    for (let x = 0; x < COLS; ++x) {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y) {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none)
                continue;
            if (colHasLine(y, x))
                return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    return FilledBy.none; /* Reached if no matches found */
}
/** Checks for vertical consecutively placed circles */
function colHasLine(y, x) {
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count) {
        winFlag = winFlag &&
            (Game.grid[y + count][x].state ===
                Game.grid[y + count + 1][x].state);
        if (!winFlag)
            break;
    }
    // Return winner if it exists
    return winFlag;
}
/**
 * Goes from Top-left to Bottom-right
 *
 * and Top-right to Bottom-left
 *
 * to check for any adjacent diagonal lines.
 */
function checkDiags() {
    /* Check Top Left to Bottom Right */
    // Go right for cols
    for (let x = 0; x < COLS - TO_WIN + 1; ++x) {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y) {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none)
                continue;
            if (diagHasLineSE(y, x))
                return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    /* Check Top Right to Bottom Left */
    // Go right for cols
    for (let x = COLS - 1; x >= TO_WIN - 1; --x) {
        // Go down for each row (but stop [4] spaces before the end
        // for optimization)
        for (let y = 0; y < ROWS - TO_WIN + 1; ++y) {
            // Guard statement
            if (Game.grid[y][x].state === FilledBy.none)
                continue;
            if (diagHasLineSW(y, x))
                return Game.grid[y][x].state;
        } // End of col iteration
    } // End of row iteration
    return FilledBy.none; /* Reached if no matches found */
}
/** Checks for consecutively placed circles from top-left to bottom-right.*/
function diagHasLineSE(y, x) {
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count) {
        winFlag = winFlag &&
            (Game.grid[y + count][x + count].state ===
                Game.grid[y + count + 1][x + count + 1].state);
        if (!winFlag)
            break;
    }
    // Return winner if it exists
    return winFlag;
}
/** Checks for consecutively placed circles from top-right to bottom-left. */
function diagHasLineSW(y, x) {
    /** Determines if circles are consecutive by comparing pairs each step */
    let winFlag = true;
    for (let count = 0; count < TO_WIN - 1; ++count) {
        winFlag = winFlag &&
            (Game.grid[y + count][x - count].state ===
                Game.grid[y + count + 1][x - count - 1].state);
        if (!winFlag)
            break;
    }
    // Return winner if it exists
    return winFlag;
}
