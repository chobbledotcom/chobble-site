---
title: Ruby on Rails Web Applications
meta_title: Ruby on Rails Development | Manchester | Chobble
description: Rails applications with comprehensive test suites, type checking, and automated deployments that actually work
snippet: Web applications that won't fall over when you get busy
order: 2
meta_description: Ruby on Rails applications with 90%+ test coverage, type checking, automated deployments - Manchester developer - 50% off for charities
---

# Ruby on Rails Web Applications

**When you need more than a static website - when you need a proper web application with user accounts, databases, complex business logic, and dynamic functionality - that's where Ruby on Rails comes in.** I build Rails applications that won't fall over when you get busy, can be modified without breaking everything else, and handle 10 users or 10,000 without a rewrite.

The way I approach Rails development is a bit different from what you might find elsewhere. I don't just write code that works today and hope for the best - I write tests for all the business logic aiming for 90%+ coverage, use type checking that spots typos before the code even runs, and run automatic security scans on every change. This isn't about being precious about code - it's about building systems you can change on a Tuesday without ruining everyone's Wednesday.

I've built several Rails applications that demonstrate this approach. Take [play-test](/examples/play-test) - it's a system for managing safety inspections of inflatable play equipment that handles equipment records, seven different types of assessment forms, photo management, PDF generation with QR codes, and complex safety calculations. Or [patlog](/videos/patlog-pat-testing) - a free tool for electricians to log portable appliance tests with professional certificates and QR codes. Both handle thousands of users without crashing, generate PDFs without memory leaks, and you can see exactly how they work because they're open source.

## Pricing and Support

Rails applications are more complex than static websites, but the pricing model remains simple - it's my standard [flat hourly rate](/prices/) of £200 per hour (£100 for charities, artists, vegan businesses, and renewable energy companies). You'll know exactly what you're paying for, with detailed breakdowns of time spent on different features.

For hosting, Rails applications need a proper server rather than static hosting. I'll set up your application on an affordable VPS running [NixOS](https://nixos.org/), with costs starting around £5 per month for the server itself. On top of that, I charge £60 per month (£30 if you qualify for the discount) for maintenance and support. This includes uptime monitoring, daily database backups emailed to you, quick text changes, and help when things go wrong.

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

**If you need a Rails application with tests for every bit of business logic, type checking, and the ability to handle your business doubling overnight, [contact me](/contact/).**

The [play-test](/examples/play-test) and [patlog](/videos/patlog-pat-testing) systems show what's possible with this approach - complex applications that handle thousands of inspections without crashing, generate PDFs without memory leaks, and process images without timing out. Your application will be built the same way.