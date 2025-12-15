---
title: Chobble Website Template
meta_title: Chobble Website Template | Eleventy Starter for Businesses | Prestwich, Manchester
description: A free website template for business websites, built with Eleventy, Nix, Formspring and more
snippet: A free website template for business websites
order: 3
meta_description: Free open source website template - Eleventy, fast loading, SEO ready - clone it yourself or hire me to build on it - Manchester web developer
---

# Chobble Template

A free and open source Eleventy starter for business websites - a template you can build on (or [employ me](/contact/#content) to work on) to create a website for your own business really easily.

- Live demo: **[example.chobble.com](https://example.chobble.com)**
- Source code: **[Github](https://github.com/chobble-mirror/chobble-template/)**
- Source code: **[git.chobble.com](https://git.chobble.com/chobble/chobble-template/)**

![Screenshot of the example page for the Chobble template](/assets/examples/template.png)

## Background

While building [static websites](/services/static-websites/#content) for local businesses in Manchester I realised I was creating the same type of components each time - I was making Eleventy sites, with features like a news system, a contact form, social media links, header images, per-page styles, etc etc.

I was keeping an informal repository of these code snippets on my computers, and realised I could provide some value to the open source community by compiling each of those snippets into a demo site, and releasing the source code under the AGPL3 license.

## Examples

Nearly every static site listed on my [examples](/examples/#content) page is using the Chobble Template, either partially or completely. Because I've built it all to be modular, it's easy to swap components in and out of other Eleventy sites.

For an example of a restaurant / cafe site fully using the template to list food items on menu pages, check out [House of Desserts](/examples/house-of-desserts/#content) and for an ecommerce site listing products and categories, check out [Southport Organics](/examples/southport-organics/#content). [Renegade Solar](/examples/renegade-solar/#content) pre-dates the template but its development strongly influenced it.

## Features

The template is adapted to the specific way I build websites. It's an "opinionated" template, designed to load quickly with great search engine optimisation potential, and to be hostable at low cost. For more on effective SEO strategies, check out my [free guides](/guides/#content).

Since I released the template it's grown a lot. The current version _(accurate December 2025)_ includes pretty much everything a small business website needs:

**Content management:** The template has built-in collections for news posts, products with galleries, team member profiles, and multiple pages with automatic navigation. Products can have options (like size or colour) with individual pricing, FAQs, specifications, and features lists. If you're running a restaurant or cafe, there's a menu system with categories, items, pricing, and dietary flags (vegan, gluten-free). Events work with both one-off dates and recurring schedules, and generate subscribable iCal feeds. There's also a locations system for multi-site businesses, and a properties system for holiday lets. Reusable content blocks (snippets) can be included across pages.

**Shopping and payments:** The template includes a shopping cart that stores items in the browser. Customers can add products, adjust quantities, and check out via Stripe or PayPal. There's also a quote/enquiry mode where customers build a cart and submit it as a request instead of paying online. An optional Node.js backend handles payment processing, with Docker support for deployment. Products use auto-generated SKUs for tracking.

**Design and presentation:** Images are automatically responsive and lazy-loading, with base64 placeholders while loading. There are 10 pre-built themes: Default, Neon, 90s Computer, Floral, Hacker, Monochrome, Ocean, Old Mac, Rainbow, and Sunset. You can use different themes on different pages. The theme editor at `/theme-editor/` lets you customise colours, fonts, borders, and layout, then download your changes as a file. Galleries have thumbnail navigation and full-size overlays. There's a slider component for horizontal scrolling, and scroll-fade animations (which respect reduced motion preferences).

**Technical bits:** The template uses semantic HTML and minimal CSS from MVP.css. Turbo makes page transitions instant. Contact forms use Formspark for delivery and Botpoison to block spam. Schema.org structured data covers products (with reviews and ratings), events, FAQs, and organisation details. SCSS support for styling, automatic navigation generation, and keyword-based search are included. Biome handles linting and there's duplicate code detection via jscpd. A test suite with 17+ test files runs in CI. It builds with Nix flakes and works with GitHub Actions and Forgejo Actions.

**Business features:** Opening hours display on every page. Social media links appear in the footer - the template supports 14 platforms including Facebook, Instagram, TikTok, WhatsApp, Mastodon, YouTube, LinkedIn, and more. Reviews link to specific products and show aggregate ratings. The RSS feed has instructions for subscribers, and there's a sitemap for search engines. Navigation can be horizontal or in a left sidebar, with sticky mobile nav as an option.

**Hosting flexibility:** The template works on different hosts. There are example sites running on Bunny.net, Pico.sh Pages, and other platforms. PagesCMS integration means you can update content without touching code.

I have a few ideas about future additions:

- Encrypted pages for login-only access
- YouTube and audio embeds

## How can I use it?

[Click here to read full-ish instructions for building and hosting a simple site with this template](https://example.chobble.com/instructions/). You won't need to touch any code unless you want to edit the theme or customise the layouts. If you want to run the template locally you'll need to install Node - I've provided a Nix flake which sets that up and more.

**If you want me to make a website for you based off this Eleventy starter, [get in touch](/contact/#content). I charge a totally transparent flat hourly fee for all job, and since much of the work of building a website has already been completed with this template you'll get great value for money.**
