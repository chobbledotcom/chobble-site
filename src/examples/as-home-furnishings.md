---
title: A&S Home Furnishings
meta_title: A&S Home Furnishings | Website Migration | Chobble
meta_description: Migrated expensive CMS to fast Eleventy static site - wget backup, pandoc conversion - affordable hosting - website migration example
snippet: An expensive CMS site to an affordable static one
order: 10
colour: "#ebe3d8"
---

# Dynamic to Static Website Conversion

- **Client:** A&S Home Furnishings
- **Services:** Website migration and hosting
- **Website:** [ASHomeFurnishings.co.uk](https://ashomefurnishings.co.uk)
- **Source code:** [on git.chobble.com](https://git.chobble.com/hosted-by-chobble/as-home-furnishings)

My brother [Kevin](https://kevinburkeservices.com) had worked with Andy and Sally at A&S Home Furnishings, a furniture sales / home removals / clearances company in Barton-upon-Humber, and when he heard they were having website issues he put them in touch with me.

![A&S Home Furnings website - a simple, mostly text website with clear links to learn about the home clearance services they offer](/assets/examples/as-home-furnishings.png)

The were paying for quite expensive hosting for their CMS website, even though its content very rarely changed and the contact form didn't load properly. I proposed migrating their website to an Eleventy static site, which I would host on Neocities for them at [a low monthly cost](/prices/), with my brother handling support.

## The Migration Process

**Backing up the existing site:** I used the venerable `wget` to download a full archive of the existing site, with links fixed and all assets included, using a command like the one described on [this page](https://dheinemann.com/archiving-a-website-with-wget/) which gives a great explanation of what these options mean:

`wget -mpckE --user-agent="" -e robots=off --wait 1 example.com`

After this you'll end up with a folder called `example.com`, containing all the HTML pages `wget` could discover, converted to work on your home computer.

**Converting the HTML files to Markdown:** Eleventy, my preferred static site generator, can use Markdown files as its input - a really easy to edit format. I used `pandoc` to convert the HTML files from the last step to Markdown files, with:

`pandoc -s -r html input.html -o output.md`

This resulted in Markdown files that were _mostly_ good but needed a bit of tidying up, and the Eleventy "front-matter" added. A&S didn't have many pages though, so it didn't take too long, and I used [Claude Code](https://github.com/anthropics/claude-code) to automate much of this process.

**Creating an Eleventy site:** I used files from the [Chobble Template](/services/chobble-template/) to install Eleventy alongside some bonus neat functionality, like a [Formspark contact form](https://git.chobble.com/hosted-by-chobble/as-home-furnishings/src/branch/main/src/_includes/contact-form.html), a [sitemap](https://git.chobble.com/hosted-by-chobble/as-home-furnishings/src/branch/main/src/sitemap.njk), [responsive images](https://git.chobble.com/hosted-by-chobble/as-home-furnishings/src/branch/main/.eleventy.js), and as a [Nix development environment](https://git.chobble.com/hosted-by-chobble/as-home-furnishings/src/branch/main/flake.nix).

**Converting the design to Liquid:** Rather than copying the existing A&S design exactly, I re-implemented it in fresh CSS. This was pretty easy, because the pages were straightforward, and using Flexbox and modern CSS features meant the resulting stylesheet and template was pretty minimal.

**Fixing the bugs:** I could then run `serve` to start an Eleventy development server with live-reloading, and I used this to iron out the bugs on the pages - mostly quirks to do with image paths and the dropdown menu for services.

**Host on Neocities:** My Forgejo server [automatically builds](https://git.chobble.com/hosted-by-chobble/as-home-furnishings/src/branch/main/.forgejo/workflows/neocities.yaml) the site whenever I commit a change to the source code. It builds the site with Nix, and then uses an action to push the completed site to Neocities.

**DNS switching:** I helped Andy get set up with a Krystal account, and the I helped migrate his domain into it. Combining this with the open souce website I made means A&S now have full control over their web presence, now and forever.

## The Results

The new site is super fast, very reliable, and its hosting is cheap at just £10 per month. It can be edited through the Forgejo web interface by changing simple text files, although A&S handle all maintenance of the site through Kevin, which means they don't have to learn anything technical.

**If you're currently paying a high hosting cost price for a website that's not working for you then [get in touch with me to arrange a migration](/contact/). It's your website - you should own it.**
