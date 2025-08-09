---
title: Ruby on Rails Web Applications
meta_title: Ruby on Rails Developer Manchester | Rails Freelancer | Chobble
description: Rails applications with comprehensive test suites, type checking, and automated deployments that actually work
snippet: Web applications that won't fall over when you get busy
order: 2
meta_description: Ruby on Rails developer Manchester - I build web applications with 90%+ test coverage - 5 years at Bandcamp, 10 years at BCN - Rails freelancer £200/hour
---

# Ruby on Rails Web Applications

**I'm a Ruby on Rails developer based in Prestwich, Manchester.** I've been building web applications since 2007 - I spent 10 years as technical lead at Bouncy Castle Network, growing their platform from 1 customer to 1,200 (handling 6,700 bookings daily), then 5 years at Bandcamp working on Ruby systems that process about $200 million annually. Now I build Rails applications for Manchester businesses that won't fall over when you get busy, can be modified without breaking everything else, and handle 10 users or 10,000 without a rewrite.

## Why Work With a Freelance Rails Developer?

I've worked both in-house and freelance since 2012. You get someone who knows how big companies do things (proper testing, deployment pipelines, code reviews) but without the agency overhead. Just me, in Prestwich, charging by the hour. No account managers, no juniors doing the actual work, no surprise bills. When you email me, you get me. When there's a problem, I fix it. 

The way I approach Rails development comes from years of experience at scale. At Bandcamp I worked on performance - making pages load faster, fixing database queries that were taking too long, optimising code that millions of musicians depend on. I write tests for all the business logic aiming for 90%+ coverage, use type checking that spots typos before the code even runs, and run automatic security scans on every change. This isn't about being precious about code - it's about building systems you can change on a Tuesday without ruining everyone's Wednesday.

## Real Rails Applications I've Built

I've built several Rails applications that demonstrate this approach. Take [play-test](/examples/play-test) - it's a system for managing safety inspections of inflatable play equipment that handles equipment records, seven different types of assessment forms, photo management, PDF generation with QR codes, and complex safety calculations. Or [patlog](/videos/patlog-pat-testing) - a free tool for electricians to log portable appliance tests with professional certificates and QR codes. Both handle thousands of users without crashing, generate PDFs without memory leaks, and you can see exactly how they work because they're open source. The booking system I built for Bouncy Castle Network in 2009 still processes thousands of bookings daily - I build things to last.

## Common Rails Problems I Solve

**If your Rails application is getting slow, breaking when you deploy, or stuck on an old version,** I can help. I've dealt with all the common Rails headaches - applications stuck on Rails 4 that need upgrading, N+1 queries that make pages take 30 seconds to load, memory leaks that crash your server every few hours, test suites that take an hour to run (or don't exist at all). I've migrated systems from PHP and Classic ASP to Rails. At Metro Salvage, the system I built generated £200k in new revenue their first year - sometimes fixing these problems properly makes a real difference to your business.

## Pricing and Support

Rails applications are more complex than static websites, but the pricing model remains simple - it's my standard [flat hourly rate](/prices/) of £200 per hour (£100 for charities, artists, vegan businesses, and renewable energy companies). You'll know exactly what you're paying for, with detailed breakdowns of time spent on different features.

For hosting, Rails applications need a proper server rather than static hosting. I'll set up your application on an affordable VPS running [NixOS](https://nixos.org/), with costs starting around £5 per month for the server itself. On top of that, I charge £60 per month (£30 if you qualify for the discount) for maintenance and support. This includes uptime monitoring, daily database backups emailed to you, quick text changes, and help when things go wrong. I'm still supporting clients I started working with in 2013 - proper support too, not just 'monitoring'. When something breaks on a Saturday afternoon (it happens), you can actually reach me.

The beauty of open source development is that you're never locked in. If you want to host the application yourself, you can - you have the complete source code and deployment configuration. If you want to hire another developer to add features, you can - the comprehensive test suite means they won't accidentally break your checkout while adding a new report. If you want to fork the project and take it in a completely different direction, you can.

**The rest of this page gets really into the technical nitty-gritty of how I build dynamic web applications. I've written jargon-free explanations above each nerdy paragraph - if you're not technically minded, you might want to just read those bits.**

## How I Build Rails Applications

**Jargon-free summary:** I use automated tests that catch mistakes before they reach your customers.

