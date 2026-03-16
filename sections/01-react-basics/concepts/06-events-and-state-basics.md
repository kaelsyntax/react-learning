# Events and State Basics

This note introduces two core React ideas: handling user events and managing component state.

## Events in React

React uses event handlers to respond to user actions like clicks, input changes, and form submits.

Example:

```jsx
function AlertButton() {
  const handleClick = () => {
    alert("Button clicked");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Important:

- Use `camelCase` event names: `onClick`, `onChange`, `onSubmit`
- Pass a function, not the result of a function call

## What is State?

State is component data that can change over time.

When state changes, React re-renders the component UI.

## `useState` Hook

`useState` lets a function component store and update state.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

`count` is the current value, and `setCount` is the update function.

## Event + State Together

```jsx
import { useState } from "react";

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
      {isVisible ? <p>Hello</p> : null}
    </>
  );
}
```

## Common Mistakes

- Writing `onClick={handleClick()}` instead of `onClick={handleClick}`
- Mutating state directly instead of using the setter
- Expecting state updates to be immediate in the same line of code
