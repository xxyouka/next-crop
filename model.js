"use strict";

const NextCrop = (() => {
  const day = 86_400_000;
  const scenarios = [2024, 2023, 2021];
  const dateAt = (year, month, date) => Date.UTC(year, month - 1, date);
  const shift = (date, days) => date + days * day;
  const iso = (date) => new Date(date).toISOString().slice(0, 10);
  const delta = (later, earlier) => Math.round((later - earlier) / day);

  function calendar(year, harvestOffset, riceOffset) {
    return {
      harvest: iso(shift(dateAt(year, 10, 31), harvestOffset)),
      rice: iso(shift(dateAt(year + 1, 3, 20), riceOffset)),
    };
  }

  function evaluate({ year, harvest, transplant, drainage, soil }, readRain) {
    const dates = calendar(year, harvest, transplant);
    const cut = Date.parse(dates.harvest);
    const rice = Date.parse(dates.rice);
    const vetchStart = shift(cut, -5);
    const potatoStart = shift(cut, 5);
    const candidates = [
      { id: "fallow", start: cut, end: shift(rice, -7), buffer: 7 },
      { id: "potato", start: potatoStart, end: shift(potatoStart, 115), buffer: 7 },
      { id: "vetch", start: vetchStart, end: dateAt(year + 1, 3, 18), buffer: 10 },
    ];
    return candidates.map(({ id, start, end, buffer }) => {
      const slack = delta(rice, shift(end, buffer));
      const result = { id, start: iso(start), operation: iso(end), prepEnd: iso(shift(end, buffer)), slack, rain: null, reasons: [] };
      if (id === "fallow") return { ...result, status: "baseline" };

      const measures = [-2, -1, 0].map(offset => readRain(iso(shift(end, offset))));
      result.rain = measures.every(value => Number.isFinite(value) && value >= 0)
        ? Math.round(measures.reduce((sum, value) => sum + value, 0) * 100) / 100
        : null;
      if (slack < 0) result.reasons.push("overlap");
      if (id === "vetch" && vetchStart > dateAt(year, 11, 20)) result.reasons.push("lateSowing");
      const conflict = result.reasons.length > 0;
      if (result.rain === null) result.reasons.push("missingWeather");
      if (result.rain !== null && result.rain >= 30) result.reasons.push("rain");
      if (drainage !== "good") result.reasons.push(drainage === "poor" ? "poorDrainage" : "unknownDrainage");
      if (soil === "unknown") result.reasons.push("unknownSoil");
      if (id === "potato" && soil === "clay") result.reasons.push("clay");
      return { ...result, status: conflict ? "conflict" : result.reasons.length ? "review" : "fits" };
    });
  }

  return { evaluate, calendar, scenarios };
})();

if (typeof module !== "undefined") module.exports = NextCrop;
