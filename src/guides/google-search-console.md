---
title: Google Search Console
snippet: Essential free tool from Google to monitor how your website performs in search results.
meta_title: Google Search Console Setup Guide | Free Guide | Chobble
meta_description: Guide to Google Search Console - monitor search performance, fix issues, understand visitor behaviour - essential for SEO - Manchester web developer
---

# Google Search Console

This guide covers Google Search Console, a free tool that Google provide where you can log in and learn about how Google views your site in terms of their search results.

**Rather watch a walkthrough? [Click here to watch it](/videos/google-search-console-walkthrough/).**

If you're trying to get your website ranking well and attracting visitors then I think you really ought to pay some attention to Google Search Console because it can give some really useful insights.

At a absolute bare minimum, someone should be paying attention to the emails that Google Search Console sends, and fixing any issues that they mention. If I host your website, I'm doing this for you, and if you want access then just drop me a message and I'll invite you.

But ideally, everyone involved in your website should have access to Google Search Console and should periodically log in and check how things are looking. Just receiving the notification emails is one thing, but being proactive can be really beneficial.

## Signing Up

Anyway, before we get stuck into the weeds about GSC, lets start at the start - getting signed up. You'll need a Google account - you probably have one already if you've got a Gmail address, or a YouTube account, or an Android phone. You need to visit [https://search.google.com/search-console](https://search.google.com/search-console), click "Start now", and log into your Google account.

Once you're in, Google will ask you to add a "property". This is just another word for a website, really. Google wants to verify that you own this website, so they give some options for how to accomplish this. There's two options - "Domain" and "URL Prefix". For most small businesses that just have one main website, there isn't much difference in how these work and either will be fine.

The first, "Domain" verification, means you'll need to add a DNS record to your domain name. This is a slightly fiddly process - Google give you instructions on how to do it, but you'll need to click around in menus in your domain name control panel, and there's a chance you won't be able to do it if someone else controls your site's nameservers, which is a whole technical rabbit hole that's too much to get into here.

The second method, "URL Prefix", is a bit easier - it lets you verify by adding a Meta Tag to your site's HTML source code, or by connecting it to your Google Analytics account, or Google Adwords, or you can do the DNS method from the Domain verification too.

Whichever option you go for, there's a good chance you'll need to get whoever made your website to help you, but it's only a quick job and only needs doing once and then it's good forever.

Alright, so you've got your domain verified, nice. But when you log in you'll probably see this - "Processing data, please check again in a day or so". In my experience it always takes more than a day for any useful information to show up. I don't know why this is, because Google has all of that information, and once it's showing you might be able to see information from before you set up GSC, but anyway, check back in a few days.

Okay, a few days have passed, and we're in the console, awesome. First off, you'll be looking at this overview page, which gives you a couple of graphs showing how many clicks your site got, how many pages are indexed, and how fast your site was for visitors. If your site contains structured data, that'll show up here too in the Enhancements section, but that's another big rabbit hole we won't get distracted by just now.

## Overview

So lets go down the other pages in GSC in order. First off there's URL inspection. You can type any web address in your site in here, and it'll tell you whether the page shows in Google's search results, whether it's in their index, and if the answer to either of those questions is no, it'll tell you why.

It also tells you a few things about _why_ the page is in their index. Google indexes pages because other pages link to them - the internet is a web of pages linking to each other - and this page will tell you which pages linked to the one in question, which Google followed to learn about it. This isn't comprehensive - but if you're wondering why a page you didn't expect to show in search results is showing, for example, this can hint at why.

It also tells you the "Canonical" address for the page. It's likely that pages on your site can be accessed at a few different addresses - like your site probably works fine with or without the www before the domain name, or with or without a slash at the end of the address, plus a bunch of more technical examples - and the "Canonical" address is the one of these that Google decides is the main, authoritative version of the page.

So generally with a webpage you want this all to make sense. Like, if your canonical URL shows a domain which you don't recognise as your main one, that needs fixing as soon as possible. Or if a page shows that Google wasn't allowed to crawl or index it, something might have gone wrong.

You can also request indexing from this page if its content has changed and you want Google to quickly fetch and show the newest version. Although I get weird errors with that button pretty often so your mileage may vary.

Alright, next up we've got Performance - this is probably the coolest page in GSC. This shows which search terms your website appeared in the results for, how often it showed, what position it was ranked in, and how many people clicked through to your site. You can view up to the last 16 months of data in here, so it's great for plotting long term trends.

By default this page shows the queries that people searched for. A lot of these are probably what you'd expect - people searching for your business name or variations of it, or searching for the exact service you offer. But you'll probably find that your site shows for things you never expected, like maybe a specific accreditation your site mentions, or a specific about a service you offer.

Being informed about the kinds of queries that your site is already showing up for can be really useful in terms of helping you plan improvements to it. Like, maybe your site doesn't have as much good content on it about a certain service as the potential profits from that service could warrant. Just learning that people are actually searching for that profitable service might encourage you to think about how your site could address that searcher's needs somehow.

The next tab along under performance is Pages, which shows the pages people landed on from search results. You might be surprised at which sections of your site attract visitors - and which don't.

You can also see the countries people came from. If you see that your site is attracting a lot of clicks from a country where you don't do any business, you might want to filter this page to only show visitors from your home country, since those are ones worth optimising your site towards..

Next up is devices. Nowadays it's likely that a substantial amount of your site's visitors will be on mobile devices. And so, your site should work great on mobiles as well as desktops, and you should be sure to check it out on both so you're aware of the experience your visitors are getting.

"Search Appearance" probably won't show anything for your site unless you're a very big company that shows up in Google News posts.

And "Dates" just lets you see how many clicks and impressions you got each day.

Up at the top, we can select to show the average "Click Through Ratio", the amount of visitors who clicked through to your site, and the "Average Position", which shows your ranking. Unless you've filtered down to a specific keyword, these graphs aren't much use, but once you do that I think it can be pretty handy to see how your site's rankings and clickthrough rates have varied, but then you need to be getting quite a lot of clicks for these graphs to be much use.

## Indexing > Pages

Next up is the next most important section, "Indexing". This shows how many pages are and aren't indexed on your site, and you can click through and see examples of each. Hopefully there's no surprises under the indexed pages - unless your site is really massive with hundreds of pages it should be easy enough to scan over that list of pages and make sure they make sense to you - that they're all pages you expect to see on your website.

The "Not Indexed" section can be interesting. There are a few reasons a page might not be indexed and some of these are no big deal while others are worth investigating.

For example, redirects - one page might redirect to another page, like when the www version of your website works just the same as the www-less version, and if that's the case then the source might be shown as a "Page with redirect" as its reason for not being indexed. All fine.

Or, it might be "Not Found", a 404 error page. This isn't neccessarily a bad thing either - it might be a page you've deleted, which is fine to show a not found message for, although you might want to test that message yourself and make sure it's friendly.

Or, a page could be blocked by [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) or by a noindex tag - two technical measures that your web host might use to stop Google from indexing pages which shouldn't show up in the index anyway, like the "Thank You" page for your contact form perhaps, which wouldn't make sense for someone to land on from Google. But if pages you think are important are showing as noindexed or blocked by robots.txt, then something is wrong.

These examples I've talked about will all show "Website" in the "Source" column under the reasons. This means Google interpreted a signal from the website about which pages to show or not. But, there could also be pages in there with "Google systems" as the source, meaning Google's algorithm determined that the page shouldn't be indexed. These might say things like "Crawled - currently not indexed" or "Discovered - currently not indexed".

Google won't give you much more information about why their algorithms decided these pages shouldn't show, but in my experience it's often because their content isn't very good. Like, maybe the page contains hardly any unique content, or maybe it's keyword stuffed and doesn't provide much value to the visitor, and it just looks a bit low quality to Google. If you spot pages that aren't being indexed and the source is "Google systems", it's usually a good indicator that those pages need some love.

## Indexing > Sitemaps

Alright, next up - sitemaps. There's a chance your site has a sitemap, which is a way to tell search engines about all of the pages on your site - it's literally a map of the site. If your site has one, you can add its address here and Google will periodically check it. This can be a good way to speed up the process of new pages being added to the Google index, but it's not the end of the world if you don't have one. If your site does have one, there's a fair chance it lives at your domain name, followed by a slash and then "sitemap.xml" - you can always test that address if you're unsure.

## Indexing > Removals

The removals tool is a spot where you can submit requests to Google for them to remove pages on your site from their index, or to update the snippet in search results if it's showing outdated text. If any of the content on your site has been filtered by Safesearch, Google's adult content filter, it'll show in here too.

## Links

I've skipped a bunch of menus to get down to "Links", because really the stuff under there is either too technical for this post, or not relevant to the majority of small business websites. Maybe in a future post I'll go into those.

But for now, Links. This page tells you a fair bit about the links that are pointing to your website - which sites link to you, which pages they link to, and what text they use. Like everything else on GSC, you should click around in here and make sure nothing surprises you. Like, if you see that a site you don't recognise has links to you, maybe it's worth investigating that a bit. You might be able to improve your listing on the website doing the link, perhaps, if it's somewhere customers can leave reviews or where you can log in to edit a profile.

## Concluding

Alright, hopefully that gives you a pretty good overview of Google Search Console and the reasons why it's worth paying attention to. The last thing I'd ask you to check, is to click the User Settings icon at the top of the page and making sure it says "All emails are enabled" under "Email preferences".

For a few months after you first sign up for Google Search Console they'll send you occasional emails about how your site is performing, and these can contain some pretty interesting statistics and details. But long term, they'll also email you if something needs your attention about your website. Google Search Console is the only way to get notified if your site gets penalised for doing something spammy, for example, or if something changes on your site by mistake and your pages end up not being indexable - this is the only place you'll find out. So keep those notifications turned on, and pay attention to the emails they send!

**If you need help setting up or understanding Google Search Console, fill in the form below.**
