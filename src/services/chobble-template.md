---
title: Chobble Website Template
meta_title: Chobble Website Template | Eleventy Starter for Businesses | Prestwich, Manchester
description: A free website template for business websites, built with Eleventy, Nix, Formspring and more
snippet: A free website template for business websites
order: 3
meta_description: Free open source website template - Eleventy, fast loading, SEO ready - clone it yourself or hire me to build on it - Manchester web developer
---

# Chobble Template

A free and open source template for business websites, which you can build on (or [employ me](/contact/) to work on) to create a website for your own business really easily.

- Live demo: **[example.chobble.com](https://example.chobble.com)**
- Source code: **[Github](https://github.com/chobble-mirror/chobble-template/)**
- Source code: **[git.chobble.com](https://git.chobble.com/chobble/chobble-template/)**

![Screenshot of the example page for the Chobble template](/assets/examples/template.png)

## Background

While building [static websites](/services/static-websites/) for local businesses I realised I was creating the same type of components each time - I was making Eleventy sites, with features like a news system, a contact form, social media links, header images, per-page styles, etc etc.

I was keeping an informal repository of these code snippets on my computers, and realised I could provide some value to the open source community by compiling each of those snippets into a demo site, and releasing the source code under the AGPL3 license.

## Features

The template is adapted to the specific way I build websites. It's an "opinionated" template, designed to load quickly with great search engine optimisation potential, and to be hostable at low cost. For more on effective SEO strategies, check out my [free guides](/guides/).

Since I released the template it's grown a lot. The current version _(accurate August 2025)_ includes pretty much everything a small business website needs:

**Content management:** The template has built-in collections for news posts, products with galleries, team member profiles, and multiple pages with automatic navigation. If you're running a restaurant or cafe, there's a complete menu system with categories, individual items, pricing, and dietary flags (vegan, gluten-free). Events are handled with both one-off dates and recurring schedules (like "every first Wednesday"), and they generate iCal feeds so people can subscribe to your calendar.

**Design and presentation:** Images are automatically responsive and lazy-loading thanks to Eleventy's image plugin, with base64 placeholders that appear while the full image loads. The template comes with several pre-built themes you can switch between - Neon (dark with bright accents), 90s Computer, Floral, Hacker, Monochrome, and Retro. You can even use different themes on different pages if you want. There's a theme editor at `/theme-editor/` where you can test changes live.

**Technical bits:** The template uses semantic HTML and minimal CSS from MVP.css, which keeps things fast. Turbo makes page transitions instant. Contact forms use Formspark for delivery and Botpoison to block spammers. Behind the scenes there's Schema.org structured data for better SEO, SCSS support for advanced styling, and automatic navigation generation. The code gets tidied up by Prettier and checked by Biome linting. It builds quickly with Nix flakes and works with both GitHub Actions and Forgejo Actions for automated deployment.

**Business features:** Opening hours display nicely on every page. Social media links (Facebook, Instagram, TikTok, WhatsApp, Mastodon, Google Maps) appear in the footer. Reviews and testimonials have their own section. The RSS feed has clear instructions for subscribers, and there's a proper sitemap for search engines.

**Hosting flexibility:** The template works on loads of different hosts. There are example sites running on Neocities (free), Pico.sh Pages, and Bunny.net. The PagesCMS editor integration means you can update content without touching code if you prefer.

I have a few ideas about future additions:

- Encrypted pages for login-only access
- Product sales via Stripe for sites that don't need live stock tracking
- YouTube and audio embeds

## How can I use it?

If you're technically-minded, you can clone the [source code](https://github.com/chobbledotcom/chobble-template/) and start playing away! It's set up for Nix at the moment, but it should be easy to adapt to use whichever Node build process you like.

**If you want me to make a website for you based off this template, [get in touch](/contact/).** I charge a flat hourly fee for all jobs, and much of the work of building a website has already been completed with this template, so you'll get great value for money.
