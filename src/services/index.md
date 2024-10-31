---
layout: base
title: Services
---

# Our Services

We believe in creating sustainable, efficient, and ethical web solutions. Our combined experience from Bandcamp, AutoTrader, and other major platforms informs everything we do.

## Our Principles
- Transparent pricing at £100/hour
- All code is open source (GPLv3)
- Focus on static sites and efficient solutions
- Special rates for local Manchester charities
- Ethical business practices

## Featured Services

- **Web Development:** Custom websites and web applications
- **Technical Advice:** Expert guidance on all aspects of technology
- **Security Audits:** Comprehensive security assessments
- **Ubuntu Conversion:** Transform your Windows laptop into a modern Linux machine

<div class="services-grid">
{%- for service in collections.service | sort(attribute='data.order') -%}
    <div class="service-card">
        <h2><a href="{{ service.url }}">{{ service.data.title }}</a></h2>
        <p>{{ service.data.snippet }}</p>
    </div>
{%- endfor -%}
</div>
