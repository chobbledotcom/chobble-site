---
title: Chobble Tickets
meta_title: Chobble Tickets | Affordable Event Ticketing | No Per-Ticket Fees | Chobble
description: A fast, encrypted event ticketing platform with no per-ticket fees - just £50/year for managed hosting, with 50% off for community groups, charities, artists and musicians
snippet: Event ticketing for community groups and small orgs
order: 3
meta_description: Event ticketing without per-ticket fees - £50/year flat rate, encrypted attendee data, QR check-in, Stripe payments - 50% off for charities and community groups
---

# Chobble Tickets

**Selling tickets for your event shouldn't cost you a fortune in fees.** Platforms like Eventbrite charge around 6.95% + £0.49 per ticket sold — that adds up fast. If you sell 200 tickets at £10 each, Eventbrite takes roughly £237 in fees. With Chobble Tickets, you pay a flat **£50 per year** and keep every penny of your ticket sales.

Chobble Tickets is an event ticketing platform I built and maintain. You get your own admin panel to create and manage events, and your attendees get a clean, fast booking experience. Embed it into your own website or share a direct link — either way, it just works.

**Community groups, charities, artists and musicians get 50% off — just £25/year.**

- [Why Chobble Tickets?](#why)
- [How it works](#how-it-works)
- [Features](#features)
- [See it in action](#demo)
- [Pricing](#pricing)
- [Customisation](#customisation)
- [Open source](#open-source)
- [Get started](#get-started)

<div class="card margins" id="why">

## Why Chobble Tickets?

Most ticketing platforms make their money by taking a cut of every ticket you sell. That model punishes success — the more tickets you sell, the more you pay.

**Eventbrite's fees** are currently around 6.95% + £0.49 per paid ticket. Here's what that looks like in practice:

- **50 tickets at £5 each** = roughly £59 in Eventbrite fees
- **200 tickets at £10 each** = roughly £237 in Eventbrite fees
- **500 tickets at £15 each** = roughly £765 in Eventbrite fees

With Chobble Tickets, you pay **£50/year** regardless of how many tickets you sell or how many events you run. The only other fees are Stripe's standard payment processing charges (1.5% + 20p per transaction in the UK) — and Chobble takes nothing on top of that.

If you're a **community group, charity, artist or musician**, that drops to just **£25/year**.

</div>

<div class="card margins" id="how-it-works">

## How it works

The £50/year gets you everything you need to start selling tickets:

1. **I set you up** with your own Chobble Tickets instance and admin account
2. **You create your events** through a straightforward admin panel — set the name, capacity, dates, ticket price, and what info you need from attendees
3. **You embed it** into your own website (as an iframe) or share a direct booking link — the [README](https://github.com/chobbledotcom/tickets/) explains how
4. **Attendees book tickets** and pay through Stripe (or Square if you prefer). Each ticket gets a unique QR code
5. **You manage everything** — check people in by scanning QR codes, track capacity, export attendee lists, and more

It's self-service once set up. You don't need to tell me anything about your events or ask permission to create new ones. The admin panel is yours to use however you like.

I keep the platform running, updated, and maintained as part of the £50/year — but at that price I can't offer hands-on support. If you need help embedding it into your site or want me to tweak something, that's a quick job at my standard rates (usually about half an hour's work — **£100**, or **£50** for community groups, charities, artists and musicians).

</div>

<div class="card margins" id="features">

## Features

### QR code check-in

Every ticket gets a unique URL and QR code. At the door, your staff or volunteers just scan the code with any phone — no special app needed. The system confirms the ticket is valid and marks it as checked in. It's that simple.

### No overbooking, ever

The system uses atomic capacity checks, which means two people can't grab the last ticket at the same time. When you set a capacity of 100, exactly 100 tickets can be sold — no more.

### Multi-event bookings

Running a season of events? A weekend festival with multiple sessions? You can set up a single booking URL that lets attendees browse and book multiple events in one checkout. This is unusual for small ticketing platforms and really useful for organisations that run regular programmes.

### Registration deadlines

Need to close ticket sales 48 hours before your event? Or open them on a specific date? You can set registration windows so bookings only happen when you want them to.

### CSV export

Download your full attendee list as a CSV file anytime. Useful for your own records, for printing name badges, or for importing into other tools. Your data is always accessible to you.

### Configurable contact fields

You decide what information to collect from attendees. Need just a name and email? Fine. Need phone numbers too? Add it. Only collect what you actually need — there's no reason to ask for data you won't use.

### Payment processing

Stripe is the default payment processor and works brilliantly for most events. Square is also supported if you prefer it. For free events, you don't need to set up any payment integration at all — attendees just register and get their tickets.

### Activity logs

The admin panel keeps a log of actions taken, so if you're running events with a committee or team, you've got a clear record of what happened and when.

### Duplicate events

Running a similar event next month? Duplicate an existing event's configuration in one click rather than setting everything up from scratch.

### Invite managers

If you've got a team helping to run events, the owner can invite additional managers to the admin panel via time-limited invitation links.

</div>

<div class="card margins" id="demo">

## See it in action

**[View a live demo ticket →](https://tix.chobble.com/ticket/13ga2)**

<!-- TODO: Add screenshots of booking flow, admin panel, and QR check-in -->

The platform runs on [Bunny Edge Scripting](https://bunny.net/), which means it loads fast for your attendees no matter where they are. It's built to handle events of any size — from a 20-person workshop to a 2,000-person festival.

</div>

<div class="card margins" id="pricing">

## Pricing

**£50/year** — that's it. No setup fees, no per-ticket charges, no hidden costs. This covers your own Chobble Tickets instance, ongoing maintenance and updates, and as many events and tickets as you need.

**50% off for community groups, charities, artists and musicians — just £25/year.**

The only additional cost is Stripe's standard processing fee of **1.5% + 20p per transaction** (UK rates) for paid events. This goes directly to Stripe — Chobble doesn't add anything on top. Free events have no fees at all.

### Need hands-on help?

If you want me to embed the ticket system into your website, customise the styling, or make other tweaks, that's typically about half an hour of work:

- **£100** at my standard rate
- **£50** for community groups, charities, artists and musicians

If you need a website to embed your tickets into, check out my [static website](/services/static-websites/) or [charity web development](/services/charity-web-development/) services.

</div>

<div class="card margins" id="customisation">

## Customisation

The base £50/year gets you the standard Chobble Tickets platform, which handles most use cases out of the box. But if you need something more, I'm happy to customise:

- **Custom branding and styling** to match your organisation's look
- **Custom form fields** — dietary requirements, accessibility needs, t-shirt sizes, whatever your event requires
- **Custom domains** — use tickets.yourorg.com instead of a chobble.com URL
- **Website integration** — embedded widgets, custom styling to blend seamlessly with your existing site
- **Anything else you can think of** — if you have an idea, just ask

Customisation work is charged at my [standard rates](/prices/). And here's a bonus: if you suggest a feature that's good enough to build into the base platform for everyone, **I'll halve the development cost** for you.

</div>

<div class="card margins" id="open-source">

## Open source

Chobble Tickets is fully open source under the [AGPL licence](https://github.com/chobbledotcom/tickets/). You can read every line of code that handles your attendees' data. If you're technically inclined, you can even host it yourself for free.

Attendee data (names, emails, phone numbers) is encrypted at rest using strong encryption. Only authenticated administrators with the private key can decrypt it — it can't be read from the database directly. This isn't just good practice, it means that even in the unlikely event of a data breach, personal information stays protected.

The entire platform builds into a single JavaScript file and runs on edge infrastructure, which is why it's so fast. If you want to dig into the technical details, the [GitHub repository](https://github.com/chobbledotcom/tickets/) has everything.

</div>

## Frequently asked questions

<details>
<summary><strong>What types of events can I use this for?</strong></summary>

Anything — village fetes, charity fundraisers, gigs, workshops, community theatre, sports club dinners, supper clubs, classes, festivals. The system handles both one-off events and recurring ones with per-date capacity. If people need tickets, this works.

</details>

<details>
<summary><strong>Do I need my own website?</strong></summary>

No. You can share a direct booking link with your attendees — post it on social media, put it in emails, print it on flyers. Embedding into a website is optional. If you do want a website, I can [build you one](/services/static-websites/).

</details>

<details>
<summary><strong>What if I only run free events?</strong></summary>

Free events work perfectly. You still get capacity management, QR check-in, attendee tracking, and CSV exports — you just don't need to set up Stripe or Square. It's a proper ticketing system even without payments.

</details>

<details>
<summary><strong>Can I use my own Stripe account?</strong></summary>

Yes. Payments go through your own Stripe (or Square) account, so the money goes directly to you. Chobble never touches your ticket revenue.

</details>

<details>
<summary><strong>What happens if I stop paying?</strong></summary>

The platform is open source, so you always have the option to self-host it. Your data is yours — you can export attendee lists as CSV anytime. There's no lock-in.

</details>

<details>
<summary><strong>Is there a limit on the number of events or tickets?</strong></summary>

No limits. Create as many events as you want, sell as many tickets as you need. The flat £50/year covers everything.

</details>

<details>
<summary><strong>How do attendees receive their tickets?</strong></summary>

Each attendee gets a unique ticket URL with a QR code. They can save it to their phone, print it, screenshot it — whatever works for them.

</details>

<details>
<summary><strong>Can I self-host it instead?</strong></summary>

Absolutely. The code is [on GitHub](https://github.com/chobbledotcom/tickets/) under the AGPL licence. You'll need a Bunny.net account for the edge scripting and a libsql database. The README walks you through setup. Self-hosting is completely free — you just handle your own infrastructure.

</details>

## Get started

**Ready to stop paying per-ticket fees?** Drop me a message through the contact form below and I'll get you set up. Mention if you're a community group, charity, artist or musician for the 50% discount.
