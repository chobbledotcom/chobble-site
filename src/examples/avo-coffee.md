---
title: Avo Coffee
snippet: A straightforward website for a friendly cafe in Haslingden
order: 2
colour: "#fcf8d7"
---

# Avo Coffee

- **Client:** Avo Coffee Cafe
- **Services:** Website hosting and SEO advice
- **Website:** [AvoCoffee.co.uk](https://avocoffee.co.uk)
- **Source code:** [on git.chobble.com](https://git.chobble.com/hosted-by-chobble/avo-coffee)

Avo Coffee is a vegan- and Halal-friendly cafe in Haslingden, Rossendale. I built their website using the [Chobble Template](https://git.chobble.com/chobble/chobble-template/) which meant a lot of the technical groundwork was already done so I could focus on the simple and friendly design.

![Avo Coffee homepage, showing "Home", "Menu", "About", "Reviews", "News", and "Contact" pages, along with a a photo of the cafe and a welcoming introduction paragraph](/assets/examples/avo-coffee.png)

## My Solution

As I have hosted the [This & That website](/examples/this-and-that/) for many years I know that visitors need to quickly find the menu and contact details, so I put the address at the very top of the Avo Coffee site and made the menu really easy to read - no PDF downloads or other awkward navigation.

The site is really easily edited - the content is written in plain text, and I'm available for any questions the cafe has about editing their pages. Like all of my "Website & Support" customers, the cafe also gets access to my [Patreon group for online marketing advice](/services/patreon/) for plenty of ideas about how to attract more website visitors.

## Technical Details

The site is a [static website](/services/static-websites/) built on the [Chobble Template](/services/chobble-template/). This system uses some snazzy technology to create a very stable, ultra-secure, and fast-loading website, but the cafe don't need to know about any of that nerdy stuff - they just edit text simple files and the website is updated automatically.

But if you want the real technical specs, here they are:

- It's an **Eleventy** site - a static website generator using Node JS, that's really fast and easily extended.
- It uses a few Eleventy plugins, for things like **responsive images** and **snippet rendering**.
- It uses **Formspark** and **Botpoison** for a spam-protected contact form that sends an email to the business.
- It is built with **Forgejo Actions** which means every time a page or image is updated, the whole site is built fresh (which takes about 30s). If there's an error during build the site stays at the working version.
- The site is edited through the **Forgejo web interface** - I wrote a README file to guide the business around the pages they need to edit.
- The actions use a **Nix Flake** to build the site. This means the "environment" is the same every time, so system upgrades can't accidentally break anything.
- The site uses **minimal CSS** via SCSS with no complicated frameworks.
- The only JavaScript is on the contact form (for spam protection) and **Turbo** used for instant page loads - contact form aside, the site works fine without JS.

You can view all of this yourself by [clicking here to view the site's source code](https://git.chobble.com/hosted-by-chobble/avo-coffee).

This all adds up to a site which should remain "buildable" for many years without needing any maintenance or costly servers. It can be easily hosted on any server, so the cafe can switch host or pay any developer to work on the site.

## Support Model

Most restaurant or cafe websites don't need many updates - just occasional menu changes, review additions, or news posts. Avo Coffee can handle these themselves by editing really straightforward text files ([here's an example](https://git.chobble.com/hosted-by-chobble/avo-coffee/raw/branch/main/src/pages/about.md)). They pay for support so if they ever get stuck, they can get in touch with me and I'll happily advise.

## Open Source

The Avo Coffee site is built on my [Chobble Template](https://git.chobble.com/chobble/chobble-template/), my free and open source template for small business websites. It's AGPL3-licensed which means you can use it for any purpose as long as you also open source your additions. This model adds to the collective knowledge of the planet, and helps businesses and individuals take ownership of the tech they use every day.
