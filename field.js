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
  let playbackFrame = 0;
  let scrubFrame = 0;
  let drawnDay = 0;
  let stageButtons = [];
  let cropButtons = [];
  const fieldSection = $("field");
  let initialPaintDone = false;
  let paintToken = 0;

  function labelPlayback() {
    play.textContent = playbackFrame ? t("pause") : t("play");
  }

  function stop() {
    cancelAnimationFrame(playbackFrame);
    cancelAnimationFrame(scrubFrame);
    playbackFrame = 0;
    scrubFrame = 0;
    labelPlayback();
  }

  function stageAt(day) {
    const { replay } = current;
    const stage = replay.stages.findLast(entry => entry.day <= day);
    if (replay.delayed && day >= replay.rice && day < replay.operation) return "occupiedStage";
    if (day > replay.operation && day < replay.days) return "prepStage";
    return stage.key;
  }

  function visualStageKey(crop, key) {
    return crop === "vetch" && key === "incorporationStage" ? "vetchIncorporationStage" : key;
  }

  function draw(visualDay = timeline.valueAsNumber, updateLabels = true) {
    if (!current) return;
    drawnDay = visualDay;
    const day = Math.floor(visualDay);
    const { site, result, replay } = current;
    const key = stageAt(day);
    const date = new Date(Date.parse(replay.start) + dayMs * day).toISOString().slice(0, 10);
    const [rain, minimum] = weather[site.id][date] ?? [];
    const activeCrop = key === "riceStage" ? "rice" : result.id;
    if (updateLabels) {
      const displayStage = visualStageKey(activeCrop, key);
      const showCrop = key !== "prepStage" && key !== "delayedStage";
      const status = showCrop ? `${t(activeCrop)} · ${t(displayStage)}` : t(displayStage);
      const dateText = dateLabel(date);
      $("field-stage").textContent = status;
      $("field-date").textContent = dateText;
      $("field-date").dateTime = date;
      $("closeup-caption").textContent = status;
      $("field-caption").textContent = t(`${displayStage}Note`);
      $("field-rain").textContent = Number.isFinite(rain) ? `${rain.toFixed(2)} mm` : "—";
      $("field-temp").textContent = Number.isFinite(minimum) ? `${minimum.toFixed(1)} °C` : "—";
      timeline.setAttribute("aria-valuetext", `${dateText} · ${status}`);
      canvas.dataset.stage = key;
      canvas.dataset.crop = activeCrop;
      canvas.dataset.wet = String(rain >= 10);
      const activeStage = replay.stages.findLastIndex(entry => entry.day <= day);
      stageButtons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === activeStage)));
    }
    const paintArgs = { terrain: site.terrain, crop: activeCrop, replay, day: visualDay, phase: key, wet: rain >= 10 };
    const token = ++paintToken;
    if (!initialPaintDone && fieldSection.getBoundingClientRect().top >= innerHeight) {
      initialPaintDone = true;
      const commit = () => { if (token === paintToken) paint(paintArgs); };
      if ("requestIdleCallback" in window) requestIdleCallback(commit, { timeout: 600 });
      else setTimeout(commit, 0);
      return;
    }
    initialPaintDone = true;
    paint(paintArgs);
  }

  timeline.addEventListener("input", () => {
    stop();
    scrubFrame = requestAnimationFrame(() => {
      scrubFrame = 0;
      draw();
    });
  });
  play.addEventListener("click", () => {
    if (playbackFrame) {
      stop();
      return;
    }
    const lastDay = Number(timeline.max);
    const requestedDay = scrubFrame ? timeline.valueAsNumber : drawnDay;
    cancelAnimationFrame(scrubFrame);
    scrubFrame = 0;
    const firstDay = requestedDay >= lastDay ? 0 : requestedDay;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let painted = started;
    timeline.value = Math.floor(firstDay);
    draw(reducedMotion ? timeline.valueAsNumber : firstDay);
    const tick = now => {
      const day = Math.min(lastDay, firstDay + (now - started) * lastDay / 12_000);
      const wholeDay = Math.floor(day);
      const dateChanged = wholeDay !== timeline.valueAsNumber;
      if (day === lastDay || now - painted >= 30 && (!reducedMotion || dateChanged)) {
        timeline.value = wholeDay;
        draw(reducedMotion ? wholeDay : day, dateChanged);
        painted = now;
      }
      if (day === lastDay) stop();
      else playbackFrame = requestAnimationFrame(tick);
    };
    playbackFrame = requestAnimationFrame(tick);
    labelPlayback();
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting && playbackFrame) stop(); });
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
      stageButtons[index].children[0].textContent = t(visualStageKey(result.id, key));
      stageButtons[index].children[1].textContent = dateLabel(date);
    });
    stageList.setAttribute("aria-label", t("stageList"));
    labelPlayback();
    draw();
  }

  return { update, jumpToOperation, jumpToDay };
}
