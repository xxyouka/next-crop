# Next Crop · submission pack

**Deadline: Sunday 15 November 2026, 23:59 in the Team Owner's local time.** The project page must be submitted with the **Submit for Judging** button; saving is not submitting. Do not rely on the earlier 16 November 07:59 note.

**Status check, 15 Nov 15:30:** the public team page currently shows only the team name “对对对” and no project content. Log in, create/open the Project, paste the fields below, and click **Submit for Judging**. The public team page alone is not a submitted project.

Public links are live and verified. The local preview (`127.0.0.1:8766`) is not the submission link. See [DEPLOY.md](docs/DEPLOY.md) for redeployment.

## Do this now, in order

1. Log in at the Space Apps site and open **Find a Team → 对对对 → Project**.
2. If there is no project yet, create it. Set **Project Name = Next Crop**.
3. Paste the **Summary** and **Detailed description** below. Keep the form in English.
4. Set **Project Demonstration** to the 29-second video URL below (or the 7-slide deck as backup).
5. Set **Project Link** to the live app URL below.
6. Fill **NASA Data**, **Space Agency Partner & Other Data**, and **Use of SI** from the sections below.
7. Confirm all four team members are on the team and confirmed for the same Local Event.
8. Click **Submit for Judging** before 23:59 Team Owner time. Saving a draft is not enough.
9. Open the public project link in a private window and confirm it shows the project.

## Project name

**Next Crop**

## Team

- **Guan Xiao**
- **Lin Yi**
- **Cai Yang**
- **Ye Fenghong**

Team name on the submission page: **Dui Dui Dui**. The deck uses the names above on slide 1.

## High-level summary (50–200 words)

Next Crop is a field-level rotation planner for the weeks between rice seasons. A farmer must decide whether a winter crop can fit before the next transplant, but rainfall varies sharply from year to year. Next Crop combines local crop calendars with NASA POWER daily rainfall across seven rice landscapes and three historical seasons. It checks calendar fit, preparation buffers, the three-day rainfall ending on each crop operation date, and field conditions supplied by the user. A crop replay shows the field from seedlings to harvest; a three-season matrix separates a lucky year from a robust rotation; a field-shift search finds the nearest rice-date window that clears both checks in all three seasons. In Kaiping, the same winter-potato operation records 39.34 mm in 2023/24 and 0.59 mm in 2024/25. The project is a static, bilingual, offline-ready web prototype for extension workers and local discussions, and it clearly labels its illustrative assumptions.

## Detailed project description

Next Crop is an interactive decision-support prototype for rice-based rotations. It addresses the Field Shift challenge by making a field-scale decision visible: after rice harvest, can a winter crop fit before the next rice season, and does the weather at its operation date cooperate?

What it does: the user chooses one of seven rice landscapes (Kaiping, Nueva Ecija, Rajshahi, Sacramento Valley, Punjab, Nile Delta, Jianghan Plain), replays crop growth from seedlings to harvest, and compares winter rotations against a winter-fallow baseline. The planner reports calendar fit and preparation time, field-condition flags for drainage and soil texture, and the three-day rainfall ending on the crop operation date. The three-season check repeats the same plan across 2021/22, 2023/24 and 2024/25, so one wet operation day is visible as a risk rather than hidden by a single season. Find a safer window searches nearby harvest and transplant dates and offers the nearest window that clears the calendar and the three-day rain in all three seasons.

How it works: bundled NASA POWER Daily corrected precipitation and minimum temperature (local solar time) provide 940 days per site across three seasons. The model uses a three-day rain window, an illustrative 30 mm review threshold, local crop calendars and fixed crop durations and stages. It is deliberately transparent about what is illustrative.

Benefits and impact: the tool helps extension workers and cooperatives compare a winter-income option, a soil-cover option and the safe fallow baseline; it shows when a crop collides with the next rice window or a wet operation. The aim is not to replace local agronomy but to make the rainfall and calendar evidence shareable before planting.

Tools: vanilla HTML, CSS and JavaScript; Canvas for the globe, field and crop illustrations; Python for NASA POWER and Sentinel-2 data preparation; Node.js for model checks; Git for versioning. No web framework and no runtime network dependency.

Creative choices: the field itself is the interface — the same crop that is compared in a table is replayed visually, with a close-up and a wet-harvest state. The three-season check turns a single historical comparison into a robustness test, and the field-shift search turns that test into an action: move the rice dates, not just the crop. A “copy scenario link” shares the exact region, crop, season, dates, field conditions and observation day for reproduction.

Factors considered: regional rainfall variability, the rice preparation buffer, field workability, local crop calendars, the difference between a regional grid estimate and a field sensor, and the need for English-language, judge-readable documentation.

