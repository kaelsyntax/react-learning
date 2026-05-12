# ⚙️ Media Search Performance Lab - Project 05

Interactive media search experience focused on React rendering behavior, render stability, and practical performance optimization.

---

## 🧠 Overview

This project is the fifth practical build in the `react-learning` repository.

It is designed to apply performance-focused React patterns in a realistic search-driven UI.

---

## 🎯 Goals

- Build a search-driven media interface (`mode: anime | movies`)
- Measure and reduce unnecessary re-renders
- Apply `React.memo`, `useMemo`, and `useCallback` with clear criteria
- Improve input responsiveness with debounce/throttle
- Use `lazy` + `Suspense` for code-splitting in non-critical UI

---

## ✨ Planned Features

- Search input with debounce behavior
- Media mode switch (`Anime` / `Movies`)
- Filters and sort controls
- Responsive result grid with poster cards
- Loading, error, and empty states
- Optional detail panel loaded with `lazy`

---

## 🛠 Tech Stack

- React
- Vite
- CSS

---

## 📁 Project Structure

```txt
src/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## ⚙️ Getting Started

```bash
cd react-learning/projects/05-media-search-performance-lab
npm install
npm run dev
```

---

## 📦 Build

```bash
npm run lint
npm run build
```

---

## 📌 Status

- **Version:** v0
- **State:** ⚪ Planned
