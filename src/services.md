---
layout: page
title: Services
---

# Our Services

We believe in creating sustainable, efficient, and honest web solutions. With decades of experience working with businesses of all sizes we're sure we can build something to suit your needs.

## Our Principles

- Transparent prices
- Effective, efficient solutions
- No smoke and mirrors
- Open source by default
- No walled gardens
- No bloated frameworks

<div class="services-grid">
{%- for service in collections.service | sort(attribute='data.order') -%}
    <div class="service-card">
        <h2><a href="{{ service.url }}">{{ service.data.title }}</a></h2>
        <p>{{ service.data.snippet }}</p>
    </div>
{%- endfor -%}
</div>
