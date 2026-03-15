# Vite

Vite is a modern frontend build tool.

It gives you a very fast development server and an optimized production build.

## Why use Vite?

- Fast startup in development
- Hot Module Replacement (HMR)
- Simple project setup for React, Vue, Svelte, and more

## Under the hood

Vite leverages **Native ES Modules (ESM)** in the browser to deliver extremely fast startup times, avoiding the need to bundle the entire application during development.

## React Setup with Vite

### With npm

```bash
npm create vite@latest 01-first-react-app -- --template react
cd 01-first-react-app
npm install
npm run dev
```

### With yarn

```bash
yarn create vite 01-first-react-app --template react
cd 01-first-react-app
yarn install
yarn dev
```

### With pnpm

```bash
pnpm create vite 01-first-react-app --template react
cd 01-first-react-app
pnpm install
pnpm dev
```

## Important Note

Use Vite only in folders where you have executable React code (for example, inside `projects/`).
You do not need Vite for Markdown notes in `sections/`.
