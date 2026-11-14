"use strict";

const copy = {
  skip: ["Skip to the regions", "跳到地区选择"], sections: ["Sections", "页面导航"], brand: ["Next Crop", "下一茬"],
  atlas: ["Regions", "地区"], fieldNav: ["Field replay", "田块回放"],
  planner: ["Planner", "轮作工具"], evidence: ["Evidence", "数据依据"],
  headline: ["What grows after rice?", "水稻收完，\n下一茬种什么？"],
  intro: ["Choose a region to watch its crops grow, then test a winter rotation against NASA POWER rainfall from three historical years.", "选择一个地区，看作物从幼苗长到成熟，再用 NASA POWER 三个历史年份的降雨，检验冬季轮作能否接上下一季水稻。"],
  builtWith: ["Built with NASA POWER daily rainfall and Blue Marble imagery.", "基于 NASA POWER 逐日降雨与 Blue Marble 影像。"],
  start: ["Compare rotations", "比较轮作方案"], drag: ["Drag to rotate", "拖动地球旋转"],
  backToAtlas: ["Change region ↑", "切换地区 ↑"], illustration: ["Illustrated field", "田块示意"],
  closeup: ["Crop close-up", "作物近景"],
  observe: ["Observation date", "观察日期"], chooseCrop: ["Choose a rotation", "选择轮作方案"],
  observation: ["Regional weather", "区域历史天气"],
  observedRain: ["Daily rainfall", "当天降水"], observedTemp: ["Daily minimum", "当天最低温"],
  operationRain: ["3-day rain at operation", "作业日三日累计"],
  weatherScale: ["NASA POWER historical grid estimates.", "NASA POWER 历史格点估计。"],
  play: ["▶ Play season", "▶ 播放全季"], pause: ["Ⅱ Pause", "Ⅱ 暂停"],
  stageList: ["Growth stages", "生长阶段"],
  rice: ["Rice", "水稻"], seedlingStage: ["Seedlings", "幼苗"], growingStage: ["Canopy growth", "展叶生长"],
  flowerStage: ["Flowering", "开花"], headingStage: ["Heading", "抽穗"], tasselStage: ["Tasseling", "抽雄"],
  matureStage: ["Maturity", "成熟"], fullBloomStage: ["Full bloom", "盛花"], harvestStage: ["Harvest", "采收"], incorporationStage: ["Termination", "结束覆盖"],
  fallowStage: ["Residue cover", "稻茬覆盖"], prepStage: ["Rice field preparation", "水稻整地"],
  riceStage: ["New rice season", "下一季水稻"], delayedStage: ["Rice schedule needs adjustment", "下一季水稻需重排"],
  occupiedStage: ["Still in the field", "作物仍占田"],
  seedlingStageNote: ["Young plants emerge between the soil ridges.", "小苗从垄间长出，田里还看得见大片土面。"],
  growingStageNote: ["Leaves expand and cover more of the field.", "叶片逐渐展开，田垄之间的绿色覆盖增加。"],
  flowerStageNote: ["This stage illustrates crop flowering.", "田里出现花朵，花色和株形随作物变化。"],
  headingStageNote: ["Seed heads emerge above the leaf blades.", "穗从叶片上方抽出。"],
  tasselStageNote: ["Tassels emerge above the maize leaves.", "玉米叶片上方抽出雄穗。"],
  fullBloomStageNote: ["Milk vetch covers the field in bloom as green-manure incorporation approaches.", "紫云英进入盛花期，即将翻压还田。"],
  matureStageNote: ["The crop approaches its scheduled harvest or termination.", "作物进入成熟阶段，接近计划采收或结束覆盖的日期。"],
  harvestStageNote: ["Harvest clears the standing crop for the next operation.", "采收后，田块腾出来准备下一步作业。"],
  incorporationStageNote: ["The cover crop is cut or incorporated before rice field preparation.", "覆盖作物结束生长，可割除或翻压，再准备水稻整地。"],
  fallowStageNote: ["The illustration assumes that rice stubble stays on the field during fallow.", "这里示意休耕期间保留稻茬的情景。"],
  prepStageNote: ["Time is set aside for field preparation before the next rice season.", "为下一季水稻留出整地时间。"],
  riceStageNote: ["The next rice season starts after the scheduled preparation window.", "完成计划中的整地后，进入下一季水稻。"],
  delayedStageNote: ["The planned rice date leaves too little time for field preparation.", "计划中的水稻日期无法留出足够的整地时间。"],
  occupiedStageNote: ["The rice planting date has arrived while the previous crop still occupies the field.", "已到计划的水稻种植日，上一茬作物仍占着田。"],
  viewImage: ["Kaiping satellite image", "开平卫星影像"],
  workspace: ["Winter rotation planner", "冬季轮作工具"],
  plannerLede: ["Set rice dates and field conditions. The table checks calendar fit, field conditions and rain at each operation; the three-season check repeats the same plan, and Find a safer window searches for the nearest dates that clear both checks in all three seasons.", "设定水稻农时与田况。下表检查农时、田况与作业日降雨；季节对照重跑同一方案；“寻找更稳窗口”会在三个历史季节中寻找最近的、能同时通过农时与降雨的日期。"],
  readingGuide: ["Reading the result", "怎么看结果"],
  guideFits: ["Calendar and rain leave room before the next rice date.", "农时和降雨都为下一季水稻留出了余量。"],
  guideReview: ["A field condition or the 3-day rain needs a local check.", "田况或三日降雨需要当地复核。"],
  guideConflict: ["The crop runs into the next rice date.", "作物与下一季水稻农时发生冲突。"],
  guideNote: ["Unknown drainage or soil adds a review flag. Set both to refine the result.", "排水或土壤选择“待确认”会增加复核项；两项都设置后判断更明确。"],
  recommendation: ["Recommended", "推荐"],
  plannerSection: ["Field planner", "田间规划"], evidenceSection: ["Evidence", "依据"],
  shiftTitle: ["Find a safer window", "换一个更稳的农时窗口"],
  shiftNote: ["Search nearby rice dates for a window that clears the crop calendar and the three-day rain in all three seasons. Field conditions stay as you set them.", "在附近的收割/插秧日期中，寻找一个三个历史季节都能通过农时与三日降雨的窗口。田况保持不变。"],
  findShift: ["Find a safer window", "寻找更稳窗口"], applyShift: ["Apply this window", "应用这个窗口"],
  shiftNow: ["Now · harvest", "现在 · 收割"], shiftSafer: ["Safer · harvest", "更稳 · 收割"],
  shiftNone: ["No rice-date window within the sliders clears the calendar for the selected crop.", "在当前滑杆范围内，没有能让所选作物通过农时检查的窗口。"],
  shiftAlready: ["The current window already clears the calendar and three-day rain in all three seasons.", "当前窗口在三个历史季节中都已通过农时与三日降雨检查。"],
  shiftApplied: ["Applied. Calendar and rain clear all three seasons at this window.", "已应用。这个窗口在三个历史季节中均通过农时与降雨检查。"],
  shiftAppliedPartial: ["Applied. The calendar clears, but {n} of 3 seasons still have a wet or missing rain window.", "已应用。农时通过，但三个季节中仍有 {n} 个存在偏大或缺测的降雨窗口。"],
  seasonCheck: ["Three-season check", "三个历史季节对照"],
  seasonCheckContext: ["Calendar and rain only", "仅看农时与降雨"],
  seasonCaption: ["Same plan in each historical season", "同一方案在三个历史季节中的表现"],
  seasonCheckNote: ["Same inputs and 30 mm rain threshold, run through each historical season. Field-condition flags are left out; select a cell to inspect its full result in the table above.", "使用相同输入和 30 毫米降雨阈值，在三个历史季节中各跑一遍。此处不计排水与土壤复核项；点选格子可回到上方表格查看完整判断。"],
  seasonScale: ["Bars 0–40 mm; marker 30 mm", "条形 0–40 毫米；标记 30 毫米"],
  selectedStrategy: ["Selected strategy", "当前所选方案"],
  fitsShort: ["Fits", "排得进去"], conflictShort: ["Conflict", "农时冲突"],
  wetWindow: ["Wet window", "雨量偏大"], noData: ["No data", "无数据"],
  inputs: ["Your field", "你的田况"], reset: ["Reset", "重置"],
  season: ["Historical season", "历史季节"], drainage: ["Field drainage", "田块排水"],
  soil: ["Field soil texture", "土壤质地"], priority: ["Farm priority", "经营优先项"],
  unknown: ["Unknown", "待确认"], good: ["Drains well", "排水良好"], poor: ["Water tends to pool", "容易积水"],
  loam: ["Loamy", "壤土"], sand: ["Sandy", "沙质土"], clay: ["Heavy clay", "重黏土"],
  keepRice: ["Keep rice on schedule", "保证下季水稻农时"], income: ["Explore winter income", "探索冬季收入"], cover: ["Keep soil covered", "保持土壤覆盖"],
  wetDemo: ["Try a wet harvest ↗", "试算雨后采收 ↗"],
  copyLink: ["Copy scenario link", "复制方案链接"], copied: ["Copied ✓", "已复制 ✓"], copyFailed: ["Copy failed", "复制失败"],
  timeline: ["Season timeline", "轮作时间线"],
  cropWindow: ["Winter window", "冬季农时"],
  prepWindow: ["Rice preparation", "早稻整地"],
  riceMarker: ["Next rice planting", "下一季水稻"],
  compare: ["Winter rotation comparison", "冬季轮作方案对照"], strategy: ["Strategy", "方案"],
  window: ["Winter window", "冬季农时"], rainHead: ["3-day rain", "三日降雨"], status: ["Status", "状态"],
  rainNote: ["Rain includes the operation day and the two days before it. Choose a strategy to see its evidence.", "降雨累计包含作业当日与前两天。点选方案可查看依据。"],
  behind: ["Behind the comparison", "判断依据"],
  evidenceLede: ["Three evidence layers: NASA POWER weather, local crop calendars and a Sentinel-2 field image.", "三层依据：NASA POWER 天气、当地作物日历，以及一张 Sentinel-2 田块影像。"],
  briefLink: ["Project brief", "项目简介"],
  briefKicker: ["NASA Space Apps 2026 · Field Shift", "NASA Space Apps 2026 · Field Shift"],
  briefTitle: ["Plan the weeks after rice", "水稻后的几周怎么排"],
  briefLede: ["Rice farmers have a narrow window between harvest and the next transplant. Next Crop tests whether a winter crop fits — and whether the weather at its operation date cooperates.", "水稻收割到下一季插秧之间，留给冬作的窗口很短。下一茬要回答的是：这茬作物排得进去吗？作业当天的天气配合吗？"],
  briefStatRegions: ["4", "4"], briefRegions: ["rice regions", "水稻地区"],
  briefStatCrops: ["7", "7"], briefCrops: ["winter crops", "冬季作物"],
  briefStatSeasons: ["3", "3"], briefSeasons: ["NASA POWER seasons", "NASA POWER 历史季节"],
  briefStatDays: ["3,760", "3,760"], briefDays: ["daily weather records", "逐日天气记录"],
  briefProblemTitle: ["The problem", "问题"],
  briefProblem: ["A late rice harvest, a wet operation day or an unknown field can turn a good rotation into a missed rice season.", "晚稻推迟、作业日遇到降雨，或田况不明，都可能让一个看似合理的轮作耽误下一季水稻。"],
  briefApproachTitle: ["What we built", "我们做了什么"],
  briefApproach: ["Pick one of four rice landscapes, replay the crop, compare rotations, then test the same plan against three NASA POWER seasons. A field-shift search finds the nearest rice-date window that clears both checks in all three seasons.", "选择四个稻作地区之一，回放作物生长，比较轮作方案，再用三个 NASA POWER 历史季节检验同一方案；还可以搜索最近的、三个季节都能通过农时与降雨的水稻日期窗口。"],
  briefDataTitle: ["NASA data", "NASA 数据"],
  briefData: ["NASA POWER daily corrected precipitation and minimum temperature; NASA Blue Marble imagery; a Copernicus Sentinel-2 context image.", "NASA POWER 逐日修正降水与最低温；NASA Blue Marble 影像；以及一张 Copernicus Sentinel-2 田块影像。"],
  briefMethodTitle: ["Method and limits", "方法与边界"],
  briefMethod: ["Local crop calendars come from cited extension and research sources. The planner uses a three-day rain window around each operation, an illustrative 30 mm review threshold, and fixed crop durations and stages. Weather is a regional grid estimate, not a field sensor; check locally before planting.", "作物日历来自公开的推广与研究资料。工具使用作业日前后三天的降雨窗口、演示用 30 毫米复核阈值，以及固定的生育期与阶段。天气是区域格点估计，不是田块传感器；种植前请在当地核实。"],
  briefDemoTitle: ["Try it in 30 seconds", "30 秒试用"],
  briefDemo1: ["Start with Kaiping and winter potato in 2024/25.", "从开平、冬马铃薯、2024/25 开始。"],
  briefDemo2: ["Select Try a wet harvest: the plan switches to 2023/24, the field jumps to 11 March 2024, and the three-day total is 39.34 mm.", "点“试算雨后采收”：方案切到 2023/24，田块跳到 2024 年 3 月 11 日，三日累计 39.34 毫米。"],
  briefDemo3: ["Switch the season to 2024/25: the corresponding operation falls to 0.59 mm.", "把历史季节切到 2024/25：对应作业日的三日累计降到 0.59 毫米。"],
  briefDemo4: ["Open the three-season check and click 2023/24 to see the wet window.", "打开三个历史季节对照，点 2023/24 查看这次偏大的降雨。"],
  briefDemo5: ["After the wet result, open Find a safer window: the nearest robust window moves the harvest one day earlier and clears all three seasons.", "出现雨后结果后，点“寻找更稳窗口”：最近的稳定窗口把收割提前一天，并在三个历史季节中全部通过。"],
  briefStart: ["Run the wet-harvest demo", "运行雨后采收演示"],
  briefDeck: ["7-slide demo (PDF)", "7 页演示（PDF）"],
  briefPdf: ["One-page brief (PDF)", "一页简介（PDF）"],
  briefClose: ["Close", "关闭"],
  sourceWeather: ["NASA POWER", "NASA POWER"],
  powerLink: ["Daily API documentation ↗", "逐日数据接口说明 ↗"],
  sourceLocal: ["Local crop practices", "本地轮作实践"],
  localLink: ["Local study ↗", "当地资料 ↗"],
  sourceRules: ["Planning assumptions", "规划假设"],
  sourceRulesDesc: ["Illustrative crop stages, crop durations, rice preparation buffers and a 30 mm rain alert. Drainage and soil texture come from your inputs.", "生长阶段、生育期、水稻整地缓冲和 30 毫米降雨提醒采用演示参数。排水和土壤质地来自你的填写。"],
  imageLink: ["Sentinel-2A image record ↗", "Sentinel-2A 影像记录 ↗"],
  footer: ["Next Crop · NASA Space Apps Challenge 2026", "下一茬 · NASA Space Apps Challenge 2026"],
  fallow: ["Winter fallow", "冬闲"], potato: ["Winter potato", "冬马铃薯"], vetch: ["Chinese milk vetch", "紫云英"],
  maize: ["Maize", "玉米"], mung: ["Mung bean", "绿豆"], mustard: ["Oilseed mustard", "油料芥菜"],
  rye: ["Cereal rye", "黑麦"], hairy: ["Hairy vetch", "毛苕子"],
  maizeBenefit: ["Explore grain production between rice seasons. Check water access in the dry season.", "在两季稻之间探索籽粒生产。旱季需确认供水。"],
  mungBenefit: ["Explore a short-season pulse with potential market and rotation value.", "探索短季豆科轮作，并核对销路。"],
  mustardBenefit: ["Explore a short-season oilseed harvest before Boro rice.", "在 Boro 稻之前探索一季短季油料作物。"],
  ryeBenefit: ["Maintain living cover during winter and allow time for termination before rice.", "在冬季保持活体覆盖，水稻前预留结束覆盖的时间。"],
  hairyBenefit: ["Maintain winter soil cover with a legume and plan when to terminate it.", "用豆科作物保持冬季覆盖，并安排结束覆盖的日期。"],
  baseline: ["Baseline", "基准方案"], fits: ["Fits scenario", "排得进去"], review: ["Needs review", "需要复核"], conflict: ["Calendar conflict", "农时冲突"],
  fallowBenefit: ["Leave the field out of winter production and reserve time for early rice preparation.", "冬季不安排新作物，留出早稻整地时间。"],
  potatoBenefit: ["Add a harvest that could provide winter income. Costs and market price still need local checks.", "增加一季可能带来收入的收成。成本与销路仍需当地核实。"],
  vetchBenefit: ["Keep living cover through winter and incorporate this legume as green manure before early rice.", "冬季保留活体覆盖，早稻前把豆科绿肥翻压还田。"],
  fallowNote: ["Field cover depends on how you manage rice residues.", "田面覆盖取决于稻茬和秸秆的管理方式。"],
  lateSowing: ["The sample relay-sowing date is after the assumed Nov 20 cutoff.", "套播日期晚于示例采用的 11 月 20 日截止日。"],
  missingWeather: ["At least one day in the rainfall window is missing.", "降雨窗口中至少有一天缺测。"],
  rain: ["Three-day rain reached the illustrative 30 mm review threshold.", "三日累计降雨达到演示采用的 30 毫米复核阈值。"],
  unknownDrainage: ["Check how quickly the field drains after rain.", "确认雨后田块需要多久排干。"],
  poorDrainage: ["Check whether pooled water could delay field work.", "确认积水是否会耽误进田作业。"],
  unknownSoil: ["Confirm field soil texture locally.", "请在当地核实田块土壤质地。"],
  clay: ["Check workability for potato harvest on heavy clay.", "在重黏土上核实马铃薯能否按时进田采收。"],
  matched: ["Fits the current scenario", "符合当前情景"],
  reviewFirst: ["Check conditions before choosing", "先复核条件"],
  keepBaseline: ["Keep the baseline in view", "保留冬闲基准"],
  riceFirst: ["Fallow reserves time for rice field preparation.", "休耕方案给下季水稻保留整地时间。"],
  conflictSummary: ["The preferred crop runs into a calendar conflict in this scenario.", "优先考虑的作物在当前情景下遇到农时冲突。"],
  evidenceUnavailable: ["No rainfall result for this operation.", "这次作业缺少完整降雨数据。"],
};

