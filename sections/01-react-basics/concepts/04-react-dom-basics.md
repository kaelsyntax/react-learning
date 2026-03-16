# React DOM Basics

This note covers the React entry point: how React mounts your app in the DOM.

## App Startup Flow

The basic flow is:

`index.html` -> `src/main.jsx` -> `createRoot(...)` -> `root.render(<App />)`

In `index.html`, React needs a mount node:

```html
<div id="root"></div>
```

## `createRoot`

`createRoot` creates a React root connected to a DOM element.

```jsx
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
```

## `root.render`

`render` tells React what UI to display.

```jsx
import App from "./App.jsx";

root.render(<App />);
```

## `React.Fragment`

Fragments let you return multiple elements without adding extra nodes to the DOM.

```jsx
import { Fragment } from "react";

function Header() {
  return (
    <Fragment>
      <h1>Title</h1>
      <p>Subtitle</p>
    </Fragment>
  );
}
```

Shorthand syntax:

```jsx
<>
  <h1>Title</h1>
  <p>Subtitle</p>
</>
```

## `StrictMode`

`StrictMode` helps detect potential problems during development.

```jsx
import { StrictMode } from "react";

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

It does not render visible UI; it adds development checks.

Note: In development, StrictMode intentionally re-runs render and some lifecycle logic to help detect side-effect bugs. This does not happen in production.

## Common Mistakes

- Missing `<div id="root"></div>` in `index.html`
- Importing `createRoot` from the wrong path
- Forgetting to call `root.render(...)`
- Returning multiple elements without a parent or fragment
