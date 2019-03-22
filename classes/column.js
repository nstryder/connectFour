/**
 * The clickable column in the Connect 4 grid.
 */
export default class Column {
    /** Default constructor. */
    constructor() {
        this.element = document.createElement("button");
        this.element.className = "vbox";
    }
}
