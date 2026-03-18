# State Management Basics (Deeper)

This note extends the core `useState` concepts with practical patterns used in real components.

## `useState` Recap

```jsx
const [isFollowing, setIsFollowing] = useState(false);
```

- `isFollowing`: current state value
- `setIsFollowing`: state update function

## Prefer Functional Updates

When next state depends on previous state, use the callback form:

```jsx
setIsFollowing((prev) => !prev);
```

This is safer than:

```jsx
setIsFollowing(!isFollowing);
```

## Do Not Duplicate Derived State

If a value can be calculated from existing state/props, compute it instead of storing it again.

```jsx
const buttonText = isFollowing ? "Following" : "Follow";
```

Avoid adding extra state like `buttonText` when it depends on `isFollowing`.

## Local State vs Shared State

- Local state: component controls its own data
- Shared state: parent controls data and passes it down via props

Use local state for isolated UI behavior.
Lift state up when multiple components need the same value.

## Lifting State Up (Basic Idea)

If two components must stay synced, move state to their nearest common parent.

```jsx
// Parent owns state, children receive value and callbacks
```

## Common Mistakes

- Mutating state directly (`state.value = ...`)
- Expecting state updates to be immediate
- Creating too many independent states that should be grouped logically
- Storing derived values as separate state

## Practical Rule

Start simple:

1. Keep state close to where it is used
2. Use functional updates when needed
3. Lift state only when sharing becomes necessary
