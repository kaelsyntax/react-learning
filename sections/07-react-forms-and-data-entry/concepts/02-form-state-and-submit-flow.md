# Form State and Submit Flow

## Goal

Understand how a complete form flow works in React: values, validation, errors, submit state, and user feedback.

## Core Idea

A form is more than a group of inputs.

In React, a form is a small state workflow.

That workflow usually includes:

- current values
- validation errors
- touched fields
- submit state
- success or failure feedback

The goal is not only to collect data.

The goal is to guide the user from input to valid submission.

## Basic Form State

A form often starts with a state object that represents the current values.

```jsx
import { useState } from 'react'

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  return (
    <form>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
    </form>
  )
}
```

The `name` attribute lets one handler update multiple fields.

The key idea is:

```text
field name -> object key -> updated value
```

## Preventing the Browser Submit

HTML forms submit by default.

That default behavior can reload the page or navigate away.

React apps usually handle submission in JavaScript, so the submit handler calls `event.preventDefault()`.

```jsx
function handleSubmit(event) {
  event.preventDefault()
}
```

`preventDefault()` does not stop event bubbling.

It only prevents the browser's default action.

If you need to stop an event from bubbling to parent elements, that is `event.stopPropagation()`.

## Validation Flow

Validation checks whether the current form values are acceptable.

```jsx
function validate(values) {
  const errors = {}

  if (!values.email.includes('@')) {
    errors.email = 'Enter a valid email.'
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}
```

The submit handler can use validation before sending data.

```jsx
function handleSubmit(event) {
  event.preventDefault()

  const nextErrors = validate(values)

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors)
    return
  }

  // Submit valid data here.
}
```

If there are errors, the form should stop and show feedback.

Submitting invalid data creates confusing UX and makes the next step harder to trust.

## Submit State

Real forms need feedback while work is happening.

That is where `isSubmitting` helps.

```jsx
const [isSubmitting, setIsSubmitting] = useState(false)
```

It can be used to:

- disable the submit button
- show "Saving..." or "Sending..."
- prevent duplicate submissions
- make async work visible to the user

Example:

```jsx
async function handleSubmit(event) {
  event.preventDefault()

  const nextErrors = validate(values)

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors)
    return
  }

  setIsSubmitting(true)

  try {
    await saveForm(values)
    setSubmitStatus('success')
  } catch {
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

`finally` is useful because the submitting state should end whether the request succeeds or fails.

## Common Form State Pieces

```jsx
const [values, setValues] = useState(initialValues)
const [errors, setErrors] = useState({})
const [touched, setTouched] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitStatus, setSubmitStatus] = useState('idle')
```

Each piece answers a different question:

- `values`: What has the user entered?
- `errors`: What is currently invalid?
- `touched`: Which fields has the user interacted with?
- `isSubmitting`: Is the form currently sending data?
- `submitStatus`: What happened after submit?

Not every form needs all of these.

Simple forms should stay simple.

## Data Flow

```text
user types
-> handleChange updates values
-> user submits
-> preventDefault stops browser navigation
-> validate current values
-> show errors or submit data
-> update submit feedback
```

## Why This Pattern Is Useful

- Keeps form behavior predictable.
- Separates values from errors and submit feedback.
- Makes validation easier to test and reuse.
- Helps users understand what is happening.
- Prepares the mental model for React Hook Form and schema validation.

## Common Mistakes

- Submitting before validating.
- Not disabling submit while async work is running.
- Storing derived values that could be calculated from `values`.
- Showing errors too early before the user interacts with a field.
- Forgetting `preventDefault()` and causing a page reload.
- Using one large form state object without clear update helpers.

## Quick Self-Check

- Can I explain why React forms often call `preventDefault()`?
- Can I describe what `values` and `errors` represent?
- Can I explain why invalid data should not be submitted?
- Can I name two uses for `isSubmitting`?
- Can I describe the submit flow from user input to success or error feedback?
