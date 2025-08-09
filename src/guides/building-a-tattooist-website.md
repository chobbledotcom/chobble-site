---
title: Building a website for a tattooist
snippet: A straightforward website with a gallery, an FAQ, and a spam-protected contact form with attachment support.
meta_title: How to Build a Tattoo Artist Website | Free Guide | Chobble
meta_description: Step-by-step guide to building a tattoo website - Eleventy, responsive galleries, contact forms - full source code included - Manchester web developer
---

# How To: Make a Tattooist Website

I made a website at [noktorum.com](https://noktorum.com) for my friend "Noktorum", a tattooist and artist from Liverpool, now working in Berlin.

![Screenshot of Noktorum.com frequently asked questions page](/assets/guides-noktorum-screenshot.webp)

He needed a simple site which shows off his very unique style of tattoos in an easily-edited **gallery**. It includes an **FAQ** which is easy to keep updated, and a custom **contact form** with spam protection and attachment support.

**You can view the full source code for the Noktorum site [here at git.chobble.com](https://git.chobble.com/hosted-by-chobble/noktorum).**

This page explains some of the process that went into building this site, which you can use as inspiration for your own projects. Or, if you want a similar site made for your own tattoo studio, [contact me](/contact/)!

## Base technology

The website is built with **Eleventy** ([11ty.dev](https://www.11ty.dev/)), a static site generator built with NodeJS (JavaScript). I've tried a few generators and have settled on Eleventy for a few reasons:

- **It's fast.** I sometimes work on an old laptop, so every resource I can save is appreciated.
- **It does a lot by default.** You can configure the data behind the site or different collections really easily ([docs](https://www.11ty.dev/docs/data/)).
- **It has some nice plugins.** Being able to make responsively-sized images automatically is very cool.

Once built it's pushed to **Neocities** ([neocities.org](https://neocities.org/)) - a web host that continues the legacy of Geocities and Angelfire and similar static hosts from back in the day. Neocities is cool because it:

- **Has sensible defaults.** It does a bunch of things automatically - handles HTTPS certificates automatically, redirects the `www` version of the domain, redirects `/index.html` pages to "pretty" URLs, shows a `not_found.html` page for 404s, etc.
- **Is very reliable and fast.** I've been monitoring my sites for years and Neocities has had very little downtime, and the pages always respond quickly.
- **Supports open source.** The whole site is open sourced and it has some great developer tools.
- **Is almost 12 years old.** I'm always a little wary of using hosts that have only been around for a short period - is their business sustainable?

## Responsive images

The site uses the `@11ty/eleventy-img` plugin to create optimised versions of each of its images, in different sizes - check out [src/\_layouts/gallery.html](https://git.chobble.com/hosted-by-chobble/noktorum/src/branch/main/src/_layouts/gallery.html) to see how it uses `eleventy:widths` to automatically generate images at 200, 400, 800 and 1600 pixels wide to support various devices - very cool!

## JavaScript-free popups

<video autoplay loop>
  <source
    src="/assets/guides-noktorum-gallery-compressed.webm"
    type="video/webm"
  />
  Opening and closing images in the Noktorum gallery on desktop
</video>

I like to avoid using JavaScript wherever possible, and so I challenged myself to make a "pop up" gallery system in pure HTML and CSS. I managed this after learning about the `popover` system ([link](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover)) which is well supported on modern browsers.

I ran into some frustrating behaviour with my `.popover-container` which is the element that the images rendered inside. Because the image might be smaller than the container, clicking that unused space wouldn't close the popover. I fixed this by setting the `width` and `height` of the container to `fit-content`, which meant I needed to do a `transform: translate:(-50%, -50%)` to re-center it.

That fix probably took up the majority of the time dealing with the gallery - overall, a pretty straightforward way to display popover images with a dimmed background!

## Masonry image gallery layout

I struggled for a bit with the gallery, because I wanted something that would load quickly even with hundreds of images, and which would display them in a "masonry" style layout.

I tried an off-the-shelf Masonry JS library ([link](https://masonry.desandro.com/)) but ran into problems when resizing and lazy-loading images, so ultimately decided to write my own "Masonry-ish" script ([link](https://git.chobble.com/hosted-by-chobble/noktorum/src/branch/main/src/assets/masonry.js)) which worked by calculating the amount of columns the page could fit, then spreading the images across those columns, and letting flexbox's `gap` set the spacing between each column and the items within the column.

My script works _fine_. If you have hundreds of images, and you want them to be lazy-loaded and respond to resizes and have low CPU usage, it's a fine option. The main downside to it is that at the end of the gallery, the images weren't always nice and even, because they were just divided into columns without regard for the pixel height of that column. A pretty minor thing really, but it annoyed me.

Ultimately that shortcoming didn't end up mattering anyway - Noktorum picked 16 photos to represent their work, and they all had the same dimensions! So it looks super smart now, and scales nicely for tablets and phones.

## Contact Form

I'm a fan of **Formspark** ([formspark.io](https://formspark.io)) and used them for the contact form on this site ([source code](https://git.chobble.com/hosted-by-chobble/noktorum/src/branch/main/src/_includes/contact-form.html)). Formspark let you create custom contact forms which direct to a given email address - which is often the only bit of "dynamic" functionality needed on a website. Their pricing is great, too - you just buy the credits you need and they're used when people hit the forms - no monthly charges.

The form fields are pretty straightforward - name, age, email, tattoo placement, photo references, and a tattoo description. After contacting, you're bounced to a "Thank you" page.

The form is spam protected using **Botpoison** ([botpoison.com](https://botpoison.com/)), and supports image attachments for the references thanks to **Uploadcare** ([uploadcare.com](https://uploadcare.com/)) - both excellent services with similarly fair pricing. Adding both of these to the contact form was trivial - but make sure you test your changes, because Botpoison don't tell you about bots they've blocked so you need to be totally confident that you're not blocking legitimate users.

## Editing the site

My template uses **Markdown** files for page content, which is really easy to edit - probably easier than learning the interface for Wix or Wordpress, honestly. I gave Noktorum a login to my Git forge, and he edits the files directly through the Forgejo web interface. Because the edits are done through Git it's very easy for me to monitor changes.

The gallery is populated by uploading images to the `src/images` folder, and then displayed in reverse sorted order so newer photos will appear at the top. One downside to this approach is that the images don't have any metadata, so are missing `alt` tags. A more thorough approach could be to create a data file alongside each image, containing its alt text.

## Pushing to Neocities

Now that you've got your new tattoo website built on your computer, it's time to push the files out to Neocities. You _could_ just copy and paste the HTML files to the editor on the Neocities site, but I prefer to automate this process using the Neocities CLI (Command Line Interface) ([link](https://neocities.org/cli)).

Because I love NixOS, I automated this process using my "NixOS Site Builder" flake ([source code](https://git.chobble.com/chobble/nixos-site-builder)). Every five minutes-ish, this script clones the site from Git, checks for changes, and if there are any it builds the site using Nix into `/var/www/example.com`, then uploads the site to Neocities. The key lines which handle the upload are in `lib/mkSiteBuilder.nix` in that repository, where we do:

```
export NEOCITIES_API_KEY=<key>
neocities push --prune <site_directory>
```

You'll want to adjust this for your preferred build tool, unless you also want to use my NixOS setup, which would be awesome (please let me know if you do!).

## Can you do this for me?

**If you've read this guide and want me to build a website for you using this process, please [contact me](/contact/).** My [prices are very transparent](/prices/) and artists get a 50% discount. You will have full control over the site I build for you and can host wherever you like - or you can pay me to host and get free access to my [marketing guides](/guides/) and [videos](/videos/) to help promote your new site!
