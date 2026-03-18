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
- **Source code:** [on GitHub](https://github.com/chobbledotcom/fun-pro-uk)

Fun Pro UK is a family-run corporate entertainment hire company based in Coventry, right in the geographic heart of England. Colin and Liz have been running the business for over 16 years, delivering interactive games, photo booths, fun food carts, and branded activations to clients including Rolls-Royce, KPMG, Virgin Media O2, Amazon, Adidas, Red Bull Racing, and Selfridges. They needed a website that could properly showcase their massive range of hire equipment while making it dead easy for event planners to browse, compare, and request quotes.

![Fun Pro UK website homepage showing video header, testimonials, brand logos, and a "How it Works" section](/assets/examples/fun-pro-uk.png)

This is probably the most ambitious site I have built on the [Chobble Template](/services/chobble-template/) so far. It has 88 individual product pages, 18 categories, 16 location pages with sub-pages for each, 11 case studies featuring real corporate clients, 147 customer reviews, 39 standalone pages, team profiles, events, news posts, FAQs, and a dedicated quotation system. The whole thing is built as a static site so it loads near-instantly despite having all this content.

## Custom design throughout

The site has a completely custom look compared to the base Chobble Template. I wrote a full SCSS theme with custom colour variables, typography using DM Sans, and a component system covering everything from the navigation to product cards to the quotation interface. The homepage has a looping video background in the hero section, a testimonials slider pulling from those 147 reviews, a brand logo carousel showing off 31 corporate clients, a three-step "How it Works" section, and featured products and event type sections.

The navigation uses a mega menu system with multi-column dropdowns organised by event type, product category, and company information. On mobile this collapses into an accordion-style overlay with integrated search and contact details. Every section of the site has its own layout considerations and design tweaks, which is what happens when you take a template system and properly push it.

## Quotation system

One of the biggest custom features is the quotation system. Visitors can browse the product catalogue, add games to a quote basket, and then submit the whole lot with their event details. Each product page shows tiered pricing from one-day to seven-day hire, physical specifications like space requirements and power needs, available add-ons like custom branding panels, photo galleries, embedded videos, and detailed FAQs. The quote page lets visitors review their selections before submitting, and the whole thing works without any server-side code because it is all handled in the browser with JavaScript.

## Sitewide search

The site has a full search system that indexes all the content so visitors can quickly find specific games or topics across the entire site. This is particularly useful when you have got 88 products spread across 18 categories. It is built into the static site so there is no external search service to pay for or maintain.

## Location pages

Fun Pro UK covers the whole of the UK from their base in Coventry, and the site reflects this with 16 dedicated location pages for cities including London, Manchester, Birmingham, Leeds, Liverpool, Bristol, and more. Each location has its own sub-pages. These are genuinely useful for SEO because they allow the business to target search phrases that include specific city names, and they give potential customers in those areas a landing page that feels relevant to them.

## Product pages in depth

Each of the 88 product pages is packed with structured data. Take the Batak Pro as an example: it has a subtitle, tiered pricing across multiple hire durations, physical specifications covering space requirements, power consumption, setup time, guest capacity, and surface requirements. There are add-on options for branded panels and button surrounds with their own pricing. Each product has multiple high-resolution images served through Cloudinary CDN, embedded Vimeo videos, and a set of FAQs specific to that product. Products are tagged across multiple categories and event types so they surface wherever they are relevant.

## Case studies and reviews

The site features 11 detailed case studies covering events for companies like Specsavers, Rolls-Royce, Virgin Media O2, KPMG, Baylis & Harding, Lidl, Poundland, and Zoflora. These are proper write-ups of real events with real outcomes. On top of that there are 147 customer reviews going back to 2015, which feed into the testimonials slider on the homepage and a dedicated testimonials page. The Google rating widget is integrated right into the homepage header.

## Technical details

The whole site is built on the Chobble Template using Eleventy as the static site generator, with content editable through PagesCMS. Despite the sheer volume of content the site builds and deploys automatically through GitHub Actions whenever content is updated. Images are served through Cloudinary for optimised delivery. The custom SCSS theme runs to hundreds of lines covering breakpoints at 650px, 768px, 1000px, and 1500px, with a full design token system for spacing, typography, colours, and component dimensions.

The site uses Bunny.net for video delivery on the homepage, Vimeo for product videos, and Cloudinary for product images. Contact forms are handled through FormSpark with BotPoison spam protection. The whole thing is deployed to a CDN so page loads are consistently fast regardless of where in the UK the visitor is.

## Why this matters

This site demonstrates that the Chobble Template is not just for simple brochure websites. With 88 products, a quotation system, mega menu navigation, sitewide search, 16 location hubs, detailed case studies, 147 reviews, video backgrounds, brand carousels, and custom designs throughout, this is a full-scale commercial website that competes with anything a traditional web agency would build, and it loads faster than most of them because it is all pre-rendered static HTML served from a CDN.

The source code is all open source and available on GitHub, so anyone can see exactly how it is put together. If you want a site of similar scope and complexity, get in touch through the form below.
