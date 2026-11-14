"use strict";

const copy = {
  skip: ["Skip to the regions", "跳到地区选择"], brand: ["Next Crop", "下一茬"],
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
  plannerLede: ["Set rice dates and field conditions. The table checks calendar fit, field conditions and rain at each operation; the three-season check repeats the same plan across 2024/25, 2023/24 and 2021/22.", "设定水稻农时与田况。下表检查农时、田况与作业日降雨；季节对照用 2024/25、2023/24、2021/22 三个 NASA POWER 历史年份重跑同一方案。"],
  seasonCheck: ["Three-season check", "三个历史季节对照"],
  seasonCheckContext: ["Calendar and rain only", "仅看农时与降雨"],
  seasonCaption: ["Same plan in each historical season", "同一方案在三个历史季节中的表现"],
  seasonCheckNote: ["Same inputs and 30 mm rain threshold, run through each historical season. Field-condition flags are left out; select a cell to inspect its full result in the table above.", "使用相同输入和 30 毫米降雨阈值，在三个历史季节中各跑一遍。此处不计排水与土壤复核项；点选格子可回到上方表格查看完整判断。"],
  fitsShort: ["Fits", "排得进去"], conflictShort: ["Conflict", "农时冲突"],
  wetWindow: ["Wet window", "雨量偏大"], noData: ["No data", "无数据"],
  inputs: ["Your field", "你的田况"], reset: ["Reset", "重置"],
  season: ["Historical season", "历史季节"], drainage: ["Field drainage", "田块排水"],
  soil: ["Field soil texture", "土壤质地"], priority: ["Farm priority", "经营优先项"],
  unknown: ["Unknown", "待确认"], good: ["Drains well", "排水良好"], poor: ["Water tends to pool", "容易积水"],
  loam: ["Loamy", "壤土"], sand: ["Sandy", "沙质土"], clay: ["Heavy clay", "重黏土"],
  keepRice: ["Keep rice on schedule", "保证下季水稻农时"], income: ["Explore winter income", "探索冬季收入"], cover: ["Keep soil covered", "保持土壤覆盖"],
  wetDemo: ["Try a wet harvest ↗", "试算雨后采收 ↗"],
  timeline: ["Season timeline", "轮作时间线"],
  cropWindow: ["Winter window", "冬季农时"],
  prepWindow: ["Rice preparation", "早稻整地"],
  riceMarker: ["Next rice planting", "下一季水稻"],
  compare: ["Winter rotation comparison", "冬季轮作方案对照"], strategy: ["Strategy", "方案"],
  window: ["Winter window", "冬季农时"], rainHead: ["3-day rain", "三日降雨"], status: ["Status", "状态"],
  rainNote: ["Rain includes the operation day and the two days before it. Choose a strategy to see its evidence.", "降雨累计包含作业当日与前两天。点选方案可查看依据。"],
  behind: ["Behind the comparison", "判断依据"],
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
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↘";
  labels.append(title, area);
  button.append(labels, arrow);
  button.addEventListener("click", () => enterSite(point));
  $("site-list").append(button);
  return { button, title, area, site: point };
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
    place.button.dataset.active = String(place.site === site);
    place.button.setAttribute("aria-current", String(place.site === site));
  }
  $("field-location").textContent = local(site.area);
  $("field-title").textContent = local(site.name);
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
  updateSiteLabels();
  buildTable();
  buildSeasonGrid();
  render();
}

function enterSite(point) {
  if (site !== point) loadSite(point);
  globe.focus(point);
  $("field-title").focus({ preventScroll: true });
  $("field").scrollIntoView();
  if (location.hash !== "#field") history.pushState(null, "", "#field");
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
      button.append(status, rain);
      button.addEventListener("click", () => {
        $("season").value = String(year);
        selected = id;
        render();
      });
      cell.append(button);
      row.append(cell);
      return { button, status, rain };
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
  if (priority === "rice") {
    $("summary-label").textContent = t("keepRice");
    detail = t("riceFirst");
  } else if (status === "conflict") {
    $("summary-label").textContent = t("keepBaseline");
    title = t("fallow");
    detail = t("conflictSummary");
  } else {
    $("summary-label").textContent = t(status === "fits" ? "matched" : "reviewFirst");
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
  chinese = !chinese;
  document.documentElement.lang = chinese ? "zh-Hans" : "en";
  document.title = either("Next Crop · What grows after rice?", "下一茬 · 水稻收完，种什么？");
  event.currentTarget.lang = chinese ? "en" : "zh-Hans";
  event.currentTarget.textContent = either("中文", "English");
  for (const node of document.querySelectorAll("[data-t]")) node.textContent = t(node.dataset.t);
  updateSiteLabels();
  render();
});
$("wet-demo").addEventListener("click", () => {
  $("harvest").value = 12;
  $("transplant").value = 15;
  $("season").value = 2023;
  $("drainage").value = "good";
  $("soil").value = "loam";
  $("priority").value = "income";
  selected = "potato";
  render();
  field.jumpToOperation();
});
form.addEventListener("input", render);
form.addEventListener("submit", event => event.preventDefault());
form.addEventListener("reset", () => {
  selected = site.crops[0].id;
  requestAnimationFrame(render);
});
loadSite(site);
