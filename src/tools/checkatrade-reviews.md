---
layout: page.html
title: Checkatrade Reviews Fetcher / Scraper
---

# Checkatrade Reviews Scraper

You might want to **export all of your Checkatrade reviews to JSON**, for example to import them into your [static website's data files](/services/static-websites).

This page lets you do that. The fetching happens client-side in your browsers - no information is sent to me.

You will need your Checkatrade ID. You can find this by:

- Visiting your company's page on a computer
- Right-clicking it and choosing "View Source"
- Typing `ctrl+f` or `cmd+f` (mac) to search for `companyId`
- The numbers immediately following this are your ID.

_(Accurate May 2025 - [contact me](/contact/) if this doesn't work.)_

Ready? Let's goooo!

<div class="form">
  <label for="checkatradeId">Checkatrade ID:</label>
  <input type="text" id="checkatradeId" placeholder="e.g. 1234567">
  <button id="fetchButton">Fetch Reviews</button>
</div>

<div id="statusArea" class="form" style="display: none;">
  <label>Status:</label>
  <div id="status"></div>
  <div class="progress" style="display: none;">
    <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%"></div>
  </div>
</div>

<div id="resultArea" class="form" style="display: none;">
  <label>
    Results:
    <textarea
      id="resultJson"
      rows="30"
      readonly
    ></textarea>
  </label>
  <button id="copyButton">Copy to Clipboard</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const fetchButton = document.getElementById('fetchButton');
  const statusArea = document.getElementById('statusArea');
  const resultArea = document.getElementById('resultArea');
  const statusEl = document.getElementById('status');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = progressBar.parentElement;
  const resultJson = document.getElementById('resultJson');
  const copyButton = document.getElementById('copyButton');

  fetchButton.addEventListener('click', async () => {
    const checkatradeId = document.getElementById('checkatradeId').value.trim();

    if (!checkatradeId) {
      alert('Please enter a Checkatrade ID');
      return;
    }

    statusArea.style.display = 'block';
    resultArea.style.display = 'none';
    progressContainer.style.display = 'none';
    statusEl.textContent = 'Fetching reviews from Checkatrade API...';

    try {
      await fetchReviews(checkatradeId);
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
    }
  });

  copyButton.addEventListener('click', () => {
    resultJson.select();
    document.execCommand('copy');

    // Visual feedback
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 2000);
  });

  async function fetchReviews(checkatradeId) {
    const BASE_URL = `https://api.checkatrade.com/v1/consumer-public/reviews/${checkatradeId}`;
    const PAGE_SIZE = 25;
    let page = 1;
    let totalReviews = 0;
    let fetchedReviews = 0;
    let allReviews = [];

    // First request to get the total number of reviews
    statusEl.textContent = 'Fetching first page...';

    try {
      const response = await fetch(`${BASE_URL}?size=${PAGE_SIZE}&page=${page}&orderDesc=createdAt`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      totalReviews = data.total;

      // Show progress bar now that we know the total
      progressContainer.style.display = 'block';
      statusEl.textContent = `Total reviews to fetch: ${totalReviews}`;

      // Process first page of reviews
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(review => {
          allReviews.push(review);
          fetchedReviews++;
          updateProgress(fetchedReviews, totalReviews);
        });
      }

      // Calculate total pages
      const totalPages = Math.ceil(totalReviews / PAGE_SIZE);

      // Fetch remaining pages
      while (page < totalPages) {
        page++;
        statusEl.textContent = `Fetching page ${page} of ${totalPages}...`;

        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));

        const pageResponse = await fetch(`${BASE_URL}?size=${PAGE_SIZE}&page=${page}&orderDesc=createdAt`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!pageResponse.ok) {
          throw new Error(`HTTP error! Status: ${pageResponse.status}`);
        }

        const pageData = await pageResponse.json();

        if (pageData.data && Array.isArray(pageData.data)) {
          pageData.data.forEach(review => {
            allReviews.push(review);
            fetchedReviews++;
            updateProgress(fetchedReviews, totalReviews);
          });
        }
      }

      const summary = {
        total: allReviews.length,
        averageRating: calculateAverageRating(allReviews),
        reviews: allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      };

      resultJson.value = JSON.stringify(summary, null, 2);
      resultArea.style.display = 'block';
      statusEl.textContent = `All ${fetchedReviews} reviews fetched successfully!`;

    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  function updateProgress(current, total) {
    const percentage = Math.round((current / total) * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
    statusEl.textContent = `Fetched ${current} of ${total} reviews (${percentage}%)`;
  }

  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;

    const sum = reviews.reduce((acc, review) => {
      return acc + (review.rating?.rating || 0);
    }, 0);

    return sum / reviews.length;
  }
});
</script>
