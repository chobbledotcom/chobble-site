---
title: Ruby on Rails Development
meta_title: Ruby on Rails Freelancer Manchester | Wep Applications | Chobble
description: Rails applications with comprehensive test suites, type checking, and automated deployments that actually work
snippet: Web applications that scale from 10 to 100,000 users
order: 0
meta_description: Ruby on Rails freelancer in Manchester - I build enterprise-scale applications with 90%+ test coverage - 5 years at Bandcamp ($200m/year), 10 years at BCN - £200/hour
---

# Ruby on Rails Freelancer

**fill in the form below if you need a freelance Ruby on Rails developer in Manchester (or anywhere, really)**

Rails development is part of my broader [software development services](/services/software-developer/) - check that page if you're not sure whether Rails is the right fit for your project.

I've been writing web applications since 2007 - 10 years as the technical lead on the [Bouncy Castle Network](https://www.bouncycastlenetwork.com) booking system / CRM, growing from a startup to 1,200 customers, followed by five years at [Bandcamp.com](https://bandcamp.com) working on their Ruby music store that processes over $200m every year.

I'm now a freelance Rails developer - check out [Play-Test](/examples/play-test/#content) for an example of a current project.

## Why Employ Me?

I've been writing code for _ages_, for companies of all sizes. This means that whether you're a big organisation with loads of processes in place already or you're smaller and haven't really considered these things, I can advise a solution that suits your current scale and future plans.

I'm not afraid of gnarly or legacy codebases, server moves, or whatever else you might need - I've dealt with pretty much everything web-appy over my 20 years.

And on the other end of the spectrum, I can help you get started from absolute scratch - setting up your infrastructure and services, planning your databases, whatever is needed.

## Pricing and Support

Rails applications are more complex than static websites, but my pricing isn't - it's my standard [flat hourly rate](/prices/) of **£200 per hour (£100 for charities, artists, vegan businesses, and renewable energy companies)**.

You'll know exactly what you're paying for, with detailed breakdowns of time spent on different features.

