# Exercise 01: Controlled Inputs and Validation Flow

## Goal

Build a small form with controlled inputs, local validation, submit feedback, and clear error messages.

## Concepts Practiced

- Controlled inputs with `value` and `onChange`
- Local form state
- Field-level validation
- Submit flow with `preventDefault`
- Submit feedback states
- Basic accessible error messages

## Scenario

You need to create a simple contact or signup form without using a form library yet.

The goal is to understand the manual form flow before adding tools like React Hook Form and Zod.

The form should make the data flow visible:

```text
user types
-> state updates
-> validation runs
-> errors appear
-> submit is blocked or accepted
-> feedback is shown
```

## Requirements

1. **Create a form with at least three fields**:
   - name
   - email
   - message, password, or role
2. **Control every field with React state**:
   - each input has a `value`
   - each input updates state with `onChange`
3. **Add validation rules**:
   - required fields
   - valid email format
   - one length rule, such as minimum message length
4. **Block submit when validation fails**:
   - use `event.preventDefault()`
   - show field-level error messages
   - do not continue the submit flow with invalid data
5. **Add submit feedback**:
   - show a submitting state
   - disable the submit button while submitting
   - show a success or error message after submit
6. **Connect errors to inputs**:
   - each input has a visible label
   - invalid fields use `aria-invalid`
   - error messages are connected with `aria-describedby`

## Constraints

- Do not use React Hook Form yet.
- Do not use Zod yet.
- Do not mutate the form state object directly.
- Do not store derived values if they can be calculated during validation.
- Do not rely only on color to show an error.
- Keep the form small enough to understand the full flow.

## Suggested State Shape

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
})

const [errors, setErrors] = useState({})
const [submitStatus, setSubmitStatus] = useState('idle')
```

The exact field names can change.

The important idea is to separate:

- form values
- validation errors
- submit status

## Expected Result

- Typing in a field updates React state.
- Submitting invalid data shows clear field errors.
- Submitting valid data enters a temporary submitting state.
- The submit button cannot be clicked repeatedly while submitting.
- The user receives clear success or failure feedback.
- Each error message is visibly and semantically connected to its input.

## Self-Check

- [ ] Did I control every input with React state?
- [ ] Did I validate before completing the submit flow?
- [ ] Did I avoid submitting invalid data?
- [ ] Did I disable the submit button while submitting?
- [ ] Did I show feedback after submit?
- [ ] Did I connect each error message to its input?
