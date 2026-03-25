const root = document.getElementById("root");

let activeTab = "overview";

const BRENT_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=0";
const WTI_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1835083988";
const VIX_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1068023263";

const LAOS_FX_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=158156900";

const LAOS_CPI = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [24.1, 22.8, 21.4, 19.7, 18.3, 17.2]
};

const LAOS_FX = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [21450, 21800, 22120, 22350, 22500, 22420]
};

const LAOS_FUEL = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [18700, 18950, 19100, 19450, 19600, 19520]
};

const styles = `
  :root{
    --text:#111827;
    --muted:#667085;
    --border:#d9dde5;
    --bg:#f5f6f8;
    --blue:#2f5bea;
    --red-bg:#f6e1e1;
    --yellow-bg:#efe6b9;
    --green-bg:#d8efdf;
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

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    margin: 18px 0 22px;
  }

  .overview-card {
    border-radius: 10px;
    padding: 14px 14px 12px;
    border: 1px solid #eadfdf;
    min-height: 92px;
  }

  .overview-card.red { background: var(--red-bg); }
  .overview-card.yellow { background: var(--yellow-bg); }
  .overview-card.green { background: var(--green-bg); }

  .overview-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #a43d2f;
    margin-bottom: 8px;
  }

  .overview-value {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
    color: #9a3c11;
  }

  .overview-value .unit {
    font-size: 13px;
    font-weight: 500;
    color: #667085;
  }

  .overview-change {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #b54708;
  }

  .overview-change.green-text {
    color: #027a48;
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

  .big-number {
    font-size: 58px;
    line-height: 1;
    font-weight: 700;
    color: #e54b44;
    margin: 18px 0 12px;
  }

  .big-number .unit {
    font-size: 22px;
    color: #53627c;
    font-weight: 600;
  }

  .pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: 8px;
    background: #f7dedd;
    color: #b9382c;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .stat-value {
    font-size: 42px;
    font-weight: 700;
    line-height: 1.1;
    margin-top: 10px;
  }

  .stat-value.orange { color: #e39b1c; }
  .stat-value.blue { color: #4361ee; }
  .stat-value.red { color: #e54b44; }

  .small-note {
    font-size: 14px;
    color: #53627c;
    line-height: 1.5;
  }

  .table-wrap {
    max-height: 260px;
    overflow: auto;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    text-align: left;
    padding: 10px 8px;
    border-bottom: 1px solid #d8dde6;
  }

  th {
    font-size: 12px;
    text-transform: uppercase;
    color: #667085;
    font-weight: 700;
  }

  .status-pill {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 999px;
    background: #f7dedd;
    color: #b9382c;
    font-size: 12px;
    font-weight: 700;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #d8dde6;
    font-size: 14px;
  }

  .timeline-date {
    color: #4361ee;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .title {
      font-size: 30px;
    }

    .big-number {
      font-size: 46px;
    }

    .stat-value {
      font-size: 34px;
    }
  }
`;

function renderOverviewBar() {
  return `
    <div class="overview-grid">
      <div class="overview-card red">
        <div class="overview-label">Severity Score</div>
        <div class="overview-value">10 <span class="unit">/10</span></div>
      </div>

      <div class="overview-card red">
        <div class="overview-label">Hormuz Transits</div>
        <div class="overview-value">5 <span class="unit">ships/day</span></div>
        <div class="overview-change green-text">-96.4% vs pre-crisis</div>
      </div>

      <div class="overview-card yellow">
        <div class="overview-label">Brent Crude</div>
        <div class="overview-value">98.83 <span class="unit">USD/bbl</span></div>
        <div class="overview-change">+45.3% vs pre-crisis</div>
      </div>

      <div class="overview-card yellow">
        <div class="overview-label">WTI Crude</div>
        <div class="overview-value">90.67 <span class="unit">USD/bbl</span></div>
        <div class="overview-change">+48.6% vs pre-crisis</div>
      </div>

      <div class="overview-card yellow">
        <div class="overview-label">VIX</div>
        <div class="overview-value">24.85 <span class="unit">index</span></div>
        <div class="overview-change">+53.4% vs pre-crisis</div>
      </div>

      <div class="overview-card green">
        <div class="overview-label">CPI</div>
        <div class="overview-value">3.35 <span class="unit">%</span></div>
        <div class="overview-change green-text">Latest y/y</div>
      </div>

      <div class="overview-card green">
        <div class="overview-label">Exchange Rate</div>
        <div class="overview-value">26,344 <span class="unit">LAK/USD</span></div>
        <div class="overview-change green-text">Official</div>
      </div>

      <div class="overview-card red">
        <div class="overview-label">Fuel Price</div>
        <div class="overview-value">33,420 <span class="unit">kip/L</span></div>
        <div class="overview-change">Diesel retail</div>
      </div>
    </div>
  `;
}

