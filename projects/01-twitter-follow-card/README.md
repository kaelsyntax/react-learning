# Twitter Follow Card (Project 01)

A practical React project focused on building a reusable Twitter-style follow card component.

## Overview

This project was built to practice:

- reusable components
- props (boolean and compositional props)
- local state with `useState`
- conditional rendering
- clean separation between UI and logic
- component-based CSS structure

## Features

- Reusable `TwitterFollowCard` component
- Follow / Following / Unfollow interaction states
- Verified badge extracted into a separate reusable component
- Responsive layout for mobile and desktop
- Smooth visual transitions (hover, border, subtle motion)
- Accessible button labeling (`aria-label`)

## Stack

- React
- Vite
- CSS

## Getting Started

```bash
npm install
npm run dev
npm run build
```

## Preview

- Main UI: follow card list with responsive behavior and interactive button states

## Screenshots

### Desktop

![Desktop](./docs/preview.png)

### Mobile

![Mobile](./docs/preview-mobile.png)

## Main Structure

```txt
src/
  App.jsx
  TwitterFollowCard.jsx
  VerifiedBadge.jsx
  assets/
    index.css
    app.css
```

## Status

Current version: `v1` (completed).
