(() => {
  const config = window.SITE_CONFIG || {};
  const name = config.name || "Jacob Walker";
  document.querySelectorAll("[data-name]").forEach(element => { element.textContent = name; });
  document.title = `${name} | Imperial College London`;
  document.querySelector('meta[name="description"]').content = `${name} — third-year PhD student in Machine Learning at Imperial College London, on the AI for Healthcare CDT programme.`;
  document.getElementById("copyright-year").textContent = new Date().getFullYear();
  document.getElementById("portrait-initials").textContent = name.trim().split(/\s+/).filter(Boolean).map(word => word[0]).filter((_, index, words) => index === 0 || index === words.length - 1).join("");

  if (config.role) document.getElementById("profile-role").textContent = config.role;
  if (config.location) document.getElementById("profile-location").textContent = config.location;

  // Relative assets work on both username.github.io and /repository/ sites.
  function safeURL(value, protocols = ["https:", "http:"]) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim(), document.baseURI);
      return protocols.includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  const photo = document.getElementById("profile-photo");
  const photoURL = safeURL(config.photo);
  if (photoURL) {
    photo.alt = name;
    photo.style.objectPosition = config.photoPosition || "50% 50%";
    photo.addEventListener("load", () => {
      photo.hidden = false;
      document.getElementById("portrait-initials").hidden = true;
    });
    photo.addEventListener("error", () => {
      photo.hidden = true;
      document.getElementById("portrait-initials").hidden = false;
    });
    photo.src = photoURL;
  }

  const cvURL = safeURL(config.cv);
  if (cvURL) {
    const cv = document.getElementById("nav-cv");
    cv.href = cvURL;
    cv.target = "_blank";
    cv.rel = "noopener noreferrer";
    cv.setAttribute("aria-label", "CV (PDF, opens in a new tab)");
    cv.hidden = false;
  }

  const profiles = [
    ["email", "Email", "mail"],
    ["googleScholar", "Google Scholar", "scholar"],
    ["github", "GitHub", "github"],
    ["linkedin", "LinkedIn", "linkedin"],
    ["orcid", "ORCID", "link"],
    ["bluesky", "Bluesky", "link"],
    ["x", "X / Twitter", "link"],
  ];
  const list = document.getElementById("social-links");
  profiles.forEach(([key, label, icon]) => {
    const value = config.links?.[key];
    if (typeof value !== "string" || !value.trim()) return;
    const href = key === "email"
      ? `mailto:${value.trim().replace(/^mailto:/i, "")}`
      : safeURL(value);
    if (!href) return;
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    // Only the icon name comes from the fixed list above; settings use textContent.
    link.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-${icon}"/></svg>`;
    const text = document.createElement("span");
    text.textContent = label;
    link.append(text);
    item.append(link);
    list.append(item);
  });

  const toggle = document.querySelector(".theme-toggle");
  function updateThemeLabel() {
    const label = `Switch to ${document.documentElement.dataset.theme === "dark" ? "light" : "dark"} theme`;
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  }
  toggle.hidden = false;
  updateThemeLabel();
  toggle.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("personal-page-theme", theme); } catch { /* Optional preference. */ }
    updateThemeLabel();
  });
})();
