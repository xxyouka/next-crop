# Next Crop

Explore rice rotations in **Kaiping, Nueva Ecija, Rajshahi and the Sacramento Valley**. This project addresses NASA Space Apps' **Field Shift: Adapting Farms with NASA Data** challenge.

**Live demo:** <https://xxyouka.github.io/next-crop/> · **Public repo:** <https://github.com/xxyouka/next-crop> · **Public demo deck:** <https://xxyouka.github.io/next-crop/docs/Next-Crop-Demo-Deck.pdf>

**Team:** Guan Xiao, Lin Yi, Cai Yang, Ye Fenghong · Team Dui Dui Dui.

## Why this matters

Between rice harvest and the next transplant, a farmer has one narrow window. A winter crop can add income or protect the soil, but only if its calendar and the weather at its operation date do not put the next rice season at risk.

Next Crop turns that decision into a field-level check across four rice landscapes. It combines local crop calendars with NASA POWER daily rainfall across three historical seasons and reports calendar fit, field-condition flags and the three-day rain around the operation. The field replay shows what the crop looks like on the selected date; the three-season check separates a lucky year from a robust rotation. A field-shift search then proposes the nearest rice-date window that clears both checks in all three seasons.

- **4** rice regions · **7** winter crops · **3** NASA POWER seasons · **3,760** daily weather records.
- Designed for a short judge demo and for local extension conversations; every recommendation carries its assumptions.
- The **Project brief** button in the hero opens the same summary, data notes and demo inside the app.
- Submission assets: [7-slide demo deck](docs/Next-Crop-Demo-Deck.pdf) · [one-page judge brief](docs/Next-Crop-Judge-Brief.pdf) · [submission copy and checklist](SUBMISSION.md) · [public deployment guide](docs/DEPLOY.md).
- The demo deck is within the Space Apps 7-slide limit. The current submission guide closes on **15 November at 23:59 in the Team Owner's local time**; see [SUBMISSION.md](SUBMISSION.md).

## 30-second judge demo

1. Choose **Kaiping → winter potato**.
2. Select **Try a wet harvest**. The field jumps to 11 March 2024 and the three-day total reads **39.34 mm**.
3. Switch the season to **2024/25** with the same inputs: the corresponding 12 March 2025 operation falls to **0.59 mm**.
4. Open **Find a safer window**: the nearest robust window moves the harvest one day earlier, clearing 39.34 → 22.89 mm in 2023/24 and all three seasons.
5. Open the **three-season check** and click 2023/24 to see the wet window. Then move late-rice harvest to the latest date: both winter crops show calendar conflicts.

## NASA data at a glance

