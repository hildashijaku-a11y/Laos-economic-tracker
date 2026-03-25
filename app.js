const root = document.getElementById("root");

let activeTab = "global";

const BRENT_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=0";

const WTI_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1835083988";

const VIX_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1068023263";

const LAOS_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=158156900";

const FUEL_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=96401015";

const CPI_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1526208390";

const styles = `
  :root{
    --text:#111827;
    --muted:#667085;
    --border:#d9dde5;
    --bg:#f5f6f8;
    --blue:#2f5bea;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background: #ffffff;
  }

  .page {
    max-width: 1220px;
    margin: 0 auto;
    padding: 0 18px 40px;
  }

  .tabs {
    display: flex;
    gap: 18px;
    border-bottom: 2px solid #d8dde6;
    padding-top: 12px;
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

  .hero {
    padding: 8px 0 4px;
    margin-bottom: 10px;
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
    font-size: 38px;
    line-height: 1.08;
    font-weight: 700;
    margin-bottom: 12px;
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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  .card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 18px 14px;
  }

  .card h3 {
    margin: 0 0 4px;
    font-size: 17px;
    font-weight: 700;
  }

  .card p.sub {
    margin: 0 0 12px;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.5;
  }

  .chart-wrap {
    position: relative;
    height: 280px;
  }

  .source {
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
  }

  .error {
    color: #b42318;
    font-size: 14px;
    padding-top: 10px;
  }

  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr; }
    .title { font-size: 30px; }
  }
`;

