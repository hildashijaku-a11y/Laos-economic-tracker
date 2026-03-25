const root = document.getElementById("root");

const LAOS_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=158156900";

const FUEL_CSV =
  "https://docs.google.com/spreadsheets/d/1F_44fLFdzRz2LDWD9JSFJ3VutU4jbYM5bG7P654m-Dc/export?format=csv&gid=96401015";

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

    .title {
      font-size: 34px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
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
      padding: 12px 0 0;
    }
  </style>

  <div class="page">
    <div class="title">Laos</div>

    <div class="grid">
      <div class="card">
        <div><strong>KIP / USD</strong></div>
        <div class="sub">Date and value</div>
        <div class="chart-wrap">
          <canvas id="laosChart"></canvas>
        </div>
        <div id="errorBox" class="error"></div>
      </div>

      <div class="card">
        <div><strong>Fuel prices</strong></div>
        <div class="sub">Diesel and gasoline</div>
        <div class="chart-wrap">
          <canvas id="fuelChart"></canvas>
        </div>
        <div id="fuelError" class="error"></div>
      </div>
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
    const value = parseFloat(cols[1].replace(/"/g, "").replace(/,/g, "").trim());

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
  const rows = text.trim().split("\n").slice(1);

  const labels = [];
  const diesel = [];
  const gasoline = [];

  for (const row of rows) {
    const cols = row.split(",");
    if (cols.length < 3) continue;

    const date = cols[0].replace(/"/g, "").trim();
    const d = parseFloat(cols[1].replace(/"/g, "").replace(/,/g, "").trim());
    const g = parseFloat(cols[2].replace(/"/g, "").replace(/,/g, "").trim());

    if (!date || Number.isNaN(d) || Number.isNaN(g)) continue;

    labels.push(date);
    diesel.push(d);
    gasoline.push(g);
  }

  return { labels, diesel, gasoline };
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

function drawFuelChart(labels, diesel, gasoline) {
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
          pointRadius: 0
        },
        {
          label: "Gasoline",
          data: gasoline,
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

async function init() {
  try {
    const data = await fetchSeries(LAOS_CSV);
    drawChart(data.labels, data.values);
  } catch (err) {
    console.error(err);
    document.getElementById("errorBox").textContent =
      "Could not load exchange rate data.";
  }
}

async function initFuel() {
  try {
    const data = await fetchFuel(FUEL_CSV);
    drawFuelChart(data.labels, data.diesel, data.gasoline);
  } catch (e) {
    console.error(e);
    document.getElementById("fuelError").textContent =
      "Could not load fuel data.";
  }
}

init();
initFuel();
