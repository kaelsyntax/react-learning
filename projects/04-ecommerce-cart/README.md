# 🛒 Ecommerce Cart - Project 04

<!-- markdownlint-disable MD033 -->
<p align="center">
  <strong>Interactive ecommerce catalog and animated cart flow built with React</strong>
</p>

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge" />
  </a>
  <img src="https://img.shields.io/badge/Status-v1%20Ready-4cc3ff?style=for-the-badge" alt="Status Badge" />
</p>
<!-- markdownlint-enable MD033 -->

---

## 🧠 Overview

This project is the fourth practical build in the `react-learning` repository.

It focuses on scalable cart state management, smooth transitions, filterable product catalog UX, and accessibility-minded interaction patterns.

---

## 💡 Why This Project

This build practices a realistic ecommerce flow:

- Filter and sort products in a responsive catalog
- Add/remove items with animated quantity controls
- Manage cart state with reducer architecture
- Handle animated modal/cart transitions without sacrificing accessibility

---

## 🎯 Key Learnings

- Context + reducer state architecture for cart domain logic
- Selector/action separation (`domain/cart/*`)
- Derived data handling for stock and totals
- Transition orchestration with custom hooks
- Micro-interactions and animated UI feedback
- Hook lint compliance and cleanup patterns for release quality
- Responsive and keyboard-friendly modal/cart behavior

---

## ✨ Features

- Product filtering by category and price range
- Product sorting options
- Add to cart with stepper controls and stock-aware constraints
- Floating cart toggle with animated item badge
- Cart modal with:
  - animated item enter/exit transitions
  - subtotal and total value roll animations
  - clear cart and item remove actions
  - focus handoff and keyboard support
- Empty states for catalog and cart
- Reduced-motion support via media query

---

## 🛠 Tech Stack

- React
- Vite
- CSS

---

## 📁 Project Structure

```txt
src/
|-- App.jsx
|-- App.css
|-- index.css
|-- main.jsx
|-- components/
|   |-- cart/
|   |-- filters/
|   |-- products/
|   `-- shared/
|-- context/
|   |-- cart-context.jsx
|   `-- filters-context.jsx
|-- domain/
|   `-- cart/
|       |-- cart-actions.js
|       |-- cart-reducer.js
|       |-- cart-selectors.js
|       `-- cart-transitions.js
|-- hooks/
|   |-- useCart.js
|   |-- useCartItemsTransition.js
|   |-- useCartPanelModal.js
|   |-- useFilteredProducts.js
|   |-- useFilters.js
|   |-- useProductCardStepper.js
|   `-- useProductsTransition.js
|-- mocks/
|   `-- products.json
`-- utils/
    |-- format-price.js
    `-- product-image-crop.js
```

---

## ⚙️ Getting Started

```bash
git clone https://github.com/kaelsyntax/react-learning.git
cd react-learning/projects/04-ecommerce-cart
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

## 👤 Author

**KaelSyntax**

---

## 📌 Status

**v1 - Ready**

Planned next improvements:

- Unit tests for cart reducer/selectors
- End-to-end flow checks for cart modal interactions
- Final deployment metadata and screenshots
