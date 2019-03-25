/**
 * Represents a slot which holds a circle in Connect 4.
 */
export class Slot
{
    /** What a Slot is holding (Either P1 or P2's circle, or none) */
    state: FilledBy;

    /** Used to output the state of a slot to the window. */
    element: HTMLElement;

    /**
     * Initializes values and HTML element.
     * @constructor
     */
    constructor()
    {
        this.state = FilledBy.none;
        this.element = document.createElement("slot-");
    }

    /**
     * Fills in the circle based on current player
     * @param player The game's current player
     */
    changeState(player: FilledBy)
    {
        this.state = player;
        (player === FilledBy.player1) 
        ? this.element.className = "filledByPlayer1"
        : this.element.className = "filledByPlayer2"
    }
}

/** "Enum" holding values for a Slot's state. */
export enum FilledBy
{
    none,
    player1,
    player2
}