(() => {
  let map;
  let service;
  let urls;
  let container;
  let placeId;

  window.initGooglePlacesFinder = () => {
    let map = new google.maps.Map(document.createElement("div"));
    service = new google.maps.places.PlacesService(map);

    container = document.querySelector(".google-maps");
    urls = container.querySelector(".urls");
    placeId = container.querySelector(".place-id");
    resultsContainer = container.querySelector(".results-container");

    addFormEventListener();
    setInputFocusSelect();
  };

  function addFormEventListener() {
    container.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        urls.style.display = "none";
        placeId.style.display = "none";
        resultsContainer.style.display = "none";

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
      },
      true,
    );
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
})();
