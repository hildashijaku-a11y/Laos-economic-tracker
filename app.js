const root = document.getElementById("root");

const BRENT_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=0";
const WTI_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1835083988";
const VIX_CSV = "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=1068023263";

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
        <button class="tab active">Global Markets</button>
      </div>

      <section class="hero">
        <div class="eyebrow">Oil Shock — Laos Impact Tracker</div>
        <div class="title">Global market indicators</div>
        <div class="dek">
          Live global indicators feeding the oil shock monitor.
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
    </div>
  `;

  drawGlobalCharts();
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

render();
