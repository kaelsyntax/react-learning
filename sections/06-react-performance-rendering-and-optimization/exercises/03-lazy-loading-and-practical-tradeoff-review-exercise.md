# Exercise 03: Lazy Loading and Practical Tradeoff Review

## Goal

Practice code splitting for non-critical UI and evaluate whether the performance gain justifies the added complexity.

## Concepts Practiced

- Code splitting with `lazy`
- Fallback handling with `Suspense`
- Critical vs non-critical UI prioritization
- Initial-load optimization thinking
- Practical tradeoff evaluation

## Scenario

Your app includes at least one secondary UI section (for example: favorites panel, details panel, advanced filters, recommendations).

You want to defer loading that section to reduce initial bundle cost while preserving good UX.

## Requirements

1. **Choose one non-critical section** to load lazily.
2. **Integrate `lazy` + `Suspense`** with a clear fallback state.
3. **Keep critical above-the-fold UI eager-loaded**.
4. **Validate UX behavior**:
   - initial load remains smooth
   - lazy section loads correctly on demand
   - fallback is understandable
5. **Write a short tradeoff review**:
   - what got faster
   - what got more complex
   - whether this split should stay

## Constraints

- Do not lazy-load components required immediately on first paint.
- Keep fallback UI meaningful (not confusing placeholders).
- Avoid over-splitting into tiny chunks without benefit.
- Keep this exercise focused on one deliberate lazy-loading decision.

## Expected Result

- A secondary section is loaded on demand with `lazy`.
- `Suspense` fallback provides clear loading feedback.
- Initial app experience is preserved or improved.
- Tradeoff analysis is explicit and actionable.

## Self-Check

- [ ] Did I lazy-load only a truly secondary section?
- [ ] Is fallback UI clear during deferred loading?
- [ ] Did I avoid harming critical first-load UX?
- [ ] Can I explain the performance benefit in practical terms?
- [ ] Is the added complexity acceptable for this app?
