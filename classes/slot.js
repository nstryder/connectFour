/**
 * Represents a slot which holds a circle in Connect 4.
 */
export class Slot {
    /**
     * Initializes values and HTML element.
     * @constructor
     */
    constructor() {
        this.state = FilledBy.none;
        this.element = document.createElement("slot-");
    }
    /**
     * Fills in the circle based on current player
     * @param player The game's current player
     */
    changeState(player) {
        this.state = player;
        (player === FilledBy.player1)
            ? this.element.className = "filledByPlayer1"
            : this.element.className = "filledByPlayer2";
    }
}
/** "Enum" holding values for a Slot's state. */
export var FilledBy;
(function (FilledBy) {
    FilledBy[FilledBy["none"] = 0] = "none";
    FilledBy[FilledBy["player1"] = 1] = "player1";
    FilledBy[FilledBy["player2"] = 2] = "player2";
})(FilledBy || (FilledBy = {}));