| Layer | What it contributes |
| --- | --- |
| [NASA POWER Daily](https://power.larc.nasa.gov/docs/services/api/temporal/daily/) | Corrected daily precipitation and minimum temperature in local solar time, 2021/22, 2023/24 and 2024/25. Four sites × 940 days = 3,760 daily records, split across the three seasons. |
| [NASA Blue Marble](https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/) | The global texture used by the offline globe. |
| [Copernicus Sentinel-2A](https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A) | A Kaiping context image in Evidence. This is Copernicus data, not NASA data, and is credited as such. |

## Run and try

Double-click `index.html` or run `python3 -m http.server 8766 --bind 127.0.0.1` in this directory. The globe, field replay, planner and bundled data work offline. Use the language button for Chinese.

1. Rotate the globe and choose a pin, or select a place from the region list.
2. Choose a rotation. Drag the observation date, click a growth stage, or play the season. The sidebar close-up follows the same crop and stage. Each region uses its own crops, seasonal calendar and historical weather. The field is an illustration and the growth stages are assumptions.
3. In the planner, set field conditions and compare strategies. **Three-season check** runs the same plan through 2024/25, 2023/24 and 2021/22; click a cell to switch season and strategy.
4. In Kaiping, select **Try a wet harvest**. The field jumps to 11 March 2024, shows the wet harvest and reports 39.34 mm in the three days ending that date. Switch to 2024/25 with the other inputs held constant to see the rain fall to 0.59 mm at the corresponding 12 March 2025 harvest.
5. In Kaiping, move late-rice harvest to the latest date and early-rice transplant to the earliest. Both winter crops show calendar conflicts. Replay the potato scenario to see the field stay occupied at the planned rice date.
6. Use **Copy scenario link** in the planner to share the region, crop, season, dates, field conditions and observation day. Opening the copied URL restores the same state, including the field date.
7. After a wet result, use **Find a safer window** in the left column. It searches nearby harvest and transplant dates, requires calendar fit and sub-30 mm three-day rain in all three seasons, and offers the nearest window to apply.

## Data and methods

- [NASA POWER Daily](https://power.larc.nasa.gov/docs/services/api/temporal/daily/) supplies corrected daily precipitation and minimum temperature in local solar time for 2021/22, 2023/24 and 2024/25. The planner uses a three-day rain window. Daily precipitation, minimum temperature and the three-day rain at the selected operation are shown during playback. The three-season check reuses the same window and 30 mm threshold, leaving out the drainage and soil flags so calendar fit and rain can be compared across years. Regenerate with `python3 scripts/fetch-weather.py`.
- The globe uses [NASA Blue Marble](https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/) imagery, obtained from the [three-globe sample image](https://github.com/vasturiano/three-globe/blob/master/example/img/earth-blue-marble.jpg) and resized to 2048 × 1024 for offline playback.
- The regional references are the [Kaiping municipal report](https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html), [PhilRice research highlights](https://www.philrice.gov.ph/wp-content/uploads/2020/07/ASPPD-Highlights-2019.pdf), a [Bangladesh Agricultural University mustard trial](https://ageconsearch.umn.edu/record/211170) and the [UC Cooperative Extension rice-field cover crop trial](https://ucanr.edu/blog/uc-rice-blog/article/winter-cover-crop-variety-evaluation). Calendar offsets, growth stages, preparation buffers and the 30 mm rain threshold are illustrative. Check locally before using them for field decisions.
- The [Kaiping Sentinel-2A image](https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A) is included under Evidence. Crop and resampling are reproduced by `scripts/fetch-image.py` with Rasterio and Pillow. Contains modified Copernicus Sentinel data 2025.
- Plant illustrations use morphology described by [Flora of China for Chinese milk vetch](https://www.worldfloraonline.org/taxon/wfo-0000185133), [KPU Plant Database for potato](https://dplantdatabase.kpu.ca/Plant/sotu), [NSW Flora Online for mung bean](https://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?lvl=sp&name=Vigna~radiata&page=nswfl), [NC State Extension for mustard](https://plants.ces.ncsu.edu/plants/brassica-juncea/) and [University of Minnesota for maize](https://ipmworld.umn.edu/maize-insect-pests-maize-growth-development).
- Codex assisted with implementation, illustration code, test creation and documentation. Python, Node.js, Git and Microsoft Edge were used for data preparation, version history and verification.
- Typefaces: Instrument Sans and Instrument Serif, self-hosted under the SIL Open Font License 1.1. License texts are in `assets/fonts/`.

## What is illustrative

Crop calendars, growth stages, crop durations, preparation buffers and the 30 mm rain alert are demonstration values drawn from the cited regional sources. Weather is a regional NASA POWER grid estimate, not a field sensor. Drainage and soil texture are user inputs. Check local variety, maturity, pumps, field access and market conditions before using a rotation for a real planting decision.

## Validation

- `node scripts/check-model.cjs` covers the rotation rules, the 39.34 → 0.59 mm wet-harvest comparison, full 940-day coverage for every site and season, and field-replay stage order.
- The interface has been checked at 320, 390 and 1440 px in English and Chinese, across all four regions, with no console errors or horizontal page overflow.
- The app works from `file://` with the bundled weather, globe texture and field illustrations; the external source links are the only network dependency.
