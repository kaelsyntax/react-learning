# Debouncing and Race Conditions

## Goal

Understand how to reduce unnecessary requests and prevent stale responses from overriding fresh data.

## Core Idea

When input changes quickly, multiple requests can be triggered in a short time.

Two common protections are:

1. Debouncing: wait a short delay before using the latest value.
2. Request cancellation: abort old requests when a new one starts.

## Key Principle

Debounce controls request frequency.  
Abort/cancellation controls response correctness.

Both solve different parts of the same async UX problem.

Debouncing reduces how often effects start; cancellation ensures outdated effects do not win.

## Data Flow

User updates input rapidly -> debounced value updates after delay -> fetch starts for latest stable value -> previous in-flight request is aborted -> only the newest response should affect UI.

## Example

```jsx
function SearchPage() {
const debouncedUsername = useDebounce(username, 500)
const { user, isLoading, error } = useFetchUser(debouncedUsername)
}
```

```jsx
// useDebounce.js
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
```

## Note

For submit-based search (not typeahead), debouncing is often optional.  
It can still be used as a learning exercise, but the practical need is lower.

## Why This Pattern Is Useful

- Reduces request spam while typing
- Improves UX smoothness on slow networks
- Helps keep server/API usage efficient
- Avoids stale-response UI glitches when combined with abort logic

## Common Mistakes

- Using debounce but forgetting request cancellation
- Debouncing submit-only flows where it adds no clear value
- Setting very long delays that make UI feel laggy
- Treating old responses as valid current data

## Quick Self-Check

- Am I fetching on every keypress or only after a stable delay?
- Do I cancel previous requests when dependencies change?
- Is my debounce delay reasonable for user experience?
- If search is submit-based, is debounce truly necessary?
