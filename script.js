/* =========================================================
   Martins Store: script.js
   To change a price or add a drink, edit the lists below.
   ========================================================= */

// ---------- Store details (edit here) ----------
const STORE_NAME = "Martins Store";
const WHATSAPP_NUMBER = "2348166966893"; // international format, no + or spaces

// ---------- Price lists ----------
// b = brewery/group, n = name, pack = pack size, price = naira, approx = true if the price is approximate
const BEERS = [
  // International Breweries
  { b: "ib", n: "Trophy Lager",  pack: "12 × 60cl", price: 9000 },
  { b: "ib", n: "Hero Lager",    pack: "12 × 60cl", price: 11500 },
  { b: "ib", n: "Budweiser",     pack: "12 × 60cl", price: 13500 },
  { b: "ib", n: "Castle Lite",   pack: "12 × 60cl", price: 12500 },
  { b: "ib", n: "Eagle Lager",   pack: "12 × 60cl", price: 10500 },
  { b: "ib", n: "Trophy Stout",  pack: "12 × 60cl", price: 12000 },
  // Nigerian Breweries
  { b: "nb", n: "Star Lager",    pack: "12 × 60cl", price: 12000 },
  { b: "nb", n: "Gulder",        pack: "12 × 60cl", price: 14000 },
  { b: "nb", n: "Heineken",      pack: "12 × 60cl", price: 15500 },
  { b: "nb", n: "Goldberg",      pack: "12 × 60cl", price: 9500 },
  { b: "nb", n: "Life",          pack: "12 × 60cl", price: 11000 },
  { b: "nb", n: "33 Export",     pack: "12 × 50cl", price: 10000 },
  { b: "nb", n: "Legend Stout",  pack: "12 × 60cl", price: 16000 },
];

const BEVERAGES = [
  // Soft drinks
  { b: "soft", n: "Bigi Cola",         pack: "12 × 50cl PET", price: 3100 },
  { b: "soft", n: "Bigi Apple",        pack: "12 × 50cl PET", price: 3100, approx: true },
  { b: "soft", n: "Bigi Orange",       pack: "12 × 50cl PET", price: 3100, approx: true },
  { b: "soft", n: "Bigi Lemon-Lime",   pack: "12 × 50cl PET", price: 3100, approx: true },
  { b: "soft", n: "Bigi Tropical",     pack: "12 × 60cl PET", price: 3100, approx: true },
  { b: "soft", n: "American Cola",     pack: "12 × 60cl PET", price: 3800 },
  { b: "soft", n: "Coca-Cola",         pack: "12 × 50cl PET", price: 5800 },
  { b: "soft", n: "Fanta Orange",      pack: "12 × 50cl PET", price: 5800 },
  { b: "soft", n: "Sprite",            pack: "12 × 50cl PET", price: 5800, approx: true },
  { b: "soft", n: "Pepsi",             pack: "12 × 50cl PET", price: 4500, approx: true },
  { b: "soft", n: "7UP",               pack: "12 × 50cl PET", price: 4500, approx: true },
  // Energy drinks
  { b: "energy", n: "Fearless Energy Drink",  pack: "12 PET", price: 5000, approx: true },
  { b: "energy", n: "Predator Energy Drink",  pack: "12 PET", price: 5000, approx: true },
  { b: "energy", n: "Commando Energy Drink",  pack: "12 PET", price: 4500, approx: true },
  // Malt & milk
  { b: "malt", n: "Maltina",       pack: "12 PET", price: 6500, approx: true },
  { b: "malt", n: "Amstel Malta",  pack: "12 PET", price: 9000, approx: true },
  { b: "malt", n: "Vita Malt",     pack: "12 PET", price: 8000, approx: true },
  { b: "malt", n: "Dubic Malt",    pack: "24 PET", price: 12000, approx: true },
  { b: "malt", n: "Nutrimilk",     pack: "12 PET", price: 6000, approx: true },
];

const TAG_LABELS = {
  ib: "International Breweries",
  nb: "Nigerian Breweries",
  soft: "Soft Drink",
  energy: "Energy Drink",
  malt: "Malt & Milk",
};

const naira = (n) => "₦" + n.toLocaleString("en-US");

