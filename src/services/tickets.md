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
    a: "No. You can share a direct booking link with your attendees and post it on social media, put it in emails, or print it on flyers. Embedding into a website is optional. If you do want a website, I can [build you one](/services/static-websites/)."
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
---

# Chobble Tickets

**If you're fed up with companies like Eventbrite taking a cut of your ticket sales, read on.**

Chobble Tickets is a simple, minimalist, and open source ticket sales platform I made. I can host it for you for just **£50 per year** regardless of how many tickets you sell, and the only other charges are card processing fees.

This could save you thousands of pounds every year if you run a lot of events.

You'll register with a payments provider (Stripe or Square), and I give you an admin panel to create and manage events and attendee lists. People can book online, and the money goes straight to your account.

**Community groups, charities, artists and musicians get 50% off at just £25/year.**

And if you want to **customise the platform** or if you **need support**, I'll do that at my normal [fixed hourly rates](/prices/) - or you can employ some other nerd to do that, because it's open source.

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
2. **You create your admin password** which encrypts your attendee records
3. **You create events** through a straightforward interface, setting the name, capacity, dates, ticket price, and what info you need from attendees
4. **You embed it** into your own website (as an iframe) or share a direct booking link
5. **Attendees book tickets** and pay online. They get a confirmation email with their unique QR code ticket
6. **You manage everything** from checking people in by scanning QR codes, to tracking capacity, exporting attendee lists, and more

It's fully self-service. You don't need to tell me anything about your events or ask permission to create new ones. The admin panel is yours to use however you like.

I keep the platform running and maintained as part of the £50/year, but at that price I can't offer hands-on support. If you need help embedding it into your site or want me to tweak something, that's a quick job at my standard rates - **£200/hr**, or **£100/hr** for community groups, charities, artists and musicians.

</div>

<div class="card margins" id="features">

## Features

I'm always adding and tweaking things but this list is accurate in _February 2026_.

### QR code check-in

Every ticket gets a unique URL and QR code. At the door, your staff or volunteers just log into the site and scan the code with their phone. The system confirms the ticket is valid and marks it as checked in. It's really easy.

### No overbooking

The system uses "atomic" capacity checks, which means two people can't grab the last ticket at the same time. Tickets are reserved for five minutes for the visitor to complete their sale.

### Multi-event bookings

You can set up a single booking URL that lets attendees browse and book multiple events in one checkout.

### Registration deadlines

You can set a registration deadline so bookings close when you want them to.

### CSVs & Webhooks

You can download your full attendee list as a CSV file whenever you like, or set up a webhook to trigger any type of web event when people register.

### Configurable contact fields

You can collect the attendee's name, email, phone, address, special requests, or any combination of those - and that data is all exported to the CSVs and webhooks too.

### Payment processing

Stripe is the default payment processor and works great for most events. Square is also supported if you prefer it. For free events, you don't need to set up any payment integration at all, and attendees just register and get their tickets.

### Email confirmations

Attendees get a simple confirmation email when they book with a link to their ticket. The emails come from an address I manage, with the reply-to set to your address so any replies go straight to you. This is handled through webhooks using [Automatisch](https://automatisch.io/) and [Notifuse](https://notifuse.com/), and you could set up your own email pipeline if you wanted to. If you'd like custom email templates, I can do that as part of a paid customisation job.

### Activity logs

The admin panel keeps a log of actions taken, so if you're running events with a committee or team, you've got a clear record of what happened and when.

### Duplicate events

Running a similar event next month? Copy an existing event's configuration in one click rather than setting everything up from scratch.

### Invite managers

If you've got a team helping to run events, the owner can invite additional managers to the admin panel via time-limited invitation links.

## Daily Events & Holidays

If you've got events which repeat each week you can set a schedule up and set holidays to let visitors book for upcoming events.

## Refunds & Transparency

You can refund payments or view payment IDs to view the payments in your payment system's dashboard.

## Editing Attendees

You can manually add attendees to events or edit their data if something needs correcting.

</div>

<div class="card margins" id="demo">

## See it in action

**[View a live demo ticket →](https://tix.chobble.com/ticket/13ga2)**

The platform runs on [Bunny Edge Scripting](https://bunny.net/), which means it loads fast for your attendees no matter where they are. It's built to handle events of any size, from a 20-person workshop to a 2,000-person festival.

</div>

<div class="card margins" id="pricing">

## Pricing

**£50/year.** That's it. No setup fees, no per-ticket charges, no hidden costs. This covers your own Chobble Tickets instance, ongoing maintenance, and as many events and tickets as you need. When you renew for another year, I'll upgrade you to the latest version.

**50% off for community groups, charities, artists and musicians, at just £25/year.**

The only additional cost is Stripe's standard processing fee of **1.5% + 20p per transaction** (UK rates) for paid events. This goes directly to Stripe, and Chobble doesn't add anything on top. Free events have no fees at all.

### Need hands-on help?

If you want me to embed the ticket system into your website, customise the styling, or make other tweaks, I will bill you at my hourly rate (by the half hour):

- **£200** at my standard rate
- **£100** for community groups, charities, artists and musicians

If you need a website to embed your tickets into, check out my [static website](/services/static-websites/) or [charity web development](/services/charity-web-development/) services.

The code is **open source** and released under the **AGPLv3** license, so any other nerd can modify it too - as long as their code is also open source.

</div>

<div class="card margins" id="customisation">

## Customisation

The base **£50/year** gets you the standard Chobble Tickets platform, which handles most use cases out of the box. But if you need something more, I'm happy to customise:

- **Custom branding and styling** to match your organisation's look
- **Custom form fields** for dietary requirements, accessibility needs, t-shirt sizes, or whatever your event requires
- **Custom domains** so you can use tickets.yourorg.com instead of a strange-looking Bunny CDN domain
- **Website integration** with embedded widgets and custom styling to blend seamlessly with your existing site
- **Anything else you can think of**, just ask

Customisation work is charged at my [standard rates](/prices/). And here's a bonus: if you suggest a feature that's good enough to build into the base platform for everyone, **I'll halve the development cost** for you.

</div>

<div class="card margins" id="open-source">

## Open source

Chobble Tickets is fully open source under the [AGPL licence](https://github.com/chobbledotcom/tickets/). You can read every line of code that handles your attendees' data. If you're technically inclined, you can even host it yourself for free.

Attendee data (names, emails, phone numbers, etc) is encrypted at rest using strong encryption. Only authenticated administrators with the private key can decrypt it, so it can't be read from the database directly. This isn't just good practice, it means that even in the unlikely event of a data breach, personal information stays protected.

The entire platform builds into a single JavaScript file and runs on [Bunny.net](https://bunny.net/), using their edge scripting for the application and their hosted databases for storage. The whole infrastructure runs through Bunny, which keeps it fast and very cheap to operate. If you want to dig into the technical details, the [GitHub repository](https://github.com/chobbledotcom/tickets/) has everything.

</div>

## Get started

**Ready to stop paying per-ticket fees?** Drop me a message through the contact form below and I'll get you set up. Mention if you're a community group, charity, artist or musician for the 50% discount.
