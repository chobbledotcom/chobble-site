---
title: UKE Group North
snippet: Community ukulele workshops with PagesCMS for easy content updates
order: 8
colour: "#e8f4ea"
meta_title: UKE Group North | Community Music Website Example | Chobble
meta_description: Ukulele workshop website with PagesCMS - events, lessons, news - Community Interest Company - Manchester web design example
---

# UKE Group North

- **Client:** UKE Group North Community Interest Company
- **Services:** Website development and hosting
- **Website:** [UKEGroupNorth.com](https://www.ukegroupnorth.com)
- **Source code:** [on GitHub](https://github.com/chobbledotcom/uke-group-north)

UKE Group North is a Community Interest Company running ukulele workshops across Greater Manchester and Lancashire. They needed a website to promote their weekly sessions, share songbooks, and help people find their local group.

## My Solution

I built the site using the [Chobble Template](https://git.chobble.com/chobble/chobble-template/), which handles all the technical bits so I could focus on making it easy for people to find session times and locations. The site has pages for workshops, one-to-one lessons, downloadable songbooks, and testimonials from members.

The organisation can edit everything through [PagesCMS](https://pagescms.org) - a friendly content editor that works with GitHub. They can add news posts, update session details, and manage their songbook library without touching any code. Changes go through a simple approval process before going live.

## Technical Details

The site is a [static website](/services/static-websites/) built on the [Chobble Template](/services/chobble-template/). Here's what's under the bonnet:

- Built with **Eleventy** - a static site generator using Node JS
- Uses **PagesCMS** for content editing - connects to GitHub and provides a visual editor
- Contact form via **Formspark** with **BotPoison** spam protection
- Automatically builds with **GitHub Actions** whenever content is updated
- Uses a **Nix Flake** for reproducible builds
- Deployed to **Bunny CDN** for fast global delivery
- **Minimal CSS** via SCSS - no heavy frameworks
- **Turbo** for instant page transitions
- Domain registered with **Krystal**
- Fully responsive design
- SEO optimisation

You can view all of this yourself by [clicking here to view the site's source code](https://github.com/chobbledotcom/uke-group-north).

## Content Management

PagesCMS gives the organisation a straightforward way to update their site. They log in through their GitHub account and can:

- Add and edit news posts
- Update workshop locations and times
- Upload and manage songbook PDFs
- Add member testimonials
- Update contact details

Changes are submitted as pull requests in GitHub, which means there's a review step before anything goes live. This keeps the site accurate and prevents accidental changes.

## Community Mission

UKE Group North aims to improve community wellbeing through music. They offer:

- Weekly "Sing & Strum Sessions" at multiple locations
- Free instrument loan for beginners
- Sessions for all ages and skill levels
- One-to-one lessons
- Downloadable songbooks

The website supports this mission by making it easy for people to find their nearest workshop and get started with the ukulele.

## Similar Solutions

I can build static websites with PagesCMS for any organisation that needs regular content updates but wants to avoid the security and maintenance headaches of WordPress. It's particularly suitable for community groups, clubs, and small organisations where multiple people might need to update content. The GitHub integration means there's version control and approval workflows built in, and the static nature keeps hosting costs low while remaining fast and secure.
