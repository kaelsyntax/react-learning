# Exercise 02: Memoization and Input Performance Flow

## Goal

Apply targeted memoization and input-frequency control to improve a previously measured slow interaction.

## Concepts Practiced

- Applying `React.memo` with clear intent
- Using `useMemo` for expensive derived data
- Using `useCallback` for stable handler references
- Implementing debounce/throttle in input-driven flows
- Measuring before/after impact

## Scenario

From Exercise 01, you already identified one bottleneck (for example: slow typing with filtering/sorting, unnecessary list re-renders, noisy event updates).

Now you need to apply only the necessary optimization tools and validate whether performance actually improves.

## Requirements

1. **Select one bottleneck** from your baseline notes.
2. **Apply one or more focused optimizations when justified** (for example):
   - `useMemo` for derived list calculations
   - `React.memo` for expensive child component trees
   - `useCallback` to stabilize handlers passed to memoized children
   - debounce/throttle for high-frequency input events
3. **Profile again** with the same interaction flow.
4. **Compare results** against baseline:
   - render duration
   - number/frequency of updates
   - perceived responsiveness
5. **Document tradeoff notes**:
   - what improved
   - what complexity was added
   - whether the change is worth keeping

## Constraints

- Do not apply optimization tools globally "just in case".
- Keep business behavior unchanged.
- Preserve readability and avoid over-abstracting.
- Use the same test interaction for valid comparison.

## Expected Result

- Performance improvements are measurable and tied to one real bottleneck.
- Optimization choices are intentional and justified.
- Code remains understandable after changes.
- You can explain the tradeoffs of each optimization introduced.

## Self-Check

- [ ] Did I optimize a measured bottleneck instead of guessing?
- [ ] Did I apply only the minimum set of useful optimizations?
- [ ] Did before/after profiling confirm improvement?
- [ ] Did I note complexity tradeoffs honestly?
- [ ] Would I keep these optimizations in production code?
