"use strict";

function mountField({ t, dateLabel, selectCrop, cropColor }) {
  const timeline = $("field-day");
  const stageList = $("field-stages");
  const cropList = $("field-crops");
  const canvas = $("field-art");
  const paint = makeFieldArt(canvas, $("crop-art"));
  const play = $("field-play");
  const dayMs = 86_400_000;
  let current;
  let timer = 0;
  let stageButtons = [];
  let cropButtons = [];

  function labelPlayback() {
    play.textContent = timer ? t("pause") : t("play");
  }

  function stop() {
    clearInterval(timer);
    timer = 0;
    labelPlayback();
  }

  function stageAt(day) {
    const { replay } = current;
    const stage = replay.stages.findLast(entry => entry.day <= day);
    if (replay.delayed && day >= replay.rice && day < replay.operation) return { ...stage, key: "occupiedStage", growthPhase: stage.key };
    if (day > replay.operation && day < replay.days) return { ...stage, key: "prepStage" };
    return stage;
  }

  function draw() {
    if (!current) return;
    const day = timeline.valueAsNumber;
    const { site, result, replay } = current;
    const { key, growthPhase = key } = stageAt(day);
    const date = new Date(Date.parse(replay.start) + dayMs * day).toISOString().slice(0, 10);
    const [rain, minimum] = weather[site.id][date] ?? [];
    const activeCrop = key === "riceStage" ? "rice" : result.id;
    const visibleCrop = key === "prepStage" || key === "delayedStage" ? "" : t(activeCrop);
    const progress = replay.operation > 0 ? Math.min(1, day / replay.operation) : 0;
    const status = visibleCrop ? `${visibleCrop} · ${t(key)}` : t(key);
    const dateText = dateLabel(date);
    $("field-stage").textContent = status;
    $("field-date").textContent = dateText;
    $("field-date").dateTime = date;
    $("closeup-caption").textContent = `${t(activeCrop)} · ${t(key)}`;
    $("field-caption").textContent = t(`${key}Note`);
    $("field-rain").textContent = Number.isFinite(rain) ? `${rain.toFixed(2)} mm` : "—";
    $("field-temp").textContent = Number.isFinite(minimum) ? `${minimum.toFixed(1)} °C` : "—";
    timeline.setAttribute("aria-valuetext", `${dateText} · ${status}`);
    canvas.dataset.stage = key;
    canvas.dataset.crop = activeCrop;
    canvas.dataset.wet = String(rain >= 10);
    const activeStage = replay.stages.findLastIndex(entry => entry.day <= day);
    stageButtons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === activeStage)));
    paint({ terrain: site.terrain, crop: activeCrop, progress, phase: key, growthPhase, wet: rain >= 10 });
  }

  timeline.addEventListener("input", () => {
    stop();
    draw();
  });
  play.addEventListener("click", () => {
    if (timer) {
      stop();
      return;
    }
    if (timeline.valueAsNumber === Number(timeline.max)) timeline.value = 0;
    draw();
    const step = Math.max(1, Math.round(Number(timeline.max) / 104));
    timer = setInterval(() => {
      timeline.value = Math.min(Number(timeline.max), timeline.valueAsNumber + step);
      draw();
      if (timeline.valueAsNumber === Number(timeline.max)) stop();
    }, 105);
    labelPlayback();
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting && timer) stop(); });
    observer.observe($("field"));
  }

  function jumpToOperation() {
    if (!current) return;
    stop();
    timeline.value = Math.min(Number(timeline.max), current.replay.operation);
    draw();
  }

  function jumpToDay(day) {
    if (!current) return;
    const target = Number(day);
    stop();
    timeline.value = Math.max(0, Math.min(Number(timeline.max), Number.isFinite(target) ? target : 0));
    draw();
  }

  function update(site, result, results, dates) {
    const replay = NextCrop.fieldReplay(result, dates);
    const previous = current;
    const changed = !previous || previous.site !== site || previous.result.id !== result.id
      || previous.replay.start !== replay.start || previous.replay.operation !== replay.operation
      || previous.replay.rice !== replay.rice;
    current = { site, result, replay };
    const windowRain = $("field-window-rain");
    windowRain.textContent = result.rain === null ? "—" : `${result.rain.toFixed(2)} mm · ${dateLabel(result.operation)}`;
    windowRain.dataset.state = result.rain === null ? "na" : result.rain >= 30 ? "wet" : "ok";
    timeline.max = replay.days;
    if (changed) {
      stop();
      timeline.value = replay.stages[0].day;
    }
    if (!previous || previous.site !== site) {
      cropButtons = results.map(({ id }) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "field-crop";
        button.style.setProperty("--crop", cropColor[id]);
        button.addEventListener("click", () => selectCrop(id));
        return button;
      });
      cropList.replaceChildren(...cropButtons);
    }
    results.forEach(({ id }, index) => {
      cropButtons[index].textContent = t(id);
      cropButtons[index].setAttribute("aria-pressed", String(id === result.id));
    });
    if (changed) {
      stageButtons = replay.stages.map(({ day }) => {
        const button = document.createElement("button");
        button.type = "button";
        const name = document.createElement("span");
        const date = document.createElement("small");
        button.append(name, date);
        button.addEventListener("click", () => {
          stop();
          timeline.value = day;
          draw();
        });
        return button;
      });
      stageList.replaceChildren(...stageButtons);
    }
    replay.stages.forEach(({ key, date }, index) => {
      stageButtons[index].children[0].textContent = t(key);
      stageButtons[index].children[1].textContent = dateLabel(date);
    });
    stageList.setAttribute("aria-label", t("stageList"));
    labelPlayback();
    draw();
  }

  return { update, jumpToOperation, jumpToDay };
}
