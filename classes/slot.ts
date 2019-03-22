/**
 * Represents a slot which holds a circle in Connect 4.
 */
export default class Slot
{
    /** "Enum" holding values for a Slot's state. */
    FilledBy = {
        none : 0,
        player1 : 1,
        player2 : 2
    }

    /** What a Slot is holding (Either P1 or P2's circle, or none) */
    state: number;

    /** Used to output the state of a slot to the window. */
    element: HTMLElement;

    /**
     * Initializes values and HTML element.
     * @constructor
     */
    constructor()
    {
        this.state = this.FilledBy.none;
        this.element = document.createElement("slot-");
    }
}