---
title: Fun Pro UK
meta_title: Fun Pro UK | Corporate Entertainment Website | Chobble
meta_description: Mega site for a corporate entertainment company - 88 products, quotation system, mega menu, sitewide search, custom homepage - Chobble Template pushed to the limit
snippet: A mega corporate entertainment site with quotation system, custom designs, and 88 products
order: 1
colour: "#009dd7"
---

# Fun Pro UK

- **Client:** Fun Pro UK Ltd, Coventry
- **Services:** Website development, design, and hosting
- **Website:** [FunProUK.co.uk](https://www.funprouk.co.uk)

Fun Pro UK is a family-run corporate entertainment hire company based in Coventry, right in the geographic heart of England. Colin and Liz have been running the business for over 16 years, delivering interactive games, photo booths, fun food carts, and branded activations to clients including Rolls-Royce, KPMG, Virgin Media O2, Amazon, Adidas, Red Bull Racing, and Selfridges. They needed a website that could properly showcase their massive range of hire equipment while making it dead easy for event planners to browse, compare, and request quotes.

![Fun Pro UK website homepage showing video header, testimonials, brand logos, and a "How it Works" section](/assets/examples/fun-pro-uk.png)

This is probably the most ambitious site I have built on the [Chobble Template](/services/chobble-template/) so far. It has 88 individual product pages, 18 categories, 16 location pages with sub-pages for each, 11 case studies featuring real corporate clients, 147 customer reviews, 39 standalone pages, team profiles, events, news posts, FAQs, and a dedicated quotation system. The whole thing is built as a static site so it loads near-instantly despite having all this content.

## Custom design from Figma

Colin's marketing team provided a full Figma design and I built the site to match it. The result is a completely custom look compared to the base Chobble Template, with a full SCSS theme using custom colour variables, typography using DM Sans, and a component system covering everything from the navigation to product cards to the quotation interface. The homepage has a looping video background in the hero section, a testimonials slider pulling from those 147 reviews, a brand logo carousel showing off 31 corporate clients, a three-step "How it Works" section, and featured products and event type sections.

The navigation uses a mega menu system with multi-column dropdowns organised by event type, product category, and company information. On mobile this collapses into an accordion-style overlay with integrated search and contact details. Every section of the site has its own layout considerations and design tweaks to match the Figma specs, which is what happens when you take a template system and properly push it.

## Quotation system

One of the biggest custom features is the quotation system. Visitors can browse the product catalogue, add games to a quote basket, and then submit the whole lot with their event details. Each product page shows tiered pricing from one-day to seven-day hire, physical specifications like space requirements and power needs, available add-ons like custom branding panels, photo galleries, embedded videos, and detailed FAQs. The quote page lets visitors review their selections before submitting, and the whole thing works without any server-side code because it is all handled in the browser with JavaScript.

## Sitewide search

The site has a full search system that indexes all the content so visitors can quickly find specific games or topics across the entire site. This is particularly useful when you have got 88 products spread across 18 categories. It is built into the static site so there is no external search service to pay for or maintain.

## Events and locations

One of the standout features is how the site organises content into a natural tree structure that is dead easy to navigate. The events system lets Fun Pro UK showcase their full range grouped by event type — corporate fun days, Christmas parties, team building, exhibitions, and more — with each event type branching into the relevant products, case studies, and details. Visitors land on an event type that matches what they are planning and immediately see everything that is available for it.

The same approach works for locations. Fun Pro UK covers the whole of the UK from their base in Coventry, and the site has 16 dedicated location pages for cities including London, Manchester, Birmingham, Leeds, Liverpool, Bristol, and more, each with its own sub-pages. These location hubs let the business target search phrases that include specific city names while giving potential customers in those areas a landing page that feels relevant to them. The combination of events and locations means visitors can drill down naturally — find their event type, find their city, and see exactly what is on offer — without ever feeling lost in a site with this much content.

## Product pages in depth

Each of the 88 product pages is packed with structured data. Take the Batak Pro as an example: it has a subtitle, tiered pricing across multiple hire durations, physical specifications covering space requirements, power consumption, setup time, guest capacity, and surface requirements. There are add-on options for branded panels and button surrounds with their own pricing. Each product has multiple high-resolution images served through Bunny's CDN, occasional embedded Vimeo videos, and a set of FAQs specific to that product. Products are tagged across multiple categories and event types so they surface wherever they are relevant.

## Reviews and social proof

The site pulls in 147 customer reviews going back to 2015, which feed into the testimonials slider on the homepage and a dedicated testimonials page. The Google rating widget is integrated right into the homepage header. There are also 11 detailed case studies covering events for companies like Specsavers, Rolls-Royce, Virgin Media O2, KPMG, and Zoflora, with proper write-ups of real events and real outcomes.

## Technical details

The whole site is built on the Chobble Template using Eleventy as the static site generator, with content editable through PagesCMS. Despite the sheer volume of content the site builds and deploys automatically through GitHub Actions whenever content is updated. Images are served through Cloudinary for optimised delivery. The custom SCSS theme runs to hundreds of lines covering breakpoints at different device szies, with a full design token system for spacing, typography, colours, and component dimensions.

The site uses is hosted on the Bunny.net CDN which means it responds really quickly, and it uses Bunny Stream for video delivery on the homepage, and Vimeo or YouTube for product videos. Contact forms are handled through custom Automatisch rules — Automatisch being an open source alternative to Zapier — which check BotPoison for spam protection and send nicely formatted receipt emails to both the client and the enquirer.

## Why this matters

This site demonstrates that the Chobble Template is not just for simple brochure websites. With 88 products, a quotation system, mega menu navigation, sitewide search, 16 location hubs, detailed case studies, 147 reviews, video backgrounds, brand carousels, and custom designs throughout, this is a full-scale commercial website that competes with anything a traditional web agency would build, and it loads faster than most of them because it is all pre-rendered static HTML served from a CDN.

If you want a site of similar scope and complexity, get in touch through the form below.
