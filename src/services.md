---
layout: page
title: Services
---

# Our Services

We believe in creating sustainable, efficient, and ethical web solutions. Our combined experience from Bandcamp, AutoTrader, Shop Direct and other major platforms informs everything we do.

## Our Principles
- Transparent pricing
- Simple, efficient solutions
- Full access to source code

<div class="services-grid">
{%- for service in collections.service | sort(attribute='data.order') -%}
    <div class="service-card">
        <h2><a href="{{ service.url }}">{{ service.data.title }}</a></h2>
        <p>{{ service.data.snippet }}</p>
    </div>
{%- endfor -%}
</div>