const $ = id => document.getElementById(id);
const form = $("field-settings");
const comparison = $("comparison");
const seasonHead = $("season-head");
const seasonBody = $("season-body");
const brief = $("brief");
const copyButton = $("copy-link");
let copyTimer = 0;
let shiftSuggestion = null;
let scrollRaf = 0;
let activeScrollBehavior = null;
let siteChangeTimer = 0;
let arrivalTimer = 0;
function withMotionTransition(update) {
  if (!document.startViewTransition) { update(); return; }
  try { document.startViewTransition(update); }
  catch { update(); }
}
const colors = {
  fallow: "#7d775e", potato: "#8e6439", vetch: "#775297", maize: "#91702d",
  mung: "#587c4a", mustard: "#a8781e", rye: "#627743", hairy: "#725c97",
};
let chinese = false;
let site = NextCrop.sites[0];
let selected = site.crops[0].id;
const t = key => copy[key][Number(chinese)];
const local = pair => pair[Number(chinese)];
const either = (english, chineseText) => chinese ? chineseText : english;
const readRain = date => weather[site.id][date]?.[0] ?? null;
const seasonLabel = year => `${year}/${String(year + 1).slice(-2)}`;
let tableRows;
let seasonRows;
let seasonHeadCells;
let seasonCorner;

