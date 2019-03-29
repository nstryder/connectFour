import DOM from "./dom.js";
import { gameInit } from "../main.js";
const MenuDOM = {
    rows: document.getElementById("tfRows"),
    cols: document.getElementById("tfCols"),
    connects: document.getElementById("tfConnect"),
    color1: document.getElementById("tfColor1"),
    color2: document.getElementById("tfColor2")
};
/**
 * The Start menu backend code which hides the menu and launches the game
 */
const StartMenu = {
    /**
     * Allows start menu controls to listen for events
     */
    activate() {
        DOM.btStart.onclick = () => {
            let rows = parseInt(MenuDOM.rows.value);
            let cols = parseInt(MenuDOM.cols.value);
            let connects = parseInt(MenuDOM.connects.value);
            if (StartMenu.validate(rows, cols, connects)) {
                console.log("yay");
                StartMenu.start(rows, cols, connects);
            }
        };
    },
    start(rows, cols, connects) {
        DOM.game.classList.remove("hidden");
        DOM.menu.classList.add("hidden");
        gameInit(rows, cols, connects);
    },
    /** hewwo */
    validate(rows, cols, connects) {
        console.log(isNaN(rows));
        console.log(isNaN(cols));
        console.log(isNaN(connects));
        console.log(connects > rows);
        console.log(connects > cols);
        if ((isNaN(rows))
            || (isNaN(cols))
            || (isNaN(connects))
            || (connects > rows)
            || (connects > cols)) {
            return false;
        }
        else {
            return true;
        }
        ;
    },
    show() { DOM.menu.classList.remove("hidden"); },
    hide() { DOM.menu.classList.add("hidden"); }
};
export default StartMenu;
