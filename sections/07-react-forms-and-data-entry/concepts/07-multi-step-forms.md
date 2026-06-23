# Multi-Step Forms

## Goal

Understand how to split a larger form into multiple steps while keeping one consistent form flow, validation strategy, and final submit.

## Core Idea

A multi-step form is one form experience divided into smaller screens.

It is useful when asking for all information at once would feel overwhelming.

Example:

```text
Step 1: Personal info
Step 2: Skills and links
Step 3: Preferences
Step 4: Review
Step 5: Submit
```

The important idea is:

```text
one form flow
multiple visual steps
one final submit
```

The user moves through the form step by step, but the data still belongs to the same overall flow.

## Why Use Multi-Step Forms?

Multi-step forms help when a form has many fields or logical sections.

They can improve UX because they:

- reduce visual overload
- group related fields together
- make progress visible
- allow validation per section
- create a final review step before submit

They are common in onboarding flows, checkout flows, applications, surveys, and profile builders.

## The `currentStep` State

A multi-step form needs to know which step is active.

```jsx
const [currentStep, setCurrentStep] = useState(0)
```

`currentStep` is the key piece of state that controls the flow.

It does not validate by itself.

But it tells the app what the active step is, and that makes it possible to decide:

- which fields to show
- which fields to validate
- whether the Back button should appear
- whether the Next or Submit button should appear
- what progress indicator should be active

## Step Configuration

A useful pattern is to describe the steps in an array.

```js
const steps = [
  {
    title: 'Personal info',
    fields: ['firstName', 'email'],
  },
  {
    title: 'Skills',
    fields: ['skills'],
  },
  {
    title: 'Review',
    fields: [],
  },
]
```

Each step can define:

- title
- fields that belong to the step
- component to render
- optional description

The `fields` list is especially useful for step validation.

## Showing the Active Step

The UI can render a different step based on `currentStep`.

```jsx
{currentStep === 0 ? <PersonalInfoStep register={register} errors={errors} /> : null}
{currentStep === 1 ? <SkillsStep control={control} register={register} errors={errors} /> : null}
{currentStep === 2 ? <ReviewStep values={values} /> : null}
```

This keeps each step focused.

The parent form still owns the flow.

The step components only render their fields.

## Step Validation

Usually, the user should not move forward if the current step has invalid data.

React Hook Form provides `trigger`, which can validate specific fields.

```jsx
const {
  register,
  handleSubmit,
  trigger,
  formState: { errors },
} = useForm()
```

The Next button can validate only the fields for the current step.

```jsx
async function handleNext() {
  const currentFields = steps[currentStep].fields
  const isStepValid = await trigger(currentFields)

  if (!isStepValid) return

  setCurrentStep((step) => step + 1)
}
```

Flow:

```text
click Next
-> get fields for currentStep
-> validate only those fields
-> if valid, move forward
-> if invalid, stay and show errors
```

This avoids showing errors for fields the user has not reached yet.

## Back and Next Buttons

The Back button should usually be hidden or disabled on the first step.

```jsx
const isFirstStep = currentStep === 0
const isLastStep = currentStep === steps.length - 1
```

Example:

```jsx
{!isFirstStep ? (
  <button type="button" onClick={() => setCurrentStep((step) => step - 1)}>
    Back
  </button>
) : null}

{!isLastStep ? (
  <button type="button" onClick={handleNext}>
    Next
  </button>
) : (
  <button type="submit">
    Submit
  </button>
)}
```

Use `type="button"` for navigation buttons.

Only the final submit button should submit the form.

## Review Step

A review step shows the data before final submit.

It usually does not collect new values.

It helps the user confirm:

- personal info
- selected options
- dynamic field entries
- preferences

Example:

```jsx
function ReviewStep({ values }) {
  return (
    <section>
      <h2>Review</h2>
      <p>Email: {values.email}</p>
      <p>Skills: {values.skills.map((skill) => skill.name).join(', ')}</p>
    </section>
  )
}
```

With React Hook Form, current form values can be read with `watch` or `getValues`.

```jsx
const values = getValues()
```

## One Form or Multiple Forms?

Most multi-step flows work better as one form divided visually into steps.

This keeps:

- one validation system
- one submit flow
- one data object
- one source of truth

Multiple separate forms can work for some apps, but they make shared state, validation, and final review more complex.

The default mental model should be:

```text
one form, many steps
```

## Data Flow

```text
form starts at step 0
-> user fills current step
-> Next validates current step fields
-> valid step moves forward
-> Back moves to previous step
-> Review reads all form values
-> final Submit sends complete data
```

## Why This Pattern Is Useful

- Makes large forms easier to complete.
- Keeps validation focused on the current step.
- Prevents overwhelming the user with too many fields.
- Allows a review screen before final submit.
- Works well with dynamic fields and conditional fields.
- Prepares the section project for an onboarding wizard.

## Common Mistakes

- Treating each step as a totally separate form without a reason.
- Validating the entire form when the user clicks Next on the first step.
- Forgetting `type="button"` on Back and Next buttons.
- Losing values when moving between steps.
- Showing final submit too early.
- Building progress UI that does not match `currentStep`.
- Letting users advance with invalid step data.

## Quick Self-Check

- Can I explain why a multi-step form is usually one form divided visually?
- Can I explain what `currentStep` controls?
- Can I explain why step validation should usually validate only current fields?
- Can I explain the difference between Next and Submit?
- Can I describe what a review step is for?
