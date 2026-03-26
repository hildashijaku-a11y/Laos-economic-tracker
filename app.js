const root = document.getElementById("root");

let activeTab = "crisis";

const SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=";

const URLS = {
  hormuzOil: `${SHEET_BASE}1332311442`,
  hormuzTimeline: `${SHEET_BASE}30458749`,
  shipsTransit: `${SHEET_BASE}907185380`,

  laosFx: `${SHEET_BASE}158156900`,
  reserves: `${SHEET_BASE}864450268`,
  fuel: `${SHEET_BASE}96401015`,
  inflation: `${SHEET_BASE}1526208390`,
  laosTimeline: `${SHEET_BASE}1672038515`,

  overallText: `${SHEET_BASE}1254341027`,
  gold: `${SHEET_BASE}1619011895`,
  vix: `${SHEET_BASE}1068023263`,
};

const COLORS = {
  text: "#223042",
  muted: "#6b7688",
  border: "#d8ccbb",
  blue: "#6e8cab",
  blueDark: "#415f80",
  sand: "#c59d6f",
  rust: "#c1694f",
  slate: "#7a8796",
  bg1: "#eef4f8",
  bg2: "#f6f1e7",
  page: "#fbf8f2",
  card1: "#f8f4ec",
  card2: "#f2ebdf",
};

const styles = `
  :root{
    --text:${COLORS.text};
    --muted:${COLORS.muted};
    --border:${COLORS.border};
    --blue:${COLORS.blue};
    --blue-dark:${COLORS.blueDark};
    --sand:${COLORS.sand};
    --rust:${COLORS.rust};
    --page:${COLORS.page};
    --card-a:${COLORS.card1};
    --card-b:${COLORS.card2};
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(180deg, ${COLORS.bg1} 0%, ${COLORS.bg2} 24%, ${COLORS.page} 100%);
    color: var(--text);
  }

  .page {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 18px 40px;
  }

  .hero {
    padding: 20px 0 10px;
  }

  .eyebrow {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-weight: 700;
    margin-bottom: 8px;
  }

  .title {
    margin: 0 0 12px;
    font-size: 42px;
    line-height: 1.05;
    font-weight: 700;
  }

  .dek {
    font-size: 17px;
    line-height: 1.7;
    color: #516072;
    max-width: 980px;
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

  .tabs {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #cfbfab;
    margin-bottom: 18px;
  }

  .tab {
    background: none;
    border: none;
    padding: 0 0 12px;
    font: inherit;
    font-size: 15px;
    color: #637187;
    cursor: pointer;
  }

  .tab.active {
    color: var(--blue-dark);
    border-bottom: 2px solid var(--blue);
    margin-bottom: -1px;
    font-weight: 700;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  .laos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  .card {
    background: linear-gradient(180deg, var(--card-a) 0%, var(--card-b) 100%);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 10px 30px rgba(60, 75, 95, 0.08);
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 34px rgba(60, 75, 95, 0.11);
    border-color: #cbb89e;
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

  .free-text {
    font-size: 16px;
    line-height: 1.7;
    color: #334155;
    white-space: pre-wrap;
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
    color: var(--blue-dark);
  }

  .kpi-date {
    font-size: 13px;
    color: var(--muted);
  }

  .chart-wrap {
    position: relative;
    height: 285px;
  }

  .iframe-center {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 4px;
  }

  .timeline-scroll {
    max-height: 255px;
    overflow-y: auto;
    padding-right: 8px;
    border-top: 1px solid #ded3c4;
    margin-top: 6px;
  }

  .timeline-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .timeline-scroll::-webkit-scrollbar-track {
    background: #eee6d9;
    border-radius: 999px;
  }

  .timeline-scroll::-webkit-scrollbar-thumb {
    background: #9aa7b6;
    border-radius: 999px;
  }

  .timeline-row {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd1c0;
  }

  .timeline-date {
    font-size: 13px;
    font-weight: 700;
    color: #4f70c0;
  }

  .timeline-text {
    font-size: 14px;
    line-height: 1.55;
    color: #334155;
  }

  .source-note {
    margin-top: 10px;
    font-size: 12px;
    color: var(--muted);
  }

  .oil-summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 8px;
  }

  .oil-box {
    background: #f7f1e7;
    border: 1px solid #dccfbd;
    border-radius: 14px;
    padding: 14px;
  }

  .oil-name {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 6px;
  }

  .oil-value {
    font-size: 22px;
    font-weight: 700;
    color: var(--sand);
    margin-bottom: 4px;
  }

  .oil-change {
    font-size: 13px;
    color: var(--rust);
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
    .grid,
    .laos-grid {
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

    .timeline-row {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    .oil-summary-grid {
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
        <button class="tab ${activeTab === "crisis" ? "active" : ""}" id="tab-crisis">Crisis Overview</button>
        <button class="tab ${activeTab === "global" ? "active" : ""}" id="tab-global">Global</button>
        <button class="tab ${activeTab === "laos" ? "active" : ""}" id="tab-laos">Laos</button>
      </div>

      <section id="tabContent">${renderTabContent()}</section>

      <div class="footer-note">
        Source note: HormuzTracker for disruption and oil-market content; Laos indicators compiled from national sources.
      </div>
    </div>
  `;

  document.getElementById("tab-crisis").onclick = () => {
    activeTab = "crisis";
    render();
  };

  document.getElementById("tab-global").onclick = () => {
    activeTab = "global";
    render();
  };

  document.getElementById("tab-laos").onclick = () => {
    activeTab = "laos";
    render();
  };

  initOverall();

  if (activeTab === "crisis") initCrisisOverview();
  if (activeTab === "global") initGlobal();
  if (activeTab === "laos") initLaos();
}

