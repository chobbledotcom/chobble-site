# Page rewrite plan

A reusable playbook for replacing a low-quality or AI-smelling page with one
that's accurate, in-voice, and earns its rankings honestly. Works for service
pages, example/case-study pages, and product-ish pages.

"VOICE" throughout means the voice guide in `CLAUDE.md`. There is no separate
`VOICE.md` - the project's voice rules live in `CLAUDE.md`.

---

## Goals — the finished page must pass every line

Treat this as a checklist. Tick every box before the page is ready for review.
If a box can't be ticked honestly, stop and ask Stef rather than fudging it.

### Content & accuracy
- [ ] Serves one primary searcher intent (default: **win hire enquiries**),
      clear within the first paragraph.
- [ ] Mostly selling, not teaching — explain the tech only as far as it builds
      trust and answers what the searcher actually came to find out.
- [ ] Every factual claim is verifiable against a real source. Nothing invented,
      nothing assumed.
- [ ] No waffle, no repetition — if two sentences make the same point, one goes.
- [ ] Hits EEAT: real named projects/clients with links, concrete numbers, years
      of experience, and at least one attributed review quote where a relevant
      one exists.

### Voice & values
- [ ] Reads in VOICE (`CLAUDE.md`) — first-person "I", long hedged sentences,
      specifics over abstractions, British spelling, no fake-Manc, no marketing
      tics, hyphens not em-dashes.
- [ ] Upholds anarchist + utilitarian ideals **through choices, not slogans** —
      no lock-in, you own the code, open source, honest about limits, recommends
      others when they fit better. Never named as "anarchist"/"utilitarian", and
      never moralises at the reader.
- [ ] If any required content would conflict with VOICE or those ideals, stop and
      ask Stef rather than write around it.

### SEO & structure
- [ ] Exactly one CTA, at the bottom ("fill in the form below").
- [ ] Intra-links to relevant services / examples / guides, matching real nav
      paths.
- [ ] **Light-touch SEO**: primary keyword in the H1, title and meta, plus a
      couple of natural placements. Everything else uses synonyms and plain
      language. Human-first.
- [ ] Synonyms woven in naturally; the primary term is never mechanically
      repeated.
- [ ] Nothing reads as "too SEO'y" — no keyword stuffing, headings sound like a
      human wrote them.

### Process guardrails
- [ ] Ask Stef whenever anything is unclear, ambiguous, or unverifiable from the
      existing pages — don't guess.
- [ ] The temp working file is never committed.

---

## Process

1. **Find the target.** Pick a page with low-quality content or tell-tale signs
   of AI (generic "Whether you're…" filler, scattered bold CTAs, fragment
   closers, vague "dozens of"/"a bunch of" with no named proof, grammar slips,
   over-eager sign-offs). Confirm the choice with Stef before rewriting.

2. **Extract the facts.** Read the existing page and pull every concrete,
   checkable fact about the product / service / example into a temp markdown
   working file (gitignored or deleted before commit — never committed).

3. **View the real thing.** Look at the website / product in question and
   describe it accurately in the temp file. Note what's actually true vs what the
   old page claimed.

4. **Search what devs say.** Use Kagi (`KAGI_API_KEY` is in the environment) to
   find software developers discussing this item elsewhere, and add any critical
   missing information — synonyms, real strengths/weaknesses, common questions —
   to the temp file.

   ```
   curl https://kagi.com/api/v1/search \
     -H "Authorization: Bearer $KAGI_API_KEY" \
     -H 'Content-Type: application/json' \
     -d '{ "query": "<your query goes here>", "format": "markdown" }'
   ```

5. **Mine the reviews.** Search `src/reviews.md` for any review that mentions the
   item (or a client who used it) and note the relevant quotes in the temp file.

6. **Mine the rest of the site.** Read other pages (about, principles, prices,
   social-impact, related services/examples) for genuine selling points about
   Chobble, and copy the relevant ones into the temp file.

7. **Ask Stef the open questions.** Before writing, ask open-ended questions about
   anything only Stef can answer — real experience, honest opinions, anecdotes,
   specific clients/numbers, when he *wouldn't* recommend the thing. Only ask for
   what can't already be found in the existing pages.

8. **Compile the new description.** Using the gathered data, rewrite the page so
   it:
   1. Uses VOICE (`CLAUDE.md`) for tone.
   2. Describes the item thoroughly and accurately.
   3. Quotes from the reviews, if there are any.
   4. Hits EEAT markers and addresses searcher intent.
   5. Includes any synonyms found for the item.
   6. Intra-links to other products, services, or categories where it helps.
   7. Meets every box in the Goals checklist above.

9. **Line-by-line accuracy pass.** Read it back with Stef and check every line for
   accuracy. Remove any inaccuracies, assumptions, or invented capabilities, and
   tighten anything that waffles or repeats.

10. **Re-check against VOICE.** Read it against `CLAUDE.md` once more — this is the
    step that's easiest to skip and most often skipped. Cut marketing tics, fix
    any "we" that should be "I", check for fake-Manc and em-dashes.

11. **Hand over for review.** Make a new branch, commit, and push. Do **not**
    include the temp working file.

---

## Defaults agreed with Stef

- **Primary intent:** win hire enquiries.
- **Teach vs sell:** mostly selling.
- **Values:** show through choices only, never named as slogans.
- **SEO:** light touch, human-first.
