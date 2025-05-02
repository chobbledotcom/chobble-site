---
title: Static Website Price Calculator | Chobble Web Development Prestwich
layout: page.html
description: Estimate the cost of your new static website with this easy to use price calculator from Chobble. I charge a flat rate with no surprises.
---

# How much does a static website cost?

I charge [a flat hourly rate](/prices/) for all jobs, discounted **50%** for charities, co-ops, artists, and sustainable businesses.

This flat fee means I can be completely transparent about what's involved in each job, and static websites are generally easy to spec and affordable to host.

For more complex jobs like custom web applications we will need to create a proper spec - [get in touch](/contact/) to talk about your requirements.

## Your rate

<ul class="calculator-items">
  <li>
    <label>
      <input type="radio" name="rate" value="200" checked="true">
      <strong>£200/hr:</strong>
      Standard rate
    </label>
  </li>
  <li>
    <label>
      <input type="radio" name="rate" value="100">
      <strong>£100/hr:</strong>
      Discounted rate
    </label>
  </li>
</ul>

## Your requirements

You may prefer to handle some of these jobs yourself. That's fine by me!

I'll give you a login to edit your site and as much advice as I can.

<p><strong>Website builds</strong></p>

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 1, description: "Basic website design, based on the Chobble Template" %}
  {% include "calculator-item.html", hours: 3, description: "Website migration (eg from Wix, Wordpress, Squarespace)" %}
  {% include "calculator-item.html", hours: 4, description: "Custom website design" %}
  {% include "calculator-item.html", hours: 1, description: "Domain, DNS, and email setup" %}
  {% include "calculator-item.html", hours: 1, description: "Backups, analytics, and uptime monitoring setup" %}
  {% include "calculator-item.html", hours: 1, description: "Content management system via PagesCMS" %}
</ul>

<p><strong>Content and media</strong></p>

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 3, description: "Stock image sourcing" %}
  {% include "calculator-item.html", hours: 1, description: "Editing your images / creating banners (up to 3 images)" %}
  {% include "calculator-item.html", hours: 2, description: "Populating site with text content (with AI assistance, up to 5 pages)" %}
  {% include "calculator-item.html", hours: 2, description: "Editing your content (up to 5 pages)" %}
  {% include "calculator-item.html", hours: 2, description: "Sourcing a logo design from Fiverr.com" %}
</ul>

<p><strong>Newsletters</strong></p>

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 2, description: "Ghost newsletter platform setup" %}
  {% include "calculator-item.html", hours: 1, description: "Ghost template tweaking (the base templates look good already)" %}
</ul>

<h2>Totals</h2>

<ul>
  <li>
    <strong>Total Hours:</strong>
    <span id="total-hours">0</span>
  </li>
  <li>
    <strong>Hourly Rate:</strong>
    £<span id="hourly-rate">200</span>
  </li>
  <li>
    <strong>Estimated Cost:</strong>
    £<span id="total-cost">0</span>
  </li>
</ul>

<p>
  This is an estimate only, but if it sounds good please <strong><a href="/contact/">get in touch for a proper quote!</a></strong>
</p>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const itemsSelector = '.calculator-items input[type="checkbox"]:checked';
    const rateSelector = 'input[name="rate"]:checked';
    const inputsSelector = 'input[type="checkbox"], input[type="radio"]';

    const calculateTotal = () => {
      const rate = document.querySelector(rateSelector).value;

      let totalHours = 0;
      document.querySelectorAll(itemsSelector).forEach(item => {
        totalHours += parseFloat(item.getAttribute('data-hours'));
      });

      document.getElementById('total-hours').textContent = totalHours;
      document.getElementById('hourly-rate').textContent = rate;
      document.getElementById('total-cost').textContent = totalHours * rate;
    };

    document.querySelectorAll(inputsSelector).forEach(input => {
      input.addEventListener('change', calculateTotal);
    });

    calculateTotal();
  });
</script>
