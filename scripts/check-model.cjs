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
const data = runInNewContext(bundled + "\nweather");
assert.equal(Object.keys(data).length, 910);
assert(Array.isArray(data["2024-02-29"]));
assert.equal(options({}, date => data[date]?.[0]).potato.rain, 0.15);
assert.equal(options({ year: 2023, harvest: 12 }, date => data[date]?.[0]).potato.rain, 39.34);
console.log("Bundled NASA POWER examples passed");
