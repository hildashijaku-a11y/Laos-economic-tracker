const root = document.getElementById("root");

let activeTab = "global";

const HORMUZ_OIL_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1332311442";

const HORMUZ_TIMELINE_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=30458749";

const LAOS_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=158156900";

const FUEL_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=96401015";

const CPI_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1526208390";

const RESERVES_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=864450268";

const TEXT_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1254341027";

const styles = `
  :root{
    --text:#111827;
    --muted:#667085;
    --border:#d9dde5;
    --bg:#f5f6f8;
    --blue:#2f5bea;
    --card:#f8f9fb;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background: #ffffff;
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 18px 40px;
  }

  .hero {
    padding: 18px 0 10px;
  }

  .eyebrow {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 8px;
    font-weight: 700;
  }

  .title {
    font-size: 42px;
    line-height: 1.05;
    font-weight: 700;
    margin: 0 0 12px;
    max-width: 980px;
  }

  .dek {
    font-size: 17px;
    line-height: 1.7;
    color: #475467;
    max-width: 980px;
  }

  .meta {
    margin-top: 10px;
    font-size: 14px;
    color: #667085;
  }

  .overall-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
    margin-top: 18px;
    margin-bottom: 20px;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px;
  }

  .card h3 {
    margin: 0 0 6px;
    font-size: 17px;
    font-weight: 700;
  }

  .sub {
    margin: 0 0 14px;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.5;
  }

  .kpi-label {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .kpi-value {
    font-size: 30px;
    line-height: 1;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .kpi-date {
    font-size: 13px;
    color: var(--muted);
  }

  .free-text {
    font-size: 16px;
    line-height: 1.7;
    color: #344054;
    white-space: pre-wrap;
  }

  .tabs {
    display: flex;
    gap: 18px;
    border-bottom: 2px solid #d8dde6;
    padding-top: 2px;
    margin-bottom: 18px;
  }

  .tab {
    background: none;
    border: none;
    padding: 0 0 12px;
    font: inherit;
    font-size: 15px;
    color: #475467;
    cursor: pointer;
  }

  .tab.active {
    color: var(--blue);
    border-bottom: 2px solid var(--blue);
    margin-bottom: -2px;
    font-weight: 600;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  .chart-wrap {
    position: relative;
    height: 280px;
  }

  .timeline {
    display: grid;
    gap: 14px;
    margin-top: 8px;
  }

  .timeline-item {
    background: #fbfcfe;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 18px;
  }

  .timeline-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .timeline-day {
    font-size: 13px;
    font-weight: 700;
    color: var(--blue);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .timeline-date {
    font-size: 13px;
    color: var(--muted);
  }

  .timeline-event {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 1.45;
  }

  .timeline-impact {
    font-size: 14px;
    color: #475467;
    line-height: 1.6;
  }

  .footer-note {
    margin-top: 24px;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }

  .error {
    color: #b42318;
    font-size: 14px;
    padding-top: 10px;
  }

  @media (max-width: 980px) {
    .overall-grid,
    .grid {
      grid-template-columns: 1fr;
    }

    .kpi-grid {
      grid-template-columns: 1fr 1fr;
    }

    .title {
      font-size: 34px;
    }
  }

  @media (max-width: 640px) {
    .kpi-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function render() {
  root.innerHTML = `
    <style>${styles}</style>
    <div class="page">
      <section class="hero">
        <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
        <h1 class="title">Laos macro tracker</h1>
        <div class="dek">
          A compact dashboard for monitoring global oil disruption signals, Laos transmission channels,
          and crisis developments over time.
        </div>
        <div class="meta">Last update: 26 March, 2026.</div>
      </section>

      <section class="overall-grid">
        <div class="card">
          <h3>Overview</h3>
          <p class="sub">Impact and key transmission channels</p>
          <div id="overallText" class="free-text">Loading...</div>
          <div id="overallTextError" class="error"></div>
        </div>

        <div class="kpi-grid">
          <div class="card">
            <div class="kpi-label">Brent crude</div>
            <div class="kpi-value" id="kpiBrent">—</div>
            <div class="kpi-date" id="kpiBrentDate">Loading...</div>
          </div>

          <div class="card">
            <div class="kpi-label">KIP / USD</div>
            <div class="kpi-value" id="kpiFx">—</div>
            <div class="kpi-date" id="kpiFxDate">Loading...</div>
          </div>

          <div class="card">
            <div class="kpi-label">Headline inflation</div>
            <div class="kpi-value" id="kpiCpi">—</div>
            <div class="kpi-date" id="kpiCpiDate">Loading...</div>
          </div>

          <div class="card">
            <div class="kpi-label">Foreign reserves</div>
            <div class="kpi-value" id="kpiReserves">—</div>
            <div class="kpi-date" id="kpiReservesDate">Loading...</div>
          </div>
        </div>
      </section>

      <div class="tabs">
        <button class="tab ${activeTab === "global" ? "active" : ""}" id="tab-global">Global</button>
        <button class="tab ${activeTab === "laos" ? "active" : ""}" id="tab-laos">Laos</button>
        <button class="tab ${activeTab === "timeline" ? "active" : ""}" id="tab-timeline">Crisis Timeline</button>
      </div>

      <section id="tabContent">
        ${renderTabContent()}
      </section>

      <div class="footer-note">
        Hormuztracker.com. Laos macro indicators are drawn from national sources.
      </div>
    </div>
  `;

  document.getElementById("tab-global").onclick = () => {
    activeTab = "global";
    render();
  };

  document.getElementById("tab-laos").onclick = () => {
    activeTab = "laos";
    render();
  };

  document.getElementById("tab-timeline").onclick = () => {
    activeTab = "timeline";
    render();
  };

  initOverall();

  if (activeTab === "global") initGlobal();
  if (activeTab === "laos") initLaos();
  if (activeTab === "timeline") initTimeline();
}

function renderTabContent() {
  if (activeTab === "global") {
    return `
      <div class="grid">
        <div class="card">
          <h3>Brent crude</h3>
          <p class="sub">Hormuz oil sheet</p>
          <div class="chart-wrap"><canvas id="brentChart"></canvas></div>
          <div id="brentError" class="error"></div>
        </div>

        <div class="card">
          <h3>WTI crude</h3>
          <p class="sub">Hormuz oil sheet</p>
          <div class="chart-wrap"><canvas id="wtiChart"></canvas></div>
          <div id="wtiError" class="error"></div>
        </div>

        <div class="card">
          <h3>EU gas (TTF)</h3>
          <p class="sub">Hormuz oil sheet</p>
          <div class="chart-wrap"><canvas id="ttfChart"></canvas></div>
          <div id="ttfError" class="error"></div>
        </div>

        <div class="card">
          <h3>US gasoline</h3>
          <p class="sub">Hormuz oil sheet</p>
          <div class="chart-wrap"><canvas id="usGasChart"></canvas></div>
          <div id="usGasError" class="error"></div>
        </div>
      </div>
    `;
  }

  if (activeTab === "laos") {
    return `
      <div class="grid">
        <div class="card">
          <h3>KIP / USD</h3>
          <p class="sub">Exchange rate</p>
          <div class="chart-wrap"><canvas id="fxChart"></canvas></div>
          <div id="fxError" class="error"></div>
        </div>

        <div class="card">
          <h3>Foreign reserves</h3>
          <p class="sub">USD million</p>
          <div class="chart-wrap"><canvas id="reservesChart"></canvas></div>
          <div id="reservesError" class="error"></div>
        </div>

        <div class="card">
          <h3>Fuel prices</h3>
          <p class="sub">Diesel and gasoline</p>
          <div class="chart-wrap"><canvas id="fuelChart"></canvas></div>
          <div id="fuelError" class="error"></div>
        </div>

        <div class="card" style="grid-column: 1 / -1;">
          <h3>Inflation</h3>
          <p class="sub">Headline, core, non-core, raw food, fuel</p>
          <div class="chart-wrap"><canvas id="cpiChart"></canvas></div>
          <div id="cpiError" class="error"></div>
        </div>
      </div>
    `;
  }

  return `
    <div class="card">
      <h3>Crisis Timeline</h3>
      <p class="sub">Events and impacts from your Hormuz timeline sheet</p>
      <div id="timeline" class="timeline">Loading...</div>
      <div id="timelineError" class="error"></div>
    </div>
  `;
}

function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(","));
}

function parseNum(value) {
  const cleaned = (value || "").replace(/"/g, "").replace(/,/g, "").trim();
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
}

function getCurrentYearStart() {
  const now = new Date();
  return new Date(now.getFullYear(), 0, 1);
}

function parseDateLoose(label) {
  const raw = (label || "").replace(/"/g, "").trim();
  if (!raw) return null;

  const direct = new Date(raw);
  if (!Number.isNaN(direct.getTime())) return direct;

  const monthly = raw.match(/^(\d{4})[-/](\d{1,2})$/);
  if (monthly) return new Date(Number(monthly[1]), Number(monthly[2]) - 1, 1);

  const monthly2 = raw.match(/^(\d{4})M(\d{1,2})$/i);
  if (monthly2) return new Date(Number(monthly2[1]), Number(monthly2[2]) - 1, 1);

  return null;
}

function filterFromThisJanuary(labels, ...seriesArrays) {
  const jan1 = getCurrentYearStart();
  const keep = [];

  labels.forEach((label, i) => {
    const d = parseDateLoose(label);
    if (d && d >= jan1) keep.push(i);
  });

  return {
    labels: keep.map(i => labels[i]),
    series: seriesArrays.map(arr => keep.map(i => arr[i]))
  };
}

function formatValue(value, decimals = 1, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}${suffix}`;
}

