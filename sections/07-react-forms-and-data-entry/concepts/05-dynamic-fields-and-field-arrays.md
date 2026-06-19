# Dynamic Fields and Field Arrays

## Goal

Understand how to model form fields that users can add, remove, and repeat, and how React Hook Form handles these lists with `useFieldArray`.

## Core Idea

Not every form has a fixed number of fields.

Some forms let the user decide how many items to enter.

Examples:

- skills
- links
- phone numbers
- job requirements
- previous jobs
- education entries
- portfolio projects
- emergency contacts

These are dynamic fields.

When dynamic fields represent a list, they are usually modeled as an array.

```js
{
  skills: [
    { name: 'React' },
    { name: 'JavaScript' },
    { name: 'CSS' },
  ]
}
```

In React Hook Form, this pattern is handled with `useFieldArray`.

## Dynamic Field vs Fixed Field

A fixed field always exists once:

```text
email
password
name
```

A dynamic field can exist zero, one, or many times:

```text
skills[0]
skills[1]
skills[2]
```

The user can add or remove items from the list.

## Basic `useFieldArray` Setup

```jsx
import { useForm, useFieldArray } from 'react-hook-form'

function SkillsForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      skills: [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`skills.${index}.name`)} />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ name: '' })}>
        Add skill
      </button>

      <button type="submit">Save</button>
    </form>
  )
}
```

## What Each Piece Does

```jsx
const { register, control } = useForm()
```

`register` connects inputs to React Hook Form.

`control` connects controlled form helpers like `useFieldArray` to the form system.

```jsx
const { fields, append, remove } = useFieldArray({
  control,
  name: 'skills',
})
```

`fields` is the list used to render the current items.

`append` adds a new item to the array.

`remove` removes an item by index.

`name: 'skills'` tells React Hook Form which array this hook manages.

## Field Names With Indexes

This line is the most important part:

```jsx
<input {...register(`skills.${index}.name`)} />
```

It means:

```text
skills.0.name
skills.1.name
skills.2.name
```

The submitted data becomes:

```js
{
  skills: [
    { name: 'React' },
    { name: 'JavaScript' },
    { name: 'CSS' },
  ]
}
```

The string passed to `register` defines where the value will live in the final data object.

## Why `field.id` Is Used As Key

React needs a stable `key` when rendering lists.

React Hook Form gives each field item an `id`.

```jsx
{fields.map((field, index) => (
  <div key={field.id}>
    ...
  </div>
))}
```

Use `field.id` for the React key.

Avoid using only the array index as the key.

If a user removes an item from the middle, index keys can cause React to reuse the wrong DOM elements and visually mix field values.

## Adding Items

`append` adds a new item to the array.

```jsx
append({ name: '' })
```

The object should match the shape of one array item.

For a links array:

```js
{
  links: [
    { label: 'GitHub', url: 'https://github.com/...' },
  ]
}
```

The append call could be:

```jsx
append({ label: '', url: '' })
```

## Removing Items

`remove` deletes an item by index.

```jsx
remove(index)
```

For better UX, some forms keep at least one item visible.

```jsx
{fields.length > 1 ? (
  <button type="button" onClick={() => remove(index)}>
    Remove
  </button>
) : null}
```

The right behavior depends on the form.

Some lists can be empty.

Some lists should require at least one item.

## Example: Job Requirements

Dynamic fields are not only for technical skills.

They can model any repeatable user-entered data.

```js
{
  requirements: [
    { text: 'Remote work' },
    { text: 'Flexible schedule' },
    { text: 'No weekend shifts' },
  ]
}
```

The input name would be:

```jsx
register(`requirements.${index}.text`)
```

This creates:

```text
requirements[0].text
requirements[1].text
requirements[2].text
```

## Data Flow

```text
form starts with default array values
-> fields render current items
-> user adds an item with append
-> user removes an item with remove
-> register names map values into array data
-> submit returns the final array
```

## Why This Pattern Is Useful

- Handles lists of repeated form fields.
- Lets users decide how much data to enter.
- Keeps array values structured.
- Avoids manual state operations for add/remove flows.
- Works well for skills, links, requirements, contacts, and similar repeatable data.
- Prepares for multi-step forms and dynamic onboarding flows.

## Common Mistakes

- Using `index` instead of `field.id` as the React key.
- Forgetting `defaultValues` for field arrays.
- Appending an object with the wrong shape.
- Using a different field name in `register` than the array name in `useFieldArray`.
- Treating dynamic fields like one big text field instead of structured data.
- Allowing users to remove required minimum items without validation or feedback.

## Quick Self-Check

- Can I explain what a dynamic field is?
- Can I explain what `useFieldArray` is for?
- Can I describe what `fields`, `append`, and `remove` do?
- Can I explain why `register(`skills.${index}.name`)` creates array data?
- Can I explain why `field.id` should be used as the key?
