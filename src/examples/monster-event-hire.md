---
title: Monster Event Hire
meta_title: Monster Event Hire | WordPress to Chobble Migration | Chobble
meta_description: WordPress to Chobble migration for a bouncy castle and entertainment hire company operating from Havant and Guildford, preserving the design while massively improving speed and cleaning up URL structure.
snippet: WordPress backend replaced with Chobble for instant loading, cleaner URLs, and near-perfect Lighthouse scores
order: 2
colour: "#5d2ca6"
---

# Monster Event Hire

- **Client:** Monster Event Hire
- **Services:** Website migration & hosting
- **Website:** [monstereventhire.co.uk](https://www.monstereventhire.co.uk)

Monster Event Hire are a bouncy castle and entertainment hire company operating from Havant and Guildford. They had an established WordPress website and wanted to keep the custom design they already liked - product grids, a clear navigation structure, the general layout - but the underlying setup had become slow and messy to maintain, and Google Search Console was indexing the same products at multiple URLs through different category slug paths without anyone particularly noticing until it had been quietly building up for a while.

I replaced the backend with the Chobble template while keeping the front-end design intact. Visitors still see the same brand they recognise, but now pages load near-instantly, the URL structure is clean, and Google isn't trying to work out which version of a product page is the canonical one.

![Screenshot of the Monster Event Hire website](/assets/examples/monster-event-hire.png)

## Performance

Before the migration, pages were typically taking at least a second to load and the site felt sluggish. A big cause - or at least the most visible one - was script bloat: multiple JavaScript trackers and widgets running on each page, including legacy tools like old AddThis snippets and pre-GA4 Google Analytics code that weren't doing anything useful anymore but were still sat there slowing everything down.

After moving to the Chobble static setup, those dependencies were stripped out. The Lighthouse scores now come back at 100s across the board on desktop - performance, accessibility, best practices, SEO - and on mobile it is 94 performance, 86 accessibility, 96 best practices, and 100 SEO. It loads pretty much immediately, which matters a fair bit when someone is scrolling through bouncy castle options on their phone trying to find what they want, and the responsive image pipeline in the Chobble template keeps page weight down even with a photo-heavy product catalogue.

## URL structure and redirects

The old WordPress setup had products appearing under multiple category slug paths, which meant Google had indexed the same products at several different URLs and was picking which ones it thought were canonical (sometimes wrongly). As part of the migration I:

- standardised product and category URL patterns so every page has a single canonical location - `/products/foo` and `/categories/foo` instead of the old tangled WordPress routing
- added direct 301 redirects from old URLs to their new equivalents
- removed redirect chains where they existed
- fixed canonical tags to match the new structure

This makes the site easier for users to navigate and much easier for search engines to understand.

## Enquiry form and Automatisch integration

The site has an enquiry form overlay in the form of a box that pops up when visitors click to enquire about a product, and I adjusted it to pre-fill the product name automatically based on whichever page you happened to be on when you clicked. It plugs into the Chobble template's form integration, which connects to [Automatisch](https://automatisch.io/) (an open source alternative to Zapier) to send confirmation emails and receipts to both the enquirer and the client.

## What the Chobble template brought

Because this site runs on the Chobble template, it gets a bunch of things out of the box without any extra work on my part: responsive images served through Bunny's CDN, [instant.page](https://instant.page/) for pre-loading pages on hover so navigation feels instant, a full sitemap, RSS feeds, and JSON-LD structured data for search engines. The site builds and deploys automatically through GitHub Actions whenever content changes, and Bunny CDN handles the hosting.

The client uses [PagesCMS](https://pagescms.org/) for content editing - products, categories, and pages are all editable through a friendly web interface without touching any code - but since they pay for ongoing support they can also send larger changes my way and I'll handle them directly.

## Search Console monitoring

Post-launch, I have kept a close eye on Google Search Console to catch any indexing confusion as Google reprocesses the migrated URLs. The standardised URL structure has already cleaned up the duplicate-indexing problem, and the combination of direct redirects, clean canonicals, and fast loading seems to be settling in well.

## Outcome

Monster Event Hire kept the custom design they valued, but now has a much faster and cleaner platform behind it. The migration removed the script bloat and the URL mess from the old WordPress stack, along with the ongoing maintenance overhead that comes with keeping a WordPress site updated and secure. What replaced it is a cohesive static system that is easier to maintain, faster to browse, and better aligned for long-term SEO stability.

If you like your current site design but hate the backend maintenance and speed issues, this is exactly the kind of migration Chobble is designed to handle. Fill in the form below to get in touch.
