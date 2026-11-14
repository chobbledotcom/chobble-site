---
title: Martial Arts Club Web Design
meta_title: Martial Arts Club Web Design | Gym Websites | Manchester | Chobble
description: Fast, editable websites for martial arts clubs - class pages, timetables, memberships and a site you own. Built for Muay Thai and boxing clubs around Greater Manchester and Lancashire.
snippet: Websites for martial arts clubs that you can edit yourself
meta_description: Martial arts club web design - Muay Thai and boxing gyms, class pages, timetables, memberships, fast static sites you own - from £600.
order: 8
group: websites
---

# Martial arts club website design

I've built three martial arts club websites lately: [GFC Muay Thai](/examples/gfc-muay-thai/) in Bury, MPL Box Fit in Haslingden, and Enigma Performance Centre in Standish. They're all Muay Thai or boxing clubs, all run by people who coach all day and fit the website around it, and all three were put together from WhatsApp messages, voice notes and phone photos rather than a formal brief. The specs arrived in the chat, I sorted the site, they told me what needed changing, and we went from there. Nobody had to write a document about their own gym.

## A few examples

<div class="examples">

- ![The GFC Muay Thai homepage, showing rows of heavy bags behind the headline "Bury's biggest Muay Thai centre"](/assets/examples/gfc-muay-thai.png) **[GFC Muay Thai](/examples/gfc-muay-thai/)** is a family club in Bury that's been going since the 80s. Luke coaches all day, so the site was built from voice notes between classes, photos from his phone and a brain dump about the gym's history. It covers the classes, timetable and coaches, pulls in Google reviews and Instagram, and Luke now runs it himself.
- ![The MPL Box Fit homepage, with a dark gym photo behind the headline and red and white branding](/assets/examples/mpl-box-fit.png) **[MPL Box Fit](https://www.mplboxfit.co.uk/)** is a boxing-fitness studio inside Monkey Playland in Haslingden. Mo sent me photos of the room and the kit, and the site covers the sessions, the £10 pay-as-you-go price and the class times.
- ![The Enigma Performance Centre homepage, showing head coach Josh Hill against a purple background and the headline "Muay Thai in Standish"](/assets/examples/enigma-performance-centre.png) **[Enigma Performance Centre](https://www.enigmaperformancecentre.co.uk/)** is a new Muay Thai gym in Standish, Wigan. Laura sent me a stream of consciousness about the club, the coaches and how she wanted it to feel, and the first version went up the day after they paid the invoice. Josh got in touch after Luke at GFC recommended me.

</div>

## The class pages

At GFC, Enigma and MPL that means a page for each class or age group, the timetable, and the questions people ask before their first session. The details differ because the clubs differ, but the job is the same: explain who each session is for, what it costs and how to start. That saves the coach repeating themselves on the phone and gives Google something specific to index.

None of that is clever. It's just taking the questions people already ask and putting the answers on a page.

## Timetables and prices, without the PDFs

The timetable is a normal web page, not a PDF and not a picture of a spreadsheet. That matters more than it sounds: most people are looking at your site on a phone, in a queue or on the bus, and a PDF that opens at 40% and needs pinching and zooming is a good way to lose them. The class times sit in a page they can read, with the address underneath and a button to book or ask about the session.

Prices are on the page too. GFC has drop-in prices and memberships, Enigma has adult, teen and junior memberships plus pay-as-you-go, and MPL is £10 per class with no commitment. If a price or a time changes, the owner edits it in a browser form and the site updates a minute later. That's the whole workflow.

## Memberships and bookings

Every club does this differently, so I don't force everyone onto the same system.

GFC already used ammhub for memberships and class packs, and it works, so it stayed. I offered them a go on the booking system I built myself first, but GFC needs recurring memberships and class packs rather than one-off slot bookings, and the right tool beats my own tool. The site links through to ammhub from the timetable and the booking page.

Enigma needed a health and safety waiver and photo consent before anyone paid, and Laura was collecting that with a Google Doc before sending a Stripe link by hand. The site now takes the enquiry first, then shows the four Stripe payment links on the thank-you page, so nobody can reach the links without filling in the form. Laura still confirms each membership and sends the right link, but that's how she was already working. There's deliberately no booking system on the Enigma site.

MPL is simpler: £10 per class, pay as you go, no membership. The site explains the classes and takes enquiries through a contact form, which is the right amount of machinery for how the gym runs.

If you need one-off class bookings or event tickets, [Chobble Tickets](https://tickets.chobble.com) does that for a flat fee and takes no cut of sales. Recurring memberships are the bit I'm adding to it at the moment, so once that's supported it might be a better fit for Josh and Luke than what they're using now - but for the time being, the tools they already have are the right answer.

## The words come from you

The best part of these three builds was the content, and none of it started as website copy. Luke sent voice notes between classes and photos from his camera roll. Laura sent me a long message about the club's vision and told me she wasn't sure how wordy to be, and I told her to send everything she could think of, because the useful part is her thinking, not a polished summary. Mo sent pictures of the gym and answered questions in the chat.

What I don't want is a page that could describe any club in the country. Luke initially sent over some FAQs he'd generated with ChatGPT, and I sent them back. AI is good at tidying up spelling and dreadful at keeping the thing that makes your gym yours, and bland copy doesn't help you rank either. If you'd rather use AI to think something through, send me the prompt and your own answer as well - that's much better raw material than the output.

I'll turn the voice notes and messages into pages, send them over for you to check, and change anything that doesn't sound like you. That's usually the bit people are most relieved about, because writing a website is the job that never gets to the top of the list when you're coaching six days a week.

## You run it, and I'm here if you want me

The plan from the start is that the club owns the site. You get the full source code, the site is built with open source tools, and there's no platform subscription sitting between you and your own content. If you want to edit it yourself, you get a browser-based editor and a walkthrough; if you'd rather send me changes, that's fine too.

GFC has taken that further than most. Luke now hosts the site himself, on his own GitHub and Bunny account, and uses Claude to help him make changes. I removed the domain from my Bunny account so he could add it to his own. That's not a story about me being replaced by a robot - it's a story about a gym owner who wanted to control his own website and had the curiosity to have a go. It's the same thing Jamie at [Surrey Face Booth](/reviews/) said after his build:

> He set everything up so that it was genuinely easy for us to take over and expand ourselves. The structure is logical, the documentation is clear, and editing or adding new content doesn't require us to go running back to a developer every time we want to change a sentence or add a page.

If that sounds like more work than you want, it doesn't have to be. You can stay on the [£40 a month support package](/prices/#content) and send me the changes, or the £10 a month hosting-only tier and handle the editing yourself. You can also take the code and host it elsewhere for nothing, and I'll help you move it. Use me as much or as little as suits the club.

## Fast, and built to be found locally

These are static sites served from a CDN, which means the pages are written out in advance rather than assembled by a database every time somebody visits. There's no plugin to update, no admin dashboard loading before the page does, and nothing to slow down when the site gets busy. The three homepages above all load in around a second or less, photos included.

For search, the important bits are local and specific. Each site names its town in the title, headings and page metadata, because "Muay Thai Bury" or "boxing gym Haslingden" is what somebody types, not "martial arts club". The class pages answer real questions, the class times and address are easy to find, and the sites can pull in Google reviews and Instagram posts so there's fresh, genuine content without the owner having to write a blog post every week. A fast, clear site with proper structured data gives you a good foundation; the ongoing work of links, reviews and content is what turns that into rankings, and I'll point you at my [free marketing guides](/guides/) if you want to have a bash at it yourself.

## What it costs

I charge [£200 an hour](/prices/) and break down what each hour covers, so there are no surprise invoices. A simple club site on my [Chobble Template](/services/chobble-template/) starts at **£600**, which covers the design, the main pages, the editing setup and the initial SEO work. A club with a page for every class, a timetable, a page for each coach, news and reviews is a bigger job - usually a few days rather than one - and I'll quote it properly once I know what you need. The [price calculator](/price-calculator/) gives you a rough figure in the meantime.

Hosting is **£10 a month** on its own or **£40 a month** with support, updates and marketing help, and both are optional because you own the code. Charities, co-ops and community groups get the usual 50% discount on all of it.

## Questions

<details>
<summary><strong>I haven't written any content. Can you still build it?</strong></summary>

Yes, and that's the normal way these go. Send voice notes, photos, old Facebook posts, a rambling message about how the club started - whatever you've got. I'll shape it into pages and you tell me what's wrong. The only thing I'd rather you didn't send is generic AI-written copy, because it loses the details that make the site worth reading.

</details>

<details>
<summary><strong>Can we keep our existing booking or membership system?</strong></summary>

Usually, yes. GFC kept ammhub. Enigma kept Stripe payment links. If your system gives you a link or an embed, I can put it on the site. If it doesn't, we can talk about whether it's worth changing or whether the site should just explain how to join and let you handle the rest.

</details>

<details>
<summary><strong>Can I edit the site myself?</strong></summary>

Yes. You get a browser-based editor for the pages, classes, timetable, team and reviews, and I'll walk you through it. If you're comfortable with GitHub and want to go further, you can take the whole repository and host it yourself, which is what Luke did at GFC.

</details>

<details>
<summary><strong>Will we rank first for "Muay Thai in [our town]"?</strong></summary>

I can give you a fast, well-structured site with the town and classes named clearly, proper structured data, and reviews pulled in automatically. That's a strong start. What it can't do is guarantee a position, because rankings also depend on links, reviews, competition and time. I'll be honest about what's realistic rather than promise you the top spot.

</details>

<details>
<summary><strong>Do you only work with Muay Thai and boxing clubs?</strong></summary>

No. Those are the three I've built most recently, but the shape is the same for judo, karate, BJJ, MMA or a mixed martial arts centre: classes by age and level, a timetable, the coaches, how to join, and a site you can update without ringing a developer. If you run a different kind of club, get in touch and tell me how it works.

</details>

<details>
<summary><strong>What happens if I want to leave?</strong></summary>

You own the source code, the domain can be in your name, and the site can be hosted anywhere. I'll help you move it and won't hold anything back. That's the point of building it this way.

</details>

## Get in touch

If you run a martial arts club and want a site that explains the classes properly, comes from your own words, and that you can run yourself, fill in the form below. Tell me the town, the classes you run and how people join at the moment, and I'll come back with a proper quote.
