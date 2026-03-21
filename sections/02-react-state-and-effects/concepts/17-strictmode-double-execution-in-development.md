# StrictMode Double Execution in Development

## Goal

Understand why effects may run twice in development and how to write safe effect logic.

## Core Idea

In React StrictMode (development only), React intentionally re-runs certain lifecycle/effect logic to detect unsafe side effects.

This behavior helps surface issues such as:

- missing cleanup
- non-idempotent effects
- assumptions that an effect runs exactly once

## Important Note

Double execution in this context does **not** happen in production builds.

## Safe Practices

- Write idempotent effects when possible.
- Always cleanup persistent resources.
- Avoid relying on one-time side effects without guards.

## Common Mistake

Treating dev double execution as a React bug instead of a safety check.
