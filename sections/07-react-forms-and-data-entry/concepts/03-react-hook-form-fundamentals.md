# React Hook Form Fundamentals

## Goal

Understand why React Hook Form exists, what problems it solves, and how its core API maps to the form patterns already learned.

## Core Idea

React Hook Form is a form library for managing form registration, validation, submit flow, and form state with less manual code.

It does not remove the need to understand forms.

It gives structure to patterns that would otherwise be repeated with `useState`, `errors`, `isSubmitting`, and custom submit handlers.

The core mental model is:

```text
register fields -> validate values -> handle submit -> read form state
```

## Why Use a Form Library?

Small forms can work well with plain React state.

Larger forms become repetitive:

- one state object for values
- one state object for errors
- touched state
- submit state
- validation logic
- reset logic
- repeated handlers

React Hook Form helps reduce that boilerplate while keeping the form behavior explicit.

It is especially useful when forms have many fields, validation rules, conditional inputs, or complex submit feedback.

## Basic Setup

```jsx
import { useForm } from 'react-hook-form'

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email
        <input
          {...register('email', {
            required: 'Email is required.',
          })}
        />
      </label>

      {errors.email ? <p>{errors.email.message}</p> : null}

      <button type="submit">Create account</button>
    </form>
  )
}
```

This example has four important pieces:

- `useForm()` creates the form controller.
- `register()` connects inputs to React Hook Form.
- `handleSubmit()` runs validation before calling `onSubmit`.
- `formState.errors` stores validation errors.

## `register`

`register` connects an input to the form.

```jsx
<input {...register('email')} />
```

The string name becomes the key in the submitted data object.

```jsx
{
  email: 'user@example.com'
}
```

`register` can also receive validation rules:

```jsx
<input
  {...register('password', {
    required: 'Password is required.',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters.',
    },
  })}
/>
```

The important idea is that the field name, validation rules, and DOM input are connected in one place.

## `handleSubmit`

`handleSubmit` wraps your submit function.

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
```

It does the form work before your callback runs:

```text
user submits
-> React Hook Form reads registered fields
-> validation runs
-> errors are updated if invalid
-> onSubmit receives valid data if valid
```

Your submit callback receives the final data:

```jsx
const onSubmit = (data) => {
  console.log(data)
}
```

This means you usually do not need to manually call `event.preventDefault()`.

React Hook Form handles the form submit event through `handleSubmit`.

## `formState.errors`

Validation errors are exposed through `formState.errors`.

```jsx
{errors.email ? <p>{errors.email.message}</p> : null}
```

Each error is tied to the field name used in `register`.

```text
register('email') -> errors.email
register('password') -> errors.password
```

This naming connection is one of the reasons form libraries make larger forms easier to maintain.

## Relationship to Controlled and Uncontrolled Inputs

React Hook Form often works closer to uncontrolled inputs by registering fields and reading their values through the form system.

That helps avoid re-rendering the whole form on every keystroke.

This does not mean controlled inputs are bad.

It means React Hook Form gives a more efficient default for common form fields.

When an input needs to be fully controlled by React or comes from a custom UI component, React Hook Form has tools for that too. Those patterns come later.

## Form State

React Hook Form also exposes state about the form.

Common pieces include:

- `errors`
- `isSubmitting`
- `isValid`
- `isDirty`
- `touchedFields`

Example:

```jsx
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm()
```

`isSubmitting` can be used for submit feedback:

```jsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</button>
```

## Data Flow

```text
render form
-> register inputs
-> user types
-> React Hook Form tracks field values
-> user submits
-> handleSubmit validates
-> errors show or valid data reaches onSubmit
```

## Why This Pattern Is Useful

- Reduces repetitive form state code.
- Keeps field registration and validation close together.
- Makes submit flow consistent.
- Exposes useful form state without manually wiring every piece.
- Prepares the project for schema validation with Zod.
- Scales better than hand-written state for larger forms.

## Common Mistakes

- Treating React Hook Form as magic without understanding submit flow.
- Forgetting to wrap submit logic with `handleSubmit`.
- Expecting `onSubmit` to run when validation fails.
- Using a field name in `register` but checking a different key in `errors`.
- Mixing manual `useState` form values with React Hook Form without a clear reason.
- Trying to control every input manually before learning the library's default pattern.

## Quick Self-Check

- Can I explain what `register` does?
- Can I explain why `handleSubmit` wraps my submit function?
- Can I find where validation errors live?
- Can I explain how React Hook Form relates to uncontrolled inputs?
- Can I name one reason a form library becomes useful in larger forms?
