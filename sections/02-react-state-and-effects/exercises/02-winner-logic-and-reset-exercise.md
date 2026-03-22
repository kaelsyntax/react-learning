# Exercise 02: Winner Logic and Reset

## Goal

Implement game-result logic (winner or draw) and reset behavior using state-driven UI updates.

## Concepts Practiced

- Derived state vs stored state
- Pure helper functions
- Static constants outside components
- Full-state validation with `every`
- Early exit when game is over
- Reset by restoring initial state
- One event updating multiple state slices

## Scenario

You now have a playable board with turns. The next step is to finish game flow:

- detect winner
- detect draw
- stop further moves when game ends
- allow reset to initial game state

## Requirements

1. **Extract win validation logic** into a pure helper function.
2. **Use static winning combinations** in a constant outside the component.
3. **Derive game result** from current board:
    - winner (`X` / `O`) or no winner
    - draw when all cells are filled and there is no winner
4. **Stop board updates** when game is already finished.
5. **Add reset button** that restores initial values:
    - board
    - current turn
    - winner/draw state
6. **Keep reset declarative**:
    - update React state only (no manual DOM manipulation)

## Constraints

- Do not mutate existing state objects/arrays.
- Do not duplicate values in state if they can be derived.
- Keep winner/draw checks readable and isolated.

## Expected Result

- Winner is detected correctly for all valid combinations.
- Draw is detected when board is full and no winner exists.
- Clicking squares after game end has no effect.
- Reset returns the game to a clean initial state.

## Self-Check

- [ ] Did I separate winner logic into a pure helper?
- [ ] Are winning combinations stored as constants outside the component?
- [ ] Did I use `every()` (or equivalent full-board check) for draw detection?
- [ ] Did I block clicks when the game is over?
- [ ] Does one reset action restore all relevant state slices?
