const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");

const ACTIVE_CLASSES = [
  "font-semibold",
  "bg-cloud-blue",
  "border-l-[3px]",
  "border-primary!",
];

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
}
function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

menuBtn.addEventListener("click", () => {
  const isOpen = !sidebar.classList.contains("-translate-x-full");
  isOpen ? closeSidebar() : openSidebar();
});
overlay.addEventListener("click", closeSidebar);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) closeSidebar();
});

// Strip trailing slash so "/bookings/" and "/bookings" compare equal
function normalizePath(path) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

const currentPath = normalizePath(window.location.pathname);

document.querySelectorAll(".nav-link").forEach((link) => {
  const rawHref = link.getAttribute("href");

  // Skip placeholder links entirely — they shouldn't participate in matching
  if (!rawHref || rawHref === "#") return;

  const linkPath = normalizePath(new URL(link.href).pathname);

  if (linkPath === currentPath) {
    link.classList.add(...ACTIVE_CLASSES);
  }

  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) closeSidebar();
  });
});