## Project demonstration

**Preferred — 29.5-second demo video (ready to paste):**
https://xxyouka.github.io/next-crop/docs/Next-Crop-Demo.mp4

- 29.5 seconds, 1440×900, English voiceover + burned-in English captions; public, no login.
- Shows Kaiping, the 39.34 mm wet window, Find a safer window, the 22.89 mm one-day-earlier result, and the seven-region scope.
- If the form rejects a direct MP4 URL, upload the same file to YouTube as a public or unlisted video and paste that URL.

**Alternative — 7-slide deck:**
https://xxyouka.github.io/next-crop/docs/Next-Crop-Demo-Deck.pdf

- 7 slides, English, public, no login; within the slide limit.
- **One-page brief:** https://xxyouka.github.io/next-crop/docs/Next-Crop-Judge-Brief.pdf
- **Project cover image (1200×630):** https://xxyouka.github.io/next-crop/docs/og.png
- Slide 1 lists **Guan Xiao · Lin Yi · Cai Yang · Ye Fenghong**; the one-page brief also carries the names.
- Test the chosen link in a private browser with no login.

## Project link

- **Live project (ready to paste):** https://xxyouka.github.io/next-crop/ — public, no login, tested.
- Repository: https://github.com/xxyouka/next-crop
- If the site is changed later, redeploy with [docs/DEPLOY.md](docs/DEPLOY.md) and re-test in a private browser.

## NASA data

- NASA POWER Daily — corrected precipitation and minimum temperature, local solar time: https://power.larc.nasa.gov/docs/services/api/temporal/daily/
- NASA POWER — main data access: https://power.larc.nasa.gov/
- NASA Blue Marble — globe texture: https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/

## Space Agency Partner & Other Data

- Copernicus Sentinel-2A image record (Kaiping context image): https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/S2A_49QFE_20250103_0_L2A — contains modified Copernicus Sentinel data 2025.
- Kaiping municipal winter-rotation report: https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html
- PhilRice research highlights: https://www.philrice.gov.ph/wp-content/uploads/2020/07/ASPPD-Highlights-2019.pdf
- Bangladesh Agricultural University mustard trial: https://ageconsearch.umn.edu/record/211170
- UC Cooperative Extension rice-field cover crop trial: https://ucanr.edu/blog/uc-rice-blog/article/winter-cover-crop-variety-evaluation
- Punjab Agricultural University winter-crop guide (wheat sowing): https://pau.edu/content/ccil/pf/pp_rabi.pdf
- FAO AQUASTAT Egypt crop profile (Delta rice and multi-cut berseem): https://www.fao.org/fileadmin/user_upload/aquastat/pdf_files/EGY_egypt_cp.pdf
- Hubei Agricultural Development Center (direct seeding of rapeseed after rice): https://hbnysy.hubei.gov.cn/bmdt/ztzl/nykjcs/njnykjcs/njfw_nj/202410/t20241014_5368583.shtml
- Plant morphology references: Flora of China (Chinese milk vetch), KPU Plant Database (potato), NSW Flora Online (mung bean), NC State Extension (mustard), University of Minnesota (maize).
- Globe texture source: NASA Blue Marble image distributed with the three-globe example: https://github.com/vasturiano/three-globe/blob/master/example/img/earth-blue-marble.jpg
- Code and data preparation: Python, Node.js, HTML/CSS/JavaScript, Canvas, Git; no third-party runtime libraries.

## Use of Super Intelligence (SI)

AI tools assisted with implementation, illustration code, tests and documentation (Codex / DeepSeek Harness); the team chose the challenge, data, model, visual direction and final decisions, and reviewed the output. The field and crop illustrations are procedural Canvas drawings produced by code, not generative image-model outputs. The globe and Sentinel-2 imagery are real agency imagery, credited above. The project brief and demo deck were drafted and edited with AI assistance and reviewed by the team. No NASA logos, flags or mission identifiers are used.

## Optional expert review

A 10-minute review protocol and exact questions are in [docs/VALIDATION.md](docs/VALIDATION.md). It is optional; if completed, add 2–3 sentences under **expert review / desk review**, never “field-tested”.

## Final checklist

- [ ] Project name is **Next Crop**, not the current placeholder.
- [ ] Team members match: Guan Xiao, Lin Yi, Cai Yang, Ye Fenghong.
- [ ] Summary 50–200 words.
- [ ] Demo link is public, English, ≤7 slides or ≤30 seconds.
- [ ] Project link is public and opens without login.
- [ ] Detailed description, SI disclosure, NASA data and other data filled.
- [ ] All team members confirmed at the same Local Event.
- [ ] Click **Submit for Judging** before the Team Owner’s local 15 November 23:59 deadline.
