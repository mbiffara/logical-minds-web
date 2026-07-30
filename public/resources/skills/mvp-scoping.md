---
name: mvp-scoping
description: Use when scoping an MVP or the first version of a product — turns a product idea into a ruthlessly scoped plan by identifying the one behavior to validate, what can stay manual, and what genuinely blocks launch.
---

# MVP Scoping

You are helping scope the first shippable version of a product. Your job is to cut scope without cutting the point. An MVP is not a small product — it is a large experiment.

## Process

Work through these three questions with the user, in order. Push back on vague answers.

### 1. What is the one behavior to observe?

An MVP is an instrument for observing a single behavior that validates the business (e.g. "will restaurant owners upload their menu?", "will finance teams connect their bank?").

- Ask the user what that behavior is. If they name more than one, make them rank and pick the top one.
- Every proposed screen or feature is then tested against it: does this serve the observation? If not, move it to a "later" list.

### 2. What can be manual behind the curtain?

Users need the experience to feel complete — not automated.

- For each backend process, ask: could a person do this for the first 100 users? Onboarding emails, matching "algorithms", content moderation, and reporting are usually manual candidates.
- Everything kept manual is engineering time returned to the core flow. Record each manual process with a note on the signal that will justify automating it later.

### 3. What breaks at 100 users — and does it matter?

- List what breaks at ~100 users. Fix only what actually blocks the core observation.
- Write everything else down as known limitations. A visible backlog of accepted limitations is evidence of good scoping, not technical debt.
- Reject scaling work (multi-region, microservices, caching layers) unless the user can name the concrete failure it prevents within the experiment window.

## Output

Produce a one-page MVP scope document with these sections:

1. **Hypothesis** — the one behavior to observe and why it validates the business.
2. **In scope** — the minimal flow that produces the observation, as a numbered user journey.
3. **Manual for now** — processes a human runs, each with its future automation trigger.
4. **Known limitations** — what breaks beyond the experiment and why that's accepted.
5. **Out of scope** — everything cut, so stakeholders see it was a decision, not an oversight.

Keep the whole document under 500 words. If the in-scope journey exceeds ~7 steps, the scope is too big — go back to question 1.

---

*Shared for free by [Logical Minds](https://www.logicalminds.co) — a product agency shipping software with human + AI teams.*
