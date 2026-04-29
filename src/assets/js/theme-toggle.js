(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  function resolved() {
    var attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  button.addEventListener("click", function () {
    var next = resolved() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
})();
