---
layout: page.html
title: Example Websites I Host
description: Examples of websites designed and developed by Chobble, a Prestwich web agency
---

# Web Design Examples

This page links through to some examples of my clients. You can also check out [my Git repository](https://git.chobble.com/hosted-by-chobble/) to browse the other projects I'm currently hosting.

<ul class="cards">
{%- assign sorted_clients = collections.client | sort: 'data.order' -%}
{%- for client in sorted_clients -%}
    <li>
        <strong><a href="{{ client.url }}">{{ client.data.title }}</a></strong>
        <br>
        {{ client.data.snippet }}
    </li>
{%- endfor -%}
</ul>
