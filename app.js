const root = document.getElementById("root");
const FRED_API_KEY = "c56be78d8aae61df44cbeb137ae473d9";

const state = {
  tab: "overview"
};

const styles = `
  :root{
    --text:#111827;
    --muted:#667085;
    --border:#d9dde5;
    --bg:#f5f6f8;
    --card:#fbfbfc;
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
    overflow-x: auto;
  }

  .tab {
    background: none;
    border: none;
    padding: 0 0 12px;
    font: inherit;
    font-size: 15px;
    color: #475467;
    cursor: pointer;
    white-space: nowrap;
  }

  .tab.active {
    color: #2f5bea;
    border-bottom: 2px solid #2f5bea;
    margin-bottom: -2px;
    font-weight: 600;
  }

  .top-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 16px 0 8px;
    flex-wrap: wrap;
  }

  .top-label {
    font-size: 14px;
    color: #475467;
  }

  .pill {
    border: 1px solid #d0d5dd;
    background: #fff;
    color: #344054;
    border-radius: 8px;
    padding: 6px 12px;
    font: inherit;
    font-size: 14px;
    cursor: default;
  }

  .pill.active {
    background: #4363f1;
    color: white;
    border-color: #4363f1;
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
    height: 230px;
  }

  .wide .chart-wrap {
    height: 280px;
  }

  .source {
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
  }

  .overview-box {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px;
    margin-top: 16px;
  }

  .overview-box h2 {
    margin: 0 0 8px;
    font-size: 22px;
  }

  .overview-box p, .overview-box li {
    line-height: 1.7;
    color: #475467;
    font-size: 15px;
  }

  .overview-box ul {
    margin: 10px 0 0 18px;
    padding: 0;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: 16px;
  }

  .kpi {
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
  }

  .kpi-label {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .kpi-value {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .kpi-note {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    .grid, .kpi-grid { grid-template-columns: 1fr; }
    .title { font-size: 30px; }
  }
`;

function render() {
  root.innerHTML = `
    <style>${styles}</style>
    <div class="page">
      <div class="tabs">
        <button class="tab ${state.tab === "overview" ? "active" : ""}" data-tab="overview">Crisis Overview</button>
        <button class="tab ${state.tab === "global" ? "active" : ""}" data-tab="global">Global Markets</button>
        <button class="tab ${state.tab === "laos" ? "active" : ""}" data-tab="laos">Laos Impact</button>
      </div>

      ${state.tab === "overview" ? renderOverview() : ""}
      ${state.tab === "global" ? renderGlobal() : ""}
      ${state.tab === "laos" ? renderLaos() : ""}
    </div>
  `;

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      render();
    });
  });

  if (state.tab === "global") drawGlobalCharts();
  if (state.tab === "laos") drawLaosCharts();
}

function renderOverview() {
  return `
    <section class="hero">
      <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
      <div class="title">How a global oil shock could transmit through Laos</div>
      <div class="dek">
        This tracker monitors the main channels through which higher oil prices could affect Lao PDR:
        imported fuel costs, domestic pump prices, inflation, the exchange rate, and external buffers.
        It is structured as a monitoring page, separating the global shock from its country-level effects.
      </div>
      <div class="meta">Last updated: March 2026 • Prototype with illustrative data</div>
    </section>

    <div class="overview-box">
      <h2>Why this matters</h2>
      <p>
        Laos is a net fuel importer, which means a sustained increase in global oil prices can quickly
        raise import costs and domestic fuel prices. If this coincides with exchange-rate pressure,
        the inflationary effect can be amplified and macroeconomic buffers can come under additional strain.
      </p>
      <ul>
        <li>Global oil prices are the external shock.</li>
        <li>Fuel costs and the exchange rate are the main transmission channels.</li>
        <li>Inflation, reserves, and macro stability reflect the country-level impact.</li>
      </ul>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-label">Brent</div>
        <div class="kpi-value">US$92</div>
        <div class="kpi-note">Illustrative global oil benchmark.</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Pump fuel prices</div>
        <div class="kpi-value">+14%</div>
        <div class="kpi-note">Illustrative domestic pass-through.</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">LAK/USD</div>
        <div class="kpi-value">22,300</div>
        <div class="kpi-note">Illustrative exchange-rate stress level.</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Inflation</div>
        <div class="kpi-value">8.1%</div>
        <div class="kpi-note">Illustrative headline inflation outcome.</div>
      </div>
    </div>
  `;
}

function renderGlobal() {
  return `
    <div class="top-controls">
      <div class="top-label">Date range:</div>
      <button class="pill active">Feb 1 →</button>
      <button class="pill">All data</button>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Brent Crude — 2026</h3>
        <p class="sub">Price trajectory from pre-shock baseline through the oil shock scenario.</p>
        <div class="chart-wrap"><canvas id="brentChart"></canvas></div>
        <div class="source">Source: Market data / Laos tracker prototype</div>
      </div>

      <div class="card">
        <h3>Brent-WTI Spread</h3>
        <p class="sub">Illustrative widening under Middle East supply disruption.</p>
        <div class="chart-wrap"><canvas id="spreadChart"></canvas></div>
        <div class="source">Source: Calculated / prototype</div>
      </div>

      <div class="card">
        <h3>US Natural Gas</h3>
        <p class="sub">Henry Hub proxy for broader energy market tension.</p>
        <div class="chart-wrap"><canvas id="gasChart"></canvas></div>
        <div class="source">Source: Market data / prototype</div>
      </div>

      <div class="card">
        <h3>VIX (Volatility Index)</h3>
        <p class="sub">Equity fear gauge; higher readings signal broader uncertainty.</p>
        <div class="chart-wrap"><canvas id="vixChart"></canvas></div>
        <div class="source">Source: CBOE / prototype</div>
      </div>

      <div class="card">
        <h3>Gold Price</h3>
        <p class="sub">Safe-haven demand under geopolitical stress.</p>
        <div class="chart-wrap"><canvas id="goldChart"></canvas></div>
        <div class="source">Source: Market data / prototype</div>
      </div>

      <div class="card">
        <h3>Global Supply Chain Pressure</h3>
        <p class="sub">Illustrative logistics bottleneck index under stress.</p>
        <div class="chart-wrap"><canvas id="gscpChart"></canvas></div>
        <div class="source">Source: Prototype estimate</div>
      </div>
    </div>
  `;
}