function latestNonNull(labels, values) {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== null && values[i] !== undefined && !Number.isNaN(values[i])) {
      return { label: labels[i], value: values[i] };
    }
  }
  return { label: "", value: null };
}

async function fetchSingleSeries(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text()).slice(1);
  const labels = [];
  const values = [];

  for (const row of rows) {
    if (row.length < 2) continue;
    const label = (row[0] || "").replace(/"/g, "").trim();
    const value = parseNum(row[1]);
    if (!label || value === null) continue;
    labels.push(label);
    values.push(value);
  }

  return { labels, values };
}

async function fetchFuel(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text()).slice(1);
  const labels = [];
  const diesel = [];
  const gasoline = [];

  for (const row of rows) {
    if (row.length < 3) continue;
    const date = (row[0] || "").replace(/"/g, "").trim();
    const d = parseNum(row[1]);
    const g = parseNum(row[2]);

    if (!date || d === null || g === null) continue;

    labels.push(date);
    diesel.push(d);
    gasoline.push(g);
  }

  return { labels, diesel, gasoline };
}

async function fetchInflation(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  const headers = rows[0].map(h => (h || "").replace(/"/g, "").toLowerCase().trim());
  const body = rows.slice(1);

  const labels = [];
  const headline = [];
  const core = [];
  const nonCore = [];
  const rawFood = [];
  const fuel = [];

  for (const row of body) {
    const date = (row[0] || "").replace(/"/g, "").trim();
    if (!date) continue;

    const vals = {
      headline: null,
      core: null,
      nonCore: null,
      rawFood: null,
      fuel: null
    };

    for (let i = 1; i < headers.length; i++) {
      const h = headers[i];
      const v = parseNum(row[i]);
      if (v === null) continue;

      if (h.includes("headline")) vals.headline = v;
      else if (h.includes("core") && !h.includes("non")) vals.core = v;
      else if (h.includes("non")) vals.nonCore = v;
      else if (h.includes("raw")) vals.rawFood = v;
      else if (h.includes("fuel")) vals.fuel = v;
    }

    labels.push(date);
    headline.push(vals.headline);
    core.push(vals.core);
    nonCore.push(vals.nonCore);
    rawFood.push(vals.rawFood);
    fuel.push(vals.fuel);
  }

  return { labels, headline, core, nonCore, rawFood, fuel };
}

async function fetchHormuzOil(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  const headers = rows[0].map(h => (h || "").replace(/"/g, "").toLowerCase().trim());
  const body = rows.slice(1);

  const labels = [];
  const brent = [];
  const wti = [];
  const ttf = [];
  const usGasoline = [];

  const brentIdx = headers.findIndex(h => h.includes("brent"));
  const wtiIdx = headers.findIndex(h => h.includes("wti"));
  const ttfIdx = headers.findIndex(h => h.includes("ttf"));
  const usGasIdx = headers.findIndex(h => h.includes("gasoline"));

  for (const row of body) {
    const date = (row[0] || "").replace(/"/g, "").trim();
    if (!date) continue;

    labels.push(date);
    brent.push(parseNum(row[brentIdx]));
    wti.push(parseNum(row[wtiIdx]));
    ttf.push(parseNum(row[ttfIdx]));
    usGasoline.push(parseNum(row[usGasIdx]));
  }

  return { labels, brent, wti, ttf, usGasoline };
}
async function fetchTextBlock(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();
  const rows = text.trim().split("\n");

  if (rows.length < 2) return "";

  return rows.slice(1).join("\n").replace(/"/g, "").trim();
}

async function fetchTimeline(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  const headers = rows[0].map(h => (h || "").replace(/"/g, "").toLowerCase().trim());
  const body = rows.slice(1);

  const dayIdx = headers.findIndex(h => h === "day" || h.includes("day"));
  const dateIdx = headers.findIndex(h => h === "date" || h.includes("date"));
  const eventIdx = headers.findIndex(h => h === "event" || h.includes("event"));
  const impactIdx = headers.findIndex(h => h === "impact" || h.includes("impact"));

  return body
    .map(row => ({
      day: (row[dayIdx] || "").replace(/"/g, "").trim(),
      date: (row[dateIdx] || "").replace(/"/g, "").trim(),
      event: (row[eventIdx] || "").replace(/"/g, "").trim(),
      impact: (row[impactIdx] || "").replace(/"/g, "").trim()
    }))
    .filter(item => item.day || item.date || item.event || item.impact);
}

function makeLineChart(canvasId, labels, datasets, maxTicksLimit = 6) {
  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          display: datasets.length > 1
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit }
        },
        y: {
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

function singleDataset(label, values) {
  return [{
    label,
    data: values,
    borderWidth: 2,
    tension: 0.25,
    pointRadius: 0,
    spanGaps: true
  }];
}

function multiDataset(series) {
  return series.map(item => ({
    label: item.label,
    data: item.data,
    borderWidth: 2,
    tension: 0.25,
    pointRadius: 0,
    spanGaps: true
  }));
}

async function initOverall() {
  try {
    const text = await fetchTextBlock(TEXT_CSV);
    document.getElementById("overallText").textContent = text || "No text found.";
  } catch (e) {
    document.getElementById("overallTextError").textContent = "Could not load overall text.";
  }

  try {
    const oil = await fetchHormuzOil(HORMUZ_OIL_CSV);
    const filtered = filterFromThisJanuary(oil.labels, oil.brent);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiBrent").textContent = formatValue(latest.value, 1);
    document.getElementById("kpiBrentDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiBrentDate").textContent = "Could not load";
  }

  try {
    const fx = await fetchSingleSeries(LAOS_CSV);
    const filtered = filterFromThisJanuary(fx.labels, fx.values);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiFx").textContent = formatValue(latest.value, 0);
    document.getElementById("kpiFxDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiFxDate").textContent = "Could not load";
  }

  try {
    const cpi = await fetchInflation(CPI_CSV);
    const filtered = filterFromThisJanuary(cpi.labels, cpi.headline);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiCpi").textContent = formatValue(latest.value, 1, "%");
    document.getElementById("kpiCpiDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiCpiDate").textContent = "Could not load";
  }

  try {
    const reserves = await fetchSingleSeries(RESERVES_CSV);
    const filtered = filterFromThisJanuary(reserves.labels, reserves.values);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiReserves").textContent = formatValue(latest.value, 0);
    document.getElementById("kpiReservesDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiReservesDate").textContent = "Could not load";
  }
}

async function initGlobal() {
  try {
    const oil = await fetchHormuzOil(HORMUZ_OIL_CSV);
    const brentFiltered = filterFromThisJanuary(oil.labels, oil.brent);
    const wtiFiltered = filterFromThisJanuary(oil.labels, oil.wti);
    const ttfFiltered = filterFromThisJanuary(oil.labels, oil.ttf);
    const gasFiltered = filterFromThisJanuary(oil.labels, oil.usGasoline);

    makeLineChart("brentChart", brentFiltered.labels, singleDataset("Brent", brentFiltered.series[0]));
    makeLineChart("wtiChart", wtiFiltered.labels, singleDataset("WTI", wtiFiltered.series[0]));
    makeLineChart("ttfChart", ttfFiltered.labels, singleDataset("TTF", ttfFiltered.series[0]));
    makeLineChart("usGasChart", gasFiltered.labels, singleDataset("US gasoline", gasFiltered.series[0]));
  } catch (e) {
    ["brentError", "wtiError", "ttfError", "usGasError"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "Could not load global data.";
    });
  }
}

async function initLaos() {
  try {
    const fx = await fetchSingleSeries(LAOS_CSV);
    const filtered = filterFromThisJanuary(fx.labels, fx.values);
    makeLineChart("fxChart", filtered.labels, singleDataset("KIP / USD", filtered.series[0]));
  } catch {
    document.getElementById("fxError").textContent = "Could not load exchange rate data.";
  }

  try {
    const reserves = await fetchSingleSeries(RESERVES_CSV);
    const filtered = filterFromThisJanuary(reserves.labels, reserves.values);
    makeLineChart("reservesChart", filtered.labels, singleDataset("Foreign reserves", filtered.series[0]));
  } catch {
    document.getElementById("reservesError").textContent = "Could not load reserves data.";
  }

  try {
    const fuel = await fetchFuel(FUEL_CSV);
    const filtered = filterFromThisJanuary(fuel.labels, fuel.diesel, fuel.gasoline);
    makeLineChart(
      "fuelChart",
      filtered.labels,
      multiDataset([
        { label: "Diesel", data: filtered.series[0] },
        { label: "Gasoline", data: filtered.series[1] }
      ])
    );
  } catch {
    document.getElementById("fuelError").textContent = "Could not load fuel data.";
  }

  try {
    const cpi = await fetchInflation(CPI_CSV);
    const filtered = filterFromThisJanuary(
      cpi.labels,
      cpi.headline,
      cpi.core,
      cpi.nonCore,
      cpi.rawFood,
      cpi.fuel
    );

    makeLineChart(
      "cpiChart",
      filtered.labels,
      multiDataset([
        { label: "Headline inflation", data: filtered.series[0] },
        { label: "Core inflation", data: filtered.series[1] },
        { label: "Non-core inflation", data: filtered.series[2] },
        { label: "Raw food inflation", data: filtered.series[3] },
        { label: "Fuel inflation", data: filtered.series[4] }
      ]),
      8
    );
  } catch {
    document.getElementById("cpiError").textContent = "Could not load inflation data.";
  }
}

async function initTimeline() {
  try {
    const items = await fetchTimeline(HORMUZ_TIMELINE_CSV);
    const target = document.getElementById("timeline");

    if (!items.length) {
      target.innerHTML = "No timeline data found.";
      return;
    }

    target.innerHTML = items
      .slice()
      .reverse()
      .map(item => `
        <div class="timeline-item">
          <div class="timeline-top">
            <div class="timeline-day">${item.day || ""}</div>
            <div class="timeline-date">${item.date || ""}</div>
          </div>
          <div class="timeline-event">${item.event || ""}</div>
          <div class="timeline-impact">${item.impact || ""}</div>
        </div>
      `)
      .join("");
  } catch {
    document.getElementById("timelineError").textContent = "Could not load timeline data.";
  }
}

render();
