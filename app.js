const root = document.getElementById("root");

let activeTab = "laos";

const LAOS_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=158156900";

root.innerHTML = `
  <style>
    body {
      margin: 0;
      font-family: 'DM Sans', sans-serif;
      background: #fff;
      color: #111827;
    }

    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px;
    }

    .tabs {
      display: flex;
      gap: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 24px;
    }

    .tab {
      background: none;
      border: none;
      padding: 0 0 12px;
      font: inherit;
      font-size: 15px;
      cursor: pointer;
      color: #667085;
    }

    .tab.active {
      color: #2f5bea;
      border-bottom: 2px solid #2f5bea;
      font-weight: 600;
    }

    .title {
      font-size: 34px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .card {
      background: #f5f6f8;
      border: 1px solid #d9dde5;
      border-radius: 14px;
      padding: 18px;
    }

    .sub {
      color: #667085;
      margin-bottom: 16px;
    }

    .chart-wrap {
      position: relative;
      height: 320px;
    }

    .error {
      color: #b42318;
      font-size: 14px;
      padding: 20px 0;
    }
  </style>

  <div class="page">
    <div class="tabs">
      <button class="tab" id="tab-global">Global Markets</button>
      <button class="tab active" id="tab-laos">Laos</button>
    </div>

    <div class="title">Laos</div>

    <div class="card">
      <div><strong>KIP / USD</strong></div>
      <div class="sub">Date and value</div>
      <div class="chart-wrap">
        <canvas id="laosChart"></canvas>
      </div>
      <div id="errorBox" class="error"></div>
    </div>
  </div>
`;

async function fetchSeries(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed");

  const text = await res.text();
  const rows = text.trim().split("\n").slice(1);

  const labels = [];
  const values = [];

  for (const row of rows) {
    const cols = row.split(",");
    if (cols.length < 2) continue;

    const label = cols[0].replace(/"/g, "").trim();
    const value = parseFloat(cols[1].replace(/"/g, "").trim());

    if (!label || Number.isNaN(value)) continue;

    labels.push(label);
    values.push(value);
  }

  return { labels, values };
}

function drawChart(labels, values) {
  new Chart(document.getElementById("laosChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 0
        }
      ]
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
          ticks: { maxTicksLimit: 6 }
        },
        y: {
          grid: { color: "#e5e7eb" }
        }
      }
    }
  });
}

async function init() {
  try {
    const data = await fetchSeries(LAOS_CSV);
    drawChart(data.labels, data.values);
  } catch (err) {
    console.error(err);
    document.getElementById("errorBox").textContent =
      "Could not load Google Sheets data.";
  }
}

init();
