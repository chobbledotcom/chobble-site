---
title: Fun at the Fair
snippet: 68 real funfair rides for hire - dodgems to a ferris wheel - on the Chobble Template
order: 8
colour: "#ffe135"
meta_title: Fun at the Fair | Funfair Ride Hire Website | Chobble
meta_description: 68-product funfair ride hire site on the Chobble Template - dodgems to a ferris wheel, 21 location pages, GitHub Actions to Bunny CDN - web dev example
---

# Fun at the Fair

- **Client:** DB Entertainment Ltd, Rotherham
- **Services:** Website development and ongoing content
- **Website:** [allthefunatthefair.co.uk](https://www.allthefunatthefair.co.uk)

Fun at the Fair is the outdoor funfair and fairground ride hire arm of DB Entertainment, a Rotherham company that has been going since 1999. It started out hiring PA systems for live events around South Yorkshire, and one client wanting a bouncy castle alongside the speakers later, the warehouse filled up with real rides - dodgems, a waltzer, a ferris wheel, a ghost train. Everything lives in a 25,000 sq ft warehouse with £5M public liability cover, the delivering is done with their own vans and lorries, and the bigger rides go out with operators on the payroll. Clients over the years have included Amazon, Alzheimer's Society, Prostate Cancer UK and council events teams at Sheffield, Doncaster and Rotherham.

![Fun at the Fair website homepage, with a photo of fairground rides lit up at dusk behind the headline and a browse-the-rides button](/assets/examples/fun-at-the-fair.png)

## The build

It's the [Chobble Template](/services/chobble-template/) with a custom theme, built as a static site and deployed automatically through GitHub Actions to Bunny's CDN - staging for branches, production for main. The catalogue is at the big end: 68 product pages across 8 categories, each with a stats block (footprints, heights, hire-from pricing with the VAT made plain), FAQs and specifications, plus 14 customer reviews fetched from Google, Facebook and Trustpilot through the Apify-based fetcher behind my [Google reviews scraper](/services/tools/).

The 21 location pages come in two patterns: town and city pages (Manchester to Glasgow, dodgems to helter skelters), and showground or venue pages for places the team knows from setting up on their fields - Newark Showground, Penistone Showground, the Yorkshire Event Centre at Harrogate, the NEC in Birmingham. Old ecommerce URLs from the previous shop, the `/category/` paths with product IDs in them, all redirect to their new homes so none of Google's existing index was lost.

## Where the time went

The honest part of this build is the content, and it's where most of the time actually goes: 68 product pages and 21 location pages is a tonne of collating, with every price checked against the product records and copy re-toned from the sibling sites ([Exhibition Game Hire](https://www.exhibitiongamehire.co.uk/), [Mobile Climbing Wall Hire](https://www.mobileclimbingwallforhire.co.uk/), [Staging Events](https://staging-events.co.uk/)) for the outdoor funfair context. The plans that track the writing - `PRODUCT_PLAN.md` and `LOCATION_PLAN.md` - have a rule I'm quite fond of: facts the source records don't provide stay out of the copy until verified, rather than being invented.

That collating and checking is the bit AI can't do alone. The LLMs handled the HTML, and the [blocks layout](/services/chobble-template/) gave them an easy time of it - which is the same deal as every build on the template. The plans keep the site honest in a boring way: facts stay out of the copy until verified, £5M public liability cover is stated up front, and where a small remainder of kit comes from long-standing showmen rather than their own yard, the site says so plainly.

**If you run a hire business with a catalogue this size, fill in the form below.**
