document.addEventListener("click", function (e) {
  var img = e.target.closest(".image-gallery > *");
  if (!img) return;

  var gallery = img.parentElement;
  var rect = gallery.getBoundingClientRect();
  var imgRect = img.getBoundingClientRect();

  // Already fully visible — do nothing
  if (imgRect.left >= rect.left && imgRect.right <= rect.right) return;

  var items = gallery.children;
  var isFirst = img === items[0];
  var isLast = img === items[items.length - 1];
  var extra = isFirst || isLast ? 0 : 60;

  if (imgRect.left < rect.left) {
    gallery.scrollBy({ left: imgRect.left - rect.left - extra, behavior: "smooth" });
  } else {
    gallery.scrollBy({ left: imgRect.right - rect.right + extra, behavior: "smooth" });
  }
});
