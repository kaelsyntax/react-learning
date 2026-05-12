# 06 React Performance, Rendering and Optimization ⚙️

Practical performance thinking in React: measure first, optimize intentionally, and protect UX under real interaction flow.

---

## 🧠 Overview

This section focuses on understanding why React components render, how to detect bottlenecks, and how to apply optimization tools with clear criteria.

The goal is to improve performance without introducing unnecessary complexity.

---

## 🎯 What You'll Learn

- How React rendering works and what triggers re-renders
- How to detect bottlenecks with profiling tools
- When and how to use `React.memo`
- How to optimize derived data with `useMemo`
- How to stabilize references and handlers with `useCallback`
- How to use debounce/throttle in input-driven flows
- How to split code with `lazy` + `Suspense`
- How to evaluate optimization tradeoffs in real projects

---

## ✅ Completed Concepts

| Range | Area | Status |
| :--- | :--- | :---: |
| 01-03 | **Rendering and Measurement** (render mental model, bottlenecks, profiling) | [ ] |
| 04-06 | **Memoization Toolkit** (`React.memo`, `useMemo`, `useCallback`) | [ ] |
| 07-09 | **Real-World Optimization** (debounce/throttle, lazy/suspense, strategy/tradeoffs) | [ ] |

> [Concepts workspace](./concepts/)

---

## 🧩 Integrative Exercises

- [ ] **01** Optimization Baseline and Render Audit
- [ ] **02** Memoization and Input Performance Flow
- [ ] **03** Lazy Loading and Practical Tradeoff Review

---

## 🚀 Section Project

- **Project:** Media Search Performance Lab (`mode: anime | movies`)
- **Description:** Search-driven media catalog with separated anime/movie modes, focused on render control, memoization strategy, and responsive perceived performance
- **Status:** 🟡 Planned

---

## 🧭 Key Takeaways

- Performance work starts with measurement, not guesswork
- Not every re-render is a bug or a problem
- Memoization helps only when used with clear intent
- Stable APIs and predictable state reduce rendering noise
- UX improvements can come from both logic and loading strategy

---

## 📌 Section Status

- **Overall:** ⚪ Planned
- **Completed Concepts:** 0/9
- **Exercises Published:** 0/3
- **Project Status:** 🟡 Planned
- **Next:** 🛠 Build concept notes and start the first optimization baseline
