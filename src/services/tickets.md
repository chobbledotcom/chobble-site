---
title: Chobble Tickets
meta_title: Chobble Tickets | Affordable Event Ticketing | No Per-Ticket Fees | Chobble
description: A fast, encrypted event ticketing platform with no per-ticket fees - just £50/year for managed hosting, with 50% off for community groups, charities, artists and musicians
snippet: Event ticketing for community groups and small orgs
order: 3
meta_description: Event ticketing without per-ticket fees - £50/year flat rate, encrypted attendee data, QR check-in, Stripe payments - 50% off for charities and community groups
faqs:
  - q: What types of events can I use this for?
    a: "Anything from village fetes and charity fundraisers to gigs, workshops, community theatre, sports club dinners, supper clubs, classes, and festivals. The system handles both one-off events and recurring ones with per-date capacity. If people need tickets, this works."
  - q: Do I need my own website?
    a: "No. You can share a direct booking link with your attendees and post it on social media, put it in emails, or print it on flyers. You can also enable the built-in public site, which gives you a homepage, events listing, and contact page without needing a separate website. Embedding into your own website is optional. If you do want a website, I can [build you one](/services/static-websites/)."
  - q: What if I only run free events?
    a: "Free events work perfectly. You still get capacity management, QR check-in, attendee tracking, and CSV exports without needing to set up Stripe or Square. It's a proper ticketing system even without payments."
  - q: Can I use my own Stripe account?
    a: "Yes. Payments go through your own Stripe (or Square) account, so the money goes directly to you. Chobble never touches your ticket revenue."
  - q: What happens if I stop paying?
    a: "The platform is open source, so you always have the option to self-host it. Your data is yours, and you can export attendee lists as CSV anytime. There's no lock-in."
  - q: Is there a limit on the number of events or tickets?
    a: "No limits. Create as many events as you want, sell as many tickets as you need. The flat £50/year covers everything."
  - q: How do attendees receive their tickets?
    a: "Each attendee gets a unique ticket URL with a QR code. They can save it to their phone, print it, or screenshot it, whatever works for them."
  - q: Can I self-host it instead?
    a: "Absolutely. The code is [on GitHub](https://github.com/chobbledotcom/tickets/) under the AGPL licence. The whole thing runs on Bunny.net, using their edge scripting and hosted databases, so you just need a Bunny account. The README walks you through setup. Self-hosting is completely free, and you just handle your own infrastructure."
  - q: How secure is my attendee data?
    a: "All personal information is encrypted at rest using hybrid RSA + AES-256 encryption. Only authenticated admins with the private key can decrypt it. Even if the database were compromised, personal data stays protected. The system also uses CSRF protection, rate limiting, and constant-time password comparison."
---

# Chobble Tickets

