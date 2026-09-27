---
title: Keen On Driving
snippet: Chobble Template website for a Rossendale Valley driving instructor - local search structure, areas pages, WhatsApp contact and plain prices
order: 13
colour: "#0f5c63"
meta_title: Keen On Driving | Driving Instructor Website | Chobble
meta_description: Driving instructor website example on the open source Chobble Template - areas pages for five towns, plain prices, WhatsApp contact - Rossendale Valley
---

# Keen On Driving

- **Client:** Keen On Driving, Rossendale Valley
- **Services:** Website build and hosting
- **Website:** [keenondriving.co.uk](https://www.keenondriving.co.uk)
- **Source code:** [on GitHub](https://github.com/chobbledotcom/keen-on-driving)

Daniel Keenan set up Keen On Driving at the beginning of 2026, teaching manual driving lessons around the Rossendale Valley - Rawtenstall, Crawshawbooth, Waterfoot, Haslingden and Helmshore, and the BB4 postcodes generally. He originally trained to be a history teacher and found he preferred one-to-one teaching in what he calls "the moving classroom" of a car, which I think is a lovely way of putting it. He came through the proper route, too: trained by Linda Edwards at Express Driver Training, mentored by Andy Scanlon of Scan School of Motoring, and now through the final ADI test, which only about 35% of aspiring instructors pass nationally.

Daniel and I go back a bit further than this build, which I'll mention because it explains why the whole thing was such a straightforward conversation. Back in my Bouncy Castle Network days he was one of the platform's customers, and worked with me on optimising his site. So by the time he'd qualified as a driving instructor and needed a website of his own, he'd already seen how I work from the customer side - which meant the build was really a continuation of a working relationship rather than a cold start.

Being a new instructor starting from nothing, he needed the site to do two jobs at once. One was explaining who he is and how he teaches - he has real experience with nervous pupils, and with pupils who have severe anxiety, ADHD and autism, which is worth saying plainly because it's often the exact thing people are worried about when they go looking for an instructor. The other was turning up in Google when someone in Haslingden searches for driving lessons in Haslingden, which is the bit the rest of this page is about. All his lessons are two hours, and the prices are stated on the site: £70 for a starter lesson, £80 standard, and block bookings of 10 to 40 hours working out at £38 down to £35 an hour.

![The Keen On Driving homepage in the deep teal and marigold theme, with two-hour lesson prices, a WhatsApp contact link and the areas covered in the Rossendale Valley](/assets/examples/keen-on-driving.png)

## The local search bit

This is the part of the build I'd point other small local businesses at, and it follows the checklist in my [guide to targeting specific areas](/guides/targeting-specific-areas/). The areas covered page on the site has a clear H1 and then a genuinely local paragraph for each town - routes connecting Haslingden's town centre to the A56 and the M66, the upper valley roads out of Waterfoot towards Bacup and Rochdale, the quieter residential streets in Helmshore that suit an early lesson, the village roads through Crawshawbooth between Rawtenstall and Burnley - plus the practical logistics of using Nelson Driving Test Centre and when he's generally available for tests (10am to 1:30pm, Monday to Friday). The meta descriptions name the towns as well.

The scale here is deliberately the opposite end from [Fun at the Fair](/examples/fun-at-the-fair/), where 21 location pages went up in one go with all the collating that involved. Instead the structure comes from the [Chobble Template](/services/chobble-template/)'s locations system, which gives each entry in the locations collection its own page under a /locations/ hub - and the CMS on Daniel's site has that collection set up with subfolders enabled, so the town pages can nest as a tree hanging off the areas page. That's exactly the shape my [guide to structuring your site](/guides/structuring-your-site/) recommends: an areas hub as the branch, town pages hanging off it, and URLs you can chop the end off to climb back up a level.

None of those per-town pages are live yet, by the way - I'd rather be upfront about that than imply the whole tree is standing. What exists now is the scaffolding for them: breadcrumbs are switched on in the site config (you can see the Home / Areas Covered trail at the top of the screenshot below), so once a town page exists, both people and Google will be able to see where it sits in the tree. And it won't be an orphan on the day it goes live either, which is the classic mistake the structuring guide spends a while on - the homepage already has an Areas Covered section linking every town, so each future page gets a link pointing at it from the moment it's published. That mirrors the guide's own advice that a few high-quality pages beat lots of empty ones: an area page with nothing local to say is worse than no page at all, so the structure is set up now and the pages arrive when there's real content for them, written and added by Daniel in the CMS.

![The areas covered page on the Keen On Driving site, with a Home / Areas Covered breadcrumb at the top and a local description of each town from Rawtenstall to Helmshore](/assets/examples/keen-on-driving-areas.png)

## What's on the site

Lesson pages with the prices made plain, the areas covered page described above, a waitlist page for when the diary is full, a WhatsApp contact link, and an embedded Google Business Profile map. If you're an instructor working out what a driving instructor website actually needs, that list is roughly it - prices people can read without ringing up, an areas page, the test-centre logistics nervous pupils always ask about, reviews, and a way to get hold of you that takes ten seconds on a phone. Reviews from Facebook and Google are fetched onto the site automatically by GitHub Actions workflows - there are six Facebook reviews so far, which for a business that has existed since January is a good sign in itself. He's listed on Yell, DriveWith and the Driving Schools Locator too, which is the consistency half of the local search guide: same name, same details, everywhere.

## Technical details

It's the Chobble Template with the blocks layout and a custom "petrol and marigold" theme - Bricolage Grotesque and Hanken Grotesk, deep teal with marigold accents - built as a [static site](/services/static-websites/) and deployed to Bunny's CDN through GitHub Actions, with staging builds for branches and production for main. Daniel edits through [PagesCMS](https://pagescms.org/), with collections for pages, snippets, news, reviews and the locations tree, so the per-town pages can be added from the CMS as they get written. Every site like this is open source, so you can read the actual code for this one on GitHub before hiring me, and if you're weighing up a site of your own, [the prices page](/prices/) has the usual detail on build rates and hosting - with [reviews from other clients of mine](/reviews/) if you want the human version of the evidence.

**If you're a driving instructor and want a site built around the places you actually teach, fill in the form below and I'll reply within 48 hours.**