function selectCrop(id) {
  selected = id;
  render();
}

const field = mountField({ t, dateLabel, selectCrop, cropColor: colors });
const pins = NextCrop.sites.map(point => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "globe-pin";
  button.addEventListener("click", () => enterSite(point));
  $("globe-pins").append(button);
  return { button, site: point };
});
const globe = mountGlobe($("globe"), pins);
const places = NextCrop.sites.map(point => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "place-button";
  const labels = document.createElement("span");
  const title = document.createElement("strong");
  const area = document.createElement("small");
  const system = document.createElement("small");
  const arrow = document.createElement("span");
  system.className = "place-system";
  arrow.className = "place-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↘";
  labels.append(title, area, system);
  button.append(labels, arrow);
  button.addEventListener("click", () => enterSite(point));
  $("site-list").append(button);
  return { button, title, area, system, site: point };
});

function coordinates(point) {
  return `${Math.abs(point.lat).toFixed(2)}°${point.lat >= 0 ? "N" : "S"} · ${Math.abs(point.lon).toFixed(2)}°${point.lon >= 0 ? "E" : "W"}`;
}

function updateSiteLabels() {
  for (const pin of pins) {
    pin.button.setAttribute("aria-label", local(pin.site.name));
    pin.button.title = local(pin.site.name);
    pin.button.dataset.active = String(pin.site === site);
    pin.button.setAttribute("aria-current", String(pin.site === site));
  }
  for (const place of places) {
    place.title.textContent = local(place.site.name);
    place.area.textContent = local(place.site.area);
    place.system.textContent = local(place.site.system);
    place.button.dataset.active = String(place.site === site);
    place.button.setAttribute("aria-current", String(place.site === site));
  }
  $("field-location").textContent = local(site.area);
  $("field-title").textContent = local(site.name);
  $("field-system").textContent = local(site.system);
  $("field-coordinates").textContent = coordinates(site);
  $("harvest-label").textContent = local(site.previous);
  $("transplant-label").textContent = local(site.next);
  $("source-weather").textContent = either(
    `Daily corrected rainfall and minimum temperature at ${coordinates(site)} in local solar time. These values are regional estimates.`,
    `查询点 ${coordinates(site)}。降雨与最低温采用当地太阳时的历史格点估计。`,
  );
  $("source-local").textContent = local(site.note);
  $("source-link").href = site.source;
  $("kaiping-image").hidden = site.id !== "kaiping";
}

