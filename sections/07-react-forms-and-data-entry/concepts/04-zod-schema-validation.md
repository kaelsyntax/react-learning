# Zod Schema Validation

## Goal

Understand how Zod schemas describe valid data, how to validate values safely, and how Zod connects with React Hook Form.

## Core Idea

Zod is a schema validation library.

A schema is a contract for data.

It describes what shape the data should have and which rules each field must follow.

Instead of spreading validation rules across many `if` statements, Zod lets you define the rules in one reusable object.

## Installation

```bash
npm install zod
```

When using Zod with React Hook Form, also install the resolver package:

```bash
npm install @hookform/resolvers
```

## Defining a Schema

```js
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
```

This schema means:

```text
login data must be an object
email must be a valid email string
password must be a string with at least 8 characters
```

The schema becomes the single source of truth for validation rules.

## Validating With `safeParse`

`safeParse` checks data without throwing an error.

It returns a result object.

```js
const result = loginSchema.safeParse({
  email: 'kael@example.com',
  password: '12345678',
})

if (result.success) {
  console.log(result.data)
} else {
  console.log(result.error)
}
```

If validation passes:

```text
result.success === true
result.data contains valid data
```

If validation fails:

```text
result.success === false
result.error contains validation issues
```

This is useful when validating outside a form library or when you want full control over how errors are handled.

## `parse` vs `safeParse`

`parse` validates data and throws if validation fails.

```js
const data = loginSchema.parse(values)
```

`safeParse` validates data and returns a result object instead of throwing.

```js
const result = loginSchema.safeParse(values)
```

For learning and form flows, `safeParse` is often easier to reason about because success and failure are explicit.

## Connecting Zod to React Hook Form

React Hook Form can use a Zod schema through `zodResolver`.

```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email ? <p>{errors.email.message}</p> : null}

      <input type="password" {...register('password')} />
      {errors.password ? <p>{errors.password.message}</p> : null}

      <button type="submit">Log in</button>
    </form>
  )
}
```

The flow becomes:

```text
user submits
-> React Hook Form gathers values
-> zodResolver validates with the Zod schema
-> errors are exposed in formState.errors if invalid
-> onSubmit receives valid data if valid
```

## Why Use Zod With React Hook Form?

Without Zod, validation rules often live inside each field:

```jsx
<input
  {...register('password', {
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters.',
    },
  })}
/>
```

With Zod, the rules move into the schema:

```js
const loginSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
```

This makes validation easier to reuse, read, and update.

## Data Flow

```text
define schema
-> connect schema to form with zodResolver
-> register fields
-> submit form
-> schema validates values
-> show errors or submit valid data
```

## Why This Pattern Is Useful

- Keeps validation rules in one place.
- Makes form validation easier to reuse.
- Reduces scattered field-level rules.
- Works with React Hook Form through a resolver.
- Makes valid and invalid data paths explicit.
- Prepares for more complex validation in dynamic and multi-step forms.

## Common Mistakes

- Thinking Zod is only for TypeScript.
- Forgetting to install `@hookform/resolvers` when using React Hook Form.
- Checking the wrong error key after registering a field.
- Duplicating validation rules in both Zod and field-level options.
- Using `parse` in places where `safeParse` would make error handling easier.
- Making schemas too complex before the form requirements are clear.

## Quick Self-Check

- Can I explain what a schema is?
- Can I describe what `z.object` does?
- Can I explain what `safeParse` returns?
- Can I explain why `zodResolver` is needed with React Hook Form?
- Can I name one advantage of schema validation over manual `if` checks?
