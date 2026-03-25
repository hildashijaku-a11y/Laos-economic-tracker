const root = document.getElementById("root");

let activeTab = "global";

const BRENT_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=0";
const WTI_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1835083988";
const VIX_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1068023263";

// placeholder Laos series for now
// kur te kesh Google Sheets links per Laos, i zevendesojme direkt
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
    height: 230px;
  }

  .source {
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
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
             <div class="dek">
 Brent crude fell to ~$99/bbl and WTI to ~$90.67 on March 24 — continuing the sharp retreat triggered by Trump's postponement of strikes on Iranian energy infrastructure — as risk assets rebounded broadly (S&P 500 +1.4%). VIX eased further to 24.85. Gold slipped to ~$4,320/oz, now down ~23% from the January all-time high of $5,594. Laos fuel prices unchanged since Mar 23 (RON95: 42390 LAK/L; diesel: 40570 LAK/L). Hormuz transits remain near zero. The Strait remains effectively closed on Day 25.
— Crisis Monitoring Unit · March 24, 2026
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
          `
          : `
            <section class="hero">
              <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
              <div class="title">Laos macro indicators</div>
              <div class="dek">
                Domestic transmission channels: prices, exchange rate, and inflation.
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

              <div class="card">
                <h3>Exchange Rate</h3>
                <p class="sub">LAK / USD</p>
                <div class="chart-wrap"><canvas id="fxChart"></canvas></div>
                <div class="source">Source: Laos FX series</div>
              </div>

              <div class="card">
                <h3>Fuel Prices</h3>
                <p class="sub">Domestic retail</p>
                <div class="chart-wrap"><canvas id="fuelChart"></canvas></div>
                <div class="source">Source: Laos fuel series</div>
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
    drawGlobalCharts();
  } else {
    drawLaosCharts();
  }
}

async function fetchSingleSeries(csvUrl) {
  const res = await fetch(csvUrl);
  const text = await res.text();

  const rows = text
    .trim()
    .split("\n")
    .map(row => row.split(","));

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

function drawLaosCharts() {
  try {
    makeLineChart("cpiChart", LAOS_CPI.labels, LAOS_CPI.values, "%");
    makeLineChart("fxChart", LAOS_FX.labels, LAOS_FX.values, " LAK");
    makeLineChart("fuelChart", LAOS_FUEL.labels, LAOS_FUEL.values, " kip");
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".chart-wrap").forEach(el => {
      el.innerHTML = `<div style="padding:20px;color:#b42318;font-size:14px;">Could not load Laos data.</div>`;
    });
  }
}

render();
