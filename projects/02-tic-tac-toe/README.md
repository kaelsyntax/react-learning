# ❌⭕🎮 Tic-Tac-Toe — Project 02

<!-- markdownlint-disable MD033 -->
<p align="center">
  <strong>Interactive Tic-Tac-Toe built with React</strong>
</p>

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge" />
  </a>
  <a href="https://02-tic-tac-toe.pages.dev/">
    <img src="https://img.shields.io/badge/Live-Demo-4cc3ff?style=for-the-badge" alt="Live Demo Badge" />
  </a>
</p>
<!-- markdownlint-enable MD033 -->

---

## 🚀 Live Demo

🔗 [Live Demo](https://02-tic-tac-toe.pages.dev/)

---

## 🧠 Overview

This project is the **second practical build** in the `react-learning` repository.

It focuses on modeling game state in React and handling effects safely while keeping UI logic and game logic cleanly separated.

---

## 💡 Why this Project

This project focuses on building a clean and maintainable state model for a simple game while applying real-world frontend concerns such as animation timing, UI feedback, and side-effect management.

It is designed not just as a functional implementation, but as an exercise in building polished user experiences with React.

---

## 🎯 Key Learnings

- State modeling for board games (`squares`, turns, game-over state)
- Derived state (`winner`, `draw`) vs stored state
- Immutable updates in event handlers
- Effect-driven persistence with `useEffect` and `localStorage`
- Runtime safety for browser APIs (`window`, `localStorage`)
- Accessibility improvements (`:focus-visible`, dialog semantics, focus trap)

---

## ✨ Features

- Interactive 3x3 Tic-Tac-Toe board
- Animated winner highlight with directional winning line
- Smooth game-over flow with delayed modal reveal
- Coordinated exit animations for board and UI elements
- Persistent game state via `localStorage`
- Responsive and centered layout across devices

---

## 🛠 Tech Stack

- React
- Vite
- CSS

---

## 📁 Project Structure

```txt
src/
├── App.jsx                    # Main game orchestration and state
├── App.css                    # Component styling and animations
├── index.css                  # Global styles
├── main.jsx                   # App bootstrap
├── components/
│   ├── Board.jsx              # Board renderer
│   ├── Square.jsx             # Individual cell component
│   └── GameOverModal.jsx      # Game-over dialog
├── constants/
│   └── game.js                # Static game constants and storage keys
└── logic/
    └── board.js               # Winner calculation helper
```

---

## ⚙️ Getting Started

```bash
git clone https://github.com/kaelsyntax/react-learning.git
cd react-learning/projects/02-tic-tac-toe
npm install
npm run dev
```

---

## 📦 Build

```bash
npm run build
```

---

## 👤 Author

**KaelSyntax**

---

## 📌 Status

**v1 — Stable release**

Planned improvements:

- Score system
- Sound feedback
- Additional UX polish
