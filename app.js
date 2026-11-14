"use strict";

const copy = {
  skip: ["Skip to the planner", "跳到轮作工具"], brand: ["Next Crop", "下一茬"],
  planner: ["Planner", "轮作工具"], evidence: ["Evidence", "数据依据"],
  location: ["Kaiping, Guangdong · China", "中国 · 广东开平"],
  headline: ["What can we grow before the next rice season?", "下一季水稻前，还能种什么？"],
  intro: ["Set your rice dates and compare three winter rotations against real historical rainfall and the conditions on your farm.", "设定水稻农时，结合历史降雨与自家田况，比较三种冬季轮作方案。"],
  start: ["Compare rotations", "比较轮作方案"], sample: ["NASA POWER sample", "NASA POWER 查询点"],
  imagery: ["Kaiping area · Sentinel-2A true color", "开平周边 · Sentinel-2A 真彩色影像"],
  imageDate: ["03 Jan 2025", "2025 年 1 月 3 日"],
  workspace: ["Winter rotation planner", "冬季轮作工具"],
  rotationContext: ["Late rice → winter → early rice", "晚稻 → 冬季 → 早稻"],
  inputs: ["Your field", "你的田况"], reset: ["Reset", "重置"],
  harvest: ["Late rice harvest", "晚稻收割"], transplant: ["Early rice transplant", "早稻插秧"],
  season: ["Historical season", "历史季节"], drainage: ["Field drainage", "田块排水"],
  soil: ["Field soil texture", "土壤质地"], priority: ["Farm priority", "经营优先项"],
  unknown: ["Unknown", "待确认"], good: ["Drains well", "排水良好"], poor: ["Water tends to pool", "容易积水"],
  loam: ["Loamy", "壤土"], sand: ["Sandy", "沙质土"], clay: ["Heavy clay", "重黏土"],
  keepRice: ["Keep rice on schedule", "保证早稻农时"], income: ["Explore winter income", "探索冬季收入"], cover: ["Keep soil covered", "保持土壤覆盖"],
  wetDemo: ["Try a wet harvest ↗", "试算雨后采收 ↗"],
  timeline: ["Season timeline", "轮作时间线"],
  cropWindow: ["Winter window", "冬季农时"],
  prepWindow: ["Rice preparation", "早稻整地"],
  riceMarker: ["Early rice transplant", "早稻插秧"],
  compare: ["Winter rotation comparison", "冬季轮作方案对照"], strategy: ["Strategy", "方案"],
  window: ["Winter window", "冬季农时"], rainHead: ["3-day rain", "三日降雨"], status: ["Status", "状态"],
  rainNote: ["Rain includes the operation day and the two days before it. Choose a strategy to see its evidence.", "降雨累计包含作业当日与前两天。点选方案可查看依据。"],
  behind: ["Behind the comparison", "判断依据"],
  sourceWeather: ["NASA POWER", "NASA POWER"],
  sourceWeatherDesc: ["Daily corrected precipitation at 22.48°N, 112.60°E in local solar time. Values represent a regional grid estimate.", "查询点 22.48°N、112.60°E，采用当地太阳时的逐日校正降水。数值为区域格点估计。"],
  powerLink: ["Daily API documentation ↗", "逐日数据接口说明 ↗"],
  sourceLocal: ["Local crop practices", "本地轮作实践"],
  sourceLocalDesc: ["Kaiping documents winter potato, Chinese milk vetch and traditional winter fallow in its double-rice area.", "开平市记录了双季稻区的冬种马铃薯、紫云英和传统冬闲做法。"],
  localLink: ["Kaiping case report ↗", "开平案例报道 ↗"],
  sourceRules: ["Planning assumptions", "规划假设"],
  sourceRulesDesc: ["Illustrative crop durations, rice preparation buffers and a 30 mm rain alert. Drainage and soil texture come from your inputs.", "生育期、早稻整地缓冲和 30 毫米降雨提醒采用演示参数。排水和土壤质地来自你的填写。"],
  imageLink: ["Sentinel-2A image record ↗", "Sentinel-2A 影像记录 ↗"],
  footer: ["Next Crop · NASA Space Apps Challenge 2026", "下一茬 · NASA Space Apps Challenge 2026"],
  fallow: ["Winter fallow", "冬闲"], potato: ["Winter potato", "冬马铃薯"], vetch: ["Chinese milk vetch", "紫云英"],
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
  riceFirst: ["Winter fallow keeps the rice schedule simple.", "冬闲方案给早稻保留整地窗口。"],
  conflictSummary: ["The preferred crop runs into a calendar conflict in this scenario.", "优先考虑的作物在当前情景下遇到农时冲突。"],
  evidenceUnavailable: ["No rainfall result for this operation.", "这次作业缺少完整降雨数据。"],
};

