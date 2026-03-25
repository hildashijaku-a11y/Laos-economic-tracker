import csv
import json
from datetime import datetime
from io import StringIO
from urllib.request import urlopen

SERIES = {
    "brent": "DCOILBRENTEU",
    "wti": "DCOILWTICO",
    "vix": "VIXCLS",
    "gold": "GOLDAMGBD228NLBM",
}

def fetch_series(series_id):
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"

    with urlopen(url) as response:
        text = response.read().decode("utf-8")

    reader = csv.reader(StringIO(text))
    rows = list(reader)

    if len(rows) < 2:
        raise ValueError(f"No data returned for {series_id}")

    header = rows[0]
    data_rows = rows[1:]

    if len(header) < 2:
        raise ValueError(f"Unexpected CSV format for {series_id}: {header}")

    labels = []
    values = []

    for row in data_rows:
        if len(row) < 2:
            continue
        date = row[0]
        value = row[1]

        if value in (".", "", None):
            continue

        labels.append(date)
        values.append(float(value))

    labels = labels[-60:]
    values = values[-60:]

    return {
        "labels": labels,
        "values": values,
    }

def main():
    out = {}
    for key, series_id in SERIES.items():
        out[key] = fetch_series(series_id)

    out["_meta"] = {
        "updated_at_utc": datetime.utcnow().isoformat() + "Z",
        "source": "FRED CSV"
    }

    with open("market-data.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)

if __name__ == "__main__":
    main()
