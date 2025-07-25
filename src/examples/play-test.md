---
title: play-test
snippet: A safety inspection tool for inflatable play equipment built with Rails
order: 12
colour: "#f4d3ff"
meta_title: play-test | Safety Inspection Tool | Chobble
meta_description: Rails app for bouncy castle safety inspections - EN 14960 compliant - open source AGPLv3 - Manchester web development example
---

# play-test

- **Client:** Bouncy Castle Inspectors
- **Services:** Web development and ongoing maintenance
- **Website:** [play-test.co.uk](https://play-test.co.uk)
- **Source code:** [on git.chobble.com](https://git.chobble.com/chobble/play-test)

**play-test** is a tool for inspectors of bouncy castles and other inflatable play equipment. The industry often used manual spreadsheets, Word documents, or even carbon copy paper to log their tests. Fellow nerd [Spencer from Elliott's Boucy Castle Hire](https://www.elliottsbouncycastlehire.co.uk/) made a Windows desktop app to speed the process up, and I translated it to the web while incorporating the EN 14960:2019 safety specs, making it multi-user, and writing a tonne of tests.

![play-test inspection dashboard showing a list of inspections](/assets/examples/play-test.png)

## My Solution

A primary goal was to make repeat inspections fast - measurements don't change much between tests, so the system remembers everything from the previous test and pre-fills the form fields. I wanted inspectors to always know what to do next, so the interface guides them through each step.

A tricky bit was turning EN 14960 safety specs into Ruby methods. Every calculation shows its working - you can even see the source code right there in the interface.

The platform is very open - each unit or inspection can be viewed by the public in both PDF and JSON formats, and data can be exported to CSV with one click.

## Technical Details

play-test is built with modern Rails practices while keeping dependencies minimal:

- **Rails 8.0+** with SQLite for simplicity and reliability
- **Turbo** for snappy interactions without much JavaScript complexity
- **Comprehensive test suite** with 90% coverage using RSpec and Capybara
- **Semantic HTML + MVP.css** for a clean, accessible interface
- **Docker support** for easy deployment
- **Full internationalisation** support built in
- **Progressive enhancement** so it works without JavaScript

## What's Next?

The software is free and open source, but I charge for hosting - either for individuals or whole companies who want their own branded version.

Future plans (based on what users actually want):

- Owner logins to see their own test history
- Email reminders for expiring tests
- Better reports and stats
- API for connecting to other systems

I'm being totally transparent about money and direction. I am a software developer, not a inflatable inspector or even a bouncy castle hirer, although I do have a lot of experience in that industry. For that reason, my aim is simply to make the best testing platform for the users of the platform - they should choose how it develops, not me.

## Open Source

AGPLv3 licensed - use it, change it, share it, but share your improvements too. Safety tools should be accessible to everyone.

**If you'd like an account on play-test, or you'd like me to make a similar open source project for your industry, please [get in touch!](/contact/)**
