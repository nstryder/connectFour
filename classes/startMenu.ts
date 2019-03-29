import DOM from "./dom.js";
import {gameInit} from "../main.js";

const MenuDOM = 
{
    rows: document.getElementById("tfRows") as HTMLInputElement,
    cols: document.getElementById("tfCols") as HTMLInputElement ,
    connects: document.getElementById("tfConnect") as HTMLInputElement,
    color1: document.getElementById("tfColor1") as HTMLInputElement,
    color2: document.getElementById("tfColor2") as HTMLInputElement,
    html: document.getElementsByTagName('html')[0]
};

/**
 * The Start menu backend code which hides the menu and launches the game
 */
const StartMenu =
{
    /**
     * Allows start menu controls to listen for events
     */
    activate() 
    {
        DOM.btStart.onclick = () =>
        {
            let rows = parseInt(MenuDOM.rows.value);
            let cols = parseInt(MenuDOM.cols.value);
            let connects = parseInt(MenuDOM.connects.value);

            if(StartMenu.validate(rows, cols, connects))
            {
                StartMenu.start(rows, cols, connects);
            }
        };
    },

    /**
     * Transitions from start menu to game and starts it 
     */
    start(rows, cols, connects)
    {
        // Grab color values
        MenuDOM.html.style.setProperty("--p1Color", MenuDOM.color1.value);
        MenuDOM.html.style.setProperty("--p2Color", MenuDOM.color2.value);
        
        // Transition screens
        DOM.game.classList.remove("hidden");
        DOM.menu.classList.add("hidden");
        gameInit(rows, cols, connects);
    },

    /**
     * Grabs user-input from the form and checks for validity.
     */
    validate(rows, cols, connects): boolean
    {
        if ((isNaN(rows))
        ||  (isNaN(cols))
        ||  (isNaN(connects))
        ||  (rows < 1)
        ||  (cols < 1)
        ||  (connects > rows)
        &&  (connects > cols))
        {
            return false;
        }
        else {return true};
    },

    /** Shows the start menu. */
    show() { DOM.menu.classList.remove("hidden"); },

    /** Hides the start menu. */
    hide() { DOM.menu.classList.add("hidden"); }
};
export default StartMenu;