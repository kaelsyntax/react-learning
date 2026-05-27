# Exercise 01: Optimization Baseline and Render Audit

## Goal

Establish a measurable performance baseline and identify the first real render bottlenecks before optimizing.

## Concepts Practiced

- Defining a baseline before refactors
- Detecting bottlenecks from user interactions
- Profiling render duration and update frequency
- Separating expected renders from unnecessary renders
- Prioritizing optimization targets by impact

## Scenario

You have a search/listing UI that feels slower as interactions increase.

Before applying memoization tools, you need to measure where time is actually spent and which components are the main source of delay.

## Requirements

1. **Choose one interaction flow** to audit (for example: typing in search, opening a panel, sorting a list).
2. **Record a baseline profile** using React DevTools Profiler.
3. **Identify at least two potential bottlenecks**:
   - expensive component renders
   - repeated renders with low visible value
4. **Document findings** in short notes:
   - what interaction was measured
   - where slowness appeared
   - what should be optimized first
5. **Define one optimization hypothesis** to test in the next exercise.

## Constraints

- Do not optimize yet; this exercise is diagnosis-first.
- Avoid decisions based only on intuition.
- Keep notes short and practical.
- Focus on user-impacting interactions, not synthetic cases.

## Expected Result

- A clear baseline exists for one relevant interaction.
- You can point to concrete bottlenecks with evidence.
- You have a prioritized optimization target instead of random tuning.
- Next steps are based on measurements, not assumptions.

## Self-Check

- [ ] Did I profile a real user interaction flow?
- [ ] Did I identify at least two concrete bottlenecks?
- [ ] Did I distinguish normal renders from problematic ones?
- [ ] Did I document what to optimize first and why?
- [ ] Do I have a measurable before-state for comparison later?
