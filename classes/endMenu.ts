import DOM from "./dom.js";
import { gameInit } from "../main.js";
import StartMenu from "./startMenu.js";

const EndMenu =
{
    activate()
    {
        DOM.btRestart.onclick = () => { gameInit(); }

        DOM.btReturn.onclick = () =>
        {
            DOM.game.classList.add("hidden");
            StartMenu.show();
        }
    },

    show() { DOM.endMenu.classList.remove("hidden"); },
    hide() { DOM.endMenu.classList.add("hidden"); }
};
export default EndMenu;
