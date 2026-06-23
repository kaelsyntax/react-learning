# Exercise 02: React Hook Form with Schema Validation

## Goal

Rebuild a small form using React Hook Form and Zod, moving validation rules into a schema and keeping field errors easy to render.

## Concepts Practiced

- React Hook Form setup with `useForm`
- Registering fields with `register`
- Schema validation with Zod
- Connecting Zod with React Hook Form
- Rendering field-level errors
- Submit state with `isSubmitting`
- Accessible labels and error messages

## Scenario

You already practiced the manual controlled-input flow.

Now you want the same kind of form to be easier to maintain as validation grows.

Instead of manually storing every field value and every validation rule in component state, the form should use:

```text
React Hook Form -> form registration and submit flow
Zod -> validation schema
```

The goal is not to make a huge form.

The goal is to understand how form libraries organize the same flow more cleanly.

## Requirements

1. **Create a form with at least four fields**:
   - name
   - email
   - password or role
   - message, portfolio URL, or terms checkbox
2. **Create a Zod schema** for the form values:
   - required text fields
   - valid email
   - one length rule
   - one optional or conditional-friendly field
3. **Connect the schema to React Hook Form**:
   - use `useForm`
   - use the Zod resolver
   - read errors from `formState.errors`
4. **Register every field** with React Hook Form.
5. **Render field-level error messages** next to the relevant input.
6. **Use submit state**:
   - disable the submit button while submitting
   - show a submitting label
   - show success feedback after valid submit
7. **Keep the form accessible**:
   - visible labels
   - `aria-invalid`
   - `aria-describedby` for error messages

## Constraints

- Do not manage every input with separate `useState`.
- Do not duplicate the same validation rule in both Zod and component logic.
- Do not hide validation errors in a generic message only.
- Do not rely only on placeholder text as the label.
- Keep the form small and focused.

## Suggested Schema Shape

```js
const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
})
```

The exact fields can change.

The important idea is:

```text
schema describes valid data
React Hook Form manages form flow
UI renders errors from formState
```

## Suggested Form Setup

```jsx
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(schema),
})
```

This replaces a lot of manual form wiring from the previous exercise.

## Expected Result

- The form is submitted only when the Zod schema passes.
- Invalid fields show their own error messages.
- Component state is not used for every input value.
- The submit button shows a loading/submitting state.
- Valid submit displays clear success feedback.
- Error messages are connected to their inputs.

## Self-Check

- [ ] Did I define the validation rules in a Zod schema?
- [ ] Did I connect the schema with React Hook Form?
- [ ] Did I register every field?
- [ ] Did I render field-level errors from `formState.errors`?
- [ ] Did I avoid duplicating validation rules outside the schema?
- [ ] Did I disable submit while `isSubmitting` is true?
- [ ] Did I keep labels and error messages accessible?