**[Open source](https://github.com/chobbledotcom/tickets/) event ticketing with no per-ticket fees.** Managed hosting for £50/year, or self-host for free.

If you're fed up with companies like Eventbrite taking a cut of your ticket sales, read on.

Chobble Tickets is a simple, minimalist ticketing platform I built. You get your own admin panel to create and manage events, attendees book online, and the money goes straight to your Stripe or Square account. I'm not involved in the sale at all.

**Community groups, charities, artists and musicians get 50% off at just £25/year.**

**[✨ Click here to read an early review of the system by Spencer from Elliott's Bouncy Castle Hire ✨](https://www.elliottsbouncycastlehire.co.uk/news/2026-02-13/new-ticket-platform-initial-review)**

- [Why Chobble Tickets?](#why)
- [How it works](#how-it-works)
- [Features](#features)
- [See it in action](#demo)
- [Pricing](#pricing)
- [Customisation](#customisation)
- [Open source](#open-source)
- [FAQs](#faqs)
- [Get started](#get-started)

<div class="card margins" id="why">

## Why Chobble Tickets?

Most ticketing platforms make their money by taking a cut of every ticket you sell.

Eventbrite's fees are currently around 6.95% + £0.49 per paid ticket. So if you sell:

- **50 tickets at £5 each** that's roughly £59 in Eventbrite fees
- **200 tickets at £10 each** that's roughly £237 in Eventbrite fees
- **500 tickets at £15 each** that's roughly £765 in Eventbrite fees

With Chobble Tickets, you pay **£50/year** regardless of how many tickets you sell or how many events you run. The only other fees are your payment provider's standard processing charges (for Stripe, that's 1.5% + 20p per transaction in the UK).

</div>

<div class="card margins" id="how-it-works">

## How it works

1. **I set you up** with your own Chobble Tickets instance
2. **You create your admin password** which encrypts your attendee records
3. **You create events** through a straightforward interface, setting the name, capacity, dates, ticket price, and what info you need from attendees
4. **You share the booking link** or embed it into your own website
5. **Attendees book tickets** and pay online, getting a confirmation with their unique QR code ticket
6. **You manage everything** from checking people in by scanning QR codes, to tracking capacity, exporting attendee lists, issuing refunds, and more

It's fully self-service. You don't need to tell me anything about your events or ask permission to create new ones. The admin panel is yours to use however you like.

</div>

<div class="card margins" id="features">

## Features

### Events

**Standard events** have a fixed capacity for a single occasion. **Daily events** let attendees pick a date from a calendar, with capacity applied separately to each day - ideal for classes, workshops, or recurring activities. You can set which days of the week are bookable and define holiday/blackout dates when no bookings are accepted.

Set a **registration deadline** to close bookings at a specific time. Control **max tickets per purchase** so one person can book multiple places in a single transaction. Add an **event image** to display on the booking page. **Duplicate** an existing event to create a similar one without starting from scratch.

### Groups & Multi-event Bookings

**Groups** let you bundle related events under a single URL. Attendees see all active events in the group on one page. You can also create **multi-event booking links** that combine specific events into a single form and checkout, so attendees fill in their details once and pay once for multiple events.

### QR Code Check-in

Every ticket gets a unique URL and QR code. At the door, staff log in and scan codes with the **built-in QR scanner** using their phone camera. The scanner is intentionally check-in only - no accidental check-outs from double-scans at a busy door. If someone shows a ticket for a different event, the system warns you and lets you decide.

### No Overbooking

The system uses atomic capacity checks - two people can't grab the last ticket at the same time. Places are reserved for five minutes while attendees complete payment. If someone finishes paying after the event fills up, they're automatically refunded.

### Payments & Refunds

**Stripe** is recommended and works with minimal setup - just paste in your secret key and the webhook configures itself. **Square** is also supported. For free events, no payment setup is needed at all.

You can issue **full refunds** for individual attendees or **bulk refund** all attendees for an event. The system also handles **automatic refunds** if capacity is exceeded after payment or if the event price changes during checkout.

### Configurable Contact Fields

Collect any combination of name, email, phone, postal address, and special instructions. All of this data is included in CSV exports and webhook payloads.

### Public Site

Enable the **built-in public site** to get a homepage, events listing, terms & conditions page, and contact page on your domain - no separate website needed. Choose a **light or dark theme**. Or keep it disabled and just share direct booking links.

### Embedding

Embed booking forms into your existing website using the provided **embed script** or **iframe code**. Configure which domains are allowed to embed your forms.

### CSV Exports & Webhooks

Download your full attendee list as a CSV file at any time, with filters for date and check-in status. Set up **webhooks** to send a POST request to any URL whenever someone registers - useful for email notifications, Slack messages, or updating a spreadsheet.

### Email Confirmations

Attendees get a confirmation email with a link to their ticket. Replies go straight to your address. This is handled through webhooks using [Automatisch](https://automatisch.io/) and [Notifuse](https://notifuse.com/), and you could set up your own email pipeline if you wanted to.

### Multi-user Access

**Owners** have full access to everything. **Managers** can see events and the calendar but can't change settings or manage users. Invite team members via time-limited links that expire after 7 days.

### Manual Attendees

Add attendees directly from the admin panel for walk-ins, comps, or manual corrections - bypassing the booking form and payment flow.

### Activity Log

Every admin action is logged: event creation, attendee changes, check-ins, exports, settings updates. Each event also has its own log. Useful when you're running events with a committee or team.

### Calendar View

The admin calendar shows every attendee booked across all events on a given day. Especially useful for daily events - you can see who's coming, manage check-ins, and export the day's attendees as CSV.

### Terms & Conditions

Set global terms that attendees must agree to before booking. Groups can have their own terms that override the global ones.

### Custom Redirects

Set a custom thank-you URL on any event to redirect attendees to your own page after booking, instead of the default confirmation page.

### Encryption

All personal information (names, emails, phone numbers, addresses) is encrypted at rest using hybrid RSA + AES-256 encryption. Only authenticated admins can decrypt it. Even payment IDs, API keys, and check-in status are encrypted. A database breach alone does not expose personal data.

</div>

<div class="card margins" id="demo">

## See it in action

**[View a live demo ticket →](https://tix.chobble.com/ticket/ef447)**

The platform runs on [Bunny Edge Scripting](https://bunny.net/), a global edge network, so it loads fast for your attendees no matter where they are. Edge hosting means the system scales up and down automatically - it handles a 20-person workshop and a high-traffic festival launch without breaking a sweat. Atomic capacity checks mean no overbooking even under heavy load.

</div>

<div class="card margins" id="pricing">

## Pricing

**£50/year.** No setup fees, no per-ticket charges, no hidden costs. This covers your own Chobble Tickets instance, ongoing maintenance, and as many events and tickets as you need. When you renew, I'll upgrade you to the latest version.

**50% off for community groups, charities, artists and musicians, at just £25/year.**

The only additional cost is your payment provider's standard processing fee (for Stripe, 1.5% + 20p per transaction in the UK). This goes directly to Stripe - Chobble doesn't add anything on top. Free events have no fees at all.

### Need hands-on help?

Customisation, embedding, or support is available at my [standard rates](/prices/) - or you can employ some other nerd to do it, because it's open source.

If you need a website to embed your tickets into, check out my [static website](/services/static-websites/) or [charity web development](/services/charity-web-development/) services.

</div>

<div class="card margins" id="customisation">

## Customisation

The standard platform handles most use cases out of the box. But if you need something more, I'm happy to customise:

- **Custom branding and styling** to match your organisation's look
- **Custom form fields** for dietary requirements, accessibility needs, t-shirt sizes, or whatever your event requires
- **Custom domains** so you can use tickets.yourorg.com instead of a strange-looking Bunny CDN domain
- **Website integration** with embedded widgets and custom styling to blend seamlessly with your existing site
- **Anything else you can think of**, just ask

Customisation work is charged at my [standard rates](/prices/). And here's a bonus: if you suggest a feature that's good enough to build into the base platform for everyone, **I'll halve the development cost** for you.

</div>

<div class="card margins" id="open-source">

## Open source

Chobble Tickets is fully open source under the [AGPL licence](https://github.com/chobbledotcom/tickets/). You can read every line of code that handles your attendees' data. If you're technically inclined, you can self-host it for free.

The entire platform builds into a single JavaScript file and runs on [Bunny.net](https://bunny.net/), using their edge scripting for the application and their hosted databases for storage. If you want to dig into the technical details, the [GitHub repository](https://github.com/chobbledotcom/tickets/) has everything.

</div>

## Get started

**Ready to stop paying per-ticket fees?** Drop me a message through the contact form below and I'll get you set up. Mention if you're a community group, charity, artist or musician for the 50% discount.
