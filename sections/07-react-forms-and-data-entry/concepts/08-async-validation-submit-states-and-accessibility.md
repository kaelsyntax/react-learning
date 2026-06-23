# Async Validation, Submit States, and Accessibility

## Goal

Understand how to validate form data that depends on an async check, how to communicate submit progress, and how to make form errors understandable for more users.

## Core Idea

Good forms do not only collect data.

They also guide the user through the flow.

That means the form should:

- validate fields when needed
- wait for async checks when needed
- prevent duplicate submits
- explain errors clearly
- expose errors to assistive technologies

The user should never have to guess what is happening.

## Async Validation

Async validation is validation that needs to wait for something outside the current render.

Examples:

- checking if a username is available
- checking if an email is already registered
- validating a coupon code
- confirming that a project slug is unique

This kind of validation cannot be solved only with local rules like:

```text
required
min length
valid email format
```

Those rules are immediate.

Async validation asks a service or some external source before deciding if the value is valid.

## Example: Username Availability

```jsx
async function checkUsernameAvailability(username) {
  const response = await fetch(`/api/users/check-username?username=${username}`)
  const data = await response.json()

  return data.isAvailable
}
```

The important idea is not the exact API URL.

The important flow is:

```text
user enters username
-> app checks availability
-> app waits for the result
-> valid if available
-> error if already taken
```

## Async Validation with React Hook Form

React Hook Form can use async validation rules.

```jsx
function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values) {
    await saveUser(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        aria-invalid={errors.username ? 'true' : 'false'}
        aria-describedby={errors.username ? 'username-error' : undefined}
        {...register('username', {
          required: 'Username is required.',
          validate: async (value) => {
            const isAvailable = await checkUsernameAvailability(value)

            return isAvailable || 'Username is already taken.'
          },
        })}
      />

      {errors.username ? (
        <p id="username-error">{errors.username.message}</p>
      ) : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}
```

The validation function can return:

- `true` when the field is valid
- a string message when the field is invalid

## When to Run Async Validation

Async validation can feel expensive if it runs too often.

For example, checking a username on every single key press can create too many requests and a noisy UX.

Common options:

- validate when the field loses focus
- validate when the user submits
- debounce the check after typing stops
- validate only when the value has enough characters

The best choice depends on the form.

The rule is:

```text
async validation should help the user, not interrupt them constantly
```

## Submit States

A form submit usually has more than two states.

Useful mental model:

```text
idle
-> submitting
-> success
```

Or:

```text
idle
-> submitting
-> error
```

The UI should reflect the current state.

Example:

```jsx
async function onSubmit(values) {
  try {
    await saveProfile(values)
    setSubmitStatus('success')
  } catch (error) {
    setSubmitStatus('error')
  }
}
```

If the form library already provides submit state, use it.

React Hook Form provides `isSubmitting`.

```jsx
const {
  formState: { isSubmitting },
} = useForm()
```

Then the submit button can react to it.

```jsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save changes'}
</button>
```

## Why Disable the Submit Button?

While submitting, the button is often disabled to prevent duplicate requests.

Without that, the user can click multiple times and create problems like:

- duplicate accounts
- duplicate orders
- repeated API requests
- confusing success or error messages

Disabled submit is not the only protection a real backend needs, but it is still useful for the frontend UX.

## Submit Feedback

The user should know what happened after submit.

Examples:

```jsx
{submitStatus === 'success' ? (
  <p>Your profile was saved.</p>
) : null}

{submitStatus === 'error' ? (
  <p>Something went wrong. Please try again.</p>
) : null}
```

Good feedback answers:

- Is the form currently saving?
- Did it work?
- Did it fail?
- What can the user do next?

## Accessibility

Accessible forms are forms that are easier to understand and operate.

This is not only for screen readers.

It also helps users who:

- navigate with a keyboard
- have low vision
- are color blind
- are tired, distracted, or in a hurry
- need clearer feedback

## Labels

Every input should have a clear label.

```jsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

The `htmlFor` value should match the input `id`.

This connects the label to the input.

## Error Messages

Do not rely only on red borders or red text.

Color can help, but it should not be the only signal.

Better:

```jsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby={errors.email ? 'email-error' : undefined}
  {...register('email', {
    required: 'Email is required.',
  })}
/>

{errors.email ? (
  <p id="email-error">{errors.email.message}</p>
) : null}
```

This gives the user:

- a visible label
- a visible error message
- an input marked as invalid
- a connection between the input and the error text

## `aria-invalid`

`aria-invalid` communicates that the current field has an invalid value.

```jsx
aria-invalid={errors.email ? 'true' : 'false'}
```

It should reflect the real validation state.

## `aria-describedby`

`aria-describedby` connects an input to extra descriptive text.

For errors, it usually points to the error message id.

```jsx
aria-describedby={errors.email ? 'email-error' : undefined}
```

Then the error element uses the same id.

```jsx
<p id="email-error">Email is required.</p>
```

The relationship is:

```text
input aria-describedby="email-error"
-> error element id="email-error"
```

## Data Flow

```text
user fills field
-> local validation runs
-> async validation runs if needed
-> errors update
-> accessible attributes reflect errors
-> submit starts
-> submit UI shows loading
-> success or error feedback appears
```

## Why This Pattern Is Useful

- Prevents duplicate submits.
- Makes slow validation understandable.
- Gives users clear feedback during async work.
- Keeps errors connected to their fields.
- Makes the form easier to use with keyboard and assistive technologies.
- Prepares the section project for a more realistic onboarding form.

## Common Mistakes

- Running async validation too aggressively on every key press.
- Not showing that an async check is happening.
- Letting users click Submit many times while the request is pending.
- Showing only a red border without an error message.
- Rendering an error message without connecting it to the input.
- Forgetting labels.
- Using vague submit errors like `Error` instead of helpful feedback.

## Quick Self-Check

- Can I explain what async validation means?
- Can I give an example of a field that needs async validation?
- Can I explain why `isSubmitting` is useful?
- Can I explain why disabling submit can prevent duplicate actions?
- Can I connect an input error with `aria-describedby`?
- Can I explain why color alone is not enough for form errors?