function render() {
  root.innerHTML = `
    <style>${styles}</style>
    <div class="page">
      <div class="tabs">
        <button class="tab ${activeTab === "global" ? "active" : ""}" id="tab-global">
          Global Markets
        </button>
        <button class="tab ${activeTab === "laos" ? "active" : ""}" id="tab-laos">
          Laos
        </button>
      </div>

      ${
        activeTab === "global"
          ? `
            <section class="hero">
              <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
              <div class="title">Global market indicators</div>
              <div class="dek">Live global indicators feeding the oil shock monitor.</div>
              <div class="meta">Source: Google Sheets live</div>
            </section>

            <div class="grid">
              <div class="card">
                <h3>Brent Crude</h3>
                <p class="sub">Live from Google Sheets.</p>
                <div class="chart-wrap"><canvas id="brentChart"></canvas></div>
                <div id="brentError" class="error"></div>
              </div>

              <div class="card">
                <h3>WTI Crude</h3>
                <p class="sub">Live from Google Sheets.</p>
                <div class="chart-wrap"><canvas id="wtiChart"></canvas></div>
                <div id="wtiError" class="error"></div>
              </div>

              <div class="card">
                <h3>VIX</h3>
                <p class="sub">Live from Google Sheets.</p>
                <div class="chart-wrap"><canvas id="vixChart"></canvas></div>
                <div id="vixError" class="error"></div>
              </div>
            </div>
          `
          : `
            <section class="hero">
              <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
              <div class="title">Laos</div>
              <div class="dek">Exchange rate, fuel prices, and inflation.</div>
              <div class="meta">Source: Google Sheets live</div>
            </section>

            <div class="grid">
              <div class="card">
                <h3>KIP / USD</h3>
                <p class="sub">Date and value</p>
                <div class="chart-wrap"><canvas id="laosChart"></canvas></div>
                <div id="fxError" class="error"></div>
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
          `
      }
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

  if (activeTab === "global") {
    initGlobal();
  } else {
    initFX();
    initFuel();
    initCPI();
  }
}

function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(","));
}

async function fetchSingleSeries(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();
  const rows = parseCSV(text).slice(1);

  const labels = [];
  const values = [];

  for (const row of rows) {
    if (row.length < 2) continue;

    const label = (row[0] || "").replace(/"/g, "").trim();
    const value = parseFloat(
      (row[1] || "").replace(/"/g, "").replace(/,/g, "").trim()
    );

    if (!label || Number.isNaN(value)) continue;

    labels.push(label);
    values.push(value);
  }

  return { labels, values };
}

async function fetchFuel(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();
  const rows = parseCSV(text).slice(1);

  const labels = [];
  const diesel = [];
  const gasoline = [];

  for (const row of rows) {
    if (row.length < 3) continue;

    const date = (row[0] || "").replace(/"/g, "").trim();
    const d = parseFloat(
      (row[1] || "").replace(/"/g, "").replace(/,/g, "").trim()
    );
    const g = parseFloat(
      (row[2] || "").replace(/"/g, "").replace(/,/g, "").trim()
    );

    if (!date || Number.isNaN(d) || Number.isNaN(g)) continue;

    labels.push(date);
    diesel.push(d);
    gasoline.push(g);
  }

  return { labels, diesel, gasoline };
}

async function fetchInflation(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();
  const rows = parseCSV(text);

  if (rows.length < 2) throw new Error("No data");

  const headers = rows[0].map((h) =>
    (h || "").replace(/"/g, "").toLowerCase().trim()
  );
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

    const rowValues = {
      headline: null,
      core: null,
      nonCore: null,
      rawFood: null,
      fuel: null
    };

    for (let i = 1; i < headers.length; i++) {
      const h = headers[i];
      const raw = (row[i] || "").replace(/"/g, "").replace(/,/g, "").trim();
      const val = parseFloat(raw);

      if (Number.isNaN(val)) continue;

      if (h.includes("headline")) rowValues.headline = val;
      else if (h.includes("core") && !h.includes("non")) rowValues.core = val;
      else if (h.includes("non")) rowValues.nonCore = val;
      else if (h.includes("raw")) rowValues.rawFood = val;
      else if (h.includes("fuel")) rowValues.fuel = val;
    }

    if (
      rowValues.headline === null &&
      rowValues.core === null &&
      rowValues.nonCore === null &&
      rowValues.rawFood === null &&
      rowValues.fuel === null
    ) {
      continue;
    }

    labels.push(date);
    headline.push(rowValues.headline);
    core.push(rowValues.core);
    nonCore.push(rowValues.nonCore);
    rawFood.push(rowValues.rawFood);
    fuel.push(rowValues.fuel);
  }

  return { labels, headline, core, nonCore, rawFood, fuel };
}

function makeSingleLineChart(canvasId, labels, values, labelText = "", showLegend = false) {
  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: labelText,
          data: values,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: { display: showLegend }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 6 }
        },
        y: {
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

function makeFuelChart(labels, diesel, gasoline) {
  new Chart(document.getElementById("fuelChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Diesel",
          data: diesel,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: "Gasoline",
          data: gasoline,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 6 }
        },
        y: {
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

function makeInflationChart(labels, headline, core, nonCore, rawFood, fuel) {
  new Chart(document.getElementById("cpiChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Headline inflation",
          data: headline,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: "Core inflation",
          data: core,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: "Non-core inflation",
          data: nonCore,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: "Raw food inflation",
          data: rawFood,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        },
        {
          label: "Fuel inflation",
          data: fuel,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 8 }
        },
        y: {
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

async function initGlobal() {
  try {
    const [brent, wti, vix] = await Promise.all([
      fetchSingleSeries(BRENT_CSV),
      fetchSingleSeries(WTI_CSV),
      fetchSingleSeries(VIX_CSV)
    ]);

    makeSingleLineChart("brentChart", brent.labels, brent.values, "Brent");
    makeSingleLineChart("wtiChart", wti.labels, wti.values, "WTI");
    makeSingleLineChart("vixChart", vix.labels, vix.values, "VIX");
  } catch (e) {
    console.error(e);
    ["brentError", "wtiError", "vixError"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "Could not load global data.";
    });
  }
}

async function initFX() {
  try {
    const data = await fetchSingleSeries(LAOS_CSV);
    makeSingleLineChart("laosChart", data.labels, data.values, "KIP / USD");
  } catch (e) {
    console.error(e);
    document.getElementById("fxError").textContent =
      "Could not load exchange rate data.";
  }
}

async function initFuel() {
  try {
    const data = await fetchFuel(FUEL_CSV);
    makeFuelChart(data.labels, data.diesel, data.gasoline);
  } catch (e) {
    console.error(e);
    document.getElementById("fuelError").textContent =
      "Could not load fuel data.";
  }
}

async function initCPI() {
  try {
    const data = await fetchInflation(CPI_CSV);
    makeInflationChart(
      data.labels,
      data.headline,
      data.core,
      data.nonCore,
      data.rawFood,
      data.fuel
    );
  } catch (e) {
    console.error(e);
    document.getElementById("cpiError").textContent =
      "Could not load inflation data.";
  }
}

render();
