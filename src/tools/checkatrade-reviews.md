---
layout: page.html
title: Checkatrade Reviews Fetcher / Scraper
meta_title: Checkatrade Reviews Scraper | Free Export Tool
meta_description: Export all your Checkatrade reviews to JSON - runs in your browser, no data sent to servers - free tool from Manchester web developer
---

# Checkatrade Reviews Scraper

You might want to **export all of your Checkatrade reviews to JSON**, for example to import them into your [static website's data files](/services/static-websites).

This page lets you do that. The fetching happens client-side in your browsers - no information is sent to me.

You will need your Checkatrade ID. You can find this by:

- Visiting your company's page on a computer
- Right-clicking it and choosing "View Source"
- Typing `ctrl+f` or `cmd+f` (mac) to search for `companyId`
- The numbers immediately following this are your ID.

_(Accurate May 2025 - fill in the form below if this doesn't work.)_

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
(function() {
  let initialized = false;
  let fetchButtonListener = null;
  let copyButtonListener = null;

  const initCheckatradeTool = () => {
    if (initialized) return;
    
    const fetchButton = document.getElementById('fetchButton');
    const statusArea = document.getElementById('statusArea');
    const resultArea = document.getElementById('resultArea');
    const statusEl = document.getElementById('status');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = progressBar?.parentElement;
    const resultJson = document.getElementById('resultJson');
    const copyButton = document.getElementById('copyButton');
    
    if (!fetchButton || !statusArea || !resultArea || !statusEl || !progressBar || !resultJson || !copyButton) {
      return;
    }

    fetchButtonListener = async () => {
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
    };
    
    fetchButton.addEventListener('click', fetchButtonListener);

    copyButtonListener = () => {
      resultJson.select();
      document.execCommand('copy');

      // Visual feedback
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);
    };
    
    copyButton.addEventListener('click', copyButtonListener);
    
    initialized = true;
  };

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
  
  const cleanupCheckatradeTool = () => {
    const fetchButton = document.getElementById('fetchButton');
    const copyButton = document.getElementById('copyButton');
    
    if (fetchButton && fetchButtonListener) {
      fetchButton.removeEventListener('click', fetchButtonListener);
      fetchButtonListener = null;
    }
    
    if (copyButton && copyButtonListener) {
      copyButton.removeEventListener('click', copyButtonListener);
      copyButtonListener = null;
    }
    
    initialized = false;
  };
  
  document.addEventListener('DOMContentLoaded', initCheckatradeTool);
  document.addEventListener('turbo:load', initCheckatradeTool);
  document.addEventListener('turbo:before-cache', cleanupCheckatradeTool);
})();
</script>

---

## How the Checkatrade Scraper Works

The code behind the scraper is pretty straightforward - it uses plain "Vanilla" JavaScript, with no complicated framework or server-side processing. You can view all of the code involved by right clicking this page and choosing _"View Source"_ or by [clicking here to view it on Git](https://git.chobble.com/chobble/chobble-site/src/branch/main/src/tools/checkatrade-reviews.md).

### Setting Things Up

When the page loads, first I grab references to all the HTML elements I'll need to interact with:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchButton");
  const statusArea = document.getElementById("statusArea");
  // ...more element references
});
```

This is a common pattern in vanilla JavaScript - wait for the DOM to be fully loaded before trying to access any elements. This ensures everything's in place before I start attaching event listeners.

### Handling the Button Click

The fun begins when you click the _"Fetch Reviews"_ button:

```javascript
fetchButton.addEventListener("click", async () => {
  const checkatradeId = document.getElementById("checkatradeId").value.trim();

  if (!checkatradeId) {
    alert("Please enter a Checkatrade ID");
    return;
  }

  // Setup UI for fetching process
  statusArea.style.display = "block";
  resultArea.style.display = "none";
  // ...more UI setup

  try {
    await fetchReviews(checkatradeId);
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
  }
});
```

First, it validates that you've entered an ID, then sets up the UI to show progress, and finally calls the main function that does all the heavy lifting.

### Dealing with Pagination

One of the trickier bits with fetching reviews is that Checkatrade (like most APIs) doesn't give you all reviews at once. Instead, they use pagination - returning reviews in "pages" of 25 at a time:

```javascript
async function fetchReviews(checkatradeId) {
  const BASE_URL = `https://api.checkatrade.com/v1/consumer-public/reviews/${checkatradeId}`;
  const PAGE_SIZE = 25;
  let page = 1;
  let totalReviews = 0;
  let fetchedReviews = 0;
  let allReviews = [];

  // First request to get the total number of reviews
  statusEl.textContent = "Fetching first page...";

  // Fetch code...
}
```

The clever bit is that the first API call serves a dual purpose - it fetches the first page of reviews, but crucially, it also tells me how many reviews there are in total:

```javascript
const data = await response.json();
totalReviews = data.total;

