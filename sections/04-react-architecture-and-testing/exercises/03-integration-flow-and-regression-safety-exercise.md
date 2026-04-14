# Exercise 03: Integration Flow and Regression Safety

## Goal

Integrate filters + cart architecture end-to-end and add a lightweight regression safety layer for core user flows.

## Concepts Practiced

- Integration of multiple feature contexts
- Domain logic separation from UI
- Stable feature APIs through custom hooks
- Manual regression checklist design
- Basic confidence checks for refactors

## Scenario

Your ecommerce app already has filters and cart logic.

Now you must validate that the complete flow remains stable while architecture evolves (new files, refactors, reducer updates, context composition).

## Requirements

1. **Validate integration flow**:
   - filter products by category and min price
   - add filtered products to cart
   - update quantities and totals
   - clear cart and return to an empty state
2. **Confirm architecture boundaries**:
   - UI components remain render/event focused
   - cart domain rules stay in reducer and domain transition/selector files
   - feature hooks expose stable APIs (`useCart`, `useFilters`)
3. **Create a regression checklist** with at least 8 checks covering:
   - filter behavior
   - cart action behavior
   - totals correctness
   - stock limit behavior
   - empty-state handling
4. **Add at least one automated safety check**:
   - reducer transition test, or
   - integration interaction test for a core cart flow

## Constraints

- Do not move business rules back into UI components.
- Keep context provider values feature-scoped and intentional.
- Do not skip edge cases in the checklist.

## Expected Result

- Full user flow remains stable after refactor changes.
- Architecture boundaries are preserved.
- You have a repeatable checklist to catch regressions quickly.
- At least one automated check protects a critical path.

## Self-Check

- [ ] Can I complete filter/cart/add/update/clear flow without state bugs?
- [ ] Are domain rules still outside presentation components?
- [ ] Do custom hooks expose clean feature APIs?
- [ ] Do totals and quantities stay correct after multiple actions?
- [ ] Do I have at least one repeatable automated safety check?