function renderTabs() {
  return `
    <div class="tabs">
      <button class="tab ${activeTab === "overview" ? "active" : ""}" id="tab-overview">
        Crisis Overview
      </button>
      <button class="tab ${activeTab === "global" ? "active" : ""}" id="tab-global">
        Global Markets
      </button>
      <button class="tab ${activeTab === "laos" ? "active" : ""}" id="tab-laos">
        Laos
      </button>
    </div>
  `;
}

function renderOverviewTab() {
  return `
    <div class="grid">
      <div class="card">
        <h3>Crisis Severity Score</h3>
        <p class="sub">Composite assessment across five dimensions.</p>
        <div class="big-number">10<span class="unit">/10</span></div>
        <div class="pill-row">
          <span class="pill">Ship Traffic: 10</span>
          <span class="pill">Oil Prices: 10</span>
          <span class="pill">Insurance: 10</span>
          <span class="pill">Carriers: 10</span>
          <span class="pill">Military: 10</span>
        </div>
        <div class="source">Source: Internal monitoring · 24/3/26</div>
      </div>

      <div class="card">
        <h3>Strait of Hormuz Ship Transits (daily)</h3>
        <p class="sub">Near-zero transits confirm effective closure of the world's most critical oil chokepoint.</p>
        <div class="chart-wrap"><canvas id="transitChart"></canvas></div>
        <div class="source">Source: AIS / crisis monitoring · 24/3/26</div>
      </div>

      <div class="card">
        <h3>Brent Crude Oil Price</h3>
        <p class="sub">The main global oil benchmark feeding imported fuel costs.</p>
        <div class="stat-value orange">$98.83<span class="unit">/bbl</span></div>
        <div class="small-note">+45.3% from pre-crisis baseline. Peak pressure remains high even after recent easing.</div>
        <div class="source">Source: Market data · 24/3/26</div>
      </div>

      <div class="card">
        <h3>WTI Crude Oil Price</h3>
        <p class="sub">US benchmark; Brent-WTI gap helps track Middle East-specific supply stress.</p>
        <div class="stat-value orange">$90.67<span class="unit">/bbl</span></div>
        <div class="small-note">Brent remains above WTI, signaling ongoing geopolitical risk premium.</div>
        <div class="source">Source: Market data · 24/3/26</div>
      </div>

      <div class="card">
        <h3>EU Natural Gas (TTF)</h3>
        <p class="sub">Gas market spillovers signal broader energy stress across Europe and Asia.</p>
        <div class="stat-value blue">$61.50<span class="unit">/MWh</span></div>
        <div class="small-note">+105.0% vs pre-crisis. LNG disruption risks keep gas markets highly sensitive.</div>
        <div class="source">Source: Market data · 24/3/26</div>
      </div>

      <div class="card">
        <h3>Carrier Suspension Status</h3>
        <p class="sub">Illustrative status snapshot for major shipping lines.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Carrier</th>
                <th>Status</th>
                <th>Trapped</th>
                <th>Surcharge</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Maersk</td><td><span class="status-pill">Suspended</span></td><td>12</td><td>+3500/TEU</td></tr>
              <tr><td>MSC</td><td><span class="status-pill">Suspended</span></td><td>15</td><td>+4000/TEU</td></tr>
              <tr><td>CMA CGM</td><td><span class="status-pill">Suspended</span></td><td>8</td><td>+3200/TEU</td></tr>
              <tr><td>COSCO</td><td><span class="status-pill">Suspended</span></td><td>11</td><td>+2800/TEU</td></tr>
              <tr><td>ONE</td><td><span class="status-pill">Suspended</span></td><td>9</td><td>+3100/TEU</td></tr>
              <tr><td>Evergreen</td><td><span class="status-pill">Suspended</span></td><td>7</td><td>+2900/TEU</td></tr>
            </tbody>
          </table>
        </div>
        <div class="source">Source: Carrier advisories · 24/3/26</div>
      </div>

      <div class="card">
        <h3>Insurance Status</h3>
        <p class="sub">War-risk pricing and coverage conditions have tightened sharply.</p>
        <div class="grid" style="margin-top:0;">
          <div style="background:#efe7dc;border-radius:10px;padding:14px;">
            <div class="overview-label" style="margin-bottom:6px;">Premium Range</div>
            <div class="stat-value red" style="font-size:24px;margin:0;">0.5–2.0%+</div>
            <div class="small-note">of hull value</div>
          </div>
          <div style="background:#efe7dc;border-radius:10px;padding:14px;">
            <div class="overview-label" style="margin-bottom:6px;">VLCC Cost</div>
            <div class="stat-value red" style="font-size:24px;margin:0;">$2M+</div>
            <div class="small-note">per transit</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Crisis Timeline</h3>
        <p class="sub">Key developments since the initial escalation.</p>
        <div class="table-wrap">
          <div class="timeline-item">
            <div class="timeline-date">Feb-28</div>
            <div>US launches strikes on Iranian facilities; Iran threatens Strait closure.</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mar-01</div>
            <div>IRGC naval activity rises across Hormuz shipping lanes.</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mar-02</div>
            <div>Ship transits collapse; Brent surges as supply fears intensify.</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mar-03</div>
            <div>Major carriers suspend Hormuz transit operations.</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mar-05</div>
            <div>Regional fuel pricing pressures spread through Asian importers.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGlobalTab() {
  return `
    <section class="hero">
      <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
      <h1 class="title">Global market indicators</h1>
      <div class="dek">
        This page tracks the external shock environment feeding into the Laos monitor, with live series on oil prices and market volatility.
      </div>
      <div class="meta">Source: Google Sheets live</div>
    </section>

    <div class="grid">
      <div class="card">
        <h3>Brent Crude</h3>
        <p class="sub">Live from Google Sheets.</p>
        <div class="chart-wrap"><canvas id="brentChart"></canvas></div>
        <div class="source">Source: Brent sheet</div>
      </div>

      <div class="card">
        <h3>WTI Crude</h3>
        <p class="sub">Live from Google Sheets.</p>
        <div class="chart-wrap"><canvas id="wtiChart"></canvas></div>
        <div class="source">Source: WTI sheet</div>
      </div>

      <div class="card">
        <h3>VIX</h3>
        <p class="sub">Live from Google Sheets.</p>
        <div class="chart-wrap"><canvas id="vixChart"></canvas></div>
        <div class="source">Source: VIX sheet</div>
      </div>
    </div>
  `;
}

function renderLaosTab() {
  return `
    <section class="hero">
      <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
      <h1 class="title">Laos macro indicators</h1>
      <div class="dek">
        Laos remains exposed to global fuel shocks through imported energy costs, exchange rate pressures, and inflation pass-through. This tab tracks the main domestic transmission channels.
      </div>
      <div class="meta">Source: placeholder data for now</div>
    </section>

    <div class="grid">
      <div class="card">
        <h3>Inflation (CPI)</h3>
        <p class="sub">Latest available</p>
        <div class="chart-wrap"><canvas id="cpiChart"></canvas></div>
        <div class="source">Source: Laos CPI series</div>
      </div>

     <div class="grid">
  <div class="card">
    <h3>Exchange Rate</h3>
    <p class="sub">KIP / USD</p>
    <div class="chart-wrap"><canvas id="fxChart"></canvas></div>
    <div class="source">Source: Google Sheets</div>
  </div>
</div>

      <div class="card">
        <h3>Fuel Prices</h3>
        <p class="sub">Domestic retail</p>
        <div class="chart-wrap"><canvas id="fuelChart"></canvas></div>
        <div class="source">Source: Laos fuel series</div>
      </div>
    </div>
  `;
}

function renderCurrentTab() {
  if (activeTab === "overview") return renderOverviewTab();
  if (activeTab === "global") return renderGlobalTab();
  return renderLaosTab();
}

function render() {
  root.innerHTML = `
    <style>${styles}</style>
    <div class="page">
      ${renderOverviewBar()}
      ${renderTabs()}
      ${renderCurrentTab()}
    </div>
  `;

  document.getElementById("tab-overview").onclick = () => {
    activeTab = "overview";
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

  if (activeTab === "overview") {
    drawOverviewCharts();
  } else if (activeTab === "global") {
    drawGlobalCharts();
  } else {
    drawLaosCharts();
  }
}

async function fetchSingleSeries(csvUrl) {
  const res = await fetch(csvUrl);
  const text = await res.text();

  const rows = text.trim().split("\n").map(row => row.split(","));
  rows.shift();

  const labels = [];
  const values = [];

  rows.forEach(row => {
    if (row.length < 2) return;

    const label = row[0]?.trim();
    const value = parseFloat(row[1]);

    if (!label || Number.isNaN(value)) return;

    labels.push(label);
    values.push(value);
  });

  return { labels, values };
}

function makeLineChart(canvasId, labels, values, suffix = "") {
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
      interaction: {
        mode: "index",
        intersect: false
      },
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
              return `${context.parsed.y}${suffix}`;
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

function makeBarChart(canvasId, labels, values) {
  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        borderWidth: 0,
        backgroundColor: values.map((_, i) => i === 0 ? "#e39b1c" : "#e54b44")
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
          ticks: { maxTicksLimit: 7 }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

function drawOverviewCharts() {
  try {
    makeBarChart(
      "transitChart",
      ["Feb-28", "Mar-02", "Mar-04", "Mar-08", "Mar-12", "Mar-16", "Mar-20", "Mar-24"],
      [45, 3, 1, 1, 4, 5, 5, 5]
    );
  } catch (error) {
    console.error(error);
  }
}

async function drawGlobalCharts() {
  try {
    const [brent, wti, vix] = await Promise.all([
      fetchSingleSeries(BRENT_CSV),
      fetchSingleSeries(WTI_CSV),
      fetchSingleSeries(VIX_CSV)
    ]);

    makeLineChart("brentChart", brent.labels, brent.values, " USD/bbl");
    makeLineChart("wtiChart", wti.labels, wti.values, " USD/bbl");
    makeLineChart("vixChart", vix.labels, vix.values, "");
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".chart-wrap").forEach(el => {
      el.innerHTML = `<div style="padding:20px;color:#b42318;font-size:14px;">Could not load Google Sheets data.</div>`;
    });
  }
}


  async function drawLaosCharts() {
  try {
    const fx = await fetchSingleSeries(LAOS_FX_CSV);
    makeLineChart("fxChart", fx.labels, fx.values, " LAK");
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".chart-wrap").forEach(el => {
      el.innerHTML = `<div style="padding:20px;color:#b42318;font-size:14px;">Could not load Laos data.</div>`;
    });
  }
}
