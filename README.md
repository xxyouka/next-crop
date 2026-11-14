# Next Crop · 下一茬

An interactive winter rotation planner for the **Field Shift: Adapting Farms with NASA Data** challenge. This first implementation covers the double-rice system in Kaiping, Guangdong. A Kaiping municipal report documents winter potato, Chinese milk vetch and traditional winter fallow in the area.

## Run and try

Double-click `index.html` or run `python3 -m http.server 8766 --bind 127.0.0.1` from this directory. The planner, imagery and weather snapshots work offline. Use **中文** for the Chinese interface.

1. Click **Try a wet harvest**. The 2023/24 potato harvest falls on 11 March with 39.34 mm of estimated rain across that day and the two preceding days. The potato row asks for review.
2. Switch to 2024/25 and keep the demo inputs. The assumed potato harvest moves to 12 March and the rain window drops to 0.59 mm. The potato row now fits the example scenario.
3. Move late-rice harvest to the latest date and early-rice transplant to the earliest. Both winter crops now show calendar conflicts. Select a strategy to inspect the causes.

## Data and methods

- [NASA POWER Daily](https://power.larc.nasa.gov/docs/services/api/temporal/daily/) provides corrected daily precipitation at 22.48°N, 112.60°E for 2021/22, 2023/24 and 2024/25. We keep calendar dates, including leap day. The service defaults to local solar time, which the download request specifies explicitly. Daily minimum temperature is bundled for follow-up work. The current decisions use rainfall. Regenerate with `python3 scripts/fetch-weather.py`.
- [Kaiping municipal case report](https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html) documents local winter practices and spring green-manure incorporation. The planner uses illustrative scheduling parameters and alerts for testing. See `model.js` for the 115-day potato duration, 7- and 10-day early-rice preparation buffers, vetch relay-sowing cutoff and 30 mm rain threshold. Field drainage and texture are user entries. Grid rainfall and farmer-entered conditions warrant local verification before farm decisions.
- [Sentinel-2A image record](https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A) provides the true-color regional context image. Crop and resampling are reproduced by `scripts/fetch-image.py` with Rasterio and Pillow. Contains modified Copernicus Sentinel data 2025.
- [Challenge description](https://hackathlone.com/challenges/adapting-farms-with-nasa-data) from the Athlone local event describes the rotation comparison, farm priorities and supporting evidence. The official listing is [Field Shift](https://www.spaceappschallenge.org/2026/challenges/adapting-farms-with-nasa-data/).
- Codex assisted with implementation, test creation and documentation. Python, Node.js, Git and Microsoft Edge were used for data preparation, version history and verification.

Run `node scripts/check-model.cjs` for the calendar, weather and field-condition checks.
