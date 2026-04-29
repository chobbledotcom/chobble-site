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
    a: "Each attendee gets a unique ticket URL with a QR code. They can save it to their phone, add it to Apple or Google Wallet, print it, or screenshot it, whatever works for them."
  - q: Can I self-host it instead?
    a: "Absolutely. The code is [on GitHub](https://github.com/chobbledotcom/tickets/) under the AGPL licence. The recommended setup runs on Bunny.net, but you can also deploy via Docker, Fly.io, DigitalOcean, Heroku, Koyeb, Render, or any Deno-compatible host. The README walks you through setup. Self-hosting is completely free, and you just handle your own infrastructure."
  - q: How secure is my attendee data?
    a: "All personal information is encrypted at rest using hybrid RSA-OAEP + AES-256-GCM encryption. Only authenticated admins with the private key can decrypt it. Even if the database were compromised, personal data is designed to stay protected. Passwords are hashed with PBKDF2 (600,000 iterations). The system also uses CSRF protection, rate limiting (5 failed logins trigger a 15-minute IP lockout), constant-time password comparison, and session tokens are hashed before storage."
---

# Chobble Tickets

**[Open source](https://github.com/chobbledotcom/tickets/) event ticketing with no per-ticket fees.** Managed hosting for £50/year, or self-host for free. Find out more at **[tickets.chobble.com](https://tickets.chobble.com)**.

**If you're fed up with companies like Eventbrite taking a cut of your ticket sales, read on.**

Chobble Tickets is a simple, minimalist, and open source ticket sales platform I made. I can host it for you for just **£50 per year** regardless of how many tickets you sell, and the only other charges are card processing fees.

This could save you thousands of pounds every year if you run a lot of events.

**[Sign up here](https://tix.chobble.com/ticket/register)** and I'll have you up and running within a couple of days.

You'll register with a payments provider (Stripe or Square), and I give you an admin panel to create and manage events and attendee lists. People can book online, and the money goes straight to your account. I'm not involved in the sale at all.

**Community groups, charities, artists and musicians get 50% off at just £25/year.**

And if you want to **customise the platform** or if you **need support**, I'll do that at my normal [fixed hourly rates](/prices/) - or you can employ some other nerd to do that, because it's open source.

**[✨ Click here to read an early review of the system by Spencer from Elliott's Bouncy Castle Hire ✨](https://www.elliottsbouncycastlehire.co.uk/news/2026-02-13/new-ticket-platform-initial-review)**

- [Why Chobble Tickets?](#why)
- [How it works](#how-it-works)
- [Features](#features)
- [See it in action](#demo)
- [Pricing](#pricing)
- [Customisation](#customisation)
- [Open source](#open-source)
- [FAQs](#faqs)
- [Get started: hosted](#get-started-hosted)
- [Get started: self-host](#get-started-diy)

<div class="card margins" id="why">

## Why Chobble Tickets?

Most ticketing platforms make their money by taking a cut of every ticket you sell by inserting themselves in the sale.

Eventbrite's fees are currently around 6.95% + £0.49 per paid ticket. So if you sell:

- **50 tickets at £5 each** that's roughly £59 in Eventbrite fees
- **200 tickets at £10 each** that's roughly £237 in Eventbrite fees
- **500 tickets at £15 each** that's roughly £765 in Eventbrite fees

With Chobble Tickets, you pay **£50/year** regardless of how many tickets you sell or how many events you run. I'm not involved in your sales at all - the money goes straight to your account.

The only other fees are Stripe or Square's standard payment processing charges (for Stripe that's 1.5% + 20p per transaction in the UK).

If you're a **community group, charity, artist or musician**, that drops to just **£25/year**.

</div>

<div class="card margins" id="how-it-works">

## How it works

The £50/year gets you everything you need to start selling tickets:

1. **I set you up** with your own Chobble Tickets instance
2. **You create your admin password** which encrypts your attendee records, and **set your currency**
3. **You create events** through a straightforward interface, setting the name, capacity, dates, ticket price, and what info you need from attendees
4. **You share the booking link** or embed it into your own website (as an iframe), or use the built-in public site
5. **Attendees book tickets** and pay online. If email is configured, they get a confirmation email with a link to their unique QR code ticket
6. **You manage everything** from checking people in by scanning QR codes, to tracking capacity, exporting attendee lists, issuing refunds, and more

It's fully self-service. You don't need to tell me anything about your events or ask permission to create new ones. The admin panel is yours to use however you like.

I keep the platform running and maintained as part of the £50/year, but at that price I can't offer hands-on support. If you need help embedding it into your site or want me to tweak something, that's a quick job at my standard rates - **£200/hr**, or **£100/hr** for community groups, charities, artists and musicians.

</div>

<div class="card margins" id="features">

## Features

I'm always adding and tweaking things but this list is accurate in _March 2026_.

### QR code check-in

Every ticket gets a unique URL and QR code. At the door, your staff or volunteers just log into the site and scan the code with their phone using the **built-in QR scanner**. The system confirms the ticket is valid and marks it as checked in. It's really easy. The scanner defaults to check-in-only mode to prevent accidental double-scans at a busy door, but staff can also toggle check-out when needed. If someone shows a ticket for a different event, you'll get a warning and can decide what to do.

### No overbooking

The system aims to prevent overbooking, so two people can't grab the last ticket at the same time. This is a best-effort safeguard - bugs or infrastructure failures could still let it happen - but in normal operation tickets are reserved for five minutes for the visitor to complete their sale, and if someone finishes paying after the event fills up, they're automatically refunded.

### Standard & daily events

**Standard events** are your typical one-off occasions with a fixed capacity. **Daily events** let attendees pick a date from a calendar, with capacity applied separately to each day - ideal for classes, workshops, or anything that runs regularly. You set which days of the week are bookable and define holiday/blackout dates when no bookings are accepted. You can also set **date and location fields** which show up on the ticket page. Events can optionally be marked as **non-transferable**, requiring ID verification at check-in.

### Groups & multi-event bookings

**Groups** let you bundle related events under a single URL - attendees see all active events in the group on one page, and you get **attendee stats** across the whole group. You can also create **multi-event booking links** that combine specific events into a single form and checkout, so attendees fill in their details once, pay once, and get a **combined ticket view**. There's a link builder on the dashboard so you don't have to construct the URLs yourself.

### Registration deadlines & capacity

You can set a registration deadline so bookings close when you want them to. Control **max tickets per purchase** so one person can book multiple places in a single transaction. Add an **event image** or **file attachments** to display on the booking page (encrypted and stored on Bunny CDN), or set a **header image** in your site settings. You can format event descriptions with **Markdown** too.

### Payment processing

Stripe is the default payment processor and works great for most events - just paste in your secret key and the webhook configures itself. Square is also supported if you prefer it, with a pluggable provider architecture. You can set **configurable booking fees** per transaction and offer **"pay what you want" pricing** with optional minimum and maximum thresholds. For free events, you don't need to set up any payment integration at all, and attendees just register and get their tickets.

### Refunds

You can issue **full refunds** for individual attendees or **bulk refund** all attendees for an event in one go. The system also handles **automatic refunds** if capacity is exceeded after payment or if the event price changes during someone's checkout. Failed payments are tracked separately so they don't clutter your attendee list. You can also view payment IDs to check things in your payment provider's dashboard.

### Configurable contact fields

You can collect the attendee's name, email, phone, address, special instructions, or any combination of those - and that data is all exported to the CSVs and webhooks too.

### Public site

Don't have a website? Enable the **built-in public site** to get a homepage, events listing, terms & conditions page, and contact page on your domain. Choose a **light or dark theme**. Or keep it disabled and just share direct booking links. If you want something more bespoke, I can [build you a website](/services/static-websites/).

### Embedding

Already have a website? Embed booking forms into it using the provided **embed script** or **iframe code**. You configure which domains are allowed to embed your forms via **embedding security controls** in the settings.

### CSVs & webhooks

You can download your full attendee list as a CSV file whenever you like, with filters for date and check-in status. Set up a **webhook** (per-event or global) to trigger any type of web event when people register - useful for email notifications, Slack messages, or updating a spreadsheet. Multi-event bookings are consolidated into a single webhook call.

### Email confirmations

Attendees get a simple confirmation email when they book with a link to their ticket, and admins get notified of each registration too. The system supports five email provider options: **Resend**, **Postmark**, **SendGrid**, **Mailgun US**, and **Mailgun EU**. Email templates use **simple placeholders** with built-in filters for currency and pluralisation, and you can customise the subject, HTML, and text body. Email is optional - the system works fine without it.

### Invite managers

If you've got a team helping to run events, the owner can invite additional managers to the admin panel via time-limited invitation links (7-day expiry). **Owners** get full access to everything. **Managers** can see events and the calendar but can't change settings or manage users. There's also **session management** so you can view active sessions, terminate any you don't recognise, or terminate all other sessions at once. Sessions expire after 24 hours.

### Editing attendees

You can manually add attendees to events for walk-ins, comps, or manual corrections - bypassing the booking form and payment flow. You can also edit their name, contact details, and quantity, or **reassign them to a different event**.

### Duplicate events

Running a similar event next month? Copy an existing event's configuration in one click rather than setting everything up from scratch. You can also **deactivate** events to hide them without deleting, and reactivate them later. Deleting an event requires typing the event name as a safety check.

### Activity log

The admin panel keeps a log of actions including event creation, updates, check-ins, CSV exports, refunds, and deletions, so if you're running events with a committee or team, you've got a clear record of what happened and when. Each event also has its own log. You can also enable **Ntfy error notifications** for production monitoring.

### Calendar view

The admin calendar shows **per-date attendee counts** across all events. Especially useful for daily events - you can see who's coming, manage check-ins, and export the day's attendees as CSV.

### Terms & conditions

Set global terms that attendees must agree to before booking. Groups can have their own terms that override the global ones.

### Custom redirects

Set a custom thank-you URL on any event to redirect attendees to your own page after booking, instead of the default confirmation page.

### Built-in admin guide

The admin panel has a built-in guide covering events, payments, check-in, and more, so you don't need to go looking things up elsewhere.

### QR code posters

Each event has a **downloadable QR code SVG** that links to its booking page. Print it on posters, flyers, or table cards so people can scan and book on the spot.

### Custom domains

Set up a **custom domain** like tickets.yourorg.com in the admin settings, instead of using the default Bunny CDN domain.

### Apple & Google Wallet

Attendees can add their tickets to **Apple Wallet** or **Google Wallet** directly from their ticket page. Passes include event details and barcodes, and Apple Wallet passes support automatic updates via a standards-compliant web service API.

### Calendar & RSS feeds

The system provides an **ICS calendar feed** at `/feeds/events.ics` and an **RSS feed** at `/feeds/events.rss`, so attendees or organisers can subscribe to upcoming events in their calendar app or feed reader.

### Public API

A **public HTTP API returning JSON data** is available for listing events, checking availability, and creating bookings programmatically. The API is CORS-enabled and doesn't require an API key, making it easy to integrate with other tools or build custom frontends.

### Encryption

All personal information (names, emails, phone numbers, addresses) is encrypted at rest using **hybrid RSA-OAEP + AES-256-GCM encryption**. Only authenticated administrators with the private key can decrypt it, so it can't be read from the database directly. Even in the unlikely event of a data breach, personal information is designed to stay protected. Payment IDs and API keys are also encrypted with AES-256-GCM. The system includes **rate limiting** (5 failed logins trigger a 15-minute IP lockout), CSRF protection via double-submit cookies, and content-type validation on all POST endpoints.

</div>

<div class="card margins" id="demo">

## See it in action

**[View a live demo ticket →](https://tix.chobble.com/)** | **[Read more about Chobble Tickets →](https://tickets.chobble.com)**

The platform runs on a [fast global hosting network](https://bunny.net/), so it loads fast globally. It can also be deployed via Docker, Fly.io, DigitalOcean, Heroku, Koyeb, Render, or any Deno environment. Edge hosting means the system scales up and down automatically - it handles a 20-person workshop and a busy event launch. The system aims to prevent overbooking even under heavy load, though as with any software this is a best-effort guarantee that can't fully account for bugs or infrastructure failures.

</div>

<div class="card margins" id="pricing">

## Pricing

**£50/year.** No setup fees, no per-ticket charges, no hidden costs. This covers your own Chobble Tickets instance, ongoing maintenance, and as many events and tickets as you need. When you renew, I'll upgrade you to the latest version.

**50% off for community groups, charities, artists and musicians, at just £25/year.**

The only additional cost is your payment provider's standard processing fee (for Stripe, 1.5% + 20p per transaction in the UK). This goes directly to Stripe - Chobble doesn't add anything on top. Free events have no fees at all.

### Need hands-on help?

If you want me to embed the ticket system into your website, customise the styling, or make other tweaks, I will bill you at my hourly rate (by the half hour):

- **£200** at my standard rate
- **£100** for community groups, charities, artists and musicians

If you need a website to embed your tickets into, check out my [static website](/services/static-websites/) or [charity web development](/services/charity-web-development/) services.

The code is **open source** and released under the **AGPLv3** license, so any other nerd can modify it too - as long as their code is also open source.

</div>

<div class="card margins" id="customisation">

## Customisation

The standard platform handles most use cases. But if you need something more, I'm happy to customise:

- **Custom branding and styling** to match your organisation's look
- **Custom form fields** for dietary requirements, accessibility needs, t-shirt sizes, or whatever your event requires
- **Website integration** with embedded widgets and custom styling to blend seamlessly with your existing site
- **Anything else you can think of**, just ask

Customisation work is charged at my [standard rates](/prices/). And here's a bonus: if you suggest a feature that's good enough to build into the base platform for everyone, **I'll halve the development cost** for you.

</div>

<div class="card margins" id="open-source">

## Open source

Chobble Tickets is fully open source under the [AGPL licence](https://github.com/chobbledotcom/tickets/). You can read every line of code that handles your attendees' data. If you're technically inclined, you can even host it yourself for free.

The platform is built with **Deno** and uses **esbuild** to compile into a single JavaScript file. The recommended deployment runs on [Bunny.net](https://bunny.net/) using their edge scripting and hosted databases, but it also runs via **Docker**, **Fly.io**, **DigitalOcean**, **Heroku**, **Koyeb**, **Render**, or any Deno-compatible host. It uses **libsql** (local SQLite or remote Turso) for storage. If you want to dig into the technical details, the [GitHub repository](https://github.com/chobbledotcom/tickets/) has everything.

</div>

<div class="card margins" id="get-started-hosted">

## Get started: hosted

**Ready to stop paying per-ticket fees?** Sign up and I'll set up your own Chobble Tickets instance. I'll be in touch within a couple of days to get you going.

**[Sign up here](https://tix.chobble.com/ticket/register)**

Mention if you're a community group, charity, artist or musician for the 50% discount.

</div>

<div class="card margins" id="get-started-diy">

## Get started: self-host

Chobble Tickets is fully open source and you can self-host it for free. The recommended setup runs on [Bunny.net](https://bunny.net/) using their edge scripting, but you can also deploy via **Docker**, **Fly.io**, **DigitalOcean**, **Heroku**, **Koyeb**, **Render**, or any Deno-compatible host. The database uses [libsql](https://turso.tech/) (local SQLite or remote Turso).

You'll need these environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_URL` | Yes | libsql database URL |
| `DB_TOKEN` | Yes* | Database auth token (\*remote databases only) |
| `DB_ENCRYPTION_KEY` | Yes | 32-byte base64-encoded AES-256 key |

There are also optional variables for image uploads (`STORAGE_ZONE_NAME`, `STORAGE_ZONE_KEY`), a global webhook (`WEBHOOK_URL`), error notifications (`NTFY_URL`), email providers, and Apple Wallet configuration.

On first launch, visit `/setup/` to set your admin credentials and currency. Payment providers are configured at `/admin/settings`.

For full setup instructions, all environment variables, deployment steps, and development commands, see the **[README on GitHub](https://github.com/chobbledotcom/tickets/)**.

</div>
