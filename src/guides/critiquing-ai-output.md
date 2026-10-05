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
- It contains "bouncy castle hire Manchester" repeated unnaturally - this is called "keyword stuffing" and Google doesn't like it [Google: #1](#ref-1) (my [keywords guide](/guides/keywords-and-keyword-stuffing/) goes into that in depth)
- It doesn't mention ANYTHING unique about your business [Google: #2](#ref-2)
- It phrases things in USA corporate speak - "surrounding disticts"? Nobody says that here.
- It doesn't mention anything about the nuances of hiring in Manchester - for example, the near-continuous rain
- It's one big paragraph which is hard to read.

## A better prompt

If you instead wrote your own prompt, with your own facts in it, you'd get something much better. Here's one a business owner could write - short, plain, no clever tricks:

> "Write a page for my website about my bouncy castle business, Stef's Bouncers. I'm in Prestwich. I hire out bouncy castles. Write it in British English. Keep it short and easy to read.
>
> The only facts about my business - don't make anything up:
> - I'm a family business. It's me, my wife and two others.
> - I've been hiring castles out since 2004.
> - Free delivery in Prestwich, Whitefield, Cheetham Hill and Crumpsall.
> - £20 delivery to Middleton, Radcliffe, Bury and Salford.
> - All my castles are PIPA tagged and tested to BS EN 14960.
> - I put stakes in on grass and sandbags on hard standing.
> - I don't set up in heavy rain or strong winds. You get your money back.
> - I do a lot of events at Heaton Park.
>
> People finding this on Google will want to know what I hire, if the castles are safe, delivery costs, what happens if it rains and how to book. Answer them in that order. Use headings so it's easy to read. If there's something you don't know about my business, put [FILL THIS IN] instead of guessing. Don't say "trusted" or any of that marketing talk."

I tested that prompt with Z.ai's GLM 5.3 model (a great open source one), and this is what it came back with:

> # Bouncy Castle Hire in Prestwich | Stef's Bouncers
>
> Stef's Bouncers is a family business based in Prestwich. There are four of us - me, my wife and two others - and we've been hiring out bouncy castles since 2004. As well as parties, we do a lot of events at Heaton Park.
>
> ## What castles do you hire?
>
> We hire out bouncy castles for parties and events.
>
> [FILL THIS IN - list your castles here: sizes, themes, ages they're suitable for, and prices if you want to show them]
>
> ## Are the castles safe?
>
> Every castle is PIPA tagged and tested to BS EN 14960, the British and European standard for inflatable play equipment.
>
> We anchor every castle properly too: stakes on grass, and sandbags on hard standing.
>
> ## How much is delivery?
>
> **Free delivery:** Prestwich, Whitefield, Cheetham Hill and Crumpsall
>
> **£20 delivery:** Middleton, Radcliffe, Bury and Salford
>
> Not on the list? [FILL THIS IN]
>
> ## What happens if it rains?
>
> If there's heavy rain or strong winds, we won't set up - it isn't safe. You get your money back.
>
> ## How do I book?
>
> To check availability and book, [FILL THIS IN - phone number, email or contact form, how you take payment, and how far in advance people should book].
>
> Two spots need your details before this goes live: your castle list and your booking info. Happy to adjust the wording or length if you like.

## What you get back

This is much better! It's easier to read, it provides value to the visitor, and it doesn't make as many assumptions about your business because the input text is much more detailed. It also addresses what a searcher would want in the first few lines - what you hire, where, and what happens if it rains - rather than making them wade through a paragraph of "bouncy castle hire Manchester".

You should **still** edit this text yourself, though - it's missing the types of products you hire (the prompt never said), and you'll want to nudge the voice so it sounds like you rather than like a chatbot imitating a friendly business [Google: #3](#ref-3). But as a basis to build a page from, this is a great start. And note the chatbot left [FILL THIS IN] markers and finished by telling you what needs filling in before the page goes live, rather than making it up - that's the placeholder trick doing its job.

There's a trade-off in the prompt above, and it's worth knowing about: the more facts you pack in, the less the chatbot has to invent, but the longer the prompt, the more likely it is to quietly drop one of your facts - so check each one made it into the draft. That's why "don't make anything up" is in there: it cuts the amount of checking you have to do, it doesn't eliminate it.

I hope this gives some inspiration about how to prompt your AI chatbots more successfully!

One caveat: chatbot output changes model by model, so the transcripts pasted above will age faster than the advice does - re-run the experiment on your own chatbot rather than trusting my paste. And as ever, the result is a draft: you know your business better than the chatbot does.

For more on this topic, read my [guide to using AI effectively](/guides/using-ai-effectively/) - and if you'd like me to critique your website the way I've critiqued this one, have a look at my [SEO audits](/services/seo-audits/).

**If you'd like a critique like this of your own site's copy, drop me a message through the form below and I'll reply within 48 hours.**

## References

- <a id="ref-1"></a>#1 - [developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies) - "Repeating the same words or phrases so often that it sounds unnatural"
- <a id="ref-2"></a>#2 - [developers.google.com/search/docs/fundamentals/creating-helpful-content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) - "Does your content clearly demonstrate first-hand expertise and a depth of knowledge"
- <a id="ref-3"></a>#3 - [developers.google.com/search/docs/fundamentals/creating-helpful-content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) - "using generative AI to produce large amounts of text without manual oversight or curation represents little to no effort"
