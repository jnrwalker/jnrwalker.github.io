// Apply the saved theme before the page paints. Storage can be unavailable in
// private browsers; theme switching still works for the current visit.
try {
  const savedTheme = localStorage.getItem("personal-page-theme");
  document.documentElement.dataset.theme =
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme =
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
