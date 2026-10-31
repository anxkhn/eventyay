const paths = {
  search: "M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1",
  calendar: "M4 5h16v16H4z M4 10h16M8 3v4M16 3v4",
  ticket: "M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z M15 6v3m0 2v2m0 2v3",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.9 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  settings:
    "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  check: "M5 12l4 4L19 6",
  close: "M6 6l12 12M6 18 18 6",
  clock: "M12 7v5l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  sun: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  video: "M3 6h12v12H3z M15 10l6-4v12l-6-4",
  edit: "m16 3 5 5-13 13H3v-5Z M14 5l5 5",
  plus: "M12 5v14M5 12h14",
  mail: "M3 5h18v14H3z M3 5l9 8 9-8",
  chart: "M4 20V10m8 10V4m8 16v-7",
  globe:
    "M2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.calendar}"/></svg>`;
const flower = (kind = 0, cls = "art-symbol") =>
  `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true">${kind % 3 === 0 ? '<g fill="currentColor">' + Array.from({ length: 12 }, (_, i) => `<rect x="86" y="0" width="28" height="105" rx="13" transform="rotate(${i * 30} 100 100)"/>`).join("") + "</g>" : kind % 3 === 1 ? '<g fill="none" stroke="currentColor" stroke-width="18">' + [28, 48, 68, 88].map((r) => `<circle cx="100" cy="100" r="${r}"/>`).join("") + "</g>" : '<g fill="currentColor">' + Array.from({ length: 6 }, (_, i) => `<ellipse cx="100" cy="50" rx="27" ry="50" transform="rotate(${i * 60} 100 100)"/>`).join("") + "</g>"}</svg>`;
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Eventyay preview could not save browser preferences", error);
    notify("Changes work here, but your browser could not save them.");
  }
}
const initialEvents = [
  {
    id: 1,
    name: "Open Source Summit",
    art: "Open minds.\nOpen source.",
    type: "Technology",
    city: "Singapore",
    date: "NOV 14",
    fullDate: "November 14–15, 2026",
    price: 49,
    color: "orange",
    host: "FOSSASIA community",
    description:
      "Two days of shared ideas, hands-on building, and conversations that continue long after the last talk. Meet the people making open technology possible.",
  },
  {
    id: 2,
    name: "Design, in good company",
    art: "Less pixels.\nMore people.",
    type: "Design",
    city: "Berlin",
    date: "NOV 18",
    fullDate: "November 18, 2026",
    price: 35,
    color: "lilac",
    host: "Design Together",
    description:
      "A gathering for curious designers. Practical workshops, honest conversations, and a fresh perspective on the things we make.",
  },
  {
    id: 3,
    name: "The Sunday Sessions",
    art: "Slow down.\nTune in.",
    type: "Music",
    city: "London",
    date: "NOV 22",
    fullDate: "November 22, 2026",
    price: 0,
    color: "lime",
    host: "Sunday Collective",
    description:
      "An easy afternoon of independent music, new friends, and good conversation. Come as you are and stay for a song.",
  },
  {
    id: 4,
    name: "Build something together",
    art: "Small ideas.\nBig energy.",
    type: "Technology",
    city: "Online",
    date: "NOV 26",
    fullDate: "November 26, 2026",
    price: 0,
    color: "blue",
    host: "Open Builders",
    description:
      "Make something useful alongside other open-source builders. Bring a project, a question, or just your curiosity.",
  },
  {
    id: 5,
    name: "Creative Commons Club",
    art: "Meet your\nkind of minds.",
    type: "Community",
    city: "Amsterdam",
    date: "DEC 02",
    fullDate: "December 2, 2026",
    price: 15,
    color: "pink",
    host: "Commons Club",
    description:
      "An evening for makers, thinkers, and anyone with an idea to share. Learn from each other and make unexpected connections.",
  },
  {
    id: 6,
    name: "A taste of the neighborhood",
    art: "Good food.\nBetter company.",
    type: "Food & drink",
    city: "Singapore",
    date: "DEC 06",
    fullDate: "December 6, 2026",
    price: 25,
    color: "sand",
    host: "Local Table",
    description:
      "Pull up a chair. Discover local flavors and the people behind them at a community-led food gathering.",
  },
];
let events = read("ey-events", initialEvents),
  saved = read("ey-saved", []),
  tickets = read("ey-tickets", []),
  prefs = read("ey-prefs", {
    accent: "#f56632",
    dark: false,
    motion: true,
    density: "comfortable",
  }),
  checked = read("ey-checkin", []),
  sessionSaved = read("ey-sessions", []);
const attendees = [
  ["Alex Morgan", "alex@example.test"],
  ["Sam Rivera", "sam@example.test"],
  ["Jordan Lee", "jordan@example.test"],
  ["Taylor Chen", "taylor@example.test"],
  ["Casey Wilson", "casey@example.test"],
  ["Robin Shah", "robin@example.test"],
];
const sessions = [
  [
    "09:00",
    "Opening the doors to open source",
    "Maya Tan",
    "Main stage",
    "Keynote",
  ],
  [
    "10:00",
    "Build tools people actually want to use",
    "Alex Morgan",
    "Studio A",
    "Workshop",
  ],
  [
    "11:30",
    "Designing for everyone, from day one",
    "Sam Rivera",
    "Main stage",
    "Design",
  ],
  [
    "13:00",
    "Lunch, conversations & happy accidents",
    "Community",
    "Courtyard",
    "Community",
  ],
  [
    "14:00",
    "Your first meaningful open-source contribution",
    "Jordan Lee",
    "Studio B",
    "Workshop",
  ],
  [
    "16:00",
    "What we can build together",
    "Maya Tan & friends",
    "Main stage",
    "Panel",
  ],
];
let category = "All events",
  query = "",
  locationFilter = "Anywhere",
  view = "grid",
  onlySaved = false,
  day = 0,
  detailTab = "About",
  attendeeQuery = "";
