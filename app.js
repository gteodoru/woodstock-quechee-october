(() => {
  const STORAGE_KEY = "vt-woodstock-itinerary-v1";

  const BOOK_ITEMS = [
    "Book On The River Inn Farmhouse 2BR — prefer ground-floor courtyard",
    "Confirm crib / pack-and-play in writing",
    "Confirm nightly amenity fee and what it includes",
    "Worthy Kitchen Resy for Friday and/or Saturday",
    "Optional: Billings Farm advance tickets",
    "Optional: VINS tickets the morning you go",
    "If Farmhouse is gone: Fat Sheep loft check, or Newton Village 2B"
  ];

  const PACK_ITEMS = [
    "All-terrain stroller",
    "Toddler sleep kit: white noise, sleep sack, lovey",
    "Layers + rain shells (early October swings)",
    "Car snacks, water, and a change of clothes for the drive",
    "Compact first-aid and toddler meds",
    "Lightweight picnic blanket",
    "Phone chargers and offline maps",
    "Casual clothes for 5:30 dinners — nothing dressy"
  ];

  const dayTabs = [...document.querySelectorAll(".day-tabs [role='tab']")];
  const panels = [...document.querySelectorAll(".day-panel")];
  const napToggle = document.getElementById("nap-toggle");
  const shareBtn = document.getElementById("share-day");
  const printBtn = document.getElementById("print-day");
  const shareStatus = document.getElementById("share-status");
  const bookList = document.getElementById("book-list");
  const packList = document.getElementById("pack-list");

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveState(patch) {
    const next = { ...loadState(), ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  function activeDayIndex() {
    return dayTabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true") + 1;
  }

  function showDay(day) {
    dayTabs.forEach((tab, index) => {
      const selected = index + 1 === day;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel, index) => {
      const selected = index + 1 === day;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    });
    saveState({ day });
  }

  function bindTabs() {
    dayTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => showDay(index + 1));
      tab.addEventListener("keydown", (event) => {
        const current = activeDayIndex() - 1;
        let next = current;
        if (event.key === "ArrowRight") next = (current + 1) % dayTabs.length;
        if (event.key === "ArrowLeft") next = (current - 1 + dayTabs.length) % dayTabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = dayTabs.length - 1;
        if (next !== current) {
          event.preventDefault();
          showDay(next + 1);
          dayTabs[next].focus();
        }
      });
    });

    document.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        showDay(Number(button.dataset.jump));
        document.getElementById("days").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function bindCards() {
    document.querySelectorAll("[data-card]").forEach((card) => {
      const button = card.querySelector(".card-head");
      const body = card.querySelector(".card-body");
      if (!button || !body) return;
      button.addEventListener("click", () => {
        const open = !card.classList.contains("is-open");
        card.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", String(open));
      });
    });
  }

  function applyNap(on) {
    document.body.classList.toggle("naps-on", on);
    napToggle.checked = on;
    napToggle.setAttribute("aria-checked", String(on));
    saveState({ naps: on });
  }

  function dayShareText(day) {
    const panel = document.getElementById(`day-${day}`);
    const title = panel.querySelector("h3")?.textContent.trim() || `Day ${day}`;
    const kicker = panel.querySelector(".day-kicker")?.textContent.trim() || "";
    const lines = [...panel.querySelectorAll(".card-head")].map((head) => {
      const time = head.querySelector("time")?.textContent.trim();
      const name = head.querySelector("h4")?.textContent.trim();
      return `• ${time} — ${name}`;
    });
    return [
      `Woodstock / Quechee · ${kicker}`,
      title,
      "",
      ...lines,
      "",
      "Nap window 12:30–2:30 · bedtime 8:00"
    ].join("\n");
  }

  async function shareDay() {
    const day = activeDayIndex();
    const text = dayShareText(day);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Woodstock Day ${day}`,
          text
        });
        shareStatus.textContent = "Day shared.";
        return;
      }
      await navigator.clipboard.writeText(text);
      shareStatus.textContent = "Day copied to the clipboard.";
    } catch (error) {
      if (error && error.name === "AbortError") {
        shareStatus.textContent = "";
        return;
      }
      shareStatus.textContent = "Could not share automatically — select the day and use print instead.";
    }
  }

  function renderChecks(target, items, group) {
    const saved = loadState()[group] || {};
    target.innerHTML = "";
    items.forEach((label, index) => {
      const id = `${group}-${index}`;
      const li = document.createElement("li");
      const input = document.createElement("input");
      const text = document.createElement("label");
      input.type = "checkbox";
      input.id = id;
      input.checked = Boolean(saved[id]);
      text.htmlFor = id;
      text.textContent = label;
      li.classList.toggle("is-done", input.checked);
      input.addEventListener("change", () => {
        const current = loadState()[group] || {};
        current[id] = input.checked;
        saveState({ [group]: current });
        li.classList.toggle("is-done", input.checked);
      });
      li.append(input, text);
      target.append(li);
    });
  }

  function bindResets() {
    document.querySelectorAll("[data-reset]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.dataset.reset;
        saveState({ [group]: {} });
        if (group === "book") renderChecks(bookList, BOOK_ITEMS, "book");
        if (group === "pack") renderChecks(packList, PACK_ITEMS, "pack");
      });
    });
  }

  const state = loadState();
  bindTabs();
  bindCards();
  bindResets();
  renderChecks(bookList, BOOK_ITEMS, "book");
  renderChecks(packList, PACK_ITEMS, "pack");
  applyNap(Boolean(state.naps));
  if (state.day) showDay(Number(state.day));

  napToggle.addEventListener("change", () => applyNap(napToggle.checked));
  shareBtn.addEventListener("click", shareDay);
  printBtn.addEventListener("click", () => window.print());
})();
