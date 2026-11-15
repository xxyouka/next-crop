# Next Crop · Space Apps submission

**Deadline: Sunday, 15 November 2026, 23:59.** Use the time zone of your Local Event. Universal Event teams use the Team Owner’s local time. If the applicable zone is China Standard Time, submit by 23:59 Beijing time on 15 November. See the [official submission guide](https://www.spaceappschallenge.org/resources/project-submission-guide/#project-submission-start-end-times).

Open **Profile → My Team** and verify that the team selected **Field Shift: Adapting Farms with NASA Data**. If it shows another challenge, the Team Owner can update it under **About → Edit Details**. Then open **Project → Edit**. Use **Dui Dui Dui** in English project materials. [Official team formation guide](https://www.spaceappschallenge.org/resources/team-formation-guide/)

## Project Name

Next Crop

## High-Level Project Summary

Next Crop helps farmers and extension workers explore what to grow between two rice seasons. It compares winter fallow and two local crop options in each of seven rice regions. The planner combines illustrative crop calendars and preparation buffers with NASA POWER daily rainfall, farmer priorities, and user-entered drainage and soil texture.

In Kaiping, the same winter-potato plan encounters 39.34 mm of rain over three days in 2023/24 and 0.59 mm in 2024/25. Moving the simulated late-rice harvest one day earlier shifts the potato harvest one day earlier and reduces the 2023/24 total to 22.89 mm. The adjusted plan passes the calendar and rainfall checks in all three sampled seasons. An illustrated field replay and a shareable scenario link let users inspect the result and discuss whether the date change is feasible on their farm.

## Link to Project Demo

**Recommended: [7-slide English PDF](https://xxyouka.github.io/next-crop/docs/Next-Crop-Demo-Deck.pdf).** Paste this one URL into the Demo field. It includes the team, the challenge, and the before-and-after Kaiping example.

**Alternative:** [29.519-second video with English captions](https://xxyouka.github.io/next-crop/docs/Next-Crop-Demo.mp4). If choosing the video, confirm how the narration was produced. For SI-generated audio, the official guide requires disclosure in both the description and the file metadata.

## Link to Final Project

https://xxyouka.github.io/next-crop/

## Detailed Project Description

**The decision.** After a rice harvest, farmers may have just enough time for a winter crop. The crop must finish early enough for field preparation and the next rice season. A wet harvest or termination day can make a calendar that fits on paper harder to carry out. Next Crop addresses **Field Shift: Adapting Farms with NASA Data** by letting users explore this trade-off before discussing a real planting decision.

**How it works.** Each of seven regions offers winter fallow as a baseline and two example crops. Users set the rice dates, drainage, soil texture, and their priority, such as protecting the next rice date, exploring winter income, or keeping the soil covered. The planner checks crop timing and preparation buffers, sums NASA POWER rainfall on the crop operation day and the two preceding days, and flags field conditions for local review. Minimum temperature is displayed during playback. The three-season check and date search compare calendar fit and rainfall independently of the field-condition flags. The search returns the nearest date change that passes both tests in all three sampled seasons, when such a window exists.

**Try the Kaiping rain demo.** For winter potato, the original 2023/24 plan has 39.34 mm of three-day rain ending on 11 March 2024. Moving late-rice harvest from 12 to 11 November moves the potato harvest to 10 March and lowers the total to 22.89 mm. The next rice date stays at 4 April. The revised plan passes the calendar and rainfall checks in the three sampled seasons. Open the three-season matrix to see how the original plan differs across years.

**Impact and limits.** Field replay and shareable scenarios give farmers, cooperatives, and extension workers a common example to discuss. The tool uses regional weather estimates, three historical samples, illustrative crop durations and buffers, and a demonstration rain threshold of 30 mm. Local variety, maturity, drainage, equipment and market conditions still determine whether a plan is workable. Automated checks cover calendar rules, rainfall examples, data coverage and replay stages.

**Implementation.** The bilingual web app uses HTML, CSS, JavaScript and Canvas with bundled data, so the planner can run offline. Python scripts prepare the NASA POWER data and the Sentinel-2 context image. Node.js runs the model checks. The source is public at https://github.com/xxyouka/next-crop.

## Use of Super Intelligence (SI)

The team defined the project concept, selected the challenge, datasets and model assumptions, and reviewed the result. OpenAI Codex and DeepSeek Harness assisted with application code, procedural Canvas illustration code, automated checks, and editing of the project text and slides. The Canvas illustrations are rendered by code. The globe uses NASA Blue Marble imagery, and the Kaiping context image uses credited Copernicus Sentinel-2A data. Weather values come from NASA POWER.

## NASA Data

- **NASA POWER Daily Point:** Corrected precipitation (`PRECTOTCORR`, mm/day) drives the three-day rainfall checks and date search. Minimum air temperature (`T2M_MIN`, °C) appears in field replay. The Agricultural Community data use local solar time. The three windows begin on 1 September 2021, 2023 and 2024 and end on 10 July of the following year. Seven points × 940 daily records per point across the three windows = 6,580 records. https://power.larc.nasa.gov/docs/services/api/temporal/daily/
- **NASA Blue Marble:** Global imagery used as the globe texture. https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/

## Space Agency Partner Data and Other References

- **ESA / Copernicus Sentinel-2A:** Context image for Kaiping, 3 January 2025, item `S2A_49QFE_20250103_0_L2A`. Contains modified Copernicus Sentinel data 2025. https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A
- **Kaiping municipal winter-rotation report:** Local double rice, winter potato and Chinese milk vetch. https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html
- **Additional Kaiping context:** [Jiangmen's report on winter milk vetch in Kaiping](https://www.jiangmen.gov.cn/home/bmdt/content/post_3256793.html) and [Guangdong's autumn and winter crop guide, winter potato section](https://dara.gd.gov.cn/attachment/0/495/495978/3988900.pdf).
- **PhilRice research highlights:** Rice-based crop systems in the Philippines. https://www.philrice.gov.ph/wp-content/uploads/2020/07/ASPPD-Highlights-2019.pdf
- **Bangladesh Agricultural University mustard trial:** Hassan et al., “Intensification of rice based cropping system incorporating short duration oilseed mustard varieties.” https://doi.org/10.22004/ag.econ.211170 · [Journal PDF](https://banglajol.info/index.php/JBAU/article/view/28703/19148)
- **UC Cooperative Extension:** Winter cover-crop trial in rice fields. https://ucanr.edu/blog/uc-rice-blog/article/winter-cover-crop-variety-evaluation
- **Punjab Agricultural University:** Winter-crop and wheat-sowing guide. https://pau.edu/content/ccil/pf/pp_rabi.pdf
- **FAO AQUASTAT:** Egypt crop profile covering Delta rice and multi-cut berseem. https://www.fao.org/fileadmin/user_upload/aquastat/pdf_files/EGY_egypt_cp.pdf
- **Hubei Agricultural Development Center:** Direct seeding of rapeseed after rice. https://hbnysy.hubei.gov.cn/bmdt/ztzl/nykjcs/njnykjcs/njfw_nj/202410/t20241014_5368583.shtml
- **Globe texture distribution:** NASA Blue Marble sample image from three-globe. https://github.com/vasturiano/three-globe/blob/master/example/img/earth-blue-marble.jpg
- **Plant illustration references:** [Flora of China / World Flora Online](https://www.worldfloraonline.org/taxon/wfo-0000185133), [KPU Plant Database](https://dplantdatabase.kpu.ca/Plant/sotu), [NSW Flora Online](https://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?lvl=sp&name=Vigna~radiata&page=nswfl), [NC State Extension](https://plants.ces.ncsu.edu/plants/brassica-juncea/), and [University of Minnesota](https://ipmworld.umn.edu/maize-insect-pests-maize-growth-development).
- **Typefaces:** Instrument Sans and Instrument Serif, distributed under the SIL Open Font License 1.1. https://github.com/xxyouka/next-crop/tree/main/assets/fonts
- **Tools:** Python, Rasterio, Pillow, HTML, CSS, JavaScript, Canvas, Node.js, Git, OpenAI Codex and DeepSeek Harness.

## Team and submission checks

- [ ] **Members:** Guan Xiao, Lin Yi, Cai Yang and Ye Fenghong appear on the team and are confirmed at the same Local Event or the Universal Event. Verify the actual event and its deadline in the account.
- [ ] **Challenge:** Field Shift: Adapting Farms with NASA Data is selected. [Official challenge page](https://www.spaceappschallenge.org/2026/challenges/adapting-farms-with-nasa-data/)
- [ ] **Demo and project:** Use one public Demo URL and the separately listed live app URL. Both should open without signing in.
- [ ] **Optional attachments:** [Project cover image](https://xxyouka.github.io/next-crop/docs/og.png) and [one-page brief](https://xxyouka.github.io/next-crop/docs/Next-Crop-Judge-Brief.pdf). The brief and cover are supplementary.
- [ ] **Declarations:** Review the two checkboxes covering the Terms and Conditions and original work with attribution for external resources. Confirm them in the form.
- [ ] **Submit:** Click **Submit for Judging** and verify the confirmation banner. If you edit after submitting, submit again before the deadline. [Official submission steps](https://www.spaceappschallenge.org/resources/project-submission-guide/#submitting-your-project)

## Optional Team About text

Team Dui Dui Dui built Next Crop, a rice-rotation planner that uses NASA POWER rainfall to compare winter crop options and surface date changes worth discussing with growers.
