const assert = require("node:assert/strict");
const { evaluate, calendar, scenarios } = require("../model.js");

const base = { year: 2024, harvest: 11, transplant: 15, drainage: "good", soil: "loam" };
const rain = new Map([["2025-03-12", 40], ["2025-03-13", 3], ["2025-03-14", 4]]);
const dry = () => 0;
const weather = (date) => rain.get(date) ?? 0;
const options = (input, read = dry) => Object.fromEntries(evaluate({ ...base, ...input }, read).map(row => [row.id, row]));

assert.equal(calendar(2024, 11, 15).rice, "2025-04-04");
assert.equal(calendar(2023, 11, 15).rice, "2024-04-04");
const sample = options({}, weather);
assert.equal(sample.potato.operation, "2025-03-11");
assert.equal(sample.potato.status, "fits");
assert.equal(sample.vetch.operation, "2025-03-18");
assert.equal(sample.fallow.status, "baseline");
const rainy = options({ harvest: 14 }, weather).potato;
assert.equal(rainy.operation, "2025-03-14");
assert.equal(rainy.rain, 47);
assert.equal(rainy.status, "review");
assert.equal(options({ harvest: 14 }, date => date === "2025-03-12" ? null : 0).potato.rain, null);
assert.equal(options({ harvest: 35, transplant: 0 }).potato.status, "conflict");
assert.equal(options({ harvest: 35 }).vetch.status, "conflict");
assert.equal(options({ drainage: "unknown", soil: "unknown" }).potato.status, "review");
assert.equal(options({ drainage: "poor" }).vetch.status, "review");
assert.equal(options({ soil: "clay" }).potato.status, "review");
assert.deepEqual(scenarios, [2024, 2023, 2021]);
console.log("Rotation checks passed");

const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
const bundled = readFileSync(join(__dirname, "../assets/weather.js"), "utf8");
const regionalWeather = runInNewContext(bundled + "\nweather");
const data = regionalWeather.kaiping;
assert.equal(Object.keys(data).length, 940);
assert(Array.isArray(data["2024-02-29"]));
assert.equal(options({}, date => data[date]?.[0]).potato.rain, 0.15);
assert.equal(options({ year: 2023, harvest: 12 }, date => data[date]?.[0]).potato.rain, 39.34);
const followUp = options({ year: 2024, harvest: 12 }, date => data[date]?.[0]).potato;
assert.equal(followUp.operation, "2025-03-12");
assert.equal(followUp.rain, 0.59);
console.log("Bundled NASA POWER examples passed");

const { sites, fieldReplay } = require("../model.js");
assert.deepEqual(sites.map(site => site.id), ["kaiping", "luzon", "rajshahi", "sacramento"]);
for (const site of sites) {
  const input = { ...base, harvest: site.harvestDefault, transplant: site.riceDefault, site };
  assert.equal(Object.keys(regionalWeather[site.id]).length, 940);
  assert(Object.values(regionalWeather[site.id]).every(([rain, minimum]) => Number.isFinite(rain) && Number.isFinite(minimum)));
  for (const year of scenarios) {
    for (let time = Date.UTC(year, 8, 1); time <= Date.UTC(year + 1, 6, 10); time += 86_400_000) {
      const key = new Date(time).toISOString().slice(0, 10);
      assert(key in regionalWeather[site.id], `${site.id} is missing weather for ${key}`);
    }
  }
  const local = evaluate(input, date => regionalWeather[site.id][date]?.[0]);
  assert.deepEqual(local.map(row => row.id), ["fallow", ...site.crops.map(crop => crop.id)]);
  for (const row of local) {
    const replay = fieldReplay(row, calendar(input.year, input.harvest, input.transplant, site));
    assert.equal(replay.stages[0].day, 0);
    assert.equal(replay.stages.at(-1).day, replay.days);
    assert(replay.stages.every((stage, i) => !i || stage.day > replay.stages[i - 1].day));
    assert.equal(replay.stages.at(-1).key, row.slack >= 0 ? "riceStage" : "delayedStage");
  }
}
const replay = fieldReplay(sample.potato, calendar(2024, 11, 15));
assert.equal(replay.stages[0].key, "seedlingStage");
assert.equal(replay.stages.find(stage => stage.key === "harvestStage").date, "2025-03-11");
console.log("Regional calendars and field replay passed");

const vetchReplay = fieldReplay(sample.vetch, calendar(2024, 11, 15));
assert.equal(vetchReplay.stages.find(stage => stage.key === "flowerStage").date, "2025-03-01");
assert.equal(vetchReplay.stages.find(stage => stage.key === "fullBloomStage").date, "2025-03-12");
const delayedReplay = fieldReplay(options({ harvest: 35, transplant: 0 }).potato, calendar(2024, 35, 0));
assert(delayedReplay.rice < delayedReplay.operation);
assert.equal(delayedReplay.stages.at(-1).key, "delayedStage");
