"use strict";

const NextCrop = (() => {
  const day = 86_400_000;
  const sites = typeof module !== "undefined" ? require("./sites.js") : farmSites;
  const scenarios = [2024, 2023, 2021];
  const dateAt = (year, month, date) => Date.UTC(year, month - 1, date);
  const shift = (date, days) => date + days * day;
  const iso = (date) => new Date(date).toISOString().slice(0, 10);
  const delta = (later, earlier) => Math.round((later - earlier) / day);

  function calendar(year, harvestOffset, riceOffset, site = sites[0]) {
    return {
      harvest: iso(shift(dateAt(year, ...site.harvestStart), harvestOffset)),
      rice: iso(shift(dateAt(year + 1, ...site.riceStart), riceOffset)),
    };
  }

  function evaluate({ year, harvest, transplant, drainage, soil, site = sites[0] }, readRain) {
    const dates = calendar(year, harvest, transplant, site);
    const cut = Date.parse(dates.harvest);
    const rice = Date.parse(dates.rice);
    const candidates = [
      { id: "fallow", start: cut, end: shift(rice, -7), buffer: 7 },
      ...site.crops.map(({ id, offset, duration, end, cutoff, buffer }) => {
        const start = shift(cut, offset);
        return { id, start, end: end ? dateAt(year + 1, ...end) : shift(start, duration), cutoff, buffer };
      }),
    ];
    return candidates.map(({ id, start, end, cutoff, buffer }) => {
      const slack = delta(rice, shift(end, buffer));
      const result = { id, start: iso(start), operation: iso(end), prepEnd: iso(shift(end, buffer)), slack, rain: null, reasons: [] };
      if (id === "fallow") return { ...result, status: "baseline" };

      const measures = [-2, -1, 0].map(offset => readRain(iso(shift(end, offset))));
      result.rain = measures.every(value => Number.isFinite(value) && value >= 0)
        ? Math.round(measures.reduce((sum, value) => sum + value, 0) * 100) / 100
        : null;
      if (slack < 0) result.reasons.push("overlap");
      if (cutoff && start > dateAt(year, ...cutoff)) result.reasons.push("lateSowing");
      const conflict = result.reasons.length > 0;
      if (result.rain === null) result.reasons.push("missingWeather");
      if (result.rain !== null && result.rain >= 30) result.reasons.push("rain");
      if (drainage !== "good") result.reasons.push(drainage === "poor" ? "poorDrainage" : "unknownDrainage");
      if (soil === "unknown") result.reasons.push("unknownSoil");
      if (id === "potato" && soil === "clay") result.reasons.push("clay");
      return { ...result, status: conflict ? "conflict" : result.reasons.length ? "review" : "fits" };
    });
  }

  function fieldReplay(result, dates) {
    const start = Date.parse(result.start);
    const operation = delta(Date.parse(result.operation), start);
    const rice = delta(Date.parse(dates.rice), start);
    const delayed = result.slack < 0;
    const last = delayed ? Math.max(rice, operation + 1) : rice;
    const cover = ["vetch", "rye", "hairy", "berseem"].includes(result.id);
    const isMilkVetch = result.id === "vetch";
    const floweringDay = isMilkVetch
      ? delta(dateAt(new Date(start).getUTCFullYear() + 1, 3, 1), start)
      : Math.round(operation * 0.51);
    const matureDay = isMilkVetch ? operation - 6 : Math.round(operation * 0.79);
    const floweringStage = result.id === "rye" || result.id === "wheat" ? "headingStage"
      : result.id === "maize" ? "tasselStage" : "flowerStage";
    const phases = result.id === "fallow" ? [
      ["fallowStage", 0], ["prepStage", operation], ["riceStage", rice],
    ] : [
      ["seedlingStage", 0],
      ["growingStage", Math.round(operation * 0.24)],
      [floweringStage, floweringDay],
      [isMilkVetch ? "fullBloomStage" : "matureStage", matureDay],
      [cover ? "incorporationStage" : "harvestStage", operation],
      [delayed ? "delayedStage" : "riceStage", last],
    ];
    return {
      start: result.start, days: last, operation, rice, delayed,
      stages: phases.map(([key, offset]) => ({ key, day: offset, date: iso(shift(start, offset)) })),
    };
  }

  return { evaluate, calendar, scenarios, sites, fieldReplay };
})();

if (typeof module !== "undefined") module.exports = NextCrop;
