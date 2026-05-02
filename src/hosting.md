---
layout: page.html
title: Hosting
meta_title: Hosting | Bunny.net European CDN & Edge | Chobble
description: I host the websites and apps I build - on Bunny.net, a Slovenian provider with edge servers around the world.
meta_description: Hosting included with my web development - Bunny.net CDN for static sites, Magic Containers for Rails apps, Edge Scripts for Deno apps, Stream for video - European provider, flat monthly pricing
---

# Hosting

**You don't need to sort out your own hosting - I host everything I build, and have done for years.** This page explains who I host with and what I use them for.

If you'd rather host things yourself, that's fine too - you own the source code for everything I build, and I'll help you set up anywhere you like. But most clients let me handle it, because there's nothing useful about having to manage two relationships instead of one.

## Who I host with

I use [Bunny.net](https://bunny.net/) for everything. They're a Slovenian company with edge servers around the world, so your visitors get a fast response wherever they are, and your data sits with a European provider rather than a US one.

I picked Bunny because:

- **It's reliable.** Uptime has been excellent for years, across all of my customers' sites and my own infrastructure.
- **The pricing is straightforward.** No per-seat charges or surprise overages - just usage-based pricing that I can comfortably bundle into a flat monthly fee.
- **It covers everything I need.** Static hosting, video streaming, container hosting for full applications, and edge scripting for smaller things - all from one provider, all from the same dashboard.

## What I use it for

I use a different Bunny product depending on what's being hosted. You don't have to think about which one - it's all included in the [hosting price](/prices/).

### Static sites - Bunny CDN

Most of the sites I build (the [Chobble Template](/services/chobble-template/), [Eleventy](/services/eleventy-developer/) sites, and any other static site) live on **Bunny CDN**. Pages are pre-built once and then served from edge locations around the world, which is why sites like [Renegade Solar](/examples/renegade-solar/) and [Fun Pro UK](/examples/fun-pro-uk/) load in well under a second.

Bunny handles HTTPS certificates automatically and shows a custom 404 page when something's missing. Country blocking is available if you ever need to keep specific traffic away.

I deploy to Bunny CDN using GitHub Actions. Every push to the main branch - whether from me, from you through the CMS, or from another developer - triggers a workflow that builds the site and pushes the output to Bunny via their API.

### Rails and other long-running apps - Magic Containers

For [Ruby on Rails apps](/services/ruby-on-rails-developer/) and other applications that need a real server running all the time, I use **Bunny Magic Containers**. The app runs in a container, the database lives alongside it, and Bunny handles the underlying infrastructure - no separate cloud account or server to keep an eye on.

This is what runs custom business applications, booking systems, member areas, and anything that needs to read and write data on the fly.

### The tickets app and small one-offs - Edge Scripts

[Chobble Tickets](/tickets/) and various small tools run on **Bunny Edge Scripts**. The app is compiled into a single JavaScript file with esbuild and deployed to Bunny's edge runtime, so there's no server to maintain and it scales automatically with traffic. Data lives in a hosted libsql database.

This works well for small, focused apps where spinning up a full container would be overkill.

### Video - Bunny Stream

When a site has video that needs to play smoothly on phones and slow connections, I use **Bunny Stream** for the encoding and delivery. [Fun Pro UK](/examples/fun-pro-uk/) uses Stream for the looping video on its homepage, and it's how I'd handle any product or testimonial video on a client site.

YouTube and Vimeo are also fine for embedded video - I'll recommend whichever fits the job.

## Beyond Bunny

A few other providers handle the rest of what your site needs:

- **Domains** - [Krystal](https://krystal.uk/), a UK registrar with proper support and good tools for delegating account access without sharing passwords. No upsells, no nonsense.
- **Email** - [Purelymail](https://purelymail.com) by default - affordable, flexible, and reliable. They're based in the US, so if you'd rather be on a European provider I'm happy to set up whatever you choose. The email host doesn't have to match the website host.
- **Backups** - customer data is backed up to both [Hetzner](https://www.hetzner.com/) and [Scaleway](https://www.scaleway.com/), two separate European providers, so a problem at one doesn't take both copies down.
- **Code** - source code lives on GitHub (private repos by default) and is mirrored to my own server at [Gandi](https://www.gandi.net/). You get a GitHub login and can push or pull whenever you want.
- **Small bits** - I run a small Gandi VPS for the things Bunny doesn't handle directly, like redirecting `www.example.com` to `example.com` for static sites. You don't have to think about it.

## What it costs

The full breakdown is on the [prices page](/prices/), but to summarise:

- **Static sites:** £10/month (£5 if discounted) for unmanaged hosting, or £40/month (£20 if discounted) for managed hosting with up to 20 sites and ongoing support.
- **Web applications:** From around £5/month for the underlying server, plus £60/month (£30 if discounted) for managed hosting and support.
- **Chobble Tickets:** £50/year (£25 if discounted), all hosting included.

Bunny itself is cheap, and most small business sites cost me a few pence a month to actually host. The monthly fee covers monitoring, backups, support, and the work involved in keeping everything online.

## You can host elsewhere if you'd rather

You own the full source code for everything I build, so you're never tied to my hosting. If you'd rather move to Bunny yourself, or to Cloudflare Pages, Netlify, Pico.sh, GitHub Pages, or anywhere else, I'll help you get set up.

## Get in touch

**If you've got questions about hosting, or want to move an existing site over, fill in the form below.**
