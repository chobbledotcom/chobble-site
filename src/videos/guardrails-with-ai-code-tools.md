---
title: Using Guardrails with AI Code Tools
meta_title: Using Guardrails with AI Code Tools | Eleventy Meetup Talk | Chobble
description: A talk I gave at the 11ty Meetup about keeping AI-generated code clean with linting, copy-paste detection, dead code removal, type checking, and custom code quality tests
snippet: My 11ty Meetup talk on taming AI code with fussy guardrails - linting, duplication detection, type checks, and more
order: 16
youtube_id: NLrQSRoVKSg
meta_description: 20-minute talk from the 11ty Meetup on using biome, jscpd, knip, TypeScript, and custom code quality checks to stop AI tools writing messy code in an Eleventy codebase
---

# Using Guardrails with AI Code Tools - 11ty Meetup Talk

I gave this talk at the [11ty Meetup](https://11tymeetup.dev/) in February 2026 about the guardrails I've set up around my [Chobble Template](/services/chobble-template/) to stop AI code tools making a mess of things. It's about 20 minutes long.

AI writes code that "works" - but without careful guidance your codebase drifts towards defensive code that swallows errors, really long methods, duplicated logic, and pointless tests. I've spent the last year and a half building increasingly fussy layers of automated checks to catch all of this before it reaches the main branch.

## What the talk covers

The talk walks through six layers of guardrails I use when getting Claude Code to build features for my Eleventy template:

**Layer 0 - GitHub Workflows:** Blocking merges until a full test suite passes - biome linting, copy-paste detection, dead code scanning, type checking, code quality tests, unit tests, integration tests, and 100% test coverage.

**Layer 1 - Biome linting:** 20+ rules set to error (not warn) - no `var`, no `forEach`, no `==`, no `console.log`, arrow functions only, and a cognitive complexity cap of 7 per method in source code. This one rule alone forces AI to write short, readable functions instead of deeply nested monsters.

**Layer 2 - Copy-paste detection with jscpd:** Running at three strictness levels (12 tokens for utility methods, 23 for source, 40 for tests) with a ratchet that automatically tightens the threshold whenever duplication drops.

**Layer 3 - Dead code detection with knip:** LLMs love leaving unused code around "for backwards compatibility" that nobody asked for. Knip catches it. We have git - old code is perfectly safe to delete.

**Layer 4 - TypeScript type checks:** Using 11ty.ts for the Eleventy config and custom types for the PagesCMS schema, so the AI never has to write defensive "is this an array or null?" code. If the types say products have FAQs with questions and answers, that's what they have.

**Layer 5 - Custom code quality tests:** Maximum file and method lengths, no `let` or `var` (immutable functional style), no try/catch blocks, no nested loops, no single-use methods, no excessive comments, no HTML in JavaScript, and tests that check the test code itself for vague names and tautological assertions.

**Layer 6 - The ratchet:** One exceptions file with a big scary warning telling the AI not to add to it. Exceptions can only be removed, never added by the AI.

The practical workflow is: ask Claude to build something, it pushes to GitHub, the action fails, then it churns away fixing violations until the code actually fits your in-house style. At that point you start reviewing - but you're reviewing fewer, cleaner lines of code that match how you'd write it yourself.

## Mentioned Links

- [Chobble Template on GitHub](https://github.com/chobbledotcom/chobble-template/) - the Eleventy template discussed in the talk
- [11ty Meetup](https://11tymeetup.dev/) - where the talk was given
- [Biome](https://biomejs.dev/) - the fast linter and formatter
- [jscpd](https://github.com/kucherenko/jscpd) - copy-paste detection
- [knip](https://knip.dev/) - dead code detection
- [11ty.ts](https://www.npmjs.com/package/11ty.ts) - TypeScript support for Eleventy configs
- [Live demo of the template](https://example.chobble.com/)

**If you're a developer using AI code tools and want help setting up similar guardrails for your own codebase, or if you're interested in the Chobble Template for a client project, drop me a message through the form below.**