const main = document.querySelector("#main"),
  dialog = document.querySelector("#dialog");
const visitedRoutes = new Set();
document.addEventListener(
  "keydown",
  () => (document.documentElement.dataset.input = "keyboard"),
  true,
);
document.addEventListener(
  "pointerdown",
  () => (document.documentElement.dataset.input = "pointer"),
  true,
);
document.querySelector("#motion-toggle").addEventListener("click", () => {
  prefs.motion = !prefs.motion;
  applyPrefs();
  const setting = document.querySelector("#motion-mode");
  if (setting) setting.checked = prefs.motion;
});
document.querySelector("#appearance").innerHTML = icon("settings");
function notify(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => el.classList.remove("visible"), 3500);
}
function luminance(hex) {
  const rgb = hex
    .match(/[a-f\d]{2}/gi)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function applyPrefs() {
  const root = document.documentElement;
  root.dataset.theme = prefs.dark ? "dark" : "light";
  root.dataset.motion = prefs.motion ? "on" : "off";
  root.dataset.density = prefs.density;
  const motionToggle = document.querySelector("#motion-toggle");
  motionToggle.textContent = prefs.motion ? "Pause" : "Play";
  motionToggle.setAttribute(
    "aria-label",
    prefs.motion ? "Pause animations" : "Enable animations",
  );
  motionToggle.setAttribute("aria-pressed", String(!prefs.motion));
  document.querySelector('meta[name="theme-color"]').content = prefs.dark
    ? "#1e201c"
    : "#fcfcfa";
  root.style.setProperty("--accent", prefs.accent);
  root.style.setProperty(
    "--on-accent",
    luminance(prefs.accent) > 0.179 ? "#181b16" : "#ffffff",
  );
  root.style.setProperty(
    "--accent-soft",
    prefs.dark
      ? `color-mix(in srgb, ${prefs.accent} 16%, #282b25)`
      : `color-mix(in srgb, ${prefs.accent} 12%, white)`,
  );
  root.style.setProperty(
    "--accent-ink",
    prefs.dark
      ? `color-mix(in srgb, ${prefs.accent} 45%, white)`
      : `color-mix(in srgb, ${prefs.accent} 40%, #151813)`,
  );
  persist("ey-prefs", prefs);
}
applyPrefs();
function button(text, action, cls = "secondary", extra = "") {
  return `<button class="button ${cls}" data-action="${action}" ${extra}>${text}</button>`;
}
function eventArt(e) {
  return `<div class="event-art ${e.color}"><div class="art-type">${escape(e.host)}</div><div class="art-title">${escape(e.art).replaceAll("\n", "<br>")}</div>${flower(e.id)}<span class="art-bottom">${escape(e.city.toUpperCase())} · ${escape(e.date)}</span></div>`;
}
function eventCard(e) {
  return `<article class="event-card"><a href="#event/${e.id}" aria-label="View ${escape(e.name)}">${eventArt(e)}</a><button class="save-event" data-save="${e.id}" aria-pressed="${saved.includes(e.id)}" aria-label="${saved.includes(e.id) ? "Unsave" : "Save"} ${escape(e.name)}">${icon("heart")}</button><p class="event-meta">${escape(e.date)}, 2026 · ${escape(e.type.toUpperCase())}</p><h3><a href="#event/${e.id}">${escape(e.name)}</a></h3><p class="event-location">${icon("pin")}${escape(e.city)}${e.city === "Online" ? " · Join from anywhere" : ""}</p><div class="event-foot"><strong>${e.price ? `From $${e.price}` : "Free admission"}</strong><span>${escape(e.host)}</span></div></article>`;
}
function discover() {
  return `<div class="page page-enter"><section class="hero"><div><h1>Make room<br>for <span>more.</span></h1><p class="hero-description">More ideas. More people. More moments worth showing up for. Find your next thing.</p><div class="hero-links"><a class="button" href="#explore">Explore events ${icon("arrow")}</a><a class="text-link" href="#dashboard">Bring people together ↗</a></div></div><div class="hero-art" aria-label="A colorful collection of community event posters"><div class="poster lime"><small>THE SUNDAY SESSIONS</small><strong>Good<br>vibes.<br>Real life.</strong>${flower(2, "poster-asterisk")}<span class="poster-bottom">LONDON<br>NOV 22, 2026</span></div><div class="poster lilac"><small>DESIGN TOGETHER</small><strong>Less pixels.<br>More<br>people.</strong>${flower(1, "poster-asterisk")}<span class="poster-bottom">BERLIN<br>NOV 18, 2026</span></div><div class="poster orange"><small>OPEN SOURCE SUMMIT</small><strong>Open<br>minds.<br>Big ideas.</strong>${flower(0, "poster-asterisk")}<span class="poster-bottom">SINGAPORE<br>NOV 14–15, 2026</span></div>${flower(0, "art-mark")}<div class="orbit-label">${icon("users")} Your people are out there.</div></div></section><form class="search-bar" id="search-form" role="search"><label class="search-field">${icon("search")}<input id="event-search" type="search" placeholder="Search events, ideas, or your kind of people" aria-label="Search events" value="${escape(query)}"></label><select id="location" aria-label="Event location">${["Anywhere", "Singapore", "Berlin", "London", "Online", "Amsterdam"].map((c) => `<option ${c === locationFilter ? "selected" : ""}>${c}</option>`).join("")}</select><button class="button" type="submit">Find my thing ${icon("arrow")}</button></form><section class="discovery-section" id="explore"><div class="section-head"><h2>A little something for everyone.</h2><button class="text-link inline-action" data-action="saved" aria-pressed="${onlySaved}">${onlySaved ? "Show all events" : "Saved events"} ${icon("heart")}</button></div><div class="filter-row"><div class="chips">${["All events", "Technology", "Design", "Music", "Community", "Food & drink"].map((c) => `<button class="chip" data-category="${c}" aria-pressed="${c === category}">${c}</button>`).join("")}</div><div class="view-buttons" aria-label="Event layout"><button class="icon-button" data-view="grid" aria-label="Grid view" aria-pressed="${view === "grid"}">${icon("grid")}</button><button class="icon-button" data-view="list" aria-label="List view" aria-pressed="${view === "list"}">${icon("list")}</button></div></div><div id="results-count" class="sr-only" role="status" aria-live="polite"></div><div class="events-grid ${view === "list" ? "list" : ""}" id="events-grid">${filteredEvents()}</div><div class="load-more"><p class="muted" style="font-size:11px">A world of possibilities. Six sample events to explore.</p></div></section><section class="community-band"><div><h2>You have an idea.<br>We have the room for it.</h2><p>Tickets, talks, schedules, and good company. Everything you need to bring your community together, in one open-source platform.</p></div>${flower(0)}${button("Let’s make it happen ↗", "create", "dark")}</section></div>`;
}
function filteredEvents() {
  const matches = events.filter(
    (e) =>
      (category === "All events" || e.type === category) &&
      (!onlySaved || saved.includes(e.id)) &&
      (locationFilter === "Anywhere" || e.city === locationFilter) &&
      `${e.name} ${e.type} ${e.city} ${e.host}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return matches.length
    ? matches.map(eventCard).join("")
    : `<div class="empty"><h3>No events here just yet.</h3><p class="muted">Try another search or reset your filters.</p>${button("Reset filters", "reset")}</div>`;
}
function scheduleHtml() {
  return `<div class="schedule-days">${[0, 1].map((d) => `<button class="chip" data-day="${d}" aria-pressed="${day === d}">Nov ${14 + d} · Day ${d + 1}</button>`).join("")}</div>${sessions.map((s, i) => `<article class="schedule-item"><time>${day === 0 ? s[0] : ["09:30", "10:30", "12:00", "13:30", "14:30", "16:30"][i]}</time><div><span class="schedule-track">${s[4]} · ${s[3]}</span><h3>${s[1]}</h3><p>${s[2]}</p></div><button class="icon-button" data-session="${i}" aria-pressed="${sessionSaved.includes(i)}" aria-label="${sessionSaved.includes(i) ? "Remove" : "Add"} ${s[1]} ${sessionSaved.includes(i) ? "from" : "to"} my schedule">${icon(sessionSaved.includes(i) ? "check" : "plus")}</button></article>`).join("")}`;
}
function speakersHtml() {
  return `<div class="speaker-grid">${[
    ["Maya Tan", "Open-source maintainer"],
    ["Alex Morgan", "Developer experience"],
    ["Sam Rivera", "Inclusive design"],
    ["Jordan Lee", "Community builder"],
    ["Taylor Chen", "Creative technologist"],
    ["Robin Shah", "Software engineer"],
  ]
    .map(
      ([name, role]) =>
        `<article class="speaker"><div class="speaker-avatar" aria-hidden="true">${name
          .split(" ")
          .map((n) => n[0])
          .join("")}</div><h3>${name}</h3><p>${role}</p></article>`,
    )
    .join("")}</div>`;
}
function detail(id) {
  const e = events.find((e) => e.id === id);
  if (!e)
    return `<div class="page standard-page empty"><h1>That event isn't here.</h1><a href="#discover" class="button">Explore events</a></div>`;
  return `<div class="page page-enter"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="#discover">Discover</a><span>/</span><span>${escape(e.name)}</span></nav><div class="detail-cover"><h1>${escape(e.art).replaceAll("\n", "<br>")}</h1>${flower(e.id)}</div><div class="detail-layout"><div><h2>${escape(e.name)}</h2><div class="detail-info"><div>${icon("calendar")} ${escape(e.fullDate)}</div><div>${icon("pin")} ${escape(e.city)}</div><div>${icon("users")} ${escape(e.host)}</div></div><div class="detail-tabs">${["About", "Schedule", "Speakers"].map((t) => `<button data-tab="${t}" aria-pressed="${detailTab === t}">${t}</button>`).join("")}</div><div id="detail-body">${detailTab === "Schedule" ? scheduleHtml() : detailTab === "Speakers" ? speakersHtml() : `<div class="prose"><p>${escape(e.description)}</p><h3>Come curious. Leave connected.</h3><p>There is room for everyone here, whether you're joining your first event or reconnecting with familiar faces. Discover new ideas, learn something practical, and make the most of being together.</p><h3>What to expect</h3><ul><li>Thoughtful sessions and hands-on activities</li><li>Space to meet and connect with your community</li><li>Accessible venue information and friendly event support</li></ul><p class="notice">This is a sample event in the Eventyay redesign. Dates, venues, prices, and speakers are demonstration content.</p></div>`}</div></div><aside class="booking"><span class="ticket-kind">A place for you</span><div class="price">${e.price ? `$${e.price}` : "Free"}</div><p>${e.price ? "per person · Sample price" : "Come join the conversation"}</p><label class="field"><span style="font-size:12px">Ticket type</span><select id="ticket-type"><option value="standard">General admission</option><option value="supporter">Community supporter ${e.price ? `· $${e.price + 20}` : "· $20"}</option></select></label>${button("Get tickets " + icon("arrow"), "checkout", "", `data-id="${e.id}"`)}<p>Secure your spot in this demo. No payment is taken.</p><button class="inline-action" data-action="share">Share this event ↗</button></aside></div></div>`;
}
const sidebarItems = [
  ["dashboard", "Overview", "grid"],
  ["events", "Events", "calendar"],
  ["schedule", "Schedule", "clock"],
  ["speakers", "Speakers", "users"],
  ["submissions", "Submissions", "edit"],
  ["attendees", "Attendees", "users"],
  ["checkin", "Check-in", "check"],
  ["video", "Video room", "video"],
  ["settings", "Appearance", "settings"],
];
function workspace(route) {
  let content = "";
  const header = (title, desc, action = "") =>
    `<div class="section-head"><div><h1>${title}</h1><p>${desc}</p></div>${action}</div>`;
  if (route === "dashboard")
    content =
      header(
        "Good things are happening.",
        "Here’s your community at a glance. Sample workspace.",
        button("Create event " + icon("plus"), "create", ""),
      ) +
      `<div class="metrics">${[
        ["Tickets reserved", "248", "32 more this week"],
        ["Total revenue", "$8,420", "Sample transactions"],
        ["Upcoming events", String(events.length), "Make room for more"],
        ["Check-ins", String(checked.length), "Ready when you are"],
      ]
        .map(
          (m) =>
            `<div class="metric"><label>${m[0]}</label><strong>${m[1]}</strong><p>${m[2]}</p></div>`,
        )
        .join(
          "",
        )}</div><div class="dashboard-columns"><section class="panel"><div class="section-head"><h2>A week of connections</h2><p>Ticket reservations</p></div><div class="chart" role="img" aria-label="Sample weekly reservations: Monday 18, Tuesday 27, Wednesday 23, Thursday 38, Friday 49, Saturday 42, Sunday 51">${[35, 52, 44, 73, 94, 80, 100].map((n, i) => `<div class="chart-column"><i style="height:${n}%"></i><span>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span></div>`).join("")}</div></section><section class="panel"><h2>Around your community</h2>${[
        ["ticket", "Alex reserved a Summit ticket", "12 minutes ago"],
        ["edit", "New talk proposal received", "38 minutes ago"],
        ["users", "Sam joined your event team", "1 hour ago"],
      ]
        .map(
          (a) =>
            `<div class="activity-item"><span class="activity-dot">${icon(a[0])}</span><div>${a[1]}<small>${a[2]}</small></div></div>`,
        )
        .join(
          "",
        )}</section></div><div class="section-head" style="margin:32px 0 0"><h2 style="font-size:23px">Your next gatherings</h2><a href="#events" class="text-link">All events ${icon("arrow")}</a></div>` +
      eventTable();
  else if (route === "events")
    content =
      header(
        "Your events. Your people.",
        "Create, edit, and share your next gathering.",
        button("Create event " + icon("plus"), "create", ""),
      ) + eventTable();
  else if (route === "schedule")
    content =
      header(
        "Make every moment count.",
        "Open Source Summit · Your editable sample program.",
        button("Add a session " + icon("plus"), "add-session", ""),
      ) + scheduleHtml();
  else if (route === "speakers")
    content =
      header(
        "Meet the minds.",
        "The people bringing your sample program to life.",
        button("Invite speaker " + icon("plus"), "invite", ""),
      ) + speakersHtml();
  else if (route === "submissions")
    content =
      header(
        "Ideas worth sharing.",
        "Review session proposals for Open Source Summit.",
      ) +
      `<div class="notice">Review decisions in this demo are saved in your browser.</div>${["Making open source welcoming", "A practical guide to accessible design", "Building community-owned tools"].map((n, i) => `<article class="proposal-card"><div><h3>${n}</h3><p>${attendees[i][0]} · 30-minute talk · Submitted Nov 1</p></div><div>${button(read("ey-proposal-" + i, false) ? "Accepted " + icon("check") : "Accept proposal", "accept", "secondary", `data-id="${i}"`)}</div></article>`).join("")}`;
  else if (route === "attendees" || route === "checkin")
    content =
      header(
        route === "checkin"
          ? "A warm welcome starts here."
          : "Every name is a connection.",
        route === "checkin"
          ? "Find an attendee and check them into the sample event."
          : "Manage your Open Source Summit sample guest list.",
        button("Export CSV " + icon("download"), "export", "secondary"),
      ) +
      (route === "checkin"
        ? `<div class="panel checkin-counter"><strong>${checked.length} / ${attendees.length}</strong><p class="muted">Guests checked in</p></div>`
        : "") +
      `<div class="toolbar"><input id="attendee-search" type="search" aria-label="Search attendees" placeholder="Search by name or email" value="${escape(attendeeQuery)}">${button("Invite attendee", "invite", "")}</div><div id="attendee-table">${attendeeTable()}</div>`;
  else if (route === "settings")
    content =
      header(
        "Make it feel like you.",
        "A live theme studio. Your preferences stay in this browser.",
      ) + settingsHtml();
  else if (route === "video")
    content =
      header(
        "Same room. Anywhere.",
        "An online gathering space for your event.",
      ) +
      `<div class="panel"><div class="detail-cover" style="background:var(--accent-soft);display:grid;place-items:center;height:280px">${icon("video")}<h2 style="color:var(--ink)">Open Source Summit · Live room</h2><p class="muted">Preview your online event experience.</p></div><div class="toolbar">${button("Enter demo room", "video-join", "")}${button("Copy room link", "share", "secondary")}</div><p class="notice">This design preview demonstrates the room interface. Live video requires connecting Eventyay's video service.</p><div id="video-room"></div></div>`;
  return `<div class="workspace page-enter"><aside class="sidebar"><div class="workspace-name"><span class="workspace-logo">F</span><div>FOSSASIA community<br><small class="muted">Sample workspace</small></div></div><nav aria-label="Organizer navigation">${sidebarItems.map(([r, n, i]) => `<a href="#${r}" ${r === route ? 'aria-current="page"' : ""}>${icon(i)}${n}</a>`).join("")}</nav><div class="sidebar-bottom">Built for communities.<br>Open by design.<br><a href="https://github.com/fossasia/eventyay">Explore the source ↗</a></div></aside><div class="workspace-main">${content}</div></div>`;
}
function eventTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Event</th><th>Date & location</th><th>Status</th><th>Tickets</th><th>Actions</th></tr></thead><tbody>${events.map((e) => `<tr><td><a href="#event/${e.id}"><strong>${escape(e.name)}</strong></a><small>${escape(e.type)}</small></td><td>${escape(e.fullDate)}<small>${escape(e.city)}</small></td><td><span class="status ${e.draft ? "draft" : ""}">${e.draft ? "Draft" : "Published"}</span></td><td>${tickets.filter((t) => t.eventId === e.id).length} demo orders</td><td><button class="inline-action" data-action="edit-event" data-id="${e.id}">Edit</button><a class="inline-action" href="#event/${e.id}">View ↗</a></td></tr>`).join("")}</tbody></table></div>`;
}
function attendeeTable() {
  const rows = attendees.filter((a) =>
    a.join(" ").toLowerCase().includes(attendeeQuery.toLowerCase()),
  );
  return rows.length
    ? `<div class="table-wrap"><table><thead><tr><th>Attendee</th><th>Ticket</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows
        .map((a) => {
          const i = attendees.indexOf(a);
          return `<tr><td><strong>${a[0]}</strong><small>${a[1]}</small></td><td>General admission</td><td><span class="status ${checked.includes(i) ? "" : "draft"}">${checked.includes(i) ? "Checked in" : "Not arrived"}</span></td><td><button class="inline-action" data-checkin="${i}">${checked.includes(i) ? "Undo check-in" : "Check in"}</button></td></tr>`;
        })
        .join("")}</tbody></table></div>`
    : `<div class="empty"><h3>No matching attendees.</h3><p class="muted">Try a different name or email.</p></div>`;
}
function settingsHtml() {
  return `<div class="settings-layout"><section class="panel"><h2>Color & character</h2><p class="muted" style="font-size:12px;margin-top:10px">Keep it orange. Or make it entirely yours.</p><div class="swatches">${["#f56632", "#7760c3", "#45795b", "#286fa4", "#bc426d"].map((c, i) => `<button class="swatch" style="background:${c}" data-color="${c}" aria-label="${["Eventyay orange", "Violet", "Forest", "Ocean", "Rose"][i]} accent" aria-pressed="${prefs.accent === c}"></button>`).join("")}</div><div class="field-pair"><div class="field"><label for="accent-color">Custom accent</label><input id="accent-color" type="color" value="${prefs.accent}"></div><div class="field"><label for="accent-hex">Hex color</label><input id="accent-hex" value="${prefs.accent}" pattern="#[a-fA-F0-9]{6}" maxlength="7"><small id="color-error" class="error"></small></div></div><p class="notice">Text colors adapt automatically to keep controls readable as your accent changes.</p><div class="preview-block"><h3>A little more you.</h3><p>Your chosen palette, on real components.</p>${button("Your next event " + icon("arrow"), "preview-event", "")}</div>${button("Reset to Eventyay", "reset-theme", "secondary")}</section><section class="panel"><h2>The way you like it</h2><label class="setting-row" for="dark-mode"><span><strong>Dark mode</strong><small>Easy on the eyes after hours.</small></span><input class="toggle" type="checkbox" id="dark-mode" ${prefs.dark ? "checked" : ""}></label><label class="setting-row" for="motion-mode"><span><strong>Playful motion</strong><small>Animated posters and responsive transitions.</small></span><input class="toggle" type="checkbox" id="motion-mode" ${prefs.motion ? "checked" : ""}></label><p class="muted" style="font-size:11px;margin-top:12px">Your system's reduced-motion preference always takes priority.</p><div class="field"><label for="density">Workspace density</label><select id="density"><option value="comfortable" ${prefs.density === "comfortable" ? "selected" : ""}>Comfortable · room to breathe</option><option value="compact" ${prefs.density === "compact" ? "selected" : ""}>Compact · more in view</option></select></div><form id="profile-form"><div class="field"><label for="display-name">Display name</label><input id="display-name" required maxlength="80" value="${escape(read("ey-name", "Anas Khan"))}"></div><div class="field"><label for="notifications">Email updates</label><select id="notifications"><option>Event updates only</option><option>All community updates</option><option>No email updates</option></select></div>${button("Save profile " + icon("check"), "save-profile", "", 'type="submit"')}</form></section></div>`;
}
function wallet() {
  return `<div class="page standard-page page-enter"><div class="section-head"><div><h1>Your next good memory.</h1><p class="muted" style="margin-top:12px;font-size:14px">Your tickets, all in one place.</p></div><a class="text-link" href="#discover">Find another gathering ${icon("arrow")}</a></div>${
    tickets.length
      ? `<div class="ticket-wallet">${tickets
          .map((t) => {
            const e = events.find((e) => e.id === t.eventId);
            return `<article class="wallet-ticket"><div class="wallet-color">${flower(e.id)}<strong>${escape(e.date)}</strong></div><div class="wallet-body"><h2>${escape(e.name)}</h2><p>${escape(t.name)} · ${t.quantity} ${t.quantity === 1 ? "ticket" : "tickets"}<br>${escape(e.city)} · ${escape(t.type)}<br>DEMO-${t.id}</p>${button("Download ticket " + icon("download"), "download-ticket", "secondary", `data-id="${t.id}"`)}</div></article>`;
          })
          .join("")}</div>`
      : `<div class="empty" style="margin-top:35px"><h2>Your first ticket is waiting.</h2><p class="muted" style="margin-top:15px">Find something you love, then reserve your spot.</p><a class="button" href="#discover" style="margin-top:25px">Find my thing ${icon("arrow")}</a></div>`
  }<p class="notice">Demo tickets are stored only in this browser and are not valid for entry to real events.</p></div>`;
}
function route() {
  const current = location.hash.slice(1) || "discover";
  if (current === "explore") {
    if (!document.querySelector("#explore")) {
      main.innerHTML = discover();
      bind();
    }
    document.querySelector("#explore").scrollIntoView({
      behavior:
        matchMedia("(prefers-reduced-motion: reduce)").matches || !prefs.motion
          ? "instant"
          : "smooth",
    });
    return;
  }
  main.innerHTML = current.startsWith("event/")
    ? detail(Number(current.split("/")[1]))
    : current === "tickets"
      ? wallet()
      : sidebarItems.some((i) => i[0] === current)
        ? workspace(current)
        : discover();
  if (visitedRoutes.has(current))
    main
      .querySelectorAll(".page-enter, .hero-art")
      .forEach((el) => el.classList.add("motion-seen"));
  visitedRoutes.add(current);
  document.querySelectorAll(".primary-nav a").forEach((a) => {
    const active =
      a.hash === `#${current}` ||
      (a.hash === "#dashboard" && sidebarItems.some((i) => i[0] === current));
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = `${current === "discover" ? "Make room for more" : current.startsWith("event/") ? events.find((e) => e.id === Number(current.split("/")[1]))?.name || "Event" : current.charAt(0).toUpperCase() + current.slice(1)} · Eventyay`;
  window.scrollTo(0, 0);
  bind();
}
function bind() {
  document.querySelector("#search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    query = document.querySelector("#event-search").value;
    locationFilter = document.querySelector("#location").value;
    updateResults();
  });
  document.querySelector("#event-search")?.addEventListener("input", (e) => {
    query = e.target.value;
    updateResults();
  });
  document.querySelector("#location")?.addEventListener("change", (e) => {
    locationFilter = e.target.value;
    updateResults();
  });
  document.querySelector("#attendee-search")?.addEventListener("input", (e) => {
    attendeeQuery = e.target.value;
    document.querySelector("#attendee-table").innerHTML = attendeeTable();
  });
  for (const id of ["accent-color", "accent-hex"])
    document.querySelector("#" + id)?.addEventListener("input", (e) => {
      if (!/^#[a-f\d]{6}$/i.test(e.target.value)) {
        document.querySelector("#color-error").textContent =
          "Use a six-digit hex color, such as #f56632.";
        return;
      }
      prefs.accent = e.target.value;
      applyPrefs();
      document.querySelector("#color-error").textContent = "";
      document.querySelector("#accent-color").value = prefs.accent;
      document.querySelector("#accent-hex").value = prefs.accent;
    });
  for (const [id, key] of [
    ["dark-mode", "dark"],
    ["motion-mode", "motion"],
  ])
    document.querySelector("#" + id)?.addEventListener("change", (e) => {
      prefs[key] = e.target.checked;
      applyPrefs();
    });
  document.querySelector("#density")?.addEventListener("change", (e) => {
    prefs.density = e.target.value;
    applyPrefs();
  });
  document.querySelector("#profile-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    persist("ey-name", document.querySelector("#display-name").value);
    persist("ey-notifications", document.querySelector("#notifications").value);
    notify("Profile preferences saved.");
  });
}
function updateResults() {
  document.querySelector("#events-grid").innerHTML = filteredEvents();
  document.querySelector("#results-count").textContent =
    `${document.querySelectorAll("#events-grid .event-card").length} events found`;
}
function openDialog(title, body) {
  dialog.innerHTML = `<div class="dialog-inner"><div class="dialog-head"><h2 id="dialog-title">${title}</h2><button class="icon-button" data-action="close" aria-label="Close dialog">${icon("close")}</button></div>${body}</div>`;
  dialog.showModal();
}
function createForm(id) {
  const e = events.find((e) => e.id === id);
  openDialog(
    e ? "Edit your gathering" : "Make something happen.",
    `<form id="event-form"><p class="muted" style="font-size:13px">A new idea deserves a place to meet. Create a demo event.</p><div class="field"><label for="event-name">Event name</label><input id="event-name" required maxlength="100" placeholder="What are you bringing people together for?" value="${escape(e?.name || "")}"></div><div class="field-pair"><div class="field"><label for="event-date">Date</label><input id="event-date" type="date" required value="2026-12-12"></div><div class="field"><label for="event-city">Location</label><input id="event-city" required maxlength="80" placeholder="City or Online" value="${escape(e?.city || "")}"></div></div><div class="field-pair"><div class="field"><label for="event-category">Category</label><select id="event-category">${["Technology", "Design", "Music", "Community", "Food & drink"].map((c) => `<option ${e?.type === c ? "selected" : ""}>${c}</option>`).join("")}</select></div><div class="field"><label for="event-price">Ticket price in USD</label><input id="event-price" type="number" min="0" max="9999" value="${e?.price || 0}" required></div></div><div class="field"><label for="event-description">Description</label><textarea id="event-description" required maxlength="2000" placeholder="Tell your community what to expect.">${escape(e?.description || "")}</textarea></div><div class="form-actions"><button class="button secondary" type="submit" name="intent" value="draft">Save draft</button><button class="button" type="submit" name="intent" value="publish">${e ? "Save changes" : "Publish demo event"} ${icon("arrow")}</button></div></form>`,
  );
  document.querySelector("#event-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const date = new Date(
      document.querySelector("#event-date").value + "T12:00:00",
    );
    const data = {
      id: e?.id || Date.now(),
      name: document.querySelector("#event-name").value.trim(),
      city: document.querySelector("#event-city").value.trim(),
      date: date
        .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
        .toUpperCase(),
      fullDate: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      price: Number(document.querySelector("#event-price").value),
      type: document.querySelector("#event-category").value,
      description: document.querySelector("#event-description").value.trim(),
      art: document.querySelector("#event-name").value.trim(),
      color: e?.color || ["orange", "lilac", "lime"][events.length % 3],
      host: "Your community",
      draft: ev.submitter.value === "draft",
    };
    if (!data.name || !data.city || !data.description) {
      notify("Please complete the event details.");
      return;
    }
    events = e
      ? events.map((item) => (item.id === id ? data : item))
      : [data, ...events];
    persist("ey-events", events);
    dialog.close();
    location.hash = "#events";
    route();
    notify(
      data.draft ? "Event draft saved." : "Your demo event is ready to share.",
    );
  });
}
function checkout(id) {
  const e = events.find((e) => e.id === id);
  const type =
    document.querySelector("#ticket-type")?.value === "supporter"
      ? "Community supporter"
      : "General admission";
  const price = e.price + (type === "Community supporter" ? 20 : 0);
  openDialog(
    "Your place is waiting.",
    `<form id="checkout-form"><h3>${escape(e.name)}</h3><p class="muted" style="font-size:12px;margin-top:10px">${escape(e.fullDate)} · ${escape(e.city)}</p><p class="notice">Demo checkout. No real payment or registration is made.</p><div class="field"><label for="ticket-name">Full name</label><input id="ticket-name" required autocomplete="name" maxlength="100" placeholder="Your name"></div><div class="field"><label for="ticket-email">Email address</label><input id="ticket-email" type="email" required autocomplete="email" maxlength="180" placeholder="you@example.com"></div><div class="field"><label for="ticket-quantity">Tickets</label><select id="ticket-quantity">${[1, 2, 3, 4].map((n) => `<option value="${n}">${n} ${n === 1 ? "ticket" : "tickets"} · ${type}</option>`).join("")}</select></div><div class="checkout-summary"><span>Total · demo</span><strong id="checkout-total">${price ? "$" + price : "Free"}</strong></div><div class="form-actions"><button type="submit" class="button">Reserve demo tickets ${icon("arrow")}</button></div></form>`,
  );
  document
    .querySelector("#ticket-quantity")
    .addEventListener(
      "change",
      (ev) =>
        (document.querySelector("#checkout-total").textContent = price
          ? "$" + price * Number(ev.target.value)
          : "Free"),
    );
  document.querySelector("#checkout-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const t = {
      id: Date.now(),
      eventId: id,
      name: document.querySelector("#ticket-name").value.trim(),
      email: document.querySelector("#ticket-email").value,
      quantity: Number(document.querySelector("#ticket-quantity").value),
      type,
      total: price * Number(document.querySelector("#ticket-quantity").value),
    };
    if (!t.name) return;
    tickets.unshift(t);
    persist("ey-tickets", tickets);
    dialog.innerHTML = `<div class="dialog-inner success"><div class="success-mark">${icon("check")}</div><h2 id="dialog-title">You're on the list.</h2><p>${escape(t.name)}, your demo tickets for ${escape(e.name)} are ready. Good company awaits.</p><button class="button" data-action="view-tickets">View my tickets ${icon("arrow")}</button><p>No payment was taken. This is a design preview.</p><button class="inline-action" data-action="close">Keep exploring</button></div>`;
  });
}
function download(name, text, type = "text/plain") {
  const blob = new Blob([text], { type }),
    url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.save) {
    const id = Number(target.dataset.save);
    saved = saved.includes(id) ? saved.filter((n) => n !== id) : [...saved, id];
    persist("ey-saved", saved);
    target.setAttribute("aria-pressed", saved.includes(id));
    target.setAttribute(
      "aria-label",
      `${saved.includes(id) ? "Unsave" : "Save"} ${events.find((e) => e.id === id).name}`,
    );
    notify(
      saved.includes(id)
        ? "Saved for another good day."
        : "Event removed from saved.",
    );
    return;
  }
  if (target.dataset.category) {
    category = target.dataset.category;
    document
      .querySelectorAll("[data-category]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", b.dataset.category === category),
      );
    updateResults();
    return;
  }
  if (target.dataset.view) {
    view = target.dataset.view;
    document
      .querySelector("#events-grid")
      .classList.toggle("list", view === "list");
    document
      .querySelectorAll("[data-view]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === view));
    return;
  }
  if (target.dataset.day !== undefined) {
    day = Number(target.dataset.day);
    route();
    return;
  }
  if (target.dataset.session !== undefined) {
    const id = Number(target.dataset.session);
    sessionSaved = sessionSaved.includes(id)
      ? sessionSaved.filter((n) => n !== id)
      : [...sessionSaved, id];
    persist("ey-sessions", sessionSaved);
    target.innerHTML = icon(sessionSaved.includes(id) ? "check" : "plus");
    target.setAttribute("aria-pressed", sessionSaved.includes(id));
    notify(
      sessionSaved.includes(id)
        ? "Added to your schedule."
        : "Removed from your schedule.",
    );
    return;
  }
  if (target.dataset.tab) {
    detailTab = target.dataset.tab;
    route();
    return;
  }
  if (target.dataset.checkin !== undefined) {
    const id = Number(target.dataset.checkin);
    checked = checked.includes(id)
      ? checked.filter((n) => n !== id)
      : [...checked, id];
    persist("ey-checkin", checked);
    route();
    notify(
      checked.includes(id)
        ? `${attendees[id][0]} is checked in.`
        : "Check-in undone.",
    );
    return;
  }
  if (target.dataset.color) {
    prefs.accent = target.dataset.color;
    applyPrefs();
    route();
    return;
  }
  switch (target.dataset.action) {
    case "close":
      dialog.close();
      break;
    case "create":
      createForm();
      break;
    case "edit-event":
      createForm(Number(target.dataset.id));
      break;
    case "checkout":
      checkout(Number(target.dataset.id));
      break;
    case "view-tickets":
      dialog.close();
      location.hash = "#tickets";
      break;
    case "saved":
      onlySaved = !onlySaved;
      route();
      break;
    case "reset":
      category = "All events";
      query = "";
      locationFilter = "Anywhere";
      onlySaved = false;
      route();
      break;
    case "reset-theme":
      prefs = {
        accent: "#f56632",
        dark: false,
        motion: true,
        density: "comfortable",
      };
      applyPrefs();
      route();
      notify("Back to the Eventyay originals.");
      break;
    case "preview-event":
      location.hash = "#event/1";
      break;
    case "share":
      try {
        await navigator.clipboard.writeText(location.href);
        notify("Link copied. Bring a friend.");
      } catch {
        openDialog(
          "Share this gathering",
          `<div class="field"><label for="share-url">Copy this link</label><input id="share-url" readonly value="${escape(location.href)}"></div>`,
        );
      }
      break;
    case "download-ticket": {
      const t = tickets.find((t) => t.id === Number(target.dataset.id)),
        e = events.find((e) => e.id === t.eventId);
      download(
        `eventyay-demo-ticket-${t.id}.txt`,
        `EVENTYAY DEMO TICKET\n${e.name}\n${e.fullDate}\n${e.city}\n${t.name}\n${t.quantity} x ${t.type}\nDEMO-${t.id}\n\nNot valid for entry. No payment was taken.`,
      );
      notify("Demo ticket downloaded.");
      break;
    }
    case "export":
      download(
        "eventyay-demo-attendees.csv",
        "Name,Email,Checked in\n" +
          attendees
            .map(
              (a, i) => `${a[0]},${a[1]},${checked.includes(i) ? "Yes" : "No"}`,
            )
            .join("\n"),
        "text/csv",
      );
      notify("Sample attendee list exported.");
      break;
    case "accept":
      persist("ey-proposal-" + target.dataset.id, true);
      target.innerHTML = "Accepted " + icon("check");
      target.disabled = true;
      notify("Proposal accepted in your demo workspace.");
      break;
    case "invite":
      openDialog(
        "Bring someone along.",
        `<form id="invite-form"><p class="muted" style="font-size:13px">Preview a community invitation. No email will be sent.</p><div class="field"><label for="invite-email">Email address</label><input id="invite-email" type="email" required placeholder="friend@example.com"></div><div class="field"><label for="invite-role">Invite as</label><select id="invite-role"><option>Attendee</option><option>Speaker</option><option>Organizer</option></select></div><button class="button" type="submit">Create demo invitation ${icon("arrow")}</button></form>`,
      );
      document.querySelector("#invite-form").addEventListener("submit", (e) => {
        e.preventDefault();
        dialog.close();
        notify("Demo invitation created. No email was sent.");
      });
      break;
    case "add-session":
      openDialog(
        "An idea for the program.",
        `<form id="session-form"><div class="field"><label for="session-title">Session title</label><input id="session-title" required maxlength="120"></div><div class="field-pair"><div class="field"><label for="session-time">Start time</label><input id="session-time" type="time" value="17:00" required></div><div class="field"><label for="session-speaker">Speaker</label><input id="session-speaker" required maxlength="80"></div></div><button class="button" type="submit">Add session ${icon("plus")}</button></form>`,
      );
      document
        .querySelector("#session-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          sessions.push([
            document.querySelector("#session-time").value,
            document.querySelector("#session-title").value,
            document.querySelector("#session-speaker").value,
            "Main stage",
            "Talk",
          ]);
          dialog.close();
          route();
          notify("Session added to the sample program.");
        });
      break;
    case "video-join":
      document.querySelector("#video-room").innerHTML =
        `<div class="notice">You're in the demo room. Your camera and microphone remain off.</div><div class="speaker-grid">${["You", "Maya Tan", "Alex Morgan"].map((n) => `<div class="preview-block"><h3>${n}</h3><p>Camera off · Demo participant</p></div>`).join("")}</div>${button("Leave room", "video-leave", "secondary")}`;
      target.disabled = true;
      break;
    case "video-leave":
      document.querySelector("#video-room").innerHTML = "";
      document.querySelector("[data-action=video-join]").disabled = false;
      notify("You left the demo room.");
      break;
  }
});
document
  .querySelector("#appearance")
  .addEventListener("click", () => (location.hash = "#settings"));
document
  .querySelector("#profile")
  .addEventListener("click", () => (location.hash = "#settings"));
document
  .querySelector("#create-event")
  .addEventListener("click", () => createForm());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    )
      dialog.close();
  }
});
window.addEventListener("hashchange", route);
route();
