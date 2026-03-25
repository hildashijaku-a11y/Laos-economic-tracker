const root = document.getElementById("root");

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
    color: var(--blue);
    border-bottom: 2px solid var(--blue);
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
      </div>
      <div class="meta">Last updated automatically from FRED-backed local cache</div>
    </section>

    <div class="overview-box">
      <h2>Why this matters</h2>
      <p>
        Laos is a net fuel importer, so a sustained increase in global oil prices can quickly raise import
        costs and domestic fuel prices. If this coincides with exchange-rate pressure, inflation effects
        can intensify and external buffers can come under additional stress.
      </p>
    </div>
  `;
}

function renderGlobal() {
  return `
    <div class="top-controls">
      <div class="top-label">Data source:</div>
      <button class="pill active">market-data.json</button>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Brent Crude</h3>
        <p class="sub">Cached from FRED series DCOILBRENTEU.</p>
        <div class="chart-wrap"><canvas id="brentChart"></canvas></div>
        <div class="source">Source: FRED / ICE Brent proxy</div>
      </div>

      <div class="card">
        <h3>WTI Crude</h3>
        <p class="sub">Cached from FRED series DCOILWTICO.</p>
        <div class="chart-wrap"><canvas id="wtiChart"></canvas></div>
        <div class="source">Source: FRED / WTI proxy</div>
      </div>

      <div class="card">
        <h3>VIX</h3>
        <p class="sub">Cached from FRED series VIXCLS.</p>
        <div class="chart-wrap"><canvas id="vixChart"></canvas></div>
        <div class="source">Source: FRED / CBOE VIX</div>
      </div>

      <div class="card">
        <h3>Gold</h3>
        <p class="sub">Cached from FRED series GOLDAMGBD228NLBM.</p>
        <div class="chart-wrap"><canvas id="goldChart"></canvas></div>
        <div class="source">Source: FRED / LBMA Gold Price</div>
      </div>
    </div>
  `;
}

function renderLaos() {
  return `
    <div class="overview-box">
      <h2>Laos Impact</h2>
      <p>Këtë tab e mbushim pasi të lidhim indikatorët e Laos.</p>
    </div>
  `;
}

async function fetchLocalMarketData() {
  const res = await fetch("./market-data.json");
  if (!res.ok) throw new Error("Could not load market-data.json");
  return res.json();
}

function makeLineChart(canvasId, labels, values, valueSuffix = "") {
  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels,
      datasets: [{
        data: values,
        tension: 0.35,
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "#111827",
          titleColor: "#fff",
          bodyColor: "#fff",
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y}${valueSuffix}`;
            }
          }
        }
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

async function drawGlobalCharts() {
  try {
    const data = await fetchLocalMarketData();

    makeLineChart("brentChart", data.brent.labels, data.brent.values, " USD/bbl");
    makeLineChart("wtiChart", data.wti.labels, data.wti.values, " USD/bbl");
    makeLineChart("vixChart", data.vix.labels, data.vix.values, "");
    makeLineChart("goldChart", data.gold.labels, data.gold.values, " USD/oz");
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".chart-wrap").forEach(el => {
      el.innerHTML = `<div style="padding:20px;color:#b42318;font-size:14px;">Could not load cached data.</div>`;
    });
  }
}

function drawLaosCharts() {}

render();