function renderTabContent() {
  if (activeTab === "crisis") {
    return `
      <div class="grid">
        <div class="card">
          <h3>Crisis Severity</h3>
          <p class="sub">HormuzTracker live badge</p>
          <div class="iframe-center">
            <div style="width:170px; height:62px; overflow:hidden; border-radius:12px;">
              <iframe
                src="https://www.hormuztracker.com/embed?widget=badge"
                width="220"
                height="80"
                frameborder="0"
                style="border:0; transform: scale(0.77); transform-origin: top left;">
              </iframe>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Strait of Hormuz Ship Transits (daily)</h3>
          <p class="sub">Ships in transit</p>
          <div class="chart-wrap"><canvas id="shipsTransitChart"></canvas></div>
          <div id="shipsTransitError" class="error"></div>
        </div>

        <div class="card">
          <h3>Oil Prices</h3>
          <p class="sub">Brent, WTI, TTF and gasoline</p>
          <div id="oilSummaryGrid" class="oil-summary-grid">Loading...</div>
          <div id="oilSummaryError" class="error"></div>
        </div>

        <div class="card">
          <h3>Crisis Timeline</h3>
          <p class="sub">Key events since Feb 28.</p>
          <div id="timelineScroll" class="timeline-scroll">Loading...</div>
          <div class="source-note">Source: HormuzTracker + verified news.</div>
          <div id="timelineError" class="error"></div>
        </div>
      </div>
    `;
  }

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
          <h3>Gold</h3>
          <p class="sub">Global market indicator</p>
          <div class="chart-wrap"><canvas id="goldChart"></canvas></div>
          <div id="goldError" class="error"></div>
        </div>

        <div class="card">
          <h3>VIX</h3>
          <p class="sub">Global volatility</p>
          <div class="chart-wrap"><canvas id="vixChart"></canvas></div>
          <div id="vixError" class="error"></div>
        </div>
      </div>
    `;
  }

  return `
    <div class="laos-grid">
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

      <div class="card">
        <h3>Domestic vs imported goods inflation</h3>
        <p class="sub">Two-line comparison</p>
        <div class="chart-wrap"><canvas id="goodsInflationChart"></canvas></div>
        <div id="goodsInflationError" class="error"></div>
      </div>

      <div class="card">
        <h3>Inflation</h3>
        <p class="sub">Headline, core, non-core, raw food, fuel</p>
        <div class="chart-wrap"><canvas id="cpiChart"></canvas></div>
        <div id="cpiError" class="error"></div>
      </div>

      <div class="card">
        <h3>Laos timeline</h3>
        <p class="sub">Policy and market developments</p>
        <div id="laosTimelineScroll" class="timeline-scroll">Loading...</div>
        <div id="laosTimelineError" class="error"></div>
      </div>
    </div>
  `;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);

  return rows.filter(r => !(r.length === 1 && r[0] === ""));
}

function parseNum(value) {
  const cleaned = (value || "").replace(/"/g, "").replace(/,/g, "").trim();
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
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
  const jan1 = new Date(new Date().getFullYear(), 0, 1);
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

function keepLastN(labels, ...seriesArrays) {
  const start = Math.max(0, labels.length - 18);
  return {
    labels: labels.slice(start),
    series: seriesArrays.map(arr => arr.slice(start))
  };
}

function latestNonNull(labels, values) {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== null && values[i] !== undefined && !Number.isNaN(values[i])) {
      return { label: labels[i], value: values[i] };
    }
  }
  return { label: "", value: null };
}

function formatValue(value, decimals = 1, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}${suffix}`;
}

