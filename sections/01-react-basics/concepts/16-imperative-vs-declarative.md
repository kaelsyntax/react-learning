# Imperative vs Declarative

React encourages a declarative style, while vanilla DOM manipulation is often imperative.

## Imperative Approach

Imperative code describes step by step how to update the UI.

```js
const button = document.querySelector("#follow-btn");
let isFollowing = false;

button.addEventListener("click", () => {
  isFollowing = !isFollowing;

  if (isFollowing) {
    button.textContent = "Following";
    button.classList.add("is-following");
  } else {
    button.textContent = "Follow";
    button.classList.remove("is-following");
  }
});
```

You manually change text, classes, and state wiring.

## Declarative Approach (React)

Declarative code describes what the UI should look like for a given state.

```jsx
const [isFollowing, setIsFollowing] = useState(false);

const buttonText = isFollowing ? "Following" : "Follow";
const buttonClass = isFollowing ? "btn is-following" : "btn";

return (
  <button className={buttonClass} onClick={() => setIsFollowing((prev) => !prev)}>
    {buttonText}
  </button>
);
```

React handles DOM updates after state changes.

## Why Declarative Is Useful

- Less manual DOM code
- Fewer sync bugs between UI and state
- Easier to reason about as apps grow

## When Imperative Code Still Appears in React

- Working with refs (`useRef`)
- Integrating third-party DOM libraries
- Focus/scroll/video APIs

Even then, most UI rendering should stay declarative.