function loadSite(point) {
  site = point;
  selected = site.crops[0].id;
  for (const [id, max, value] of [
    ["harvest", site.harvestMax, site.harvestDefault], ["transplant", site.riceMax, site.riceDefault],
  ]) {
    const input = $(id);
    input.max = max;
    input.defaultValue = value;
  }
  form.reset();
  for (const priority of ["income", "cover"]) {
    const option = $("priority").querySelector(`[value="${priority}"]`);
    option.hidden = !site.priorities[priority];
    option.disabled = option.hidden;
  }
  $("wet-demo").hidden = site.id !== "kaiping";
  clearShift();
  updateSiteLabels();
  buildTable();
  buildSeasonGrid();
  render();
}

function headerOffset() {
  const top = document.querySelector(".top");
  return (top?.getBoundingClientRect().height ?? 0) + 14;
}

function cancelAnimatedScroll() {
  if (!scrollRaf) return;
  cancelAnimationFrame(scrollRaf);
  scrollRaf = 0;
  if (activeScrollBehavior !== null) {
    document.documentElement.style.scrollBehavior = activeScrollBehavior;
    activeScrollBehavior = null;
  }
}

function animateScrollTo(target, { focus = false, onDone, duration: durationOverride } = {}) {
  if (!target) return;
  cancelAnimatedScroll();
  const root = document.documentElement;
  const startY = scrollY;
  const endY = Math.max(0, target.getBoundingClientRect().top + startY - headerOffset());
  const distance = endY - startY;
  const settle = () => {
    root.style.scrollBehavior = activeScrollBehavior ?? "";
    activeScrollBehavior = null;
    scrollRaf = 0;
    syncNav();
    if (focus) {
      const focusTarget = target.matches("a, button") ? target : target.querySelector("h1, h2") ?? target;
      focusTarget.focus({ preventScroll: true });
    }
    onDone?.();
  };
  if (Math.abs(distance) < 2) {
    activeScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    scrollTo(0, endY);
    settle();
    return;
  }
  activeScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const duration = durationOverride ?? Math.min(900, Math.max(420, Math.abs(distance) * .5));
  const started = performance.now();
  const step = now => {
    const t = Math.min(1, (now - started) / duration);
    const eased = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    scrollTo(0, startY + distance * eased);
    if (t < 1) scrollRaf = requestAnimationFrame(step);
    else settle();
  };
  scrollRaf = requestAnimationFrame(step);
}

function markArrived(target) {
  target.classList.add("arrived");
  clearTimeout(arrivalTimer);
  arrivalTimer = setTimeout(() => target.classList.remove("arrived"), 650);
}

function enterSite(point) {
  const changed = site !== point;
  const field = $("field");
  const apply = () => {
    if (changed) {
      loadSite(point);
      field.classList.remove("site-change");
      requestAnimationFrame(() => field.classList.add("site-change"));
      clearTimeout(siteChangeTimer);
      siteChangeTimer = setTimeout(() => field.classList.remove("site-change"), 700);
    }
    globe.focus(point);
    $("field-title").focus({ preventScroll: true });
    markArrived(field);
  };
  if (changed) animateScrollTo(field, { duration: 720, onDone: apply });
  else {
    globe.focus(point);
    animateScrollTo(field, { duration: 560, onDone: () => {
      $("field-title").focus({ preventScroll: true });
      markArrived(field);
    } });
  }
  const shareURL = `${location.pathname}?site=${encodeURIComponent(point.id)}#field`;
  if (`${location.pathname}${location.search}${location.hash}` !== shareURL) history.pushState(null, "", shareURL);
}

function dateLabel(date) {
  const locale = chinese ? "zh-CN" : "en-GB";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(date));
}

