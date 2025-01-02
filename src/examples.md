---
layout: page.html
title: Examples
---

# Examples

This page links through to some examples of our clients. You can also check out [our Git repository](https://git.chobble.com/hosted-by-chobble/) to browse the other projects we're currently hosting.

<div class="clients-grid">
{%- assign sorted_clients = collections.client | sort: 'data.order' -%}
{%- for client in sorted_clients -%}
    <div class="client-card">
        <h2><a href="{{ client.url }}">{{ client.data.title }}</a></h2>
        <p>{{ client.data.snippet }}</p>
    </div>
{%- endfor -%}
</div>

