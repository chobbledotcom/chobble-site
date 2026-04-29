window.goatcounter = { no_onload: true };

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.goatcounter &&
    typeof window.goatcounter.count === "function"
  ) {
    window.goatcounter.count({
      path: location.pathname + location.search + location.hash,
    });
  }
});