function buildTable() {
  comparison.replaceChildren();
  tableRows = Object.fromEntries(["fallow", ...site.crops.map(crop => crop.id)].map(id => {
    const row = comparison.insertRow();
    const name = document.createElement("th");
    name.scope = "row";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "strategy-button";
    button.setAttribute("aria-controls", "strategy-detail");
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.setProperty("--swatch", colors[id]);
    swatch.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    button.append(swatch, label);
    button.addEventListener("click", () => selectCrop(id));
    name.append(button);
    row.append(name);
    const windowCell = row.insertCell();
    windowCell.className = "window-cell";
    const rainCell = row.insertCell();
    rainCell.className = "rain-cell";
    const status = document.createElement("span");
    status.className = "status";
    row.insertCell().append(status);
    return [id, { row, button, label, windowCell, rainCell, status }];
  }));
}

function buildSeasonGrid() {
  const header = document.createElement("tr");
  seasonCorner = document.createElement("th");
  seasonCorner.scope = "col";
  header.append(seasonCorner);
  seasonHeadCells = NextCrop.scenarios.map(year => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = seasonLabel(year);
    header.append(cell);
    return cell;
  });
  seasonHead.replaceChildren(header);

  seasonRows = {};
  seasonBody.replaceChildren();
  for (const id of ["fallow", ...site.crops.map(crop => crop.id)]) {
    const row = document.createElement("tr");
    const name = document.createElement("th");
    name.scope = "row";
    const label = document.createElement("span");
    label.className = "season-name";
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.setProperty("--swatch", colors[id]);
    swatch.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    label.append(swatch, text);
    name.append(label);
    row.append(name);
    const cells = NextCrop.scenarios.map(year => {
      const cell = document.createElement("td");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "season-cell";
      const status = document.createElement("span");
      status.className = "status";
      const rain = document.createElement("span");
      rain.className = "season-rain";
      const bar = document.createElement("span");
      bar.className = "season-bar";
      bar.setAttribute("aria-hidden", "true");
      const fill = document.createElement("span");
      fill.className = "season-bar-fill";
      bar.append(fill);
      button.append(status, rain, bar);
      button.addEventListener("click", () => {
        $("season").value = String(year);
        selected = id;
        render();
      });
      cell.append(button);
      row.append(cell);
      return { button, status, rain, bar, fill };
    });
    seasonBody.append(row);
    seasonRows[id] = { row, text, cells };
  }
}

function seasonState(result) {
  if (result.id === "fallow") return "baseline";
  if (result.reasons.includes("overlap") || result.reasons.includes("lateSowing")) return "conflict";
  if (result.reasons.includes("missingWeather")) return "nodata";
  if (result.reasons.includes("rain")) return "wet";
  return "fits";
}

function seasonStatusText(state) {
  if (state === "wet") return t("wetWindow");
  if (state === "nodata") return t("noData");
  if (state === "fits") return t("fitsShort");
  if (state === "conflict") return t("conflictShort");
  return t(state);
}

function updateSeasonGrid() {
  if (!seasonRows) return;
  const year = Number($("season").value);
  const harvest = $("harvest").valueAsNumber;
  const transplant = $("transplant").valueAsNumber;
  const drainage = $("drainage").value;
  const soil = $("soil").value;
  seasonCorner.textContent = t("strategy");
  NextCrop.scenarios.forEach((scenarioYear, index) => {
    const results = NextCrop.evaluate({ year: scenarioYear, harvest, transplant, drainage, soil, site }, readRain);
    seasonHeadCells[index].dataset.active = String(scenarioYear === year);
    for (const result of results) {
      const entry = seasonRows[result.id];
      if (!entry) continue;
      const cell = entry.cells[index];
      const state = seasonState(result);
      const label = seasonStatusText(state);
      cell.status.dataset.state = state;
      cell.status.textContent = label;
      cell.rain.textContent = result.rain === null ? "—" : `${result.rain.toFixed(2)} mm`;
      cell.button.dataset.state = state;
      cell.bar.hidden = result.id === "fallow" || result.rain === null;
      cell.fill.style.inlineSize = result.rain === null ? "0%" : `${Math.max(2, Math.min(100, result.rain / 40 * 100))}%`;
      const active = result.id === selected && scenarioYear === year;
      cell.button.dataset.active = String(active);
      cell.button.setAttribute("aria-pressed", String(active));
      cell.button.setAttribute("aria-label", `${t(result.id)} · ${seasonLabel(scenarioYear)} · ${label} · ${cell.rain.textContent}`);
    }
  });
  for (const [id, entry] of Object.entries(seasonRows)) {
    entry.text.textContent = t(id);
    entry.row.dataset.active = String(id === selected);
  }
}

function updateSummary(preferred, priority) {
  const { id, status, slack, reasons } = preferred;
  let title = t(id);
  let detail;
  const label = text => { $("summary-label").textContent = `${t("recommendation")} · ${text}`; };
  if (priority === "rice") {
    label(t("keepRice"));
    detail = t("riceFirst");
  } else if (status === "conflict") {
    label(t("keepBaseline"));
    title = t("fallow");
    detail = t("conflictSummary");
  } else {
    label(t(status === "fits" ? "matched" : "reviewFirst"));
    detail = status === "review" ? t(reasons[0]) : either(
      `${slack} extra days before the next rice planting, after the preparation buffer.`,
      `扣除整地缓冲后，距下一季水稻种植还有 ${slack} 天。`,
    );
  }
  $("summary-title").textContent = title;
  $("summary-detail").textContent = detail;
}

function updateDetail(result) {
  const { id, status, operation, prepEnd, slack, reasons, rain } = result;
  $("detail-title").textContent = t(id);
  $("detail-tag").dataset.state = status;
  $("detail-tag").textContent = t(status);
  $("detail-benefit").textContent = t(`${id}Benefit`);
  const schedule = slack >= 0 ? either(
    `${slack} extra days after the assumed preparation buffer ends on ${dateLabel(prepEnd)}.`,
    `示例整地窗口在 ${dateLabel(prepEnd)} 结束，之后还剩 ${slack} 天。`,
  ) : either(
    `The next rice planting would need ${-slack} more days to keep this preparation buffer.`,
    `下一季水稻需再推迟 ${-slack} 天，才能留足整地缓冲。`,
  );
  const notes = id === "fallow" ? [t("fallowNote")] : [
    schedule, ...reasons.filter(reason => reason !== "overlap").map(t),
  ];
  $("detail-reasons").replaceChildren(...notes.map(note => {
    const item = document.createElement("li");
    item.textContent = note;
    return item;
  }));
  $("detail-rain").textContent = id === "fallow" ? "" : rain === null ? t("evidenceUnavailable") : either(
    `NASA POWER · ${rain.toFixed(2)} mm in the three days ending ${dateLabel(operation)}.`,
    `NASA POWER · 截至 ${dateLabel(operation)} 的三日累计降雨为 ${rain.toFixed(2)} 毫米。`,
  );
}

