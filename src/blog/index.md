---
layout: base
title: Blog
---

# Our Blog

Stay updated with our latest insights and industry news.

<div class="blog-grid">
{%- for post in collections.blog | reverse -%}
    <div class="blog-card">
        <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
        <time datetime="{{ post.date | date }}">{{ post.date | date("MMMM D, YYYY") }}</time>
        <p>{{ post.data.snippet }}</p>
        <div class="tags">
            {%- for tag in post.data.tags -%}
                {%- if tag != "blog" -%}
                <span class="tag">{{ tag }}</span>
                {%- endif -%}
            {%- endfor -%}
        </div>
    </div>
{%- endfor -%}
</div>
