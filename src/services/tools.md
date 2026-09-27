---
title: Tools & Widgets
snippet: Misc services I have built which you might find useful
link_text: Tools
description: Misc services created by Chobble web design in Manchester, provided for free.
order: 99
permalink: "/tools/"
meta_title: Free Tools & Widgets | Chobble Web Developer Manchester
meta_description: Free open source tools I've built - ticket platform, play inspection database, PAT logger, review scrapers - Manchester web developer
---

# Tools, widgets, & doodads

I've made lots of different widgets and tools over the years. Most have been lost to the sands of time or are owned by companies I used to work for, but I'm still hosting a few. Everything here is open source (mostly AGPLv3), and the code for each is a click away. Listed in order of usefulness.

## Chobble Tickets

- **[tickets.chobble.com](https://tickets.chobble.com)**
- [source code](https://github.com/chobbledotcom/tickets)

A minimalist and private ticket-selling platform, and my no-per-attendee-fee answer to BookItBee, Eventbrite and Seetickets. Flat fee instead: £50 a year all in, £25 for charities, co-ops, artists and musicians, hosting included ([pricing on the hosting page](/hosting/)). Under the bonnet it's a Deno app compiled with esbuild and deployed to Bunny.net's edge, so checkout is fast everywhere and there's no server for me to maintain. QR check-ins, AGPL licence, and your data stays yours. [Paul, who runs events with it](/reviews/), says it saved him a few bob and no more holding data on paper.

## play-test

- **[play-test.co.uk](https://play-test.co.uk)**
- [source code on git.chobble.com](https://git.chobble.com/chobble/play-test)
- [the full story](/examples/play-test/)

A Rails app for logging bouncy castle and inflatable play inspections to BS EN 14960:2019 - equipment records, guided assessment forms, safety calculations that show their working, and PDF reports with QR codes on. It's used by bouncy castle inspectors across the UK, and it's free to use - safety tooling shouldn't be paywalled. It started life as a web translation of a fellow nerd's Windows desktop app.

## The Chobble Template

- **[chobbledotcom/chobble-template](https://github.com/chobbledotcom/chobble-template)**
- [service page with the details](/services/chobble-template/)

A complete open source Eleventy starter for small business websites - fast, cheap to host, no attack surface, fully portable - and the base most of the sites on my [examples page](/examples/) are built on. AGPLv3 and free, so give it a bash yourself, or hire me to build a site on it.

## Portable appliance test logger

- **[patlog.co.uk](https://patlog.co.uk)**
- [source code](https://github.com/chobbledotcom/patlog)
- [video walkthrough](/videos/patlog-pat-testing/)

> "Portable appliance testing (PAT inspection or PAT testing) is a process by which electrical appliances are routinely checked for safety." [~Wikipedia](https://en.wikipedia.org/wiki/Portable_appliance_testing)

I made a simple, free website where users can log PAT tests with accompanying PDF certificates and QR code links. It also explains that PAT tests might not be necessary on its 'about' page.

## Checkatrade review scraper

- **[/tools/checkatrade-reviews](/tools/checkatrade-reviews)**
- [source code](https://git.chobble.com/chobble/chobble-site/raw/branch/main/src/tools/checkatrade-reviews.md)

There's no straightforward way to export reviews from Checkatrade, so I built a tool to do it. You might use these in your static site, or to analyse them, or whatevs - it's your data, so you should be able to use it.

## Google reviews scraper

- [source code](https://github.com/chobbledotcom/google-reviews-iframe)

A toolchain that periodically fetches customer reviews from Google, Facebook and Trustpilot (via Apify), stores them as JSON, and pre-generates a static masonry iframe you can drop into any site, published to Bunny's CDN. It's AGPLv3 and config-driven - with a bit of bun and an Apify token, you could fork it and run it for your own business.

## Libregig (WIP)

- [source code](https://git.chobble.com/chobble/libregig)

A **still in development** app for managing the day-to-day of being in a band, with granular permissions and calendar feeds.

**If any of these would be useful for your business and you'd like a hand setting them up, fill in the form below.**
