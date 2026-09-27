---
title: GFC Muay Thai
snippet: Chobble Template website for a family Muay Thai gym in Bury - voice-note content, Instagram feed, PagesCMS editing
order: 12
colour: "#d6001c"
meta_title: GFC Muay Thai | Muay Thai Gym Website | Chobble
meta_description: Muay Thai gym website on the Chobble Template - voice notes turned into pages, Google reviews, Instagram feed, email migration - Bury web design example
---

# GFC Muay Thai

- **Client:** GFC Muay Thai, Bury
- **Services:** Website build, hosting, and email migration
- **Website:** [gfcmuaythai.co.uk](https://www.gfcmuaythai.co.uk)
- **Source code:** [on GitHub](https://github.com/chobbledotcom/gfc-muay-thai)

GFC is a family Muay Thai gym in Bury that's been going since the 80s - Darren Phillips started the club after training with Master Sken and Sandy Holt in 1983, and his son Luke took over running it a few years back, moving it into a 5,000+ sq ft space at Bright Street Mill with 20 heavy bags and two rings, which he refurbished himself with help from the members and the gym's brand partner, InFightStyle. Luke coaches all day (often from the 9am fighters' class through to evening sessions), and what he wanted was a site that would carry all of that history properly: the old one was broken in a few places, the classes needed explaining to people who'd never done any martial arts, and - like a lot of people who run a business and coach all day - he had no time to sit down and write website copy.

So the content came from WhatsApp. Luke sent me voice notes between classes, photos from an album and his socials, and a brain-dump about how he got started (first fight at seven, years living and training in Thailand, coaching Lewis George from age five to 21 - now a full-time professional fighter), and I transcribed everything and shaped it into the pages. He did initially send over some FAQs he'd generated with ChatGPT, and I'll be honest, I sent them back: text that could describe any gym in the country does nothing for your Google rankings these days, and while AI is great at tidying up spelling, it loses too much flavour along the way - his own words, tapped out over his dinner, were far better raw material. There's more on that approach in my [using AI effectively guide](/guides/using-ai-effectively/).

![The GFC Muay Thai homepage, showing a full-width photo of the gym's heavy bags behind the headline "Bury's biggest Muay Thai centre" and a "View the timetable" button](/assets/examples/gfc-muay-thai.png)

## What's on the site

Pages for each class type - Junior (6-11), Teen (12-15), Adult (15+), Women's Only and personal training - each explaining who it's for and answering the questions Luke gets asked on the phone constantly (can I join with no experience? will I have to spar? - no, sparring is always optional). There's a full weekly timetable, an FAQ page, meet-the-team pages for the eight coaches, news, and Google reviews fetched automatically onto the site. Luke is far more active on Instagram than Facebook, so the homepage pulls in the gym's latest Instagram posts rather than a Facebook feed, and the YouTube shorts he'd already filmed of himself talking through the classes are embedded alongside the relevant pages - getting the gym a YouTube account was the first thing I told him to do, because it's one of the best things going for search rankings. His partner's meal prep company (Jojo's Flavours) runs out of the gym too, so there's a page for that in the main navigation - anyone on a serious fitness journey can see the gym covers the lot.

## Technical details

It's the [Chobble Template](/services/chobble-template/) with the blocks layout, built as a static site and deployed to Bunny's CDN through GitHub Actions whenever anything changes. Luke edits it himself through [PagesCMS](https://pagescms.org/) (with the CMS trimmed down to just pages, news, team and reviews), and hosting is the [£10/month tier](/prices/) with no support contract - changes beyond what he can do himself in the CMS are billable at my usual hourly rate, which he prefers to paying for support he'd rarely use.

The booking side runs on [ammhub](https://ammhub.com), a martial arts membership system the gym was already using. I did offer him a go on the booking system I built myself first - I spent ten years making booking software for the hire industry - but what GFC needs is memberships and class packs rather than one-off slot bookings, so ammhub stayed, and honestly that's the right outcome: the right tool beats your own tool. At first I embedded it as an iframe, which meant adjusting the site's security settings so their payment provider, GoCardless, could load inside it - and when ammhub later rebuilt their booking flow as a separate micro-site, I switched the site over to a clean button through to it, which is more future-proof anyway. The site links to it from the booking page, the timetable, and a few other spots, because that's the one thing that actually needs to be obvious.

The emails were a whole job in themselves: the domain was registered with one company and the mail hosted with another, so I migrated everything to Migadu and then spent an evening debugging iPhone mail setup over WhatsApp with Luke, where the eventual culprit turned out to be a stray space typed before "imap" in the server name. Emails are always like this, in my experience.

## Still going

Luke's since come back to me about building a site for his next business venture, which is the best kind of feedback I get - and he now edits most things on the gym's site himself through the CMS, which was the plan from the start.

**If you run a gym or a club and want a site that carries the history properly - and that you can edit yourself - fill in the form below and I'll reply within 48 hours.**
