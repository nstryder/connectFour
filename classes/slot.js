/**
 * Represents a slot which holds a circle in Connect 4.
 */
export default class Slot {
    /**
     * Initializes values and HTML element.
     * @constructor
     */
    constructor() {
        /** "Enum" holding values for a Slot's state. */
        this.FilledBy = {
            none: 0,
            player1: 1,
            player2: 2
        };
        this.state = this.FilledBy.none;
        this.element = document.createElement("slot-");
    }
}
