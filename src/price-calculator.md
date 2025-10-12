---
title: Static Website Price Calculator | Chobble Web Development Prestwich
layout: page.html
description: Estimate the cost of your new static website with this easy to use price calculator from Chobble. I charge a flat rate with no surprises.
meta_title: Website Price Calculator | Get a Quote in Seconds | Chobble
meta_description: Work out your website cost instantly - £200/hour (£100 for charities) - no hidden extras - includes design, migration, SEO setup - Manchester web developer
---

# How much does a static website cost?

I charge [a flat hourly rate](/prices/) for all jobs, discounted **50%** for charities, co-ops, artists, and sustainable businesses.

This flat fee means I can be completely transparent about what's involved in each job, and static websites are generally easy to spec and affordable to host.

For more complex jobs like custom web applications we will need to create a proper spec - [get in touch](/contact/) to talk about your requirements.

## Your rate

<ul class="calculator-items">
  <li>
    <label>
      <input type="radio" name="rate" value="200" id="rate-standard" checked="true">
      <strong>£200/hr:</strong>
      Standard rate
    </label>
  </li>
  <li>
    <label>
      <input type="radio" name="rate" value="100" id="rate-discounted">
      <strong>£100/hr:</strong>
      Discounted rate
    </label>
  </li>
</ul>

## Your requirements

You may prefer to handle some of these jobs yourself. That's fine by me!

I'll give you a login to edit your site and as much advice as I can.

**Website builds**

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 1, description: "Basic website design, based on the Chobble Template" %}
  {% include "calculator-item.html", hours: 3, description: "Website migration (eg from Wix, Wordpress, Squarespace)" %}
  {% include "calculator-item.html", hours: 4, description: "Custom website design" %}
  {% include "calculator-item.html", hours: 1, description: "Domain, DNS, and email setup" %}
  {% include "calculator-item.html", hours: 1, description: "Backups, analytics, and uptime monitoring setup" %}
  {% include "calculator-item.html", hours: 1, description: "Content management system via PagesCMS" %}
</ul>

**Content and media**

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 3, description: "Stock image sourcing" %}
  {% include "calculator-item.html", hours: 1, description: "Editing your images / creating banners (up to 3 images)" %}
  {% include "calculator-item.html", hours: 2, description: "Populating site with text content (with AI assistance, up to 5 pages)" %}
  {% include "calculator-item.html", hours: 2, description: "Editing your content (up to 5 pages)" %}
  {% include "calculator-item.html", hours: 2, description: "Sourcing a logo design from Fiverr.com" %}
</ul>

**Newsletters**

<ul class="calculator-items">
  {% include "calculator-item.html", hours: 2, description: "Ghost newsletter platform setup" %}
  {% include "calculator-item.html", hours: 1, description: "Ghost template tweaking (the base templates look good already)" %}
</ul>

## Totals

- **Total Hours:** <output id="total-hours" for="">0</output>
- **Hourly Rate:** £<output id="hourly-rate" for="rate-standard rate-discounted">200</output>
- **Estimated Cost:** £<output id="total-cost" for="">0</output>

This is an estimate only, but if it sounds good please **[get in touch for a proper quote!](/contact/)**

---

## Monthly costs

You can either host your new website yourself or pay me to host it - either is totally fine. If you'd like me to host it, my prices are:

- **£10/month:** Hosting only, with no support or marketing advice. You can make changes yourself or employ someone to help you.
- **£40/month:** Hosting, support, uptime alerts, search position tracking, Google Search Console monitoring, and personal help implementing the strategies in my [free marketing guides](/guides/) and [videos](/videos/). I'll support you with any day to day maintenance and expansion of your site.

These prices are also **discounted 50%** for charities, co-operatives, artists, musicians, and sustainable businesses.

<script>
  (function() {
    let initialized = false;
    const itemsSelector = '.calculator-items input[type="checkbox"]:checked';
    const rateSelector = 'input[name="rate"]:checked';
    const inputsSelector = 'input[type="checkbox"], input[type="radio"]';

    const updateOutputForAttributes = () => {
      const checkboxes = document.querySelectorAll('.calculator-items input[type="checkbox"]');
      const checkboxIds = Array.from(checkboxes).map(cb => cb.id).join(' ');
      const rateIds = 'rate-standard rate-discounted';

      const totalHoursEl = document.getElementById('total-hours');
      const totalCostEl = document.getElementById('total-cost');

      if (totalHoursEl) totalHoursEl.setAttribute('for', checkboxIds);
      if (totalCostEl) totalCostEl.setAttribute('for', `${checkboxIds} ${rateIds}`.trim());
    };

    const calculateTotal = () => {
      const rateElement = document.querySelector(rateSelector);
      if (!rateElement) return;

      const rate = rateElement.value;

      let totalHours = 0;
      document.querySelectorAll(itemsSelector).forEach(item => {
        totalHours += parseFloat(item.getAttribute('data-hours'));
      });

      const totalHoursEl = document.getElementById('total-hours');
      const hourlyRateEl = document.getElementById('hourly-rate');
      const totalCostEl = document.getElementById('total-cost');

      if (totalHoursEl) totalHoursEl.textContent = totalHours;
      if (hourlyRateEl) hourlyRateEl.textContent = rate;
      if (totalCostEl) totalCostEl.textContent = totalHours * rate;
    };

    const initCalculator = () => {
      if (initialized) return;

      const inputs = document.querySelectorAll(inputsSelector);
      if (inputs.length === 0) return;

      updateOutputForAttributes();

      inputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
      });

      calculateTotal();
      initialized = true;
    };

    const teardownCalculator = () => {
      initialized = false;
    };

    document.addEventListener('DOMContentLoaded', initCalculator);
    document.addEventListener('turbo:load', initCalculator);
    document.addEventListener('turbo:before-cache', teardownCalculator);
  })();
</script>

---

**This calculator is open source!** I try and release everything I do under the copyleft [AGPLv3 license](https://www.gnu.org/licenses/agpl-3.0.en.html), which means you can use it for your own open source projects. You can right-click the page to see the code - it's an inline script - or else [click here to check it out on my Git repository](https://git.chobble.com/chobble/chobble-site/src/branch/main/src/price-calculator.md).