Every Rails application I build comes with tools that catch bugs before deployment, prevent security breaches, and stop your site slowing down as it grows. When you look at the play-test codebase, you'll find comprehensive [RSpec](https://rspec.info/) tests covering over 90% of the codebase - every bit of business logic has a test. These aren't just unit tests either - there are feature tests using [Capybara](https://github.com/teamcapybara/capybara) that simulate real user interactions, controller tests, model tests, service tests, even tests for the helper methods and PDF generation. The tests run in parallel using [parallel_tests](https://github.com/grosser/parallel_tests) to save time, and they generate coverage reports with [SimpleCov](https://github.com/simplecov-ruby/simplecov) that get published automatically so you can see exactly what's tested and what isn't.

**Jargon-free summary:** Beyond testing, automated tools check for security holes, catch typos, and spot code that would make your site run slowly.

But testing is just the start. I use [Sorbet](https://sorbet.org/) for gradual type checking - this means the code gets checked for type errors before it even runs, catching whole classes of bugs that would normally only show up in production. [StandardRB](https://github.com/standardrb/standard) and [rubocop-rails-omakase](https://github.com/rails/rubocop-rails-omakase) handle code formatting and linting, making sure every file follows the same formatting rules so any developer can jump in and understand it. [Brakeman](https://brakemanscanner.org/) scans for security vulnerabilities. [ERB lint](https://github.com/Shopify/erb-lint) checks the templates. [Prosopite](https://github.com/charkost/prosopite) detects N+1 query problems that could slow down the application.

**Jargon-free summary:** Every time I make changes, automated systems check everything is working correctly before the changes go live - no human errors.

All of this runs automatically through [GitHub Actions](https://github.com/features/actions) whenever code is pushed. The test suite is split across multiple parallel jobs - controllers, features, models, requests, services, helpers, lib, seeds, and views all run separately to maximise speed. Only when every single test passes, every linter is happy, and the security scan is clean does the code get deployed. And deployment itself is automated through [Docker](https://www.docker.com/) - the application gets packaged with everything it needs to run, so it works the same on your laptop, test server, or live site.

**Jargon-free summary:** The application is packaged in a way that makes it run the same everywhere, handles scheduled tasks, and tracks any errors that occur.

The Docker setup uses a multi-stage build to keep download sizes small, includes [supercronic](https://github.com/aptible/supercronic) for scheduled tasks like nightly backups, and runs as a non-root user so hackers can't take over your server. The application uses [Solid Queue](https://github.com/rails/solid_queue) for background job processing, has built-in S3-compatible storage support for file uploads, and includes error tracking with [Sentry](https://github.com/getsentry/sentry-ruby) (or the open-source [BugSink](https://github.com/bugsink/bugsink) alternative).

## A Real World Example

**Jargon-free summary:** A professional body is funding development of an open-source system, which means they're not locked into using me, and I can build in lots of safeguards without raising the price.

The development of play-test is now being supported by the Register of Play Inspectors International (RPII), which creates an interesting dynamic that benefits everyone. Because the system is open source, they're not locked into using me as the sole developer - they could hire anyone to work on it. And I'm not locked into developing only what they need - I can add features that benefit other users or my own interests. This open approach means the system gets features users actually want, not what I think they need.

Developing software in the open means everything is transparent - you can see the code, the test coverage reports, check if deployments are working. The AGPLv3 license means if someone improves the code, they have to share those improvements back with everyone. This creates a virtuous cycle where the software keeps getting better, and because I can reuse these improvements across projects, I can build in more safeguards and features without increasing costs.

## What This Means For You

**Jargon-free summary:** Your application gets all these safety nets from day one, you own the code outright, and I'll reuse components I've already built so you don't pay for the same work twice.

When I build a Rails application for your business, you get all of this infrastructure and tooling as standard. Your application will have comprehensive test coverage from day one - not added as an afterthought when things start breaking. It'll have type checking to catch errors before they happen. It'll have security scanning to identify vulnerabilities. It'll have automated deployments so updates go live in seconds after passing all tests.

I've worked both as a solo developer and leading teams - I mentored junior developers at Bouncy Castle Network for years. If you need someone to augment your existing team, review your codebase, or help establish better development practices, I can do that too. I bring the engineering standards from Bandcamp (where every change gets reviewed) with the flexibility of a freelancer.

The code will be open source by default under an AGPLv3 license, published on GitHub where you can see every change, every test result, every deployment. You'll own the code completely - you can take it to another developer, you can modify it yourself, you can learn from it. The AGPLv3 license means if anyone (including competitors) uses your code to run a web service, they have to share their improvements - so your investment in open source benefits the whole community. The test suite means you can make changes with confidence, knowing that if something breaks, the tests will catch it.

I use a modular approach to building these applications. Common patterns get extracted into reusable components - I've even created my own [chobble-forms](https://github.com/chobbledotcom/chobble-forms) gem that makes building accessible, semantic HTML forms incredibly fast and reliable. It won't let me hardcode text (everything goes through translation files), catches typos before runtime, and automatically checks that form fields match your database columns. This means I can create complex forms in minutes rather than hours, and they're guaranteed to be accessible and consistent across your entire application.

Authentication systems, PDF generation, QR codes, image processing - all these common requirements get packaged into reusable modules. This means your project benefits from all the work I've done before - you're not paying for me to solve the same problems again.

The internationalisation support deserves a special mention - every single user-facing string in the applications I build uses I18n. No hardcoded text anywhere. This might seem like overkill for an English-only application, but it enforces good separation of concerns and makes the application much easier to maintain. Plus, if you ever need to support multiple languages, the infrastructure is already there.

## Development Process

**Jargon-free summary:** You can watch progress in real-time, changes won't break what's already working, and updates go live in minutes not days.

The development process happens in the open - you can see every commit, every test result, every deployment. We'll start by understanding what your application needs to do - not just the features, but the business logic, the edge cases, the future possibilities. I'll create a development environment where you can see progress as it happens, not just at milestone deliveries.

As I build, I write tests alongside the code - every new feature gets tests that verify it works correctly. The tests document the expected behaviour, so the next developer (maybe you) can understand what's happening. When requirements change (and they always do), the tests ensure we don't break the login form while adding a new report.

Code reviews happen automatically - the pipeline runs 10+ different checks on every change, catching issues a human reviewer might miss. Once code passes all checks, it deploys automatically. No waiting for Friday afternoon deployment windows, no forgetting to run migrations.

## Infrastructure That Actually Works

**Jargon-free summary:** Your code and data are backed up in multiple places, you get 10GB of storage included, and everything runs on servers powered by renewable energy.

I don't mess about with infrastructure. Your source code lives on GitHub where you can see every change, and gets backed up to my own Git server in case GitHub has a bad day. Docker images are stored in three places - DockerHub, my server, and GitHub's registry - so deployment never fails because one service is down.

Your database gets backed up to [Hetzner](https://www.hetzner.com/)'s S3-compatible storage every single day. Hetzner stores everything in the EU (German data protection laws), and I've been using them for years without a single problem. These backups are kept for 60 days - if you accidentally delete all your customers on a Friday, we can restore Wednesday's data on Monday. Your uploaded files (images, PDFs, whatever) go to the same place.

You get 10GB of storage included in the monthly price. If you need more, we'll work out a fair price based on what you actually use. If you're paranoid about data loss, I can mirror everything to another geographic location for a bit extra.

My main server runs on [Gandi](https://www.gandi.net/) who use 100% renewable energy, but I can host your application wherever you prefer - AWS, DigitalOcean, your own servers, wherever. The entire server configuration is managed with NixOS, which means I can show you exactly how everything is set up, and you can reproduce the entire server setup yourself if needed.

## Let's Build Something Solid

**Jargon-free summary:** If you need a web application that won't crash when you're busy, get in touch.

**If you need a Rails application built by someone who's actually done this before at scale, [contact me](/contact/).** I've been in Prestwich most of my life - happy to meet at one of the cafes on Bury New Road to chat through what you need.

Whether you need a new Rails application built properly from the start, an existing one fixed, or help upgrading from Rails 4 to 7, I bring the same approach: comprehensive tests, proper infrastructure, and code that the next developer (maybe you) can actually understand.

The [play-test](/examples/play-test) and [patlog](/videos/patlog-pat-testing) systems show what's possible with this approach - complex applications that handle thousands of inspections without crashing, generate PDFs without memory leaks, and process images without timing out. Your application will be built the same way.