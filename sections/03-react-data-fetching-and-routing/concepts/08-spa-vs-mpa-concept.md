# SPA vs MPA Concept

## Goal

Understand the practical difference between Single-Page Applications (SPA) and Multi-Page Applications (MPA).

## Core Idea

An MPA loads a new HTML document on each route change.  
A SPA loads once and updates the view on the client without full page reloads.

## Key Principle

SPA navigation updates UI and URL on the client without reloading the full document.

MPA navigation requests a new document from the server for each page.

## Data Flow

MPA: click link -> browser requests new page -> full reload -> page bootstraps again.

SPA: click link -> router intercepts navigation -> URL updates -> matching component renders.

## Example

```jsx
// SPA-style navigation idea (conceptual)
function navigate(to) {
  window.history.pushState({}, '', to)
  // Then render the component for `to`
}
```

```html
<!-- MPA-style navigation -->
<a href="/about">About</a>
```

## Why This Pattern Is Useful

- SPAs feel faster after initial load
- MPAs are simpler for traditional server rendering
- Helps choose the right routing model for project goals
- Clarifies why React Router exists
- Enables richer client-side interactions and state persistence between views

## Common Mistakes

- Assuming SPA means no server work at all
- Forgetting that direct URL access still needs server route handling
- Mixing full-page `<a href>` behavior where client routing is intended
- Treating SPA and MPA as mutually exclusive in every architecture

## Quick Self-Check

- Do I understand what triggers a full document reload?
- In my app, who handles route changes: browser or client router?
- If I refresh a deep route, can my server return the app correctly?
- Is my navigation behavior aligned with SPA expectations?
