/**
 * The clickable column in the Connect 4 grid.
 */
//import sounds from "../sounds.js"
//const sfx = new Audio(sounds.woosh); 
export default class Column {
    /** Default constructor. */
    constructor(index) {
        this.element = document.createElement("button");
        this.element.className = "vbox";
        this.index = index;
    }
    /** Allows column to be clicked so it can send index info to game */
    addListen() {
        // Attach column's index to new event for game to process
        let columnClickEvent = new CustomEvent('columnClick', {
            detail: {
                index: this.index
            }
        });
        // Fire event (and sound) on click
        this.element.onclick = () => {
            window.dispatchEvent(columnClickEvent);
            console.log(`Event dispatched with index: ${this.index}`);
            //sfx.currentTime = 0;
            //sfx.play();
        };
        // Reflect in UI
        this.element.classList.add("canBeClicked");
    }
    /** Removes clickability of column for when it gets filled */
    removeListen() {
        this.element.onclick = null;
        this.element.classList.remove("canBeClicked");
    }
}
