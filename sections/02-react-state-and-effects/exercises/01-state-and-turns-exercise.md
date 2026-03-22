# Exercise 01: State and Turn Flow

## Goal

Model a Tic-Tac-Toe board with React state and implement a clean turn flow between players.

## Concepts Practiced

- UI from data with `map`
- Lifted state in parent components
- Data down / events up
- Immutable updates for arrays
- Turn modeling with boolean state
- Guard clauses in event handlers

## Scenario

You are building the first playable version of a Tic-Tac-Toe board.

The board must render from state, and each valid click should place the current turn symbol (`X` or `O`) and switch turns.

## Requirements

1. **Create board state** with 9 cells:
    - `Array(9).fill(null)`
2. **Render squares dynamically** using `.map(...)`.
3. **Keep state in the nearest common parent** (for example, `App`).
4. **Pass values down via props** and click handlers up via callbacks.
5. **Handle square click** with this flow:
    - validate interaction first
    - create next array copy
    - update board state
    - switch turn (`X`/`O`)
6. **Block invalid moves**:
    - ignore click if the square is already filled

## Constraints

- Do not mutate `squares` directly.
- Do not keep duplicated/derived state that can be calculated.
- Keep handler logic readable with early return guards.

## Expected Result

- A 3x3 board rendered from state.
- Clicking an empty square writes the current symbol.
- Turns alternate correctly.
- Clicking an occupied square does nothing.

## Self-Check

- [ ] Did I render squares from data with `map`?
- [ ] Is the board state owned by the parent and passed by props?
- [ ] Did I avoid direct mutation and create a copied array before update?
- [ ] Did I block invalid clicks with guard clauses?
- [ ] Is the turn switching logic simple and predictable?
