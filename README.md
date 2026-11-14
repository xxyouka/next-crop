# Next Crop · 下一茬

Explore rice rotations in **Kaiping, Nueva Ecija, Rajshahi and the Sacramento Valley**. This project addresses NASA Space Apps' **Field Shift: Adapting Farms with NASA Data** challenge.

## Run and try

Double-click `index.html` or run `python3 -m http.server 8766 --bind 127.0.0.1` in this directory. The globe, field replay, planner and bundled data work offline. Use **中文** for Chinese.

1. Rotate the globe and choose a pin, or select a place from the region list.
2. Choose a rotation. Drag the observation date, click a growth stage, or play the season. The sidebar close-up follows the same crop and stage. Each region uses its own crops, seasonal calendar and historical weather. The field is an illustration and the growth stages are assumptions.
3. In the planner, set field conditions and compare strategies. **Three-season check** runs the same plan through 2024/25, 2023/24 and 2021/22; click a cell to switch season and strategy.
4. In Kaiping, select **Try a wet harvest**. The field jumps to 11 March 2024, shows the wet harvest and reports 39.34 mm in the three days ending that date. Switch to 2024/25 with the other inputs held constant to see the rain fall to 0.59 mm at the corresponding 12 March 2025 harvest.
5. In Kaiping, move late-rice harvest to the latest date and early-rice transplant to the earliest. Both winter crops show calendar conflicts. Replay the potato scenario to see the field stay occupied at the planned rice date.

## Data and methods

- [NASA POWER Daily](https://power.larc.nasa.gov/docs/services/api/temporal/daily/) supplies corrected daily precipitation and minimum temperature in local solar time for 2021/22, 2023/24 and 2024/25. The planner uses a three-day rain window. Daily precipitation, minimum temperature and the three-day rain at the selected operation are shown during playback. The three-season check reuses the same window and 30 mm threshold, leaving out the drainage and soil flags so calendar fit and rain can be compared across years. Regenerate with `python3 scripts/fetch-weather.py`.
- The globe uses [NASA Blue Marble](https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/) imagery, obtained from the [three-globe sample image](https://github.com/vasturiano/three-globe/blob/master/example/img/earth-blue-marble.jpg) and resized to 2048 × 1024 for offline playback.
- The regional references are the [Kaiping municipal report](https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html), [PhilRice research highlights](https://www.philrice.gov.ph/wp-content/uploads/2020/07/ASPPD-Highlights-2019.pdf), a [Bangladesh Agricultural University mustard trial](https://ageconsearch.umn.edu/record/211170) and the [UC Cooperative Extension rice-field cover crop trial](https://ucanr.edu/blog/uc-rice-blog/article/winter-cover-crop-variety-evaluation). Calendar offsets, growth stages, preparation buffers and the 30 mm rain threshold are illustrative. Check locally before using them for field decisions.
- The [Kaiping Sentinel-2A image](https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A) is included under Evidence. Crop and resampling are reproduced by `scripts/fetch-image.py` with Rasterio and Pillow. Contains modified Copernicus Sentinel data 2025.
- Plant illustrations use morphology described by [Flora of China for Chinese milk vetch](https://www.worldfloraonline.org/taxon/wfo-0000185133), [KPU Plant Database for potato](https://dplantdatabase.kpu.ca/Plant/sotu), [NSW Flora Online for mung bean](https://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?lvl=sp&name=Vigna~radiata&page=nswfl), [NC State Extension for mustard](https://plants.ces.ncsu.edu/plants/brassica-juncea/) and [University of Minnesota for maize](https://ipmworld.umn.edu/maize-insect-pests-maize-growth-development).
- Codex assisted with implementation, illustration code, test creation and documentation. Python, Node.js, Git and Microsoft Edge were used for data preparation, version history and verification.

Run `node scripts/check-model.cjs` for the calendar, weather, field-condition and replay checks.
