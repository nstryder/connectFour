import DOM from "./dom.js";
import { gameInit } from "../main.js";
import StartMenu from "./startMenu.js";

const EndMenu =
{
    /**
     * Allows Post-win screen to listen for click events.
     */
    activate()
    {
        // Restart game button
        DOM.btRestart.onclick = () => { gameInit(); }

        // Return to main menu button
        DOM.btReturn.onclick = () =>
        {
            DOM.game.classList.add("hidden");
            StartMenu.show();
        }
    },

    /** Shows the post-win screen. */
    show() { DOM.endMenu.classList.remove("hidden"); },

    /** Hides the post-win screen. */
    hide() { DOM.endMenu.classList.add("hidden"); }
};
export default EndMenu;