For hosting, I can set up your application on anything from a £5/month VPS for smaller projects to multi-server deployments for enterprise scale. My standard setup uses [NixOS](https://nixos.org/) for reproducible deployments. On top of server costs, I charge **£60 per month** (£30 if you qualify for the discount) for maintenance and support. This includes uptime monitoring, quick changes, and help when things go wrong.

## Open Source

I write open source code, building on the work that clever and generous nerds have done before me. The beauty of open source development is that you're never locked in. If you want to host the application yourself, you can - you own the complete source code and deployment configuration. If you want to hire another developer to add features, they can - tests means they won't accidentally break your checkout while adding a new report. If you want to fork the project and take it in a completely different direction, go for it - it's yours.

**The rest of this page gets really into the technical nitty-gritty of how I build dynamic web applications. I've written jargon-free explanations above each nerdy paragraph - if you're not technically minded, you might want to just read those bits.**

## How I Build Rails Applications

_**Jargon-free summary:** I use automated tests that catch mistakes before they reach your customers._

Every Rails application I build comes with tools that catch bugs before deployment, prevent security breaches, and stop your site slowing down as it grows. When you look at the `play-test` codebase, you'll find comprehensive [RSpec](https://rspec.info/) tests covering over 90% of the codebase - every bit of business logic has a test. These aren't just unit tests either - there are feature tests using [Capybara](https://github.com/teamcapybara/capybara) that simulate real user interactions, controller tests, model tests, service tests, even tests for the helper methods and PDF generation. The tests run in parallel using [parallel_tests](https://github.com/grosser/parallel_tests) to save time, and they generate coverage reports with [SimpleCov](https://github.com/simplecov-ruby/simplecov) that get published automatically so you can see exactly what's tested and what isn't.

_**Jargon-free summary:** Beyond testing, automated tools check for security holes, catch typos, and spot code that would make your site run slowly._

I use [Sorbet](https://sorbet.org/) for gradual type checking - this means the code gets checked for type errors before it even runs, catching whole classes of bugs that would normally only show up in production. [StandardRB](https://github.com/standardrb/standard) and [rubocop-rails-omakase](https://github.com/rails/rubocop-rails-omakase) handle code formatting and linting, making sure every file follows the same formatting rules so any developer can jump in and understand it. [Brakeman](https://brakemanscanner.org/) scans for security vulnerabilities. [ERB lint](https://github.com/Shopify/erb-lint) checks the templates. [Prosopite](https://github.com/charkost/prosopite) detects N+1 query problems that could slow down the application.

_**Jargon-free summary:** Every time I make changes, automated systems check everything is working properly before the changes go live - no human errors._

All of this runs automatically through [GitHub Actions](https://github.com/features/actions) whenever code is pushed. The test suite is split across multiple parallel jobs - controllers, features, models, requests, services, helpers, lib, seeds, and views all run separately for speed's sake. Only when every single test passes, every linter is happy, and the security scan is clean does the code get deployed. And deployment itself is automated through [Docker](https://www.docker.com/) - the application gets packaged with everything it needs to run, so it works the same on your laptop, test server, or live site.

_**Jargon-free summary:** The application is packaged in a way that makes it run the same everywhere, handles scheduled tasks, and tracks any errors that occur._

The Docker setup uses a multi-stage build to keep download sizes small, includes [supercronic](https://github.com/aptible/supercronic) for scheduled tasks like nightly backups, and runs as a non-root user. The application uses [Solid Queue](https://github.com/rails/solid_queue) for background job processing, has built-in S3-compatible storage support for file uploads, and includes error tracking with [Sentry](https://github.com/getsentry/sentry-ruby) (or the open-source [BugSink](https://github.com/bugsink/bugsink) alternative).

## Why Open Source Development Works

_**Jargon-free summary:** I build open source systems that multiple organisations can use, which means the code gets battle-tested in real production environments._

The play-test system shows how open source development benefits everyone. Professional inspectors are using it for their compliance work, which means it has to handle real-world requirements - complex calculations, legal compliance, PDF generation that actually works on tablets in the field. When one organisation needs a feature (like QR codes for equipment tracking), others benefit too. When someone finds an edge case, the fix helps everyone.

Developing software in the open also means everything is transparent - you can see the code, the test coverage reports, check if deployments are working. More importantly, it means the code has to be good enough that I'm comfortable with anyone reading it. No hiding sloppy work behind closed repositories. The AGPLv3 license ensures that improvements come back to the community, and I can reuse battle-tested components across projects without licensing headaches, which saves you time and money.

## What This Means For You

_**Jargon-free summary:** Your application gets all these safety nets from day one, you own the code outright, and I'll reuse components I've already built so you don't pay for the same work twice._

When I build a Rails application for your organisation, you get all of this infrastructure and tooling as standard. Your application will have comprehensive test coverage from day one - not added as an afterthought when things start breaking. It'll have type checking to catch errors before they happen. It'll have security scanning to identify vulnerabilities. It'll have automated deployments so updates go live in seconds (after passing all tests, naturally).

I've worked both as a solo developer and leading teams - I mentored junior developers at Bouncy Castle Network for years. If you need someone to augment your existing team, review your codebase, or help establish better development practices, I can do that too. I bring the engineering standards from Bandcamp (where every change gets reviewed) with the flexibility of a freelancer.

The code will be open source by default under an AGPLv3 license, published on GitHub where you can see every change, every test result, every deployment. You'll own it completely - take it to another developer, modify it yourself, learn from it. The AGPLv3 means if someone uses your code to run a web service, they have to share their improvements back to the community. Your investment in open source helps everyone.

I use a modular approach to save you money. Common patterns get extracted into reusable components - for example, my [chobble-forms](https://github.com/chobbledotcom/chobble-forms) gem that makes building accessible, semantic HTML forms incredibly fast and reliable. It literally won't let me hardcode text (everything must go through translation files), catches typos before runtime, and automatically checks that form fields match your database columns. Authentication systems, PDF generation, QR codes, image processing - all these common requirements get packaged into battle-tested modules. This means your project benefits from all the work I've done before - you're not paying for me to solve the same problems again.

The internationalisation support deserves a special mention - every single user-facing string uses `I18n`, with no hard-coded text anywhere. This might seem like overkill for an English-only application, but it enforces good separation of concerns and makes the application much easier to maintain. Plus, if you ever need to support Welsh, French, or Esperanto, the infrastructure is already there waiting.

## Development Process

_**Jargon-free summary:** You can watch progress in real-time, changes won't break what's already working, and updates go live in minutes not days._

The development process happens in the open - you can see every commit, every test result, every deployment. We'll start by understanding what your application needs to do - not just the features, but the business logic, the edge cases, the future possibilities. I'll create a development environment where you can see progress as it happens, not just at milestone deliveries.

As I build, I write tests alongside the code - every new feature gets tests that verify it works correctly. The tests document the expected behaviour, so the next developer (maybe you) can understand what's happening. When requirements change (and they always do), the tests ensure we don't break the login form while adding a new report.

Code reviews happen automatically - the pipeline runs 10+ different checks on every change, catching issues a human reviewer might miss. Once code passes all checks, it deploys automatically. No waiting for Friday afternoon deployment windows, no forgetting to run migrations.

## Infrastructure That Actually Works

_**Jargon-free summary:** Your code and data are backed up in multiple places, you get 10GB of storage included, and everything runs on servers powered by renewable energy._

I don't take chances with bottom-tier infrastructure. Your source code lives on GitHub where you can see every change, and is backed up to my own Git server in case GitHub has a bad day. Docker images are stored in three places - DockerHub, my server, and GitHub's registry - so deployment never fails because one service is down.

Your database gets backed up to [Hetzner](https://www.hetzner.com/)'s S3-compatible storage every single day. Hetzner stores everything in the EU (German data protection laws), and I've been using them for years without issue. These backups are kept for 60 days - if you accidentally delete all your customers on a Friday, we can restore Wednesday's data on Monday. Your uploaded files (images, PDFs, whatever) go to the same place.

You get 10GB of storage included in the monthly price. If you need more, we'll work out a fair price based on what you actually use. If you're paranoid about data loss, I can mirror everything to another geographic location for a bit extra.

My main server runs on [Gandi](https://www.gandi.net/) who use 100% renewable energy, but I can host your application wherever you prefer - AWS, Azure, Google Cloud, your own data centres, wherever your compliance requirements dictate. The entire server configuration is managed with NixOS, which means I can show you exactly how everything is set up, and you can reproduce the entire server setup yourself if needed.

## Let's build something!

**If you need a Rails application built by someone who's actually done this before, at scale - fill in the form below.** If you're local to Prestwich or Manchester, I'm happy to meet for a coffee and to chat through what you need.

Whether you're a startup that needs to build for growth from day one, a charity with a limited budget, an enterprise that needs systems that actually work, or a professional body that needs industry-wide infrastructure, you'll get the same approach: comprehensive tests, proper infrastructure, and code that scales.
