"""Refresh the public NASA POWER example seasons bundled with the planner."""
from datetime import date, timedelta
import json
from pathlib import Path
from urllib.request import urlopen

URL = (
    "https://power.larc.nasa.gov/api/temporal/daily/point?"
    "parameters=PRECTOTCORR,T2M_MIN&community=AG&longitude=112.60&latitude=22.48"
    "&start=20210901&end=20250630&format=JSON&time-standard=LST"
)
SEASONS = [2024, 2023, 2021]


def main():
    with urlopen(URL, timeout=45) as response:
        source = json.load(response)
    parameters = source["properties"]["parameter"]
    rows = {}
    for year in SEASONS:
        start, end = date(year, 9, 1), date(year + 1, 6, 30)
        for offset in range((end - start).days + 1):
            day = start + timedelta(days=offset)
            key = day.strftime("%Y%m%d")
            rain = parameters["PRECTOTCORR"].get(key, -999)
            minimum = parameters["T2M_MIN"].get(key, -999)
            rows[day.isoformat()] = [
                rain if rain >= 0 else None,
                minimum if minimum != source["header"]["fill_value"] else None,
            ]
    output = Path(__file__).resolve().parents[1] / "assets/weather.js"
    payload = json.dumps(rows, separators=(",", ":"))
    output.write_text(f"// NASA POWER daily point data, 112.60 E / 22.48 N, local solar time.\nconst weather = {payload};\n")


if __name__ == "__main__":
    main()
