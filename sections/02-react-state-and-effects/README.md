# 02 React State and Effects ⚙️

State-driven patterns, effect lifecycle, persistence, and environment-awareness in React.

---

## 🧠 Overview

This section focuses on state-driven UI logic and side effects in real React workflows.

You’ll learn how to model interactions, control effect execution, and handle browser/runtime constraints safely.

---

## 🎯 What You’ll Learn

- Model shared and derived state correctly
- Structure event handlers using guard clauses
- Control side effects with `useEffect`
- Persist state using `localStorage`
- Handle cleanup, StrictMode behavior, and client-only APIs

---

## ✅ Completed Concepts

| Range | Area | Status |
| :--- | :--- | :---: |
| 01–04 | **State Flow Foundations** (`map`, lifting state, data flow, immutability) | [x] |
| 05–09 | **Interaction Logic** (boolean turns, guard clauses, derived checks) | [x] |
| 10–14 | **Effects and Reset Patterns** (side effects, dependency arrays, reset logic) | [x] |
| 15–18 | **Persistence and Runtime Context** (localStorage, cleanup, StrictMode, client/server APIs) | [x] |

> [View all detailed notes](./concepts/)

---

## 🧩 Integrative Exercises

Practice-focused exercises that bridge theory and implementation:

- [x] **01** [State and Turn Flow](./exercises/01-state-and-turns-exercise.md)
- [x] **02** [Winner Logic and Reset](./exercises/02-winner-logic-and-reset-exercise.md)
- [x] **03** [Persistence and Effects](./exercises/03-persistence-and-effects-exercise.md)

---

## 🚀 Section Project

- **Project:** Tic-Tac-Toe  
- **Description:** Interactive game with derived state, persistence, and controlled side effects  
- **Repository:** [View Project README](../../projects/02-tic-tac-toe/README.md)  
- **Live Demo:** [02-tic-tac-toe.pages.dev](https://02-tic-tac-toe.pages.dev/)  
- **Status:** ✅ Completed

---

## 🧭 Key Takeaways

- State is the single source of truth
- Effects should be controlled and predictable
- Derive state instead of duplicating it
- Always clean up side effects when necessary

---

## 📌 Section Status

- **Overall:** ✅ Completed  
- **Next:** 🛠 Continue with Section 03
