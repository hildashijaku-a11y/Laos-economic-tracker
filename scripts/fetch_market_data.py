import json
import os
from datetime import datetime
from urllib.parse import urlencode
from urllib.request import urlopen

API_KEY = os.environ["FRED_API_KEY"]

SERIES = {
    "brent": "DCOILBRENTEU",
    "wti": "DCOILWTICO",
    "vix": "VIXCLS",
    "gold": "GOLDAMGBD228NLBM",
}

def fetch_series(series_id):
    params = urlencode({
        "series_id": series_id,
        "api_key": API_KEY,
        "file_type": "json",
        "sort_order": "asc",
    })
    url = f"https://api.stlouisfed.org/fred/series/observations?{params}"

    with urlopen(url) as response:
        data = json.load(response)

    observations = data.get("observations", [])
    if not observations:
        raise ValueError(f"No observations returned for {series_id}: {data}")

    clean = [
        x for x in observations
        if x.get("value") not in (".", "", None)
    ][-60:]

    return {
        "labels": [x["date"] for x in clean],
        "values": [float(x["value"]) for x in clean],
    }

def main():
    out = {}
    for key, series_id in SERIES.items():
        out[key] = fetch_series(series_id)

    out["_meta"] = {
        "updated_at_utc": datetime.utcnow().isoformat() + "Z",
        "source": "FRED API"
    }

    with open("market-data.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)

if __name__ == "__main__":
    main()