function renderLaos() {
  return `
    <div class="top-controls">
      <div class="top-label">Date range:</div>
      <button class="pill active">Shock window</button>
      <button class="pill">All data</button>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Retail Fuel Price Index</h3>
        <p class="sub">Illustrative domestic pass-through from global oil prices.</p>
        <div class="chart-wrap"><canvas id="fuelChart"></canvas></div>
        <div class="source">Source: Laos fuel monitoring / prototype</div>
      </div>

      <div class="card">
        <h3>LAK/USD Exchange Rate</h3>
        <p class="sub">Exchange-rate stress can amplify imported inflation.</p>
        <div class="chart-wrap"><canvas id="fxChart"></canvas></div>
        <div class="source">Source: BoL / prototype</div>
      </div>

      <div class="card">
        <h3>Headline Inflation</h3>
        <p class="sub">Illustrative inflation response under an oil shock scenario.</p>
        <div class="chart-wrap"><canvas id="inflationChart"></canvas></div>
        <div class="source">Source: Lao Statistics Bureau / prototype</div>
      </div>

      <div class="card">
        <h3>Reserve Cover</h3>
        <p class="sub">External buffers become more valuable during imported fuel stress.</p>
        <div class="chart-wrap"><canvas id="reservesChart"></canvas></div>
        <div class="source">Source: BoL / prototype</div>
      </div>

      <div class="card wide">
        <h3>Oil shock transmission to Laos</h3>
        <p class="sub">Illustrative summary of the core macro transmission channels.</p>
        <div class="chart-wrap"><canvas id="transmissionChart"></canvas></div>
        <div class="source">Source: Staff construction / prototype</div>
      </div>
    </div>
  `;
}
async function fetchFRED(series) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=${FRED_API_KEY}&file_type=json`;

  const res = await fetch(url);
  const data = await res.json();

  const clean = data.observations
    .filter(d => d.value !== ".") // heq missing
    .slice(-30);

  return {
    labels: clean.map(d => d.date.slice(5)),
    values: clean.map(d => Number(d.value))
  };
}

function lineChart(id, labels, data, label) {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label,
        data,
        tension: 0.35,
        fill: false,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

function barChart(id, labels, data, label) {
  new Chart(document.getElementById(id), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

function drawGlobalCharts() {
async function drawBrent() {
  const data = await fetchFRED("DCOILBRENTEU");

  new Chart(document.getElementById("brentChart"), {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.parsed.y} USD/bbl`
          }
        }
      }
    }
  });
}

  lineChart("spreadChart",
    ["Feb-05","Feb-26","Mar-02","Mar-09","Mar-14","Mar-19","Mar-23"],
    [9,9,11,12,5,17,8],
    "Spread"
  );

  lineChart("gasChart",
    ["Jan-15","Feb-01","Feb-15","Feb-28","Mar-07","Mar-14","Mar-21","Mar-23"],
    [2.94,2.97,2.99,3.14,3.10,3.11,3.16,3.07],
    "US Gas"
  );

  lineChart("vixChart",
    ["Jan-15","Feb-01","Feb-15","Feb-28","Mar-07","Mar-14","Mar-20","Mar-24"],
    [15.2,14.8,15.4,22.3,28.1,26.0,23.8,25.1],
    "VIX"
  );

  lineChart("goldChart",
    ["Jan-15","Feb-01","Feb-15","Feb-28","Mar-07","Mar-14","Mar-19","Mar-23","Mar-24"],
    [4200,4380,5100,4800,4760,4880,4520,4610,4380],
    "Gold"
  );

  barChart("gscpChart",
    ["Jan","Feb","Mar (est.)"],
    [0.8,1.1,3.5],
    "Pressure"
  );
}

function drawLaosCharts() {
  barChart("fuelChart",
    ["Jan","Feb","Mar","Apr","May","Jun"],
    [100,102,105,109,112,114],
    "Fuel"
  );

  lineChart("fxChart",
    ["Jan","Feb","Mar","Apr","May","Jun"],
    [21600,21750,21820,22000,22150,22300],
    "FX"
  );

  lineChart("inflationChart",
    ["Jan","Feb","Mar","Apr","May","Jun"],
    [6.4,6.6,6.9,7.3,7.7,8.1],
    "Inflation"
  );

  lineChart("reservesChart",
    ["2023","2024","2025","2026"],
    [2.1,3.0,3.8,3.4],
    "Reserves"
  );

  new Chart(document.getElementById("transmissionChart"), {
    type: "bar",
    data: {
      labels: ["Oil price", "Fuel imports", "FX pressure", "Inflation", "Buffers"],
      datasets: [{
        label: "Shock intensity",
        data: [100, 118, 112, 121, 86],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

render();
