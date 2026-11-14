"""Refresh the public NASA POWER example seasons bundled with the planner."""
from concurrent.futures import ThreadPoolExecutor
from datetime import date, timedelta
import json
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen

API = "https://power.larc.nasa.gov/api/temporal/daily/point"
POINTS = {
    "kaiping": (112.60, 22.48),
    "luzon": (120.93, 15.72),
    "rajshahi": (88.65, 24.43),
    "sacramento": (-121.94, 39.08),
}
SEASONS = [2024, 2023, 2021]


def fetch(point):
    longitude, latitude = point
    query = urlencode({
        "parameters": "PRECTOTCORR,T2M_MIN",
        "community": "AG",
        "longitude": longitude,
        "latitude": latitude,
        "start": "20210901",
        "end": "20250710",
        "format": "JSON",
        "time-standard": "LST",
    })
    with urlopen(f"{API}?{query}", timeout=45) as response:
        source = json.load(response)
    parameters = source["properties"]["parameter"]
    rows = {}
    for year in SEASONS:
        start, end = date(year, 9, 1), date(year + 1, 7, 10)
        for offset in range((end - start).days + 1):
            day = start + timedelta(days=offset)
            key = day.strftime("%Y%m%d")
            rain = parameters["PRECTOTCORR"].get(key, -999)
            minimum = parameters["T2M_MIN"].get(key, -999)
            rows[day.isoformat()] = [
                rain if rain >= 0 else None,
                minimum if minimum != source["header"]["fill_value"] else None,
            ]
    return rows


def main():
    with ThreadPoolExecutor(max_workers=len(POINTS)) as pool:
        rows = dict(zip(POINTS, pool.map(fetch, POINTS.values())))
    output = Path(__file__).resolve().parents[1] / "assets/weather.js"
    payload = json.dumps(rows, separators=(",", ":"))
    output.write_text(f"// NASA POWER daily point data in local solar time.\nconst weather = {payload};\n")


if __name__ == "__main__":
    main()
