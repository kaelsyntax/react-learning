# Exercise 03: Dynamic and Multi-Step Form Patterns

## Goal

Build a guided form flow that combines dynamic fields, conditional fields, step validation, and a final review screen.

## Concepts Practiced

- Dynamic fields with repeated data
- Field arrays with add/remove actions
- Conditional fields from watched values
- Derived form state
- Multi-step form navigation
- Step-level validation
- Review flow before final submit
- Submit feedback for a larger form

## Scenario

You are building a small onboarding or profile setup flow.

The user should not see every field at once.

Instead, the form is divided into steps:

```text
Step 1: Account details
Step 2: Skills or links
Step 3: Preferences
Step 4: Review
```

The goal is to practice how a real form grows without losing structure.

## Requirements

1. **Create a multi-step form flow**:
   - track the active step
   - show only the fields for the current step
   - provide Back and Next buttons
   - show Submit only on the final step
2. **Validate before moving forward**:
   - validate only the current step fields
   - block Next when the current step has errors
   - keep previous step values when moving back
3. **Add at least one dynamic field list**:
   - skills
   - social links
   - experience items
   - project links
4. **Support add and remove actions** for the dynamic list.
5. **Add at least one conditional section**:
   - example: show company fields only when account type is `company`
   - example: show portfolio URL only when the user says they have a portfolio
6. **Use derived form state** for conditional UI:
   - watch the source value
   - calculate whether the extra fields should appear
   - avoid duplicate `useState` for derived visibility
7. **Create a review step**:
   - show a readable summary of all relevant values
   - include dynamic field values
   - include conditional values only when relevant
8. **Add final submit feedback**:
   - disable submit while submitting
   - show success or error feedback

## Constraints

- Do not create separate unrelated forms for each step.
- Do not lose values when navigating between steps.
- Do not validate future steps before the user reaches them.
- Do not use extra state for values that already exist inside form state.
- Do not allow the user to remove every dynamic item if at least one is required.
- Keep the review step read-only.

## Suggested Step Shape

```js
const steps = [
  {
    title: 'Account',
    fields: ['name', 'email', 'accountType'],
  },
  {
    title: 'Skills',
    fields: ['skills'],
  },
  {
    title: 'Preferences',
    fields: ['hasPortfolio', 'portfolioUrl'],
  },
  {
    title: 'Review',
    fields: [],
  },
]
```

The exact fields can change.

The important idea is:

```text
step config tells the form what to show and validate
```

## Suggested Flow

```text
render current step
-> user fills fields
-> user clicks Next
-> validate current step fields
-> if valid, move to next step
-> final Review shows all values
-> Submit sends complete data
```

## Expected Result

- The form feels like one coherent flow divided into steps.
- The user can add and remove repeated entries.
- Conditional fields appear only when relevant.
- Next is blocked when the current step is invalid.
- Back preserves previous values.
- Review step summarizes the complete form data.
- Final submit gives clear loading and result feedback.

## Self-Check

- [ ] Did I keep the flow as one form instead of separate unrelated forms?
- [ ] Did I validate only current step fields before Next?
- [ ] Did I add and remove dynamic field items?
- [ ] Did I derive conditional UI from form values?
- [ ] Did I preserve values when moving between steps?
- [ ] Did I build a read-only review step?
- [ ] Did I show final submit feedback?
