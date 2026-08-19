/* ==========================================================================
   Sunset Cinema Club — shared behavior
   Runs on every page. Reads shared data from data.js where present.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initFooterYear();
  initCitySelects();
  initFaqAccordion();
  initGallery();
  initTierSelect();
  initForms();
  initEventTabs();

  if (document.getElementById("home-events")) renderEventList("home-events", EVENTS.slice(0, 3));
  if (document.getElementById("events-list")) renderEventPage();
  if (document.getElementById("venue-types")) renderVenueTypes();
  if (document.getElementById("gallery-grid")) renderGallery();
  if (document.getElementById("faq-list")) renderFaqs();
  if (document.getElementById("event-detail")) renderEventDetail();
});

/* -------------------------------------------------------------------- */
/* Mobile nav                                                            */
/* -------------------------------------------------------------------- */
function initNavToggle(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
  }));
}

function initFooterYear(){
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* -------------------------------------------------------------------- */
/* City selects — keep every dropdown on the page in sync (in-memory)    */
/* -------------------------------------------------------------------- */
let selectedCity = "Mumbai";

function initCitySelects(){
  document.querySelectorAll(".city-select").forEach(sel => {
    CITIES.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      if (city === selectedCity) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", (e) => {
      selectedCity = e.target.value;
      document.querySelectorAll(".city-select").forEach(s => s.value = selectedCity);
      if (document.getElementById("events-list")) renderEventPage();
    });
  });
}

/* -------------------------------------------------------------------- */
/* Icons — small inline SVG set so the whole site has zero image deps    */
/* -------------------------------------------------------------------- */
const ICONS = {
  building: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h1M8 11h1M8 15h1M15 7h1M15 11h1M15 15h1M10 21v-3h4v3"/></svg>',
  beer: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h11v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"/><path d="M16 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/><path d="M5 8 6 3h7l1 5"/></svg>',
  wave: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 11c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>',
  amphitheatre: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 20c0-5 4-9 9-9s9 4 9 9"/><path d="M3 20h18M7 20c0-3 2.5-5.5 5-5.5S17 17 17 20"/></svg>',
  hotel: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6M3 21h18"/></svg>',
  car: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 16v-3l2-5h12l2 5v3"/><path d="M4 16h16M6 16v2M18 16v2"/><circle cx="7.5" cy="16" r="1.2"/><circle cx="16.5" cy="16" r="1.2"/></svg>',
  glass: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12l-1.5 9a4.5 4.5 0 0 1-9 0L6 3Z"/><path d="M12 15v6M8 21h8"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  reel: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><circle cx="12" cy="6.3" r="1.6"/><circle cx="17" cy="9.5" r="1.6"/><circle cx="15.2" cy="15.6" r="1.6"/><circle cx="8.8" cy="15.6" r="1.6"/><circle cx="7" cy="9.5" r="1.6"/></svg>'
};

/* -------------------------------------------------------------------- */
/* Ticket card markup                                                    */
/* -------------------------------------------------------------------- */
function formatDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function ticketCard(ev){
  return `
  <article class="ticket">
    <div class="ticket-art ${ev.art}">
      <span class="tag">${ev.tag}</span>
    </div>
    <div class="ticket-stub">
      <h3 class="ticket-title">${ev.title}</h3>
      <div class="ticket-meta">
        <span><strong>${formatDate(ev.date)}</strong> · ${ev.time}</span>
        <span>${ev.venue}, ${ev.city}</span>
      </div>
      <div class="ticket-actions">
        <a class="btn btn-primary btn-sm" href="event-detail.html?id=${ev.id}">Buy tickets</a>
        <a class="btn btn-ghost btn-sm" href="event-detail.html?id=${ev.id}">Details</a>
        <span class="ticket-price">${ev.price}</span>
      </div>
    </div>
  </article>`;
}

function renderEventList(targetId, events){
  const target = document.getElementById(targetId);
  if (!target) return;
  if (!events.length){
    target.innerHTML = `<div class="empty-state">No screenings match that filter yet — check another city or check back soon.</div>`;
    return;
  }
  target.innerHTML = events.map(ticketCard).join("");
}

/* -------------------------------------------------------------------- */
/* Events page — city tabs                                               */
/* -------------------------------------------------------------------- */
function initEventTabs(){
  const tabWrap = document.getElementById("city-tabs");
  if (!tabWrap) return;
  const tabs = ["All", ...CITIES].map(city =>
    `<button class="tab ${city === "All" ? "is-active" : ""}" data-city="${city}">${city}</button>`
  ).join("");
  tabWrap.innerHTML = tabs;
  tabWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    tabWrap.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderEventPage(btn.dataset.city);
  });
}

function renderEventPage(city){
  const activeTab = document.querySelector("#city-tabs .tab.is-active");
  const chosen = city || (activeTab ? activeTab.dataset.city : "All");
  const filtered = chosen === "All" ? EVENTS : EVENTS.filter(e => e.city === chosen);
  renderEventList("events-list", filtered);
}