const $ = id => document.getElementById(id);
const form = $("field-settings");
const comparison = $("comparison");
const cropIds = ["fallow", "potato", "vetch"];
const colors = { fallow: "#7d775e", potato: "#8e6439", vetch: "#775297" };
const priorityCrop = { rice: "fallow", income: "potato", cover: "vetch" };
const readRain = date => weather[date]?.[0] ?? null;
let chinese = false;
let selected = "potato";
const t = key => copy[key][Number(chinese)];
const either = (english, chineseText) => chinese ? chineseText : english;

function dateLabel(date) {
  const locale = chinese ? "zh-CN" : "en-GB";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(date));
}

const tableRows = Object.fromEntries(cropIds.map(id => {
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
  button.addEventListener("click", () => {
    selected = id;
    render();
  });
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
      `${slack} extra days before early rice transplanting, after the preparation buffer.`,
      `扣除整地缓冲后，距早稻插秧还有 ${slack} 天。`,
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
    `Early rice would need ${-slack} more days to keep this preparation buffer.`,
    `早稻需再推迟 ${-slack} 天，才能留足整地缓冲。`,
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
  const first = Date.UTC(year, 9, 20);
  const last = Date.UTC(year + 1, 4, 20);
  const percent = date => (Date.parse(date) - first) / (last - first) * 100;
  const timeline = $("timeline-rows");
  timeline.style.setProperty("--rice", `${percent(riceDate)}%`);
  const axis = document.createElement("div");
  axis.className = "timeline-axis";
  for (const month of ["11", "12", "01", "02", "03", "04", "05"]) {
    const tick = document.createElement("span");
    const date = `${Number(month) > 5 ? year : year + 1}-${month}-01`;
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
  const year = Number($("season").value);
  const harvest = $("harvest").valueAsNumber;
  const transplant = $("transplant").valueAsNumber;
  const drainage = $("drainage").value;
  const soil = $("soil").value;
  const priority = $("priority").value;
  const dates = NextCrop.calendar(year, harvest, transplant);
  for (const [id, date] of [["harvest", dates.harvest], ["transplant", dates.rice]]) {
    const formatted = dateLabel(date);
    $(`${id}-value`).value = formatted;
    $(id).setAttribute("aria-valuetext", formatted);
  }
  const results = NextCrop.evaluate({ year, harvest, transplant, drainage, soil }, readRain);
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
  updateSummary(results.find(result => result.id === priorityCrop[priority]), priority);
  updateDetail(results.find(result => result.id === selected));
}

$("language").addEventListener("click", event => {
  chinese = !chinese;
  document.documentElement.lang = chinese ? "zh-Hans" : "en";
  document.title = either("Next Crop · Kaiping rotation planner", "下一茬 · 开平冬季轮作工具");
  event.currentTarget.lang = chinese ? "en" : "zh-Hans";
  event.currentTarget.textContent = either("中文", "English");
  for (const node of document.querySelectorAll("[data-t]")) node.textContent = t(node.dataset.t);
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
});
form.addEventListener("input", render);
form.addEventListener("submit", event => event.preventDefault());
form.addEventListener("reset", () => {
  selected = "potato";
  requestAnimationFrame(render);
});
render();
