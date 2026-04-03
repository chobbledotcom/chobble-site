---
title: Garsdale Cottages
meta_title: Garsdale Cottages | Holiday Lets Website | Chobble
meta_description: Holiday cottage website for a Yorkshire Dales cooperative - escaped Sykes Cottages fees - FreeToBook integration - Chobble Template with blocks layout
snippet: A cooperative of holiday cottages in the Yorkshire Dales, booking direct with owners
order: 4
colour: "#3d3929"
---

# Garsdale Cottages - a holiday lets website

- **Client:** Garsdale Cottages, near Sedbergh, Yorkshire Dales
- **Services:** Website build, booking system integration, and support
- **Website:** [GarsdaleCottages.co.uk](https://www.garsdalecottages.co.uk)
- **Source code:** [on GitHub](https://github.com/chobbledotcom/garsdale-cottages)

Garsdale Cottages is a cooperative of two holiday lets in Garsdale, a quiet valley in the Yorkshire Dales near Sedbergh. The Old Cart House is a one-bedroom cottage for couples, and Roger Pot is a three-bedroom family cottage. Both properties were previously listed through Sykes Cottages - and both owners were fed up with the deal they were getting.

![Garsdale Cottages homepage showing the site title over a heather-covered Yorkshire Dales hillside, with navigation links for cottages, walks, things to do, and local events](/assets/examples/garsdale-cottages.png)

## The problem with Sykes

Sykes Cottages make it very easy to get started - you hand over your listing and they handle everything. But that convenience comes at a serious cost. Sykes charge opaque fees that are difficult to understand, and they opted both properties into automatic "competitive pricing" systems that the owners hadn't asked for and didn't want. This meant prices could be adjusted without the owners' knowledge or agreement, leading to bookings they felt weren't worth taking.

It gets worse. Sykes integrate with platforms like Booking.com and Airbnb, but they add their own commission on top of whatever those platforms already charge. So for a booking that comes through Booking.com, the property owner is paying Booking.com's percentage *and* Sykes' percentage - a double cut from every booking. Both cottage owners regularly struggled to understand what they were actually being charged, and the pricing model felt designed to be confusing.

The real kicker? When we looked at where the bookings were actually coming from, nearly all of them were arriving via Booking.com anyway. Sykes weren't generating the bookings - they were just passing through Booking.com traffic and taking an extra percentage for the privilege. The owners were paying two sets of fees for what was essentially one service.

But escaping felt daunting. Running your own website, handling your own bookings, managing availability across multiple platforms - it all seemed overwhelmingly complex. That's where I came in.

## My solution

I built the Garsdale Cottages site using the [Chobble Template](/services/chobble-template/), my free and open source website template for small businesses. The template already had a "properties" collection system designed for holiday lets, so we could get the two cottages listed quickly with photo galleries, amenity lists, guest reviews, and enquiry forms.

The big question was bookings. I initially started building a Google Calendar integration to handle availability and reservations, but then I discovered [FreeToBook](https://www.freetobook.com/) - a booking system for holiday lets that charges a flat fee of just £1.50 per booking. That's it. No percentages, no hidden charges, no opaque pricing models. FreeToBook also offers built-in integrations with Booking.com, Airbnb, Google Hotels, and more - so both properties can still be listed on those platforms, but directly, without a middleman skimming an extra cut.

I'm not in the business of building things my customers don't need. When a solid existing service does the job better and cheaper than anything I could build, I'll recommend it every time. I built FreeToBook's booking widget into each property page on the Garsdale Cottages site, so visitors can check availability and book directly. Each property also has its own enquiry form powered by Formspark, sending messages straight to the property owners.

The result is that both cottages are now listed on Booking.com, Airbnb, and Google Hotels - but directly through FreeToBook. When a booking comes in from any platform, the owners pay that platform's commission plus £1.50 to FreeToBook. That's one percentage cut instead of two, plus a tiny flat fee. Compared to the old Sykes setup, the savings are substantial.

## Blocks layout

This site makes extensive use of the [Chobble Template](/services/chobble-template/)'s "blocks" layout system. Instead of plain markdown pages, the homepage and content pages are built from structured content blocks - hero images, feature cards, section headers, split layouts, and more - all defined in simple YAML. This was the first site to really push the blocks system, and it means pages like the [Things To Do](https://www.garsdalecottages.co.uk/things-to-do/) and [Walks](https://www.garsdalecottages.co.uk/walks/) guides are visually interesting and easy to browse, rather than just walls of text.

The content for these pages came from the cottage owners themselves. I asked them to give me big dumps of information about the local area - walks, wildlife, red squirrels, nearby towns, rainy day activities - and we compiled it all into rich, well-structured pages. I used AI to help find references, backlinks, and to tidy the raw information into polished copy. The result is a proper destination guide that gives visitors genuine reasons to book.

## Editing and ownership

The site uses [PagesCMS](https://pagescms.org/) for content editing. The Chobble Template generates a `.pages.yml` configuration that only shows the collections relevant to each site, so the Garsdale Cottages owners see their properties, pages, and content blocks - nothing they don't need. For simple changes they can just log in and edit. For anything more complex, they ask me.

Because the site is built on the Chobble Template, the owners have the complete source code on GitHub. They own their website. If they ever want to switch developer or host, everything is there for them to take. That's the opposite of Sykes, where your listing lives on their platform and you've got nothing if you leave.

## How much did it cost?

The site cost **£1,600** in total, but because Garsdale Cottages is a cooperative, they qualified for my [50% discount](/prices/) - bringing the total to **£800**. Their monthly hosting is discounted too, at **£20/month** instead of £40, which includes uptime monitoring, backups, content updates, and personal support to implement strategies from my [free marketing guides](/guides/) and [videos](/videos/).

For context, that £800 one-off cost is probably less than what both properties were losing to Sykes' double-commission structure every few months.

## Technical details

- Built on the **[Chobble Template](/services/chobble-template/)** - my free, open source Eleventy starter for business websites
- **FreeToBook** integration for availability and bookings at £1.50 per booking
- **Formspark** contact forms with per-property enquiry routing
- **PagesCMS** for easy content editing without touching code
- **Blocks layout system** for visually structured content pages
- **Properties collection** with photo galleries, amenity lists, and guest reviews
- **Schema.org** structured data for search engine visibility
- Hosted on **Bunny CDN** for fast global loading
- **Lighthouse scores:** 83 performance, 96 accessibility, 96 best practices, 100 SEO

## Sounds familiar?

**If you run a holiday let and you think you're getting a raw deal from your letting agency - whether that's Sykes, or anyone else taking opaque fees and setting your prices for you - get in touch through the form below. There are better options out there, and I can help you take control of your own bookings and your own website.**
