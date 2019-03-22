/**
 * The clickable column in the Connect 4 grid.
 */
export default class Column 
{
    /** DOM element allowing interaction between UI and code */
    element: HTMLButtonElement;
    
    /** Default constructor. */
    constructor()
    {
        this.element = document.createElement("button");
        this.element.className = "vbox";
    }
}