function updateTimeline(results, riceDate, year) {
  const first = Date.UTC(year, site.harvestStart[0] - 1, 1);
  const last = Math.max(Date.parse(riceDate), ...results.map(row => Date.parse(row.prepEnd))) + 18 * 86_400_000;
  const percent = date => (Date.parse(date) - first) / (last - first) * 100;
  const timeline = $("timeline-rows");
  timeline.style.setProperty("--rice", `${percent(riceDate)}%`);
  const axis = document.createElement("div");
  axis.className = "timeline-axis";
  for (let month = site.harvestStart[0] - 1; Date.UTC(year, month, 1) < last - 6 * 86_400_000; month++) {
    const tick = document.createElement("span");
    const date = new Date(Date.UTC(year, month, 1)).toISOString();
    tick.textContent = new Intl.DateTimeFormat(chinese ? "zh-CN" : "en-GB", {
      month: "short", timeZone: "UTC",
    }).format(new Date(date));
    tick.style.left = `${percent(date)}%`;
    axis.append(tick);
  }

  const rows = results.map(({ id, start, operation, prepEnd }) => {
    const row = document.createElement("div");
    row.className = "timeline-row";
    const title = document.createElement("span");
    title.className = "timeline-name";
    title.textContent = t(id);
    const track = document.createElement("div");
    track.className = "timeline-track";
    const crop = document.createElement("span");
    crop.className = "timeline-bar";
    crop.style.setProperty("--crop", colors[id]);
    crop.style.left = `${percent(start)}%`;
    crop.style.width = `${percent(operation) - percent(start)}%`;
    const prep = document.createElement("span");
    prep.className = "timeline-prep";
    prep.style.left = `${percent(operation)}%`;
    prep.style.width = `${percent(prepEnd) - percent(operation)}%`;
    track.append(crop, prep);
    row.append(title, track);
    return row;
  });
  timeline.replaceChildren(axis, ...rows);
}

function render() {
  if (!tableRows) return;
  const year = Number($("season").value);
  const harvest = $("harvest").valueAsNumber;
  const transplant = $("transplant").valueAsNumber;
  const drainage = $("drainage").value;
  const soil = $("soil").value;
  const priority = $("priority").value;
  const dates = NextCrop.calendar(year, harvest, transplant, site);
  for (const [id, date] of [["harvest", dates.harvest], ["transplant", dates.rice]]) {
    const formatted = dateLabel(date);
    $(`${id}-value`).value = formatted;
    $(id).setAttribute("aria-valuetext", formatted);
  }
  const results = NextCrop.evaluate({ year, harvest, transplant, drainage, soil, site }, readRain);
  for (const result of results) {
    const { id, start, operation, rain, status } = result;
    const cells = tableRows[id];
    const active = String(id === selected);
    cells.row.dataset.active = active;
    cells.button.setAttribute("aria-pressed", active);
    cells.label.textContent = t(id);
    cells.windowCell.textContent = `${dateLabel(start)} – ${dateLabel(operation)}`;
    cells.rainCell.textContent = rain === null ? "—" : `${rain.toFixed(2)} mm`;
    cells.status.dataset.state = status;
    cells.status.textContent = t(status);
  }
  updateTimeline(results, dates.rice, year);
  $("rotation-context").textContent = `${seasonLabel(year)} · ${local(site.system)}`;
  updateSeasonGrid();
  const preferred = site.priorities[priority] ?? "fallow";
  updateSummary(results.find(result => result.id === preferred), priority);
  const active = results.find(result => result.id === selected);
  updateDetail(active);
  field.update(site, active, results, dates);
}

$("language").addEventListener("click", event => {
  const toggle = event.currentTarget;
  const activeLink = document.querySelector('nav a[aria-current="location"]');
  const activeSection = document.getElementById(activeLink?.hash.slice(1) ?? "atlas");
  const activeTop = activeSection?.getBoundingClientRect().top;
  withMotionTransition(() => {
    const root = document.documentElement;
    const previousAnchor = root.style.overflowAnchor;
    const previousBodyAnchor = document.body.style.overflowAnchor;
    root.style.overflowAnchor = "none";
    document.body.style.overflowAnchor = "none";
    chinese = !chinese;
    document.documentElement.lang = chinese ? "zh-Hans" : "en";
    document.title = either("Next Crop · What grows after rice?", "下一茬 · 水稻收完，种什么？");
    toggle.lang = chinese ? "en" : "zh-Hans";
    toggle.textContent = either("中文", "English");
    clearShift();
    for (const node of document.querySelectorAll("[data-t]")) node.textContent = t(node.dataset.t);
    updateSiteLabels();
    render();
    const restore = () => {
      if (!activeSection || activeTop === undefined) return;
      const target = activeSection.getBoundingClientRect().top + scrollY - activeTop;
      const behavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      scrollTo(0, Math.max(0, target));
      root.style.scrollBehavior = behavior;
      syncNav();
    };
    restore();
    requestAnimationFrame(() => {
      restore();
      requestAnimationFrame(() => {
        restore();
        root.style.overflowAnchor = previousAnchor;
        document.body.style.overflowAnchor = previousBodyAnchor;
      });
    });
  });
});
function scenarioFromURL() {
  const params = new URLSearchParams(location.search);
  const point = NextCrop.sites.find(candidate => candidate.id === params.get("site"));
  if (!point) return null;
  const crop = params.get("crop");
  const cropIds = ["fallow", ...point.crops.map(entry => entry.id)];
  const season = Number(params.get("season"));
  const harvest = Number(params.get("harvest"));
  const transplant = Number(params.get("transplant"));
  const drainage = params.get("drainage");
  const soil = params.get("soil");
  const priority = params.get("priority");
  const day = Number(params.get("day"));
  return {
    point,
    crop: cropIds.includes(crop) ? crop : point.crops[0].id,
    season: NextCrop.scenarios.includes(season) ? season : 2024,
    harvest: Number.isFinite(harvest) ? Math.min(point.harvestMax, Math.max(0, harvest)) : point.harvestDefault,
    transplant: Number.isFinite(transplant) ? Math.min(point.riceMax, Math.max(0, transplant)) : point.riceDefault,
    drainage: ["unknown", "good", "poor"].includes(drainage) ? drainage : "unknown",
    soil: ["unknown", "loam", "sand", "clay"].includes(soil) ? soil : "unknown",
    priority: point.priorities[priority] ? priority : "rice",
    day: Number.isFinite(day) ? day : 0,
  };
}

