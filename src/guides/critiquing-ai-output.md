---
title: A Critique of AI Output
snippet: What generic AI chatbot output gets wrong about your business, and how to prompt it better
meta_title: What AI Gets Wrong About Your Business | Chobble
meta_description: A real example of AI-generated website copy critiqued line by line, plus the prompt that fixes it - free guide from a Prestwich web developer
---

# A detailed critique of generic AI chatbot output

I just asked Claude AI to "write about bouncy castle hire Manchester", and here's what it suggested:

> "Looking for the perfect addition to your next event in Manchester? Bouncy castle hire Manchester offers an exciting range of inflatable attractions suitable for all ages and occasions. Whether you're planning a children's birthday party, school fete, corporate event, or garden party, local hire companies provide professional, reliable service with a diverse selection of bouncy castles and inflatable games. All equipment is regularly safety-checked, fully insured, and comes with professional installation and collection. From traditional castle designs to themed inflatables featuring popular characters, obstacle courses, and slide combinations, there's something to suit every preference and budget. Many Manchester-based companies offer competitive prices, flexible booking options, and serve the entire Greater Manchester area, including surrounding districts like Salford, Stockport, and Bolton. With experienced staff ensuring a smooth rental process and strict adherence to safety guidelines, you can focus on enjoying your event while the little ones bounce away to their heart's content."

## What it gets wrong

At a brief glance this might seem okay, but if you copied something like this onto your site you'd be really doing a disservice to your business. Here's some flaws with it. I spent more than a decade building hire-industry booking software at [Bouncy Castle Network](https://www.bouncycastlenetwork.com), helping hundreds of bouncy castle hirers rank better along the way - [reviews from some of them are here](/reviews/) - and I see the same generic output on plenty of hire sites:

- It says "local hire companies.." and doesn't mention your business name
- It says "many Manchester-based companies" - is it advertising your competitors?
- It makes claims about "all equipment" being insured and coming with professional installation - is that always true?
- It said "strict adherence to safety guidelines" but doesn't mention RPII or BS EN 14960 or PIPA tags
- It mentions "themed inflatables featuring popular characters" - beware the copyright police!
- It lists slides and obstacle courses - do you hire these?
- It says you cover the "entire Greater Manchester area" - really? That's a very big delivery radius (honest delivery areas are their own topic - [targeting specific areas](/guides/targeting-specific-areas/))
- It says "suitable for all ages and occasions" - but some units will be kids-only
- It says you have "flexible booking options" - but you probably don't take last minute bookings, or might want a deposit up front
- It contains "bouncy castle hire Manchester" repeated unnaturally - this is called "keyword stuffing" and Google doesn't like it (my [keywords guide](/guides/keywords-and-keyword-stuffing/) goes into that in depth)
- It doesn't mention ANYTHING unique about your business
- It phrases things in USA corporate speak - "surrounding disticts"? Nobody says that here.
- It doesn't mention anything about the nuances of hiring in Manchester - for example, the near-continuous rain
- It's one big paragraph which is hard to read.

## A better prompt

If you instead prompted Claude with something like:

> "Write a page in British English for my bouncy castle business in Manchester, Stef's Bouncers, with subheadings and lists when appropriate. We are based in Prestwich with free delivery in Prestwich, Whitefield, Cheetham Hill and Crumpsall. Middleton, Radcliffe, Bury, and Salford cost £20 delivery. All of our castles are PIPA tagged and BS EN 14960 tested. We do not hire in heavy rain or winds and you will get a refund. We properly secure every castle with stakes and sandbags if on hard surfaces. We've been hiring since 2004 and have a team of four. We are a family business. We regularly provide castles for events at Heaton Park. Do not make up any new information. Write succinctly but with a friendly voice."

You'd get a response like:

> # Bouncy castle hire in Prestwich - Stef's Bouncers
>
> Stef's Bouncers is a family business based in Prestwich - there are four of us, and we've been hiring bouncy castles out since 2004. Most of our hires are birthday parties, school fetes and events at Heaton Park, where we're a regular.
>
> Every castle goes out PIPA tagged and tested to BS EN 14960, secured with stakes on grass or sandbags on hard standing.
>
> ## Where we deliver
>
> - **Free:** Prestwich, Whitefield, Cheetham Hill and Crumpsall
> - **£20:** Middleton, Radcliffe, Bury and Salford
>
> ## Weather
>
> If it's heavy rain or strong winds, we won't set up - you get a full refund. There's always another weekend.
>
> ## Checking availability
>
> Tell us the date and postcode and we'll come back with availability and a price.

## What you get back

This is much better! It's easier to read, it provides value to the visitor, and it doesn't make as many assumptions about your business because the input text is much more detailed. It also addresses what a searcher would want in the first few lines - what you hire, where, and what happens if it rains - rather than making them wade through a paragraph of "bouncy castle hire Manchester".

You should **still** edit this text yourself, though - it's missing the types of products you hire (the prompt never said), and you'll want to nudge the voice so it sounds like you rather than like a chatbot imitating a friendly business. But as a basis to build a page from, this is a great start.

There's a trade-off in the prompt above, and it's worth knowing about: the more facts you pack in, the less the chatbot has to invent, but the longer the prompt, the more likely it is to quietly drop one of your facts - so check each one made it into the draft. That's why "Do not make up any new information" is in there: it cuts the amount of checking you have to do, it doesn't eliminate it.

I hope this gives some inspiration about how to prompt your AI chatbots more successfully!

One caveat: chatbot output changes model by model, so the transcripts pasted above will age faster than the advice does - re-run the experiment on your own chatbot rather than trusting my paste. And as ever, the result is a draft: you know your business better than the chatbot does.

For more on this topic, read my [guide to using AI effectively](/guides/using-ai-effectively/) - and if you'd like me to critique your website the way I've critiqued this one, have a look at my [SEO audits](/services/seo-audits/).

**If you'd like a critique like this of your own site's copy, drop me a message through the form below and I'll reply within 48 hours.**