// Show progress bar now that I know the total
progressContainer.style.display = "block";
statusEl.textContent = `Total reviews to fetch: ${totalReviews}`;

// Process first page of reviews
if (data.data && Array.isArray(data.data)) {
  data.data.forEach((review) => {
    allReviews.push(review);
    fetchedReviews++;
    updateProgress(fetchedReviews, totalReviews);
  });
}
```

With this information, I can calculate how many pages I need to fetch and update the progress bar accordingly. This bit of visual feedback means the short delay while the reviews are fetched feels much faster.

### Fetching the Rest

Now comes the loop to fetch all remaining pages:

```javascript
// Calculate total pages
const totalPages = Math.ceil(totalReviews / PAGE_SIZE);

// Fetch remaining pages
while (page < totalPages) {
  page++;
  statusEl.textContent = `Fetching page ${page} of ${totalPages}...`;

  // Small delay to avoid hitting rate limits
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const pageResponse = await fetch(
    `${BASE_URL}?size=${PAGE_SIZE}&page=${page}&orderDesc=createdAt`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  // ...process the response data
}
```

A couple of interesting bits here:

1. I use `Math.ceil` to round up when calculating total pages - if there are 26 reviews with a page size of 25, I need 2 pages, not 1.1 pages!

2. That small delay between requests helps ensure we are being nice web citizens. APIs often have rate limits, and hammering them with requests as fast as possible is a good way to get your IP temporarily blocked. The one-second delay is a polite pause that keeps everyone happy and doesn't hold the script up too much.

### Organizing the Results

After fetching all reviews, I need to organize them into a useful structure:

```javascript
const summary = {
  total: allReviews.length,
  averageRating: calculateAverageRating(allReviews),
  reviews: allReviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  ),
};

resultJson.value = JSON.stringify(summary, null, 2);
resultArea.style.display = "block";
statusEl.textContent = `All ${fetchedReviews} reviews fetched successfully!`;
```

The sorting is worth noting - I'm sorting by date, most recent first. The `new Date()` constructor converts the date strings to JavaScript Date objects, which can then be compared numerically.

The second parameter to `JSON.stringify` is a replacer function (which I'm not using here, hence `null`), and the third parameter (`2`) specifies the number of spaces to use for indentation. This gives us nicely formatted JSON that's easy to read.

### Helper Functions

My script includes two helper functions. First, there's `updateProgress`:

```javascript
function updateProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  progressBar.style.width = `${percentage}%`;
  progressBar.textContent = `${percentage}%`;
  statusEl.textContent = `Fetched ${current} of ${total} reviews (${percentage}%)`;
}
```

This updates both the visual progress bar and the text status message. The CSS width property creates the visual effect of the progress bar filling up.

And then there's `calculateAverageRating`:

```javascript
function calculateAverageRating(reviews) {
  if (!reviews.length) return 0;

  const sum = reviews.reduce((acc, review) => {
    return acc + (review.rating?.rating || 0);
  }, 0);

  return sum / reviews.length;
}
```

This uses the array's `reduce` method to sum up all ratings, and then divides by the number of reviews to get the average. The optional chaining operator (`?.`) is a nifty bit of modern JavaScript that prevents errors if a review doesn't have a rating property.

### Copying to the Clipboard

Once you've fetched all your reviews, you'll want to save them. I've added a simple copy-to-clipboard function:

```javascript
copyButton.addEventListener("click", () => {
  resultJson.select();
  document.execCommand("copy");

  // Visual feedback
  const originalText = copyButton.textContent;
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 2000);
});
```

This selects all text in the textarea and uses the (admittedly deprecated but still widely supported) `execCommand('copy')` method to copy it to the clipboard. It also provides visual feedback by temporarily changing the button text.

### Why This Approach?

You might wonder why I'm doing this client-side in the browser instead of on a server. There are a few good reasons:

1. **Privacy**: Your Checkatrade ID and reviews never touch my servers.
2. **Simplicity**: No need for a backend, databases, or any server-side code.
3. **Cost**: Server resources cost money; browser resources are effectively free.

The downside is that if Checkatrade changes their API, the scraper might stop working. But that's true of any scraper, whether client-side or server-side.

## Interested?

If you'd like a custom review or data scraper, or any other automation for your business, fill in the form below. This Checkatrade example is straightforward but I have written much more complex scrapers for clients in the past and am always up for a challenge.