function singleDataset(label, values, color) {
  return [{
    label,
    data: values,
    borderWidth: 2,
    borderColor: color,
    backgroundColor: color,
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
    borderColor: item.color,
    backgroundColor: item.color,
    tension: 0.25,
    pointRadius: 0,
    spanGaps: true
  }));
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
        legend: { display: datasets.length > 1 }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit }
        },
        y: {
          grid: { color: "#ddd2c3" }
        }
      }
    }
  });
}

function makeBarChart(canvasId, labels, values, color = COLORS.sand, maxTicksLimit = 8) {
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: color,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit }
        },
        y: {
          grid: { color: "#ddd2c3" }
        }
      }
    }
  });
}

function makeGroupedBarChart(canvasId, labels, seriesA, seriesB, labelA, labelB) {
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: labelA,
          data: seriesA,
          backgroundColor: COLORS.sand
        },
        {
          label: labelB,
          data: seriesB,
          backgroundColor: COLORS.blue
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 8 }
        },
        y: {
          grid: { color: "#ddd2c3" }
        }
      }
    }
  });
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

async function fetchInflationWide(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  const headers = rows[0].map(h => (h || "").replace(/"/g, "").toLowerCase().trim());
  const body = rows.slice(1);

  const labels = [];
  const data = {
    headline: [],
    core: [],
    nonCore: [],
    rawFood: [],
    fuel: [],
    domesticGoods: [],
    importedGoods: []
  };

  const idx = {
    date: 0,
    headline: headers.findIndex(h => h.includes("headline")),
    core: headers.findIndex(h => h.includes("core") && !h.includes("non")),
    nonCore: headers.findIndex(h => h.includes("non")),
    rawFood: headers.findIndex(h => h.includes("raw")),
    fuel: headers.findIndex(h => h.includes("fuel")),
    domesticGoods: headers.findIndex(h => h.includes("domestic goods")),
    importedGoods: headers.findIndex(h => h.includes("imported goods"))
  };

  for (const row of body) {
    const date = (row[idx.date] || "").replace(/"/g, "").trim();
    if (!date) continue;

    labels.push(date);
    data.headline.push(parseNum(row[idx.headline]));
    data.core.push(parseNum(row[idx.core]));
    data.nonCore.push(parseNum(row[idx.nonCore]));
    data.rawFood.push(parseNum(row[idx.rawFood]));
    data.fuel.push(parseNum(row[idx.fuel]));
    data.domesticGoods.push(parseNum(row[idx.domesticGoods]));
    data.importedGoods.push(parseNum(row[idx.importedGoods]));
  }

  return { labels, ...data };
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
  const gasIdx = headers.findIndex(h => h.includes("gasoline"));

  for (const row of body) {
    const date = (row[0] || "").replace(/"/g, "").trim();
    if (!date) continue;

    labels.push(date);
    brent.push(parseNum(row[brentIdx]));
    wti.push(parseNum(row[wtiIdx]));
    ttf.push(parseNum(row[ttfIdx]));
    usGasoline.push(parseNum(row[gasIdx]));
  }

  return { labels, brent, wti, ttf, usGasoline };
}

async function fetchTextBlock(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  if (rows.length < 2) return "";

  return rows
    .slice(1)
    .map(r => (r[0] || "").trim())
    .filter(Boolean)
    .join("\n\n");
}

async function fetchTimeline(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const rows = parseCSV(await res.text());
  const headers = rows[0].map(h => (h || "").replace(/"/g, "").toLowerCase().trim());
  const body = rows.slice(1);

  const dateIdx = headers.findIndex(h => h === "date" || h.includes("date"));
  const eventIdx = headers.findIndex(h => h === "event" || h.includes("event") || h.includes("news") || h.includes("text"));

  return body
    .map(row => ({
      date: (row[dateIdx] || "").replace(/"/g, "").trim(),
      event: (row[eventIdx] || "").replace(/"/g, "").trim()
    }))
    .filter(item => item.date || item.event);
}

function latestAndPrevious(values) {
  const valid = values.filter(v => v !== null && v !== undefined && !Number.isNaN(v));
  if (!valid.length) return { latest: null, previous: null };
  if (valid.length === 1) return { latest: valid[0], previous: null };
  return {
    latest: valid[valid.length - 1],
    previous: valid[valid.length - 2]
  };
}

function renderOilSummary(containerId, oil) {
  const metrics = [
    { name: "Brent", values: oil.brent, prefix: "$" },
    { name: "WTI", values: oil.wti, prefix: "$" },
    { name: "TTF", values: oil.ttf, prefix: "€" },
    { name: "US gasoline", values: oil.usGasoline, prefix: "$" }
  ];

  document.getElementById(containerId).innerHTML = metrics.map(m => {
    const pair = latestAndPrevious(m.values);
    const diff = pair.latest !== null && pair.previous !== null ? pair.latest - pair.previous : null;
    const diffText = diff === null ? "—" : `${diff >= 0 ? "+" : ""}${diff.toFixed(2)}`;

    return `
      <div class="oil-box">
        <div class="oil-name">${m.name}</div>
        <div class="oil-value">${m.prefix}${pair.latest !== null ? pair.latest.toFixed(2) : "—"}</div>
        <div class="oil-change">${diffText}</div>
      </div>
    `;
  }).join("");
}

async function initOverall() {
  try {
    const text = await fetchTextBlock(URLS.overallText);
    document.getElementById("overallText").textContent = text || "No text found.";
  } catch {
    document.getElementById("overallTextError").textContent = "Could not load overview text.";
  }

  try {
    const oil = await fetchHormuzOil(URLS.hormuzOil);
    const filtered = filterFromThisJanuary(oil.labels, oil.brent);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiBrent").textContent = formatValue(latest.value, 1);
    document.getElementById("kpiBrentDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiBrentDate").textContent = "Could not load";
  }

  try {
    const fx = await fetchSingleSeries(URLS.laosFx);
    const filtered = filterFromThisJanuary(fx.labels, fx.values);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiFx").textContent = formatValue(latest.value, 0);
    document.getElementById("kpiFxDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiFxDate").textContent = "Could not load";
  }

  try {
    const infl = await fetchInflationWide(URLS.inflation);
    const filtered = keepLastN(infl.labels, infl.headline);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiCpi").textContent = formatValue(latest.value, 1, "%");
    document.getElementById("kpiCpiDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiCpiDate").textContent = "Could not load";
  }

  try {
    const reserves = await fetchSingleSeries(URLS.reserves);
    const filtered = keepLastN(reserves.labels, reserves.values);
    const latest = latestNonNull(filtered.labels, filtered.series[0]);
    document.getElementById("kpiReserves").textContent = formatValue(latest.value, 0);
    document.getElementById("kpiReservesDate").textContent = latest.label || "No data";
  } catch {
    document.getElementById("kpiReservesDate").textContent = "Could not load";
  }
}

async function initCrisisOverview() {
  try {
    const ships = await fetchSingleSeries(URLS.shipsTransit);
    const filtered = filterFromThisJanuary(ships.labels, ships.values);
    makeBarChart("shipsTransitChart", filtered.labels, filtered.series[0], COLORS.sand, 8);
  } catch {
    document.getElementById("shipsTransitError").textContent = "Could not load ship transit data.";
  }

  try {
    const oil = await fetchHormuzOil(URLS.hormuzOil);
    const filtered = filterFromThisJanuary(
      oil.labels,
      oil.brent,
      oil.wti,
      oil.ttf,
      oil.usGasoline
    );

    renderOilSummary("oilSummaryGrid", {
      brent: filtered.series[0],
      wti: filtered.series[1],
      ttf: filtered.series[2],
      usGasoline: filtered.series[3]
    });
  } catch {
    document.getElementById("oilSummaryError").textContent = "Could not load oil summary.";
  }

  try {
    const items = await fetchTimeline(URLS.hormuzTimeline);
    const target = document.getElementById("timelineScroll");

    if (!items.length) {
      target.innerHTML = "No timeline data found.";
      return;
    }

    target.innerHTML = items
      .slice()
      .reverse()
      .map(item => `
        <div class="timeline-row">
          <div class="timeline-date">${item.date || ""}</div>
          <div class="timeline-text">${item.event || ""}</div>
        </div>
      `)
      .join("");
  } catch {
    document.getElementById("timelineError").textContent = "Could not load timeline data.";
  }
}

async function initGlobal() {
  try {
    const oil = await fetchHormuzOil(URLS.hormuzOil);
    const brentFiltered = filterFromThisJanuary(oil.labels, oil.brent);
    const wtiFiltered = filterFromThisJanuary(oil.labels, oil.wti);

    makeLineChart("brentChart", brentFiltered.labels, singleDataset("Brent", brentFiltered.series[0], COLORS.sand));
    makeLineChart("wtiChart", wtiFiltered.labels, singleDataset("WTI", wtiFiltered.series[0], COLORS.blueDark));
  } catch {
    document.getElementById("brentError").textContent = "Could not load oil data.";
    document.getElementById("wtiError").textContent = "Could not load oil data.";
  }

  try {
    const gold = await fetchSingleSeries(URLS.gold);
    const filtered = filterFromThisJanuary(gold.labels, gold.values);
    makeLineChart("goldChart", filtered.labels, singleDataset("Gold", filtered.series[0], "#b6862c"));
  } catch {
    document.getElementById("goldError").textContent = "Could not load gold data.";
  }

  try {
    const vix = await fetchSingleSeries(URLS.vix);
    const filtered = filterFromThisJanuary(vix.labels, vix.values);
    makeLineChart("vixChart", filtered.labels, singleDataset("VIX", filtered.series[0], COLORS.rust));
  } catch {
    document.getElementById("vixError").textContent = "Could not load VIX data.";
  }
}

async function initLaos() {
  try {
    const fx = await fetchSingleSeries(URLS.laosFx);
    const filtered = filterFromThisJanuary(fx.labels, fx.values);
    makeLineChart("fxChart", filtered.labels, singleDataset("KIP / USD", filtered.series[0], COLORS.blueDark));
  } catch {
    document.getElementById("fxError").textContent = "Could not load exchange rate data.";
  }

  try {
    const reserves = await fetchSingleSeries(URLS.reserves);
    const filtered = keepLastN(reserves.labels, reserves.values);
    makeLineChart("reservesChart", filtered.labels, singleDataset("Foreign reserves", filtered.series[0], COLORS.sand));
  } catch {
    document.getElementById("reservesError").textContent = "Could not load reserves data.";
  }

  try {
    const fuel = await fetchFuel(URLS.fuel);
    const filtered = filterFromThisJanuary(fuel.labels, fuel.diesel, fuel.gasoline);
    makeGroupedBarChart("fuelChart", filtered.labels, filtered.series[0], filtered.series[1], "Diesel", "Gasoline");
  } catch {
    document.getElementById("fuelError").textContent = "Could not load fuel data.";
  }

  try {
    const infl = await fetchInflationWide(URLS.inflation);

    const mainFiltered = keepLastN(
      infl.labels,
      infl.headline,
      infl.core,
      infl.nonCore,
      infl.rawFood,
      infl.fuel
    );

    makeLineChart(
      "cpiChart",
      mainFiltered.labels,
      multiDataset([
        { label: "Headline inflation", data: mainFiltered.series[0], color: COLORS.blueDark },
        { label: "Core inflation", data: mainFiltered.series[1], color: COLORS.blue },
        { label: "Non-core inflation", data: mainFiltered.series[2], color: COLORS.sand },
        { label: "Raw food inflation", data: mainFiltered.series[3], color: "#7f9b6a" },
        { label: "Fuel inflation", data: mainFiltered.series[4], color: COLORS.rust }
      ]),
      8
    );

    const goodsFiltered = keepLastN(
      infl.labels,
      infl.domesticGoods,
      infl.importedGoods
    );

    makeLineChart(
      "goodsInflationChart",
      goodsFiltered.labels,
      multiDataset([
        { label: "Domestic goods inflation", data: goodsFiltered.series[0], color: COLORS.blueDark },
        { label: "Imported goods inflation", data: goodsFiltered.series[1], color: COLORS.sand }
      ]),
      8
    );
  } catch {
    document.getElementById("cpiError").textContent = "Could not load inflation data.";
    document.getElementById("goodsInflationError").textContent = "Could not load goods inflation data.";
  }

  try {
    const items = await fetchTimeline(URLS.laosTimeline);
    const target = document.getElementById("laosTimelineScroll");

    if (!items.length) {
      target.innerHTML = "No Laos timeline data found.";
      return;
    }

    target.innerHTML = items
      .slice()
      .reverse()
      .map(item => `
        <div class="timeline-row">
          <div class="timeline-date">${item.date || ""}</div>
          <div class="timeline-text">${item.event || ""}</div>
        </div>
      `)
      .join("");
  } catch {
    document.getElementById("laosTimelineError").textContent = "Could not load Laos timeline.";
  }
}

render();
