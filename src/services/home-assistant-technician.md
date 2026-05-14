---
title: Home Assistant Technician
meta_title: Home Assistant Setup & Support | Prestwich, Manchester | Chobble
description: Home Assistant setup, dashboards, automations, and integrations - help migrating from proprietary systems and teaching you how it all works
snippet: Home automation setup and support for businesses and homes
order: 10
meta_description: Home Assistant expert in Prestwich - setup, dashboards, automations, device integration - migrate from proprietary systems - API development - 50% off for charities
---

# Home Assistant setup and support

I've been running [Home Assistant](https://www.home-assistant.io/) at home for years - to the point where my own setup is now a fairly involved tangle of smart radiators, solar inverter monitoring, EV charging tied to solar production, addressable LED strips, MQTT brokers and Node-RED flows - and I can help you set up something similar (or much simpler, no judgement) for your home or business.

For anyone who hasn't come across it: Home Assistant is open-source home automation software that runs locally on your own network and talks to smart devices from hundreds of different manufacturers. The important word there is "locally" - your data doesn't leave the house, and the system keeps working even when the manufacturer of your light bulbs decides to discontinue their app. It's the same principle as building a website you actually own: control over your own stuff, no rent, no being held hostage by a company you can't reach on the phone.

I work with businesses, organisations and individuals who want a hand setting up the infrastructure, or who've hit a wall trying to build something specific on top of Home Assistant.

## What I can help with

### Initial setup and configuration

Getting Home Assistant running properly involves picking the right bit of hardware to run it on, installing the software, securing it, sorting out backups, and connecting your first round of devices. I'll either do the whole installation for you (on a Raspberry Pi, an old laptop, or a dedicated server, depending on what makes sense), or walk you through it yourself if you'd rather learn the process as we go.

I'll make sure the setup is secure, has proper backups, and is accessible the way you actually need it - on the local network only, behind a reverse proxy, or via Tailscale for remote access without exposing anything to the open internet.

### Dashboard design

Home Assistant's default dashboards work, but they tend to be a bit overwhelming - every entity in your setup laid out on a wall of small tiles. I can build cleaner dashboards focused on the handful of things you actually want to see day-to-day, whether that's solar generation and battery state, heating zones, energy use, or the lighting scenes for the rooms you actually live in.

This bit makes more difference than it sounds. A dashboard you actually want to look at is the difference between automation that becomes part of your life and automation that quietly stops being used after a fortnight.

### Automations and logic

The point of all of this, really, is that things just happen at the right time without anyone thinking about it. I can build automations that adjust the heating based on who's home and what the weather's doing, turn lights on and off sensibly, schedule EV charging around solar output, send a notification when something important happens, or chain together more complex sequences across a bunch of devices.

I work in YAML directly or through the UI depending on how complicated the logic is, and I'm happy to teach you the patterns so you can build your own automations once we've done a few together.

### Device integration

I've wired up Tado radiators, Tasmota lights and plugs, WLED LED strips, Shelly plugs, OpenEVSE chargers, Solax solar inverters and a few other things. Different manufacturers use different protocols (Zigbee, Z-Wave, WiFi, MQTT) and I can help you pick devices that play nicely with Home Assistant in the first place, rather than ending up with a drawer of stuff that doesn't quite work.

If you've got devices without official integrations, there's usually a way - custom components, MQTT bridges, REST API hacks - and I can usually find it.

### Migrating off proprietary systems

If you're stuck on an expensive subscription service or a proprietary hub that's being discontinued (which seems to happen to one of these systems every six months), I can help move you onto Home Assistant. Some devices migrate easily, some need replacing with open-source-friendly versions, and I'll give you an honest read on what's worth doing and what isn't. The end state is that you fully own the setup and nobody can switch it off.

### API integrations and custom development

If you need Home Assistant to talk to other systems - pushing data into your business tools, triggering automations from external events, building custom sensors that pull data from APIs, exposing controls to other applications - I can build those. I've used MQTT extensively, built custom REST integrations, and used Node-RED for the kind of automation logic that's much easier to read as a visual flow than as a YAML file.

### Teaching and support

Home Assistant has very good documentation, but there's a lot of it and a lot of concepts to absorb. I can teach you how the whole thing fits together, from the basics up to the more advanced automation patterns, working with your specific setup rather than a generic example. The aim is for you to feel confident making changes yourself afterwards.

In person if you're in Prestwich or nearby Manchester, by video call if you're further afield.

## What's in my own setup

Roughly, in case it's a useful reference for what I've actually got working:

- **Tado** smart radiator valves for room-by-room heating control
- **Tasmota** open-source firmware on various lights and plugs for local control
- **WLED** for addressable LED strip control with effects and automation
- **Shelly** plugs monitoring power consumption
- **OpenEVSE** EV charger integration, with charging triggered by solar production
- **Solax** inverter monitoring for solar generation and battery state
- **MQTT** broker for reliable device-to-device messaging
- **Node-RED** for the more visual flow-based automation
- **Guest WiFi (2.4GHz)** for IoT device isolation from the main network
- **Reverse proxies and Tailscale** for secure remote access

Happy to work with any of these, or whatever you've already got, or whatever you're planning to buy.

## Who this tends to suit

Businesses and organisations that want a proper automation setup - office lighting and climate control, monitoring and energy management, something custom for your specific operations.

Individuals who'd rather have someone with experience help than spend three months working it out, or who've hit a wall with their current setup and need someone who can dig into the harder problems.

Anyone trying to escape a proprietary system that's getting expensive, being discontinued, or just driving them up the wall.

Everyone gets open-source solutions. If at some point you want to take it on yourself, or hand it to someone else, everything is documented and accessible. You're not locked in to me.

## Pricing

Same flat hourly rate as everything else: **£200/hour** for commercial work, **£100/hour** if you qualify for the discount (charities, co-ops, artists, musicians, vegan businesses, renewable energy companies).

The initial chat is free. I'll give you an estimate before starting anything so you know what you're committing to.

A simple setup might be 2-3 hours. A complex migration or custom integration could be 10-20 hours depending on the shape of it. I'll break the work down by stage and give you options for doing some parts yourself if you want to bring the cost down.

All the code I write is open source and yours to keep.

## Prestwich, Manchester, and remote

I'm in Prestwich, just north of Manchester, and happy to come and see your setup in person if you're local. Sometimes the easiest way to sort out a tricky problem is to be looking at the actual hardware and network together. We can meet at Cuckoo or I can come to you.

For anyone outside Manchester I work remotely - video calls, or working independently and providing documentation of everything I've configured.

## Get in touch

If you'd like a hand with your home automation, fill in the form below.
