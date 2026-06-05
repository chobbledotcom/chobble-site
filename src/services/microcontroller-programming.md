---
title: Microcontroller Programming
meta_title: Microcontroller & IoT Programming | ESP32 | Prestwich, Manchester | Chobble
description: ESP32 and IoT programming for businesses - firmware, sensors, web interfaces, and prototyping through to production PCBs - Prestwich, Manchester
snippet: IoT devices, firmware, and custom hardware integrations
order: 16
meta_description: ESP32 and IoT programming for UK businesses - custom firmware, sensor integrations, web interfaces - prototype to production PCB - Manchester
---

# Microcontroller and IoT programming

If you've got a piece of equipment you'd like to connect to the internet, automate, or monitor remotely, the answer is usually a small, cheap, open-source board like an ESP32 running a few lines of MicroPython. I can write the firmware, build a web interface alongside it, and help you spec and source hardware - right through to a proper PCB if you need a production run.

The most interesting job I've done along these lines was for an event hire company: they wanted to add credits to an arcade machine when customers completed marketing actions - scan a QR code, sign up to a mailing list, that sort of thing. The machine had always run entirely standalone. I built the interface between their web-based promotional system and the machine's credit mechanism, so credits now get added automatically when the customer earns them, with no one needing to be in the room. It's the kind of problem I'm most useful for: devices that need to talk to systems they weren't built to talk to.

My own home has been a test bed for this kind of thing for years. I've got ESP32 boards, WLED LED strips, Tasmota lights, and ZigBee nodes all wired together with Home Assistant and Node-RED - including an automated dehumidifier that runs off surplus solar, and lighting that responds to weather, motion, and time of day. The protocols involved (MQTT, WiFi, REST APIs, serial) are familiar ground rather than things I'd be working out as I went. For Home Assistant work specifically, there's a [dedicated page](/services/home-assistant-technician/).

## What I can help with

- **Firmware development** in MicroPython - reading sensors, controlling relays and motors, managing network connections, sending data over MQTT or HTTP
- **Web interfaces** for monitoring and control, because a working device is more useful when you can see what it's doing from a browser
- **Integrations with your existing systems** - connecting physical devices to databases, web applications, or third-party APIs
- **Hardware spec and sourcing** - picking appropriate components and ordering them, and if you want proper PCBs made for a production run, working through that with you too

Everything I write is open source and yours to keep. Hand it to another developer, run it on your own infrastructure, extend it later - there's nothing stopping you.

## Prototyping to production

A working prototype on a development board is usually the fastest way to find out whether an idea is actually feasible and where the fiddly bits are going to be. Once that's done and you know what you want, moving to a proper PCB is a straightforward next step - I can help you spec, order, and test those boards.

## Honest limits

I'm not an electrician. Anything involving mains voltage or real electrical safety needs someone qualified for that - [Ashley at Renegade Solar](/examples/renegade-solar/) is an electrician who's familiar with this kind of work, and I can put you in touch if the project calls for it. What I can cover is everything on the software and electronics side: firmware, protocols, interfaces, and integrations.

I'm also not set up for safety-critical applications or anything needing formal certification - a smart dehumidifier or an arcade machine credit trigger is one thing, but anything that has to be certified to a safety standard is something to take to someone else.

## Pricing

Same hourly rate as everything else: **£200/hour** for commercial work, **£100/hour** if you qualify for the [discount](/prices/) (charities, co-ops, artists, musicians, vegan businesses, renewable energy companies). The initial chat is free and I'll give you an estimate before starting anything.

A prototype build - working out the hardware, writing the firmware, and putting together a basic web interface - is typically somewhere in the 4-10 hour range depending on how complex the integration is.

## Get in touch

If you've got something in mind, fill in the form below.
