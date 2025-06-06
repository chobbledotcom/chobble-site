(() => {
  let map;
  let service;
  let urls;
  let container;
  let placeId;
  let resultsContainer;
  let initialized = false;
  let formListener = null;
  
  const cleanup = () => {
    if (formListener && container) {
      container.removeEventListener("submit", formListener, true);
      formListener = null;
    }
    
    if (urls) {
      urls.querySelectorAll("input").forEach((input) => {
        input.onfocus = null;
        input.onmouseup = null;
      });
    }
    
    initialized = false;
  };

  window.initGooglePlacesFinder = () => {
    if (initialized) return;
    
    container = document.querySelector(".google-maps");
    if (!container) return;
    
    let map = new google.maps.Map(document.createElement("div"));
    service = new google.maps.places.PlacesService(map);

    urls = container.querySelector(".urls");
    placeId = container.querySelector(".place-id");
    resultsContainer = container.querySelector(".results-container");

    addFormEventListener();
    setInputFocusSelect();
    initialized = true;
  };

  function addFormEventListener() {
    formListener = (e) => {
      e.preventDefault();
      if (urls) urls.style.display = "none";
      if (placeId) placeId.style.display = "none";
      if (resultsContainer) resultsContainer.style.display = "none";

      const query = container.querySelector(".search-text").value;
      if (!query) return;

      const request = {
        query: query,
        fields: [
          "place_id",
          "name",
          "formatted_address",
          "rating",
          "user_ratings_total",
        ],
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          loadResults(results);
        } else {
          alert("No results found");
        }
      });
    };
    
    container.addEventListener("submit", formListener, true);
  }

  function loadResults(places) {
    resultsContainer.style.display = "block";

    const list = container.querySelector(".results-list");
    list.innerHTML = "";

    places.forEach((place) => {
      const card = document.createElement("div");
      card.className = "place-card";
      card.innerHTML = `
        <strong>${place.name}</strong>
        <small>
          <br>
          ${place.formatted_address}
          <br>
          ${
            place.rating
              ? `
                <strong>Rating:</strong>
                ${place.rating} ⭐ (${place.user_ratings_total} reviews)
              `
              : ""
          }
        </small>
      `;

      card.onclick = () => selectPlace(place, card);
      list.appendChild(card);
    });
  }

  function selectPlace(place, card) {
    container
      .querySelectorAll(".place-card")
      .forEach((c) => c.classList.remove("selected"));

    card.classList.add("selected");

    placeId.style.display = "block";
    placeId.textContent = `Place ID: ${place.place_id}`;

    addUrls(
      `https://search.google.com/local/reviews?placeid=${place.place_id}`,
      urls.querySelector(".read"),
    );

    addUrls(
      `https://search.google.com/local/writereview?placeid=${place.place_id}`,
      urls.querySelector(".write"),
    );

    urls.style.display = "flex";
  }

  function addUrls(url, el) {
    el.querySelector("a").href = url;
    el.querySelector("input").value = url;
    el.querySelector(".qr").innerHTML = "";
    new QRCode(el.querySelector(".qr"), {
      text: url,
      correctLevel: QRCode.CorrectLevel.M,
    });
  }

  function setInputFocusSelect() {
    if (!urls) return;
    
    urls.querySelectorAll("input").forEach((input) => {
      input.onfocus = () => {
        input.select();
      };
      input.onmouseup = () => {
        return false;
      };
      input.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
          return false;
        }
      });
    });
  }
  
  // Turbo compatibility
  document.addEventListener("turbo:load", () => {
    if (window.google && window.google.maps && document.querySelector(".google-maps")) {
      window.initGooglePlacesFinder();
    }
  });
  
  document.addEventListener("turbo:before-cache", cleanup);
})();
