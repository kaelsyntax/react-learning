# Controlled vs Uncontrolled Inputs

## Goal

Understand the difference between controlled and uncontrolled form inputs in React, and know when each pattern is useful.

## Core Idea

Form inputs can keep their value in two main places:

- React state
- The DOM element itself

A controlled input stores its current value in React state.

An uncontrolled input stores its current value in the DOM, and React reads it only when needed.

Neither pattern is automatically better.

The right choice depends on how much control, validation, and UI feedback the form needs.

## Controlled Inputs

A controlled input receives its value from React state and updates that state on every change.

```jsx
import { useState } from 'react'

function ControlledNameField() {
  const [name, setName] = useState('')

  return (
    <label>
      Name
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </label>
  )
}
```

React is the source of truth.

This makes controlled inputs useful when the UI needs to react immediately to what the user types.

## Uncontrolled Inputs

An uncontrolled input keeps its own value in the DOM.

React can read that value through a ref when the user submits or when the app needs it.

```jsx
import { useRef } from 'react'

function UncontrolledNameField() {
  const nameInputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = nameInputRef.current.value
    console.log(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input ref={nameInputRef} />
      </label>
      <button type="submit">Save</button>
    </form>
  )
}
```

The DOM is the source of truth.

This can be useful for simple forms, file inputs, or cases where React does not need to update UI on every keystroke.

## When Controlled Inputs Help

- Showing live validation.
- Enabling or disabling buttons based on input.
- Formatting or normalizing values while typing.
- Building dependent fields.
- Keeping form data in React state for previews or derived UI.
- Resetting or pre-filling fields from app state.

## When Uncontrolled Inputs Help

- Reading values only on submit.
- Integrating with browser-native behavior.
- Avoiding state for very simple fields.
- Handling file inputs.
- Letting form libraries manage refs and registration internally.

## Important Detail

Do not switch an input between controlled and uncontrolled during its lifetime.

This usually happens when an input starts with `undefined` and later receives a real value.

Prefer an empty string for controlled text inputs:

```jsx
const [email, setEmail] = useState('')
```

Instead of:

```jsx
const [email, setEmail] = useState()
```

## Data Flow

Controlled input: user types -> `onChange` runs -> React state updates -> input receives new `value`.

Uncontrolled input: user types -> DOM stores value -> React reads value later through a ref or form submission.

## Why This Pattern Is Useful

- Clarifies where form data lives.
- Makes validation and submit logic easier to reason about.
- Helps choose the right pattern before adding a form library.
- Explains why libraries like React Hook Form often avoid re-rendering on every keystroke.

## Common Mistakes

- Using controlled state for every field without a reason.
- Reading uncontrolled values too late without validation.
- Mixing `value` and `defaultValue` incorrectly.
- Starting a controlled input with `undefined`.
- Forgetting that file inputs are usually uncontrolled.
- Treating form libraries as magic instead of understanding the underlying pattern.

## Quick Self-Check

- Can I explain where the value lives in a controlled input?
- Can I explain where the value lives in an uncontrolled input?
- Can I name two cases where controlled inputs are useful?
- Can I name one case where uncontrolled inputs are a good fit?
- Do I know why switching between controlled and uncontrolled is a problem?