function orderLink(item, unit) {
  const msg =
    `Hello ${STORE_NAME}, I'd like to order 1 ${unit} of ${item.n} (${item.pack}). Is it available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function itemCard(item, unit) {
  return `
    <article class="item">
      <span class="tag tag-${item.b}">${TAG_LABELS[item.b]}</span>
      <h3>${item.n}</h3>
      <p class="pack">${item.pack}</p>
      <div class="item-foot">
        <span class="price">${item.approx ? "<i>≈</i>" : ""}${naira(item.price)}</span>
        <a class="order" href="${orderLink(item, unit)}" target="_blank" rel="noopener"
           aria-label="Order ${item.n} on WhatsApp">Order</a>
      </div>
    </article>`;
}

// ---------- Filterable list (tabs + search) ----------
function setupCatalog({ data, unit, listId, tabsId, searchId, countId, emptyId }) {
  const list = document.getElementById(listId);
  const tabs = document.getElementById(tabsId);
  const search = document.getElementById(searchId);
  const count = document.getElementById(countId);
  const empty = document.getElementById(emptyId);
  let filter = "all";

  function render() {
    const q = search.value.trim().toLowerCase();
    const shown = data.filter(
      (item) => (filter === "all" || item.b === filter) && item.n.toLowerCase().includes(q)
    );
    list.innerHTML = shown.map((item) => itemCard(item, unit)).join("");
    empty.hidden = shown.length > 0;
    count.textContent = shown.length > 0 ? `Showing ${shown.length} of ${data.length} items` : "";
  }

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    filter = btn.dataset.filter;
    tabs.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-pressed", String(t === btn)));
    render();
  });
  search.addEventListener("input", render);
  render();
}

setupCatalog({
  data: BEERS, unit: "crate",
  listId: "beerList", tabsId: "beerTabs", searchId: "beerSearch", countId: "beerCount", emptyId: "beerEmpty",
});
setupCatalog({
  data: BEVERAGES, unit: "pack",
  listId: "bevList", tabsId: "bevTabs", searchId: "bevSearch", countId: "bevCount", emptyId: "bevEmpty",
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---------- Header shadow on scroll ----------
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Highlight the current section in the menu ----------
const navAnchors = [...navLinks.querySelectorAll("a[href^='#']")].filter((a) => !a.classList.contains("btn"));
const sections = ["home","services","beers","beverages","about","gallery","contact"]
  .map((id) => document.getElementById(id)).filter(Boolean);

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Fade-in on scroll
  const reveal = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

// ---------- Scrolling tickers (duplicate content for a seamless loop) ----------
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".marquee-track").forEach((track) => {
    const originals = [...track.children];
    // Make sure one set is wider than the screen, then duplicate it once
    let guard = 0;
    while (track.scrollWidth < window.innerWidth * 1.2 && guard++ < 6) {
      originals.forEach((el) => {
        const copy = el.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        track.appendChild(copy);
      });
    }
    const half = [...track.children];
    half.forEach((el) => {
      const copy = el.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
  });
}

// ---------- "Open now" badge (Nigeria time, Monday to Saturday, 9am to 6pm) ----------
function updateOpenBadge() {
  const badge = document.getElementById("openBadge");
  if (!badge) return;

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type).value;
  const day = get("weekday");                       // Mon, Tue, ... Sun
  const minutes = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
  const OPEN = 9 * 60, CLOSE = 18 * 60;
  const isWorkday = day !== "Sun";

  badge.classList.remove("is-open", "is-closed");

  if (isWorkday && minutes >= OPEN && minutes < CLOSE) {
    badge.classList.add("is-open");
    badge.textContent = "Open now · closes 6:00 PM";
  } else {
    badge.classList.add("is-closed");
    if (isWorkday && minutes < OPEN) badge.textContent = "Closed now · opens today at 9:00 AM";
    else if (day === "Sat" || day === "Sun") badge.textContent = "Closed now · opens Monday at 9:00 AM";
    else badge.textContent = "Closed now · opens tomorrow at 9:00 AM";
  }
}
updateOpenBadge();
setInterval(updateOpenBadge, 60 * 1000);

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
