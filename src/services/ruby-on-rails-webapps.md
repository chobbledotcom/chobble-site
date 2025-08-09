---
title: Ruby on Rails Web Applications
meta_title: Ruby on Rails Development | Manchester | Chobble
description: Production-ready Rails applications built with comprehensive testing and modern tooling
snippet: Robust web applications with rigorous testing and quality control
order: 2
meta_description: Ruby on Rails applications with 90%+ test coverage, type checking, automated deployments - Manchester developer - 50% off for charities
---

# Ruby on Rails Web Applications

**When you need more than a static website - when you need a proper web application with user accounts, databases, complex business logic, and dynamic functionality - that's where Ruby on Rails comes in.** I build Rails applications that are properly tested, maintainable, and designed to grow with your business.

The way I approach Rails development is a bit different from what you might find elsewhere. I don't just write code that works today and hope for the best - I write code that's comprehensively tested, type-checked, and monitored for quality at every step. This isn't about being precious about code - it's about building systems that you can rely on and modify without fear of breaking things.

I've built several Rails applications that demonstrate this approach. Take [play-test](https://play-test.co.uk) - it's a system for managing safety inspections of inflatable play equipment that handles equipment records, seven different types of assessment forms, photo management, PDF generation with QR codes, and complex safety calculations. Or [PATLog](https://patlog.co.uk) - a free tool for electricians to log portable appliance tests with professional certificates and QR codes. Both applications work reliably because of the development approach I use, and both are completely open source so you can see exactly how they're built.

## How I Build Rails Applications

*Jargon-free summary: I use lots of quality control measures to make sure your application works properly and won't break when changes are made.*

Every Rails application I build comes with a comprehensive suite of tools and practices that ensure quality and maintainability. When you look at the play-test codebase, you'll find over 900 [RSpec](https://rspec.info/) tests covering more than 90% of the codebase. These aren't just unit tests either - there are feature tests using [Capybara](https://github.com/teamcapybara/capybara) that simulate real user interactions, controller tests, model tests, service tests, even tests for the helper methods and PDF generation. The tests run in parallel using [parallel_tests](https://github.com/grosser/parallel_tests) to save time, and they generate coverage reports with [SimpleCov](https://github.com/simplecov-ruby/simplecov) that get published automatically so you can see exactly what's tested and what isn't.

*Jargon-free summary: Beyond testing, I use additional tools to catch mistakes before they cause problems, check for security issues, and ensure the code runs efficiently.*

But testing is just the start. I use [Sorbet](https://sorbet.org/) for gradual type checking - this means the code gets checked for type errors before it even runs, catching whole classes of bugs that would normally only show up in production. [StandardRB](https://github.com/standardrb/standard) and [rubocop-rails-omakase](https://github.com/rails/rubocop-rails-omakase) handle code formatting and linting, ensuring the code follows Ruby best practices consistently. [Brakeman](https://brakemanscanner.org/) scans for security vulnerabilities. [ERB lint](https://github.com/Shopify/erb-lint) checks the templates. [Prosopite](https://github.com/charkost/prosopite) detects N+1 query problems that could slow down the application.

*Jargon-free summary: Every time I make changes, automated systems check everything is working correctly before the changes go live - no human errors.*

All of this runs automatically through [GitHub Actions](https://github.com/features/actions) whenever code is pushed. The test suite is split across multiple parallel jobs - controllers, features, models, requests, services, helpers, lib, seeds, and views all run separately to maximise speed. Only when every single test passes, every linter is happy, and the security scan is clean does the code get deployed. And deployment itself is automated through [Docker](https://www.docker.com/) - the application gets built into a container that includes everything it needs to run, making deployment consistent and repeatable.

*Jargon-free summary: The application is packaged in a way that makes it run the same everywhere, handles scheduled tasks, and tracks any errors that occur.*

The Docker setup is particularly nice - it uses a multi-stage build to keep the final image small, includes [supercronic](https://github.com/aptible/supercronic) for scheduled tasks, and is configured for production use with proper security settings. The application uses [Solid Queue](https://github.com/rails/solid_queue) for background job processing, has built-in S3-compatible storage support for file uploads, and includes error tracking with [Sentry](https://github.com/getsentry/sentry-ruby) (or the open-source [BugSink](https://github.com/bugsink/bugsink) alternative).

## The RPII Partnership

*Jargon-free summary: A professional body is funding development of an open-source system, which means they're not locked into using me, and the quality has to be excellent because everyone can see it.*

The development of play-test is now being supported by the Register of Play Inspectors International (RPII), which creates an interesting dynamic that benefits everyone. Because the system is open source, they're not locked into using me as the sole developer - they could hire anyone to work on it. And I'm not locked into developing only what they need - I can add features that benefit other users or my own interests. This open approach means the system grows organically based on real needs rather than vendor lock-in.

When you develop software in the open like this, it has to be good. Anyone can look at the code, anyone can see the test coverage reports, anyone can check if the deployments are working. There's nowhere to hide shoddy work. This transparency drives quality in a way that closed-source development often doesn't.

## What This Means For You

*Jargon-free summary: Your application will have all these quality measures from the start, you'll own the code completely, and you can reuse components I've already built.*

When I build a Rails application for your business, you get all of this infrastructure and tooling as standard. Your application will have comprehensive test coverage from day one - not added as an afterthought when things start breaking. It'll have type checking to catch errors before they happen. It'll have security scanning to identify vulnerabilities. It'll have automated deployments so updates can be rolled out safely and quickly.

The code will be open source by default, published on GitHub where you can see every change, every test result, every deployment. You'll own the code completely - you can take it to another developer, you can modify it yourself, you can learn from it. The test suite means you can make changes with confidence, knowing that if something breaks, the tests will catch it.

I use a modular approach to building these applications. Common patterns get extracted into reusable components - I've even created my own [chobble-forms](https://github.com/chobbledotcom/chobble-forms) gem that makes building accessible, semantic HTML forms incredibly fast and reliable. It enforces strict internationalisation (no hardcoded strings allowed), provides type safety with Sorbet, and ensures forms match your database structure perfectly. This means I can create complex forms in minutes rather than hours, and they're guaranteed to be accessible and consistent across your entire application.

Authentication systems, PDF generation, QR codes, image processing - all these common requirements get packaged into reusable modules. This means your project benefits from all the work I've done before - you're not paying for me to solve the same problems again.

The internationalisation support deserves a special mention - every single user-facing string in the applications I build uses I18n. No hardcoded text anywhere. This might seem like overkill for an English-only application, but it enforces good separation of concerns and makes the application much easier to maintain. Plus, if you ever need to support multiple languages, the infrastructure is already there.

## Development Process

*Jargon-free summary: You'll be able to see progress as I work, changes can be made safely without breaking existing features, and updates go live quickly once tested.*

The development process is transparent and collaborative. We'll start by understanding what your application needs to do - not just the features, but the business logic, the edge cases, the future possibilities. I'll create a development environment where you can see progress as it happens, not just at milestone deliveries.

As I build, I write tests first - this test-driven development approach means I have to think through how features should work before implementing them. The tests document the expected behaviour, making the codebase easier to understand. When requirements change (and they always do), the tests ensure we don't break existing functionality while adding new features.

Code reviews happen automatically through the CI/CD pipeline - the various linters and checkers act like an automated code review, ensuring consistent quality. The deployment process means that once code passes all checks, it can be deployed immediately. No waiting for deployment windows, no manual processes that could go wrong.

## Pricing and Support

*Jargon-free summary: You pay my hourly rate for development, then a monthly fee for hosting and maintenance - but you're never locked in because you own everything.*

Rails applications are more complex than static websites, but the pricing model remains simple - it's my standard [flat hourly rate](/prices/) of £200 per hour (£100 for charities, artists, vegan businesses, and renewable energy companies). You'll know exactly what you're paying for, with detailed breakdowns of time spent on different features.

For hosting, Rails applications need a proper server rather than static hosting. I'll set up your application on an affordable VPS running [NixOS](https://nixos.org/), with costs starting around £5 per month for the server itself. On top of that, I charge £60 per month (£30 if you qualify for the discount) for maintenance and support. This includes monitoring, daily database backups, quick changes, and ongoing support.

The beauty of open source development is that you're never locked in. If you want to host the application yourself, you can - you have the complete source code and deployment configuration. If you want to hire another developer to add features, you can - the comprehensive test suite means they can work with confidence. If you want to fork the project and take it in a completely different direction, you can.

## Let's Build Something Solid

*Jargon-free summary: If you need a reliable web application that won't break and can grow with your business, get in touch.*

**If you need a Rails application that's built to last, tested to the hilt, and designed to grow with your business, [contact me](/contact/) and we'll discuss what you need.**

The play-test and PATLog systems show what's possible when you combine Rails with modern development practices - complex applications that handle real-world requirements reliably, with the confidence that comes from comprehensive testing and quality control. Your application will be built with the same attention to detail, the same comprehensive testing, and the same commitment to quality.