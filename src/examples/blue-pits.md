---
layout: example.html
title: Blue Pits Housing Action
snippet: Website hosting and tech support for a social housing provider
tags: client
order: 2
---

# Blue Pits Housing Action

- **Client:** Blue Pits Housing Action (Registered Charity)
- **Services:** Website hosting and technical consultation
- **Website:** [bluepitshousingaction.co.uk](https://bluepitshousingaction.co.uk)
- **Source code:** [on git.chobble.com](https://git.chobble.com/hosted-by-chobble/blue-pits)

Blue Pits is a CQC-registered personal care provider and provider of social housing, based in Rochdale, Middleton and Heywood since 2011.

<iframe src="https://bluepitshousingaction.co.uk"></iframe>

I host their website and provide tech support and advice whenever they need it.

## My Solution

I've set up a streamlined process where Blue Pits send me their site updates via email. I reformat the content and publish it on their website. I recently added a custom complaint form using FormSpark with BotPoison spam protection, making it easier for their clients to get in touch.

Beyond just hosting, I advise them on their tech choices and have helped them understand their privacy obligations under GDPR. The setup is simple but effective - they handle the housing, I handle the website.

## Technical Details

The site is a [static "Jekyll" website](/services/static-websites/) that works great on mobile and meets WCAG2 accessibility guidelines. It includes integration with Facebook and CQC widgets for social proof. 

The domain is hosted with Web Architects Co-op, an ethical cooperative provider. The site itself runs on a Gandi machine powered by green energy, with the build handled by a Forgejo action on NixOS. For redundancy, I back everything up via Git to both GitHub and my own Forgejo setup.

## Support Model

Blue Pits just emails me when they need changes, and I sort them out quickly. No complicated CMS logins to remember or technical knowledge needed on their end. I also provide advice on tech-related questions that come up in their operations.

The site only needs a few content updates each year, so this simple approach works perfectly for them. If they ever have questions about website privacy, security, or other tech issues, I'm there to help explain things in plain language.

## Open Source

As with all my projects, the complete source code [is available](https://git.chobble.com/hosted-by-chobble/blue-pits) under the AGPL license, helping other charities and developers learn from my work.
