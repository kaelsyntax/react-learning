# Exercise 01: Controlled Search and Fetch Flow

## Goal

Build a controlled search flow that fetches GitHub user data asynchronously and renders clear UI states.

## Concepts Practiced

- Controlled forms and search state
- Fetch lifecycle with `useEffect`
- Explicit async UI states (`idle`, `loading`, `error`, `empty`, `success`)
- Guarding invalid submits
- State reset when a new request starts

## Scenario

You are building the first functional version of a GitHub user search screen.

The form must be controlled, and the UI must clearly communicate each request phase.

## Requirements

1. **Create controlled form state** for the search input.
2. **Submit search through a form handler**:
   - prevent default behavior
   - trim input
   - ignore empty values
3. **Trigger fetch based on submitted username** using `useEffect`.
4. **Handle and render explicit async states**:
   - idle (before first valid search)
   - loading
   - error
   - empty (valid response but no usable user)
   - success
5. **Reset stale data** when a new request starts.
6. **Render fetched result** with at least username (`login`) and avatar.

## Constraints

- Do not fetch directly inside render.
- Do not mutate state directly.
- Keep state minimal and explicit.

## Expected Result

- User can type and submit a GitHub username.
- Request is triggered only on valid submit.
- UI clearly transitions through async states.
- Previous results do not remain visible incorrectly during a new request.

## Self-Check

- [ ] Is the input controlled by React state?
- [ ] Do I validate and trim before searching?
- [ ] Is fetch executed inside `useEffect`?
- [ ] Do I render `loading`, `error`, `empty`, and `success` explicitly?
- [ ] Do I clear stale result when a new fetch begins?
