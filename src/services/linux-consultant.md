---
title: Linux Consultancy
meta_title: Linux Consultant | Manchester | Server Admin, NixOS, Web Hosting | Chobble
description: Expert Linux consulting services in Manchester - server migrations, NixOS installations, web hosting, system administration, and advanced Linux support.
snippet: Expert Linux consulting and system administration
order: 14
meta_description: Expert Linux consultant in Manchester offering server management, web hosting, infrastructure deployment, security, backups & automation. £200/hr (50% off for charities). Remote support available worldwide.
---

# Linux consultant in Manchester

I've been using Linux as my personal operating system and for my own servers for years. I run Forgejo (a self-hosted git platform, similar to GitHub but on my own hardware) on my own server, have been running Nextcloud in various forms for nearly 15 years, and keep my bug tracker, CRM, and uptime monitoring on PikaPods. If you need a Linux consultant in Greater Manchester, or remote help from anywhere, I can help you set up servers, manage infrastructure, self-host your own tools, and sort out backups and security.

If you're in Prestwich or Manchester, I can come to you or you can drop hardware off with me. For anything that can be done over SSH, remote support is available anywhere in the world.

## NixOS: declarative Linux

A Linux server managed the usual way accumulates changes over time - a config file edited here, a package installed there, something tweaked at 11pm when something broke - until the system is in a state that's hard to reproduce or explain from first principles. NixOS takes a different approach: the entire system configuration lives in a text file. You run `nixos-rebuild switch`, and NixOS builds exactly the system that file describes. If an update breaks something, you roll back with a single command. If you need to spin up an identical server somewhere else, you copy the file.

That makes it genuinely useful for anything long-term. The config can sit in version control, so there's a full history of what changed and when. Configuration drift - where what the server actually does and what you think it's doing slowly stop matching - doesn't happen, because the config is the system.

It's not always the right choice. Ubuntu is still easier when you need something working quickly and won't be doing much ongoing maintenance. But for servers that matter over time, or for anyone running more than one machine with similar requirements, the declarative approach is worth getting used to.

## What I can help with

**Web application and static site hosting.** I can deploy web applications on servers you control - including Rails apps, Eleventy static sites, and similar setups - with SSL, reverse proxies, domain configuration, and monitoring. If you're overpaying for managed hosting and your site doesn't actually need everything that platform provides, moving to a simple VPS on Hetzner or similar usually costs a fraction of the price.

**Self-hosting open source tools.** I've set up Nextcloud for organisations that needed private, affordable file storage instead of Google Drive, and I host Ghost newsletter platforms for [Crumpsall Folk Club](/examples/crumpsall-folk-club/) and [Southport Organics](/examples/southport-organics/) via PikaPods. For less complex requirements, [PikaPods](/services/pikapods-help/) is often the right starting point - they handle the server infrastructure, you pick the apps, and I help you get everything configured. For setups where you want full control of the server, I can manage that too.

**Private networking and remote access.** I can set up secure remote access for your team using Tailscale, so staff can reach internal tools from anywhere without exposing them to the public internet. It doesn't need any special hardware and works on pretty much every platform.

**Backups.** On-site backups, off-site backups, S3 with mandatory retention policies - I can put a strategy together that fits your situation and verify it actually works end-to-end, which means testing restores and not just checking the backup ran.

**Troubleshooting and recovery.** If your Linux server is slow, flaky, eating resources, or outright broken, I can diagnose and fix it, including recovery after serious failures.

**Reproducible development environments.** If your team spends time debugging setup differences between machines, or you've got a long README of things to install before anyone can run the thing, I can help you build a reproducible dev environment using Nix or Docker that works consistently across the team.

**Deployment pipelines.** I can set up CI/CD pipelines that run tests, build the application, and push to production automatically.

**Hardware and open source alternatives.** There's usually a good open source alternative to expensive proprietary server software - whether you're looking at networking, monitoring, storage, or something more specific. I'm happy to help you find it and get it set up.

## Pricing

The flat rate is **£200 per hour**, or **£100 for charities, co-operatives, artists, and sustainable businesses** - the same discount as my [charity web development](/services/charity-web-development/) services. Initial discussions are free.

For context: a Nextcloud installation on a Hetzner VPS with a custom domain typically takes around two hours. Anything more involved and I'll give you an estimate before we start.

## Related services

If you're looking to switch your Windows PC or laptop to Linux, that's covered by [Linux conversions](/services/linux-conversions/). [De-Googling](/services/de-googling/) covers the broader picture of replacing Big Tech services with open source alternatives. For smart home and IoT work that runs on Linux infrastructure, see [Home Assistant](/services/home-assistant-technician/) and [microcontroller programming](/services/microcontroller-programming/).

**Whatever your Linux consulting needs, wherever you are - use the contact form below to get in touch.**
