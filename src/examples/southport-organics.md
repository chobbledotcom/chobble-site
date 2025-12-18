---
title: Southport Organics
meta_title: Southport Organics | E-commerce Website | Chobble
meta_description: Organic cosmetics site with PagesCMS editing - Eleventy build, Bunny CDN hosting - avoid Etsy fees with direct sales - e-commerce example
snippet: A 'Chobble Template' CMS website for an organic cosmetics company
order: 4
colour: "#111"
---

# Southport Organics

- **Client:** Southport Organics
- **Services:** Website migration, hosting, and SEO advice
- **Website:** [SouthportOrganics.co.uk](https://www.southportorganics.co.uk)
- **Source code:** [on git.chobble.com](https://git.chobble.com/hosted-by-chobble/southport-organics)

My friend Jem runs a cosmetics company in Southport, creating vegan and organic cosmetics and gift sets. She has a successful Etsy shop but would like to avoid their transaction fees by selling directly to her customers.

![Southport Organics website - a dark and simple theme with large graphics](/assets/examples/southport-organics.png)

This job felt like a great fit for the [Chobble Template](/services/chobble-template/) - an Eleventy template for small business websites with loads of features already built in. By combining that template with [PagesCMS](https://pagescms.org/), all of the site's content can be edited through a friendly web interface.

![Pages CMS - a CMS system for static websites hosted in Github](/assets/examples/southport-organics-cms.png)

Jem can add, edit and remove products, categories, pages, reviews, and photos through the Pages CMS system. Each time she saves, a [Github action](https://github.com/chobble-mirror/southport-organics/actions) builds the site by combining its code with the Chobble Template and running the Eleventy build scripts, then pushing the code out to a Bunny.net CDN via a "Storage Zone" which is connected to the company's domain name.

This results in a site which is rock solid and blazing fast because it's hosted on a CDN with global replication. The code is all open source and easily edited, and it makes good use of Github's free tools for continuous integration.

I also set up an open source "Ghost CMS" newsletter for the shop, very similar to the setup I created for [Crumpsall Folk Club](/examples/crumpsall-folk-club/). Jem can use this to keep her customers up to date on her latest offers, and posts are mirrored to her site via [another Github action](https://github.com/chobble-mirror/southport-organics/actions/workflows/ghost-import.yml) which uses a tweaked version of Eleventy's "Import" plugin, adapted for Ghost newsletters.

## Can you make e-commerce sites?

Right now the Southport Organics website links through to Etsy for sales, but I have written a Stripe module for it which will allow for direct sales via the website for products which do not require accurate stock levels.

**If you want an e-commerce site we can use Stripe to let you sell directly to your customers without involving marketplaces like Etsy or Ebay.**

drop me a message through the contact form on this page to get the ball rolling on your new ecommerce site!
