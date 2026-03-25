const root = document.getElementById("root");

const styles = `
  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 20px 60px;
    color: #111827;
  }

  .hero {
    padding: 28px 0 22px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 28px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 12px;
  }

  .title {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .subtitle {
    max-width: 900px;
    color: #4b5563;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .updated {
    color: #6b7280;
    font-size: 14px;
  }

  .section {
    margin-top: 36px;
  }

  .section h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .section p.section-intro {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 18px;
    max-width: 900px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .card {
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 18px;
    background: #fafafa;
  }

  .card-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    margin-bottom: 10px;
  }

  .card-value {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .card-note {
    color: #4b5563;
    font-size: 14px;
    line-height: 1.5;
  }

  .takeaways {
    display: grid;
    gap: 14px;
  }

  .takeaway {
    border-left: 4px solid #111827;
    padding-left: 14px;
  }

  .takeaway h3 {
    font-size: 17px;
    margin-bottom: 6px;
  }

  .takeaway p {
    color: #4b5563;
    line-height: 1.6;
  }

  .charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .chart-card {
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 18px;
    background: #fff;
  }

  .chart-card.wide {
    grid-column: 1 / -1;
  }

  .chart-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .chart-subtitle {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .chart-wrap {
    position: relative;
    height: 320px;
  }

  .footer-note {
    margin-top: 36px;
    padding-top: 18px;
    border-top: 1px solid #e5e7eb;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    .cards, .charts {
      grid-template-columns: 1fr;
    }

    .chart-card.wide {
      grid-column: auto;
    }

    .title {
      font-size: 32px;
    }
  }
`;

root.innerHTML = `
  <style>${styles}</style>
  <div class="page">
    <section class="hero">
      <div class="eyebrow">Laos Macro Tracker</div>
      <div class="title">🇱🇦 Laos Macroeconomic Monitor</div>
      <div class="subtitle">
        A live-style tracker for selected macroeconomic indicators in Lao PDR, focusing on inflation,
        exchange rate pressures, growth, reserves, and debt-related vulnerabilities.
      </div>
      <div class="updated">Last updated: March 2026</div>
    </section>

    <section class="section">
      <h2>Overview</h2>
      <p class="section-intro">
        This tracker is designed to present key macro signals in a compact, readable format.
      </p>

      <div class="cards">
        <div class="card">
          <div class="card-label">Inflation</div>
          <div class="card-value">6.5%</div>
          <div class="card-note">Illustrative latest annual inflation reading.</div>
        </div>
        <div class="card">
          <div class="card-label">Exchange Rate</div>
          <div class="card-value">21,900</div>
          <div class="card-note">Illustrative LAK per USD spot level.</div>
        </div>
        <div class="card">
          <div class="card-label">Growth</div>
          <div class="card-value">4.2%</div>
          <div class="card-note">Illustrative annual real GDP growth estimate.</div>
        </div>
        <div class="card">
          <div class="card-label">Reserves</div>
          <div class="card-value">4.0</div>
          <div class="card-note">Illustrative months of import cover.</div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Key Takeaways</h2>
      <p class="section-intro">
        A short narrative section makes the page feel more like a tracker and less like a plain dashboard.
      </p>

      <div class="takeaways">
        <div class="takeaway">
          <h3>Inflation pressures are easing, but vulnerabilities remain.</h3>
          <p>Recent readings suggest moderation, though imported fuel and exchange-rate risks could quickly reverse the trend.</p>
        </div>
        <div class="takeaway">
          <h3>The exchange rate remains a core transmission channel.</h3>
          <p>Movements in the kip continue to shape inflation, debt servicing costs, and private sector confidence.</p>
        </div>
        <div class="takeaway">
          <h3>Reserve accumulation has improved the near-term buffer.</h3>
          <p>Even so, debt service pressures and external shocks continue to constrain the macro outlook.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Charts</h2>
      <p class="section-intro">
        These sample charts can later be replaced with real monthly or annual data.
      </p>

      <div class="charts">
        <div class="chart-card">
          <div class="chart-title">Inflation Trend</div>
          <div class="chart-subtitle">Illustrative monthly headline inflation.</div>
          <div class="chart-wrap">
            <canvas id="inflationChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-title">Exchange Rate</div>
          <div class="chart-subtitle">Illustrative LAK per USD monthly trend.</div>
          <div class="chart-wrap">
            <canvas id="fxChart"></canvas>
          </div>
        </div>

        <div class="chart-card wide">
          <div class="chart-title">Growth and Reserves</div>
          <div class="chart-subtitle">Illustrative annual macro trends.</div>
          <div class="chart-wrap">
            <canvas id="growthChart"></canvas>
          </div>
        </div>
      </div>
    </section>

    <div class="footer-note">
      Prototype version. Replace illustrative values with real data as needed.
    </div>
  </div>
`;

new Chart(document.getElementById("inflationChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Inflation %",
      data: [8.5, 7.9, 7.2, 6.8, 6.6, 6.5],
      tension: 0.35,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

new Chart(document.getElementById("fxChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "LAK/USD",
      data: [21000, 21300, 21550, 21700, 21800, 21900],
      tension: 0.35,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

new Chart(document.getElementById("growthChart"), {
  type: "bar",
  data: {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Growth %",
        data: [2.7, 3.8, 4.1, 4.2, 4.0]
      },
      {
        label: "Reserves (months of imports)",
        data: [1.3, 2.1, 3.0, 3.8, 4.0]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
