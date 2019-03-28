import DOM from "./dom.js";
import { gameInit } from "../main.js";
/**
 * The Start menu backend code which hides the menu and launches the game
 */
const StartMenu = {
    /**
     * Allows start menu controls to listen for events
     */
    activate() {
        DOM.btStart.onclick = () => {
            DOM.game.classList.remove("hidden");
            DOM.menu.classList.add("hidden");
            gameInit();
        };
    },
    show() { DOM.menu.classList.remove("hidden"); },
    hide() { DOM.menu.classList.add("hidden"); }
};
export default StartMenu;
