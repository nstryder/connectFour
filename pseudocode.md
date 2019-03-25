# Game preparation:
1. Create game grid
- 1. Create each slot
- 2. Allow each column to be clicked

# Game cycle:
1. Player clicks on column
2. Column fires event indicating which column was clicked
3. Game receives event
4. Game inserts current player's circle
5. Game checks for victory (skip to [end state] upon win)
6. If column is full, remove clickability
7. Change current player
8. Go back to step 1

# End state
1. Game displays winner
2. Game removes all clickability
3. Game displays buttons to replay
4. On button click:
- 1. Reset grid and variables
- 2. Go back to step 1 of [Game breakdown]