function applyScenario(scenario) {
  loadSite(scenario.point);
  $("season").value = String(scenario.season);
  $("harvest").value = scenario.harvest;
  $("transplant").value = scenario.transplant;
  $("drainage").value = scenario.drainage;
  $("soil").value = scenario.soil;
  $("priority").value = scenario.priority;
  selected = scenario.crop;
  render();
  field.jumpToDay(scenario.day);
}

function scenarioURL() {
  const url = new URL(location.href);
  const params = url.searchParams;
  params.set("site", site.id);
  params.set("crop", selected);
  params.set("season", $("season").value);
  params.set("harvest", $("harvest").value);
  params.set("transplant", $("transplant").value);
  params.set("drainage", $("drainage").value);
  params.set("soil", $("soil").value);
  params.set("priority", $("priority").value);
  params.set("day", $("field-day").value);
  url.hash = "#field";
  return url.href;
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-1000px";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  if (!copied) throw new Error("Copy failed");
}

async function copyScenario() {
  const url = scenarioURL();
  history.replaceState(null, "", url);
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
    else fallbackCopy(url);
    copyButton.textContent = t("copied");
    $("copy-status").textContent = t("copied");
  } catch {
    copyButton.textContent = t("copyFailed");
    $("copy-status").textContent = t("copyFailed");
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyButton.textContent = t("copyLink");
    $("copy-status").textContent = "";
  }, 2200);
}

function clearShift() {
  shiftSuggestion = null;
  $("apply-shift").hidden = true;
  $("shift-compare").hidden = true;
  $("shift-now-date").textContent = "";
  $("shift-now-rain").textContent = "";
  $("shift-new-date").textContent = "";
  $("shift-new-rain").textContent = "";
  $("shift-status").textContent = "";
  $("shift-status").dataset.state = "";
}

function findSaferWindow() {
  if (selected === "fallow") {
    $("shift-status").textContent = either("Choose a winter crop first.", "先选择一个冬季作物。");
    $("shift-status").dataset.state = "review";
    $("apply-shift").hidden = true;
    $("shift-compare").hidden = true;
    shiftSuggestion = null;
    return;
  }
  const cropId = selected;
  const currentHarvest = $("harvest").valueAsNumber;
  const currentTransplant = $("transplant").valueAsNumber;
  const drainage = $("drainage").value;
  const soil = $("soil").value;
  const rowsFor = (harvest, transplant) => NextCrop.scenarios.map(year =>
    NextCrop.evaluate({ year, harvest, transplant, drainage, soil, site }, readRain).find(row => row.id === cropId));
  let robust = null;
  let calendarOnly = null;
  for (let harvest = 0; harvest <= site.harvestMax; harvest++) {
    for (let transplant = 0; transplant <= site.riceMax; transplant++) {
      const rows = rowsFor(harvest, transplant);
      if (!rows.every(Boolean)) continue;
      const calendarOk = rows.every(row => !row.reasons.includes("overlap") && !row.reasons.includes("lateSowing"));
      if (!calendarOk) continue;
      const wet = rows.filter(row => row.rain === null || row.rain >= 30).length;
      const score = Math.abs(harvest - currentHarvest) + Math.abs(transplant - currentTransplant);
      const rain = wet === 0 ? rows.reduce((sum, row) => sum + row.rain, 0) : Infinity;
      if (wet === 0 && (!robust || score < robust.score || (score === robust.score && rain < robust.rain))) {
        robust = { harvest, transplant, wet, score, rain };
      }
      if (!calendarOnly || score < calendarOnly.score || (score === calendarOnly.score && wet < calendarOnly.wet)) {
        calendarOnly = { harvest, transplant, wet, score };
      }
    }
  }
  const suggestion = robust ?? calendarOnly;
  if (!suggestion) {
    $("shift-status").textContent = t("shiftNone");
    $("shift-status").dataset.state = "review";
    $("apply-shift").hidden = true;
    $("shift-compare").hidden = true;
    shiftSuggestion = null;
    return;
  }
  const dates = NextCrop.calendar(Number($("season").value), suggestion.harvest, suggestion.transplant, site);
  const harvestDelta = suggestion.harvest - currentHarvest;
  const transplantDelta = suggestion.transplant - currentTransplant;
  const delta = `${harvestDelta >= 0 ? "+" : ""}${harvestDelta} / ${transplantDelta >= 0 ? "+" : ""}${transplantDelta}`;
  $("shift-status").dataset.state = suggestion.wet === 0 ? "fits" : "review";
  if (suggestion.score === 0) {
    shiftSuggestion = null;
    $("apply-shift").hidden = true;
    $("shift-compare").hidden = true;
    $("shift-status").textContent = suggestion.wet === 0 ? t("shiftAlready") : either(
      `The current window is calendar-safe, but ${suggestion.wet} of 3 seasons still have a wet or missing rain window.`,
      `当前窗口农时通过，但三个季节中仍有 ${suggestion.wet} 个存在偏大或缺测的降雨窗口。`,
    );
    return;
  }
  const seasonIndex = NextCrop.scenarios.indexOf(Number($("season").value));
  const currentRows = rowsFor(currentHarvest, currentTransplant);
  const suggestedRows = rowsFor(suggestion.harvest, suggestion.transplant);
  const currentDates = NextCrop.calendar(Number($("season").value), currentHarvest, currentTransplant, site);
  const rainText = row => row && row.rain !== null ? `${row.rain.toFixed(2)} mm` : "—";
  $("shift-now-date").textContent = dateLabel(currentDates.harvest);
  $("shift-now-rain").textContent = either(
    `3d ${rainText(currentRows[seasonIndex])} · rice ${dateLabel(currentDates.rice)}`,
    `三日 ${rainText(currentRows[seasonIndex])} · 插秧 ${dateLabel(currentDates.rice)}`,
  );
  $("shift-new-date").textContent = dateLabel(dates.harvest);
  $("shift-new-rain").textContent = either(
    `3d ${rainText(suggestedRows[seasonIndex])} · rice ${dateLabel(dates.rice)}`,
    `三日 ${rainText(suggestedRows[seasonIndex])} · 插秧 ${dateLabel(dates.rice)}`,
  );
  $("shift-compare").hidden = false;
  shiftSuggestion = suggestion;
  $("apply-shift").hidden = false;
  $("shift-status").textContent = suggestion.wet === 0 ? either(
    `All three seasons clear. Nearest shift: ${delta} days.`,
    `三个季节均通过。最近调整：${delta} 天。`,
  ) : either(
    `No window clears all three. Nearest calendar-safe option: ${suggestion.wet} of 3 seasons are wet or missing (${delta} days).`,
    `没有三个季节全部通过的窗口。最近的农时安全方案中，${suggestion.wet} 个季节降雨偏大或缺失（${delta} 天）。`,
  );
}

function applyShift() {
  if (!shiftSuggestion) return;
  withMotionTransition(() => {
    const { harvest, transplant, wet } = shiftSuggestion;
    shiftSuggestion = null;
    $("harvest").value = harvest;
    $("transplant").value = transplant;
    $("apply-shift").hidden = true;
    $("shift-compare").hidden = true;
    render();
    field.jumpToOperation();
    $("shift-status").dataset.state = wet === 0 ? "fits" : "review";
    $("shift-status").textContent = wet === 0 ? t("shiftApplied") : t("shiftAppliedPartial").replace("{n}", wet);
  });
}

function runWetDemo() {
  clearShift();
  $("harvest").value = 12;
  $("transplant").value = 15;
  $("season").value = 2023;
  $("drainage").value = "good";
  $("soil").value = "loam";
  $("priority").value = "income";
  selected = site.crops.some(entry => entry.id === "potato") ? "potato" : site.crops[0].id;
  render();
  field.jumpToOperation();
}

function openBrief() {
  if (!brief.open) {
    if (typeof brief.showModal === "function") brief.showModal();
    else brief.setAttribute("open", "");
  }
  document.body.classList.add("dialog-open");
  $("brief-close").focus();
}

function closeBrief() {
  if (typeof brief.close === "function" && brief.open) brief.close();
  else brief.removeAttribute("open");
  document.body.classList.remove("dialog-open");
}

$("wet-demo").addEventListener("click", runWetDemo);
$("find-shift").addEventListener("click", findSaferWindow);
$("apply-shift").addEventListener("click", applyShift);
copyButton.addEventListener("click", copyScenario);
$("brief-open").addEventListener("click", openBrief);
$("brief-close").addEventListener("click", closeBrief);
$("brief-close-2").addEventListener("click", closeBrief);
brief.addEventListener("click", event => { if (event.target === brief) closeBrief(); });
brief.addEventListener("close", () => document.body.classList.remove("dialog-open"));
$("brief-demo-start").addEventListener("click", () => {
  closeBrief();
  if (site.id !== "kaiping") {
    loadSite(NextCrop.sites[0]);
    globe.focus(NextCrop.sites[0]);
  }
  runWetDemo();
  $("field-title").focus({ preventScroll: true });
  animateScrollTo($("field"), { onDone: () => markArrived($("field")) });
});
let renderFrame = 0;
function scheduleRender() {
  if (renderFrame) return;
  renderFrame = requestAnimationFrame(() => {
    renderFrame = 0;
    render();
  });
}
form.addEventListener("input", scheduleRender);
form.addEventListener("input", () => { if (shiftSuggestion || $("shift-status").textContent) clearShift(); });
form.addEventListener("submit", event => event.preventDefault());
form.addEventListener("reset", () => {
  selected = site.crops[0].id;
  requestAnimationFrame(render);
});
const initialScenario = scenarioFromURL();
if (initialScenario) applyScenario(initialScenario);
else loadSite(site);

const nav = document.querySelector(".top nav");
const navMarker = nav?.querySelector(".nav-marker");
const navToggle = $("nav-toggle");
const navLinksWrap = $("nav-links");
function setNavOpen(open) {
  if (!nav || !navToggle || !navLinksWrap) return;
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  if (open && matchMedia("(max-width: 48rem)").matches) {
    requestAnimationFrame(() => navLinksWrap.querySelector("a")?.focus({ preventScroll: true }));
  }
}
if (nav && navToggle && navLinksWrap) {
  navToggle.addEventListener("click", () => setNavOpen(navToggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", event => {
    if (!nav.contains(event.target)) setNavOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
  const desktopNav = matchMedia("(min-width: 48.0625rem)");
  desktopNav.addEventListener?.("change", event => { if (event.matches) setNavOpen(false); });
}
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const navSections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
let navFrame = 0;
function syncNav() {
  navFrame = 0;
  const anchor = scrollY + Math.min(innerHeight * .35, 320);
  const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
  let active = atBottom ? navSections[navSections.length - 1] : navSections[0];
  if (!atBottom) {
    for (const section of navSections) {
      if (section.getBoundingClientRect().top + scrollY <= anchor) active = section;
    }
  }
  let current = null;
  for (const link of navLinks) {
    if (link.hash === `#${active.id}`) {
      link.setAttribute("aria-current", "location");
      current = link;
    } else link.removeAttribute("aria-current");
  }
  const progress = $("scroll-progress");
  if (progress) {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty("--progress", String(max > 0 ? Math.min(1, scrollY / max) : 0));
  }
  if (navMarker) {
    if (current && current.getClientRects().length) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = current.getBoundingClientRect();
      navMarker.hidden = false;
      navMarker.style.translate = `${linkRect.left - navRect.left}px 0`;
      navMarker.style.inlineSize = `${linkRect.width}px`;
    } else {
      navMarker.hidden = true;
    }
  }
}
function requestNavSync() {
  if (!navFrame) navFrame = requestAnimationFrame(syncNav);
}
addEventListener("scroll", requestNavSync, { passive: true });
addEventListener("resize", requestNavSync);
addEventListener("hashchange", requestNavSync);
syncNav();

const atlas = document.querySelector(".atlas");
if (atlas && "IntersectionObserver" in window) {
  const atlasObserver = new IntersectionObserver(([entry]) => {
    atlas.classList.toggle("is-offscreen", !entry.isIntersecting);
  }, { rootMargin: "120px" });
  atlasObserver.observe(atlas);
}
const revealTargets = [...document.querySelectorAll(".field-heading, .field-main, .field-sidebar, #planner > .section-heading, .settings, .results, .sources > h2, .source-grid")];
if (revealTargets.length && "IntersectionObserver" in window) {
  for (const target of revealTargets) target.classList.add("reveal");
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: .15 });
  for (const target of revealTargets) revealObserver.observe(target);
}

document.addEventListener("click", event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest?.('a[href^="#"]');
  if (!link) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (navLinksWrap?.contains(link)) setNavOpen(false);
  if (location.hash !== link.hash) history.pushState(null, "", link.hash);
  animateScrollTo(target, { focus: true, onDone: () => markArrived(target) });
});
addEventListener("wheel", cancelAnimatedScroll, { passive: true });
addEventListener("touchstart", cancelAnimatedScroll, { passive: true });
addEventListener("keydown", event => {
  if (["PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", " "].includes(event.key)) cancelAnimatedScroll();
});
