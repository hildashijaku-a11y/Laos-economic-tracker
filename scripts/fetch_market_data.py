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

    reader = csv.DictReader(StringIO(text))
    rows = [r for r in reader if r["VALUE"] not in (".", "", None)]

    rows = rows[-60:]

    return {
        "labels": [r["DATE"] for r in rows],
        "values": [float(r["VALUE"]) for r in rows],
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