/* -------------------------------------------------------------------- */
/* Event detail page                                                     */
/* -------------------------------------------------------------------- */
function renderEventDetail(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const ev = EVENTS.find(e => e.id === id) || EVENTS[0];
  const target = document.getElementById("event-detail");

  target.innerHTML = `
    <div class="breadcrumb"><a href="events.html">Events</a> / ${ev.tag}</div>
    <div class="two-col">
      <div class="screen" style="aspect-ratio:4/3;">
        <div class="screen-glow"></div>
        ${ICONS.reel.replace('width="28" height="28"', 'width="80" height="80"')}
      </div>
      <div>
        <span class="badge">${ev.tag}</span>
        <h1 style="margin-top:0.6rem; font-size:clamp(1.6rem,3vw,2.4rem);">${ev.title}</h1>
        <p class="lede" style="margin-top:0.8rem;">${ev.synopsis}</p>
        <div class="ticket-meta" style="margin-top:1.4rem; font-size:0.95rem;">
          <span><strong>${formatDate(ev.date)} · ${ev.time}</strong></span>
          <span>${ev.venue}, ${ev.city}</span>
          <span>Ticket price: ${ev.price}</span>
        </div>
        <div class="hero-actions" style="margin-top:1.6rem;">
          <button class="btn btn-primary" id="buy-btn" type="button">Buy tickets — ${ev.price}</button>
          <a class="btn btn-outline" href="private-screening.html">Book this for a private group</a>
        </div>
        <div class="form-success" id="buy-success">You're in! A confirmation with your seat details will land in your inbox shortly.</div>
      </div>
    </div>
  `;

  document.getElementById("buy-btn").addEventListener("click", () => {
    document.getElementById("buy-success").classList.add("is-visible");
  });

  const related = EVENTS.filter(e => e.id !== ev.id && e.city === ev.city).slice(0, 3);
  const relatedWrap = document.getElementById("related-events");
  if (relatedWrap){
    relatedWrap.innerHTML = (related.length ? related : EVENTS.filter(e => e.id !== ev.id).slice(0,3)).map(ticketCard).join("");
  }
}

/* -------------------------------------------------------------------- */
/* Venues page                                                           */
/* -------------------------------------------------------------------- */
function renderVenueTypes(){
  const target = document.getElementById("venue-types");
  target.innerHTML = VENUE_TYPES.map(v => `
    <div class="feature">
      <div class="icon">${ICONS[v.icon] || ICONS.building}</div>
      <h3>${v.name}</h3>
      <p>${v.desc}</p>
    </div>
  `).join("");
}

/* -------------------------------------------------------------------- */
/* Gallery                                                                */
/* -------------------------------------------------------------------- */
function renderGallery(){
  const target = document.getElementById("gallery-grid");
  target.innerHTML = GALLERY_ITEMS.map((g, i) => `
    <div class="gallery-tile ${g.art}" data-index="${i}">
      <span>${g.tag}</span>
    </div>
  `).join("");
}

function initGallery(){
  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  if (!grid || !lightbox) return;
  const inner = lightbox.querySelector(".lightbox-inner");
  const caption = lightbox.querySelector(".lightbox-caption");

  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".gallery-tile");
    if (!tile) return;
    const item = GALLERY_ITEMS[tile.dataset.index];
    inner.className = "lightbox-inner " + item.art;
    caption.textContent = item.tag;
    lightbox.classList.add("is-open");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.closest(".lightbox-close")) {
      lightbox.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("is-open");
  });
}

/* -------------------------------------------------------------------- */
/* FAQ                                                                    */
/* -------------------------------------------------------------------- */
function renderFaqs(){
  const target = document.getElementById("faq-list");
  target.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" aria-expanded="false">
        <span>${f.q}</span>
        <span class="plus" aria-hidden="true"></span>
      </button>
      <div class="faq-a"><p style="padding-top:0;">${f.a}</p></div>
    </div>
  `).join("");
}

function initFaqAccordion(){
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-q");
    if (!btn) return;
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    answer.style.maxHeight = isOpen ? answer.scrollHeight + 24 + "px" : "0px";
  });
}

/* -------------------------------------------------------------------- */
/* Gift card tier select                                                 */
/* -------------------------------------------------------------------- */
function initTierSelect(){
  const wrap = document.getElementById("tier-grid");
  if (!wrap) return;
  const total = document.getElementById("tier-total");
  wrap.addEventListener("click", (e) => {
    const tier = e.target.closest(".tier");
    if (!tier) return;
    wrap.querySelectorAll(".tier").forEach(t => t.classList.remove("is-selected"));
    tier.classList.add("is-selected");
    if (total) total.textContent = tier.dataset.amount;
  });
}

/* -------------------------------------------------------------------- */
/* Forms — all forms on the site are demo-only, no backend                */
/* -------------------------------------------------------------------- */
function initForms(){
  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector(".form-success") || form.querySelector(".form-success");
      if (success){
        success.classList.add("is-visible");
      }
      form.reset();
    });
  });
}