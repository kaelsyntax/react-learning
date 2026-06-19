# Conditional Fields and Derived Form State

## Goal

Understand how to show form fields based on user choices, and how to avoid duplicating state that can be calculated from existing form values.

## Core Idea

Forms often change based on what the user selects.

Some fields should appear only when they are relevant.

Example:

```text
Do you have a portfolio?
[x] Yes

Portfolio URL
[ https://kael.dev ]
```

The `portfolioUrl` field only matters when `hasPortfolio` is true.

These are conditional fields.

Derived form state is state that can be calculated from other form values.

If a value can be calculated from existing form data, it usually should not be stored as separate state.

## Conditional Fields

A conditional field appears or disappears based on another value.

```jsx
import { useForm } from 'react-hook-form'

function PortfolioForm() {
  const { register, watch } = useForm({
    defaultValues: {
      hasPortfolio: false,
      portfolioUrl: '',
    },
  })

  const hasPortfolio = watch('hasPortfolio')

  return (
    <form>
      <label>
        <input type="checkbox" {...register('hasPortfolio')} />
        I have a portfolio
      </label>

      {hasPortfolio ? (
        <label>
          Portfolio URL
          <input {...register('portfolioUrl')} />
        </label>
      ) : null}
    </form>
  )
}
```

The UI is driven by the form value.

```text
hasPortfolio true -> show portfolioUrl
hasPortfolio false -> hide portfolioUrl
```

## Dynamic vs Conditional Fields

Dynamic fields change how many fields exist.

Example:

```text
Add skill
Remove skill
```

Conditional fields change whether a specific field appears.

Example:

```text
If account type is company, show company fields.
```

The difference:

```text
dynamic field -> user controls a list of repeated fields
conditional field -> user selection controls visibility of specific fields
```

## Derived Form State

Derived form state is calculated from current form values.

Example:

```jsx
const accountType = watch('accountType')
const showCompanyFields = accountType === 'company'
```

`showCompanyFields` does not need its own `useState`.

It can be calculated from `accountType`.

Avoid this:

```jsx
const accountType = watch('accountType')
const [showCompanyFields, setShowCompanyFields] = useState(false)
```

This duplicates information and can create contradictions:

```text
accountType = 'personal'
showCompanyFields = true
```

The better rule:

```text
If it can be calculated from form values, derive it.
```

## Example: Account Type

```jsx
function AccountForm() {
  const { register, watch } = useForm({
    defaultValues: {
      accountType: 'personal',
      companyName: '',
      taxId: '',
    },
  })

  const accountType = watch('accountType')
  const isCompany = accountType === 'company'

  return (
    <form>
      <label>
        Account type
        <select {...register('accountType')}>
          <option value="personal">Personal</option>
          <option value="company">Company</option>
        </select>
      </label>

      {isCompany ? (
        <>
          <label>
            Company name
            <input {...register('companyName')} />
          </label>

          <label>
            Tax ID
            <input {...register('taxId')} />
          </label>
        </>
      ) : null}
    </form>
  )
}
```

`isCompany` is derived from `accountType`.

It does not need separate state.

## `watch` and `useWatch`

React Hook Form provides tools to observe form values.

`watch` is useful for simple conditional rendering:

```jsx
const plan = watch('plan')
const isBusinessPlan = plan === 'business'
```

`useWatch` is useful when you want a component to subscribe to specific form values more directly.

The main idea is the same:

```text
observe a form value -> derive UI from that value
```

## Hidden Fields and Their Values

Showing or hiding a field is one decision.

Keeping or clearing its value is another decision.

Example:

1. User enables `hasPortfolio`.
2. User enters `portfolioUrl`.
3. User disables `hasPortfolio`.
4. The field disappears.

The app must decide:

- Should the old `portfolioUrl` be kept?
- Should it be cleared?
- Should it be excluded from submit data?

There is no universal answer.

If the hidden value should be cleared, use form helpers like `setValue`.

```jsx
setValue('portfolioUrl', '')
```

React Hook Form also has options for unregistering unmounted fields, but the important concept is this:

```text
Visibility and stored value are separate concerns.
```

## Conditional Validation

Conditional fields often need conditional validation.

Example:

```text
portfolioUrl is required only when hasPortfolio is true
```

This can be handled with schema validation or custom validation rules.

The important idea is that validation should match the UI.

If a field is hidden and irrelevant, the user should not receive an error for it unless the data is still required by the flow.

## Data Flow

```text
user changes a form value
-> watch observes the value
-> derived state is calculated
-> conditional fields render or hide
-> validation follows the same condition
-> submit data reflects the chosen flow
```

## Why This Pattern Is Useful

- Keeps forms relevant to the user.
- Avoids showing unnecessary fields.
- Reduces duplicated React state.
- Prevents contradictory UI state.
- Makes conditional validation easier to reason about.
- Prepares for multi-step forms where each step depends on previous answers.

## Common Mistakes

- Creating extra `useState` for values that can be derived from form data.
- Showing conditional fields but forgetting conditional validation.
- Hiding fields without deciding whether their values should be kept or cleared.
- Using dynamic fields and conditional fields as if they were the same pattern.
- Watching too many values without a clear reason.
- Letting hidden invalid fields block submit unexpectedly.

## Quick Self-Check

- Can I explain the difference between dynamic fields and conditional fields?
- Can I explain what derived form state is?
- Can I calculate UI state from `watch()` instead of storing duplicate state?
- Can I explain why hidden fields may still have stored values?
- Can I explain why conditional validation should match conditional UI?
