"use strict";

function makeFieldArt(canvas, closeupCanvas) {
  let ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const fieldContext = ctx;
  const detailContext = closeupCanvas.getContext("2d");
  const width = 960;
  const height = 500;
  const detailWidth = 360;
  const detailHeight = 320;
  fieldContext.scale(canvas.width / width, canvas.height / height);
  if (detailContext) detailContext.scale(closeupCanvas.width / detailWidth, closeupCanvas.height / detailHeight);
  const terrain = {
    delta: ["#889776", "#a0ac87", "#576c49", "#67865c", "#7b9361"],
    plain: ["#a4a879", "#b6bb91", "#647657", "#8b995f", "#a2a96f"],
    river: ["#909c83", "#adba93", "#626f50", "#839768", "#a2aa74"],
    valley: ["#a0a18e", "#b9b59d", "#717456", "#89906d", "#a0a17b"],
  };
  const plants = makePlantArt();
  const grounds = new Map();

  function random(seed) {
    const number = Math.sin(seed * 157.73 + 15.43) * 43758.5453;
    return number - Math.floor(number);
  }

  function polygon(points, color) {
    ctx.beginPath();
    for (const [index, point] of points.entries()) {
      if (!index) ctx.moveTo(...point);
      else ctx.lineTo(...point);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function ellipse(x, y, rx, ry, color, angle = 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  function path(points, color, lineWidth = 1) {
    ctx.beginPath();
    for (const [index, point] of points.entries()) {
      if (!index) ctx.moveTo(...point);
      else ctx.lineTo(...point);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  const place = (u, v) => [
    480 + (2 * u - 1) * (230 + 120 * v),
    182 + 234 * v,
  ];
  const rim = (u1, v1, u2, v2) => [place(u1, v1), place(u2, v1), place(u2, v2), place(u1, v2)];
  const drop = ([x, y], amount) => [x, y + amount];
  const rows = 13;
  const cols = 16;
  const rowValues = Array.from({ length: rows }, (_, row) => .09 + .78 * (row / (rows - 1)) ** 1.22);
  const rowStep = row => row < rows - 1 ? rowValues[row + 1] - rowValues[row] : rowValues[row] - rowValues[row - 1];
  const spots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = cols - 1; col >= 0; col--) {
      const seed = row * cols + col;
      const depth = rowValues[row] + rowStep(row) * .19 + (random(seed + 31) - .5) * .019;
      const [x, y] = place(.079 + col * .056 + (random(seed + 7) - .5) * .026, depth);
      const size = (.15 + depth * .29) * (.76 + random(seed + 60) * .47);
      spots.push({ x, y, depth, seed, size, planted: random(seed + 210) > .045 });
    }
  }

  function paintLandscape(palette, wet) {
    const [far, soft, dark, green, light] = palette;
    const sky = ctx.createLinearGradient(0, 0, 0, 260);
    sky.addColorStop(0, wet ? "#748b90" : "#a5c6bf");
    sky.addColorStop(.58, wet ? "#bec7bd" : "#e4e8c9");
    sky.addColorStop(1, "#b6bd90");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    if (!wet) {
      const haze = ctx.createRadialGradient(242, 66, 3, 242, 66, 175);
      haze.addColorStop(0, "#fcf5d4bb");
      haze.addColorStop(1, "#fcf5d400");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, 210);
    }
    for (let range = 0; range < 3; range++) {
      const peaks = Array.from({ length: 33 }, (_, i) => {
        const hill = Math.sin(i * (.29 + range * .05) + range) * (13 + range * 2);
        const detail = Math.sin(i * 1.45 + range) * 4 + random(i + 90 * range) * 6;
        return [i * 30, 89 + range * 20 + hill + detail];
      });
      polygon([...peaks, [width, 258], [0, 258]], [soft, far, dark][range]);
    }

    const valley = ctx.createLinearGradient(0, 120, 0, 500);
    valley.addColorStop(0, green);
    valley.addColorStop(1, "#354b39");
    polygon([[0, 147], [250, 136], [575, 138], [960, 122], [960, 500], [0, 500]], valley);
    const patches = [
      [[[0, 164], [233, 145], [367, 162], [0, 215]], light],
      [[[0, 222], [231, 175], [321, 177], [0, 293]], "#8a9668"],
      [[[468, 152], [672, 131], [764, 145], [602, 174]], light],
      [[[721, 176], [960, 137], [960, 201], [839, 229]], "#a4a379"],
      [[[819, 257], [960, 211], [960, 278], [886, 300]], dark],
      [[[0, 337], [134, 290], [270, 382], [0, 470]], "#74895b"],
      [[[726, 402], [960, 311], [960, 415], [835, 452]], "#647d58"],
      [[[700, 468], [960, 419], [960, 500], [795, 500]], "#50664e"],
    ];
    for (const [shape, color] of patches) polygon(shape, color);

    polygon([[846, 131], [859, 132], [759, 181], [884, 229], [960, 233], [960, 253], [853, 244], [723, 181]], wet ? "#6f9b9b" : "#7d9f91");
    path([[849, 133], [738, 181], [864, 237], [960, 244]], "#c3d8b58c", 2);
    polygon([[0, 320], [171, 251], [186, 266], [0, 351]], "#b8af80");

    for (let i = 0; i < 1800; i++) {
      const x = random(i + 110) * width;
      const y = 138 + random(i + 2000) * (height - 138);
      const w = .45 + (y / height) * 2.2;
      ellipse(x, y, w, w * .35, i % 2 ? "#dbe4ac26" : "#1c342a2e");
    }
    for (let i = 0; i < 43; i++) {
      const x = 16 + i * 22 + random(i + 56) * 13;
      const y = 145 + Math.sin(i * .28) * 8 + random(i + 85) * 8;
      const h = 4 + random(i + 19) * 12;
      path([[x, y + 1], [x, y - h]], "#344b39");
      ellipse(x, y - h, h * .45, h * .55, i % 2 ? dark : green);
    }
  }

  function tuber(x, y, scale, seed) {
    const angle = -.7 + random(seed + 7) * 1.4;
    const tilt = .59 + random(seed + 18) * .16;
    ellipse(x + scale * .26, y + scale * .22, scale * 1.1, scale * tilt, "#4e3e2a60", angle);
    const skin = ctx.createRadialGradient(x - scale * .31, y - scale * .4, 0, x, y, scale);
    skin.addColorStop(0, "#e5c58b");
    skin.addColorStop(.61, "#c49b62");
    skin.addColorStop(1, "#8a6545");
    ellipse(x, y, scale, scale * tilt, skin, angle);
    for (let i = 0; i < 4; i++) {
      const ex = x + (random(seed + i * 31) - .5) * scale * 1.12;
      const ey = y + (random(seed + 3 + i * 7) - .5) * scale * .7;
      ellipse(ex, ey, scale * .067, scale * .044, "#6d4b35aa", angle);
    }
  }

  function plantStage(phase, crop) {
    if (phase === "flowerStage" || phase === "headingStage" || phase === "tasselStage") return "bloom";
    if (phase === "fullBloomStage") return "full";
    if (phase === "matureStage") return crop === "hairy" || crop === "berseem" ? "full" : "mature";
    if (phase === "seedlingStage" || phase === "riceStage") return "seedling";
    return "growing";
  }

  function smooth(value) {
    const t = Math.min(1, Math.max(0, value));
    return t * t * (3 - 2 * t);
  }

  function appearance(crop, phase, replay, day) {
    if (phase === "riceStage") return { from: "seedling", to: "seedling", mix: 0, growth: .64, cleared: 0 };
    if (crop === "fallow") return { growth: 0, cleared: 1 };

    const stageIndex = replay.stages.findLastIndex(stage => stage.day <= day && stage.day < replay.operation);
    const stage = replay.stages[stageIndex];
    const next = replay.stages[stageIndex + 1];
    const from = plantStage(stage.key, crop);
    let to = from;
    let mix = 0;
    if (next && next.day < replay.operation) {
      const transition = Math.min(15, (next.day - stage.day) * .55);
      to = plantStage(next.key, crop);
      mix = smooth(1 - (next.day - day) / transition);
    }
    const progress = Math.min(1, day / replay.operation);
    const growth = .24 + .76 * (1 - (1 - progress) ** 1.55);
    // Show the crop being cleared at the scheduled operation without moving its date.
    const cleared = smooth(1 - (replay.operation - day) / 2.5);
    return { from, to, mix, growth, cleared };
  }

  function paintCloseup(crop, phase, wet, pose) {
    if (!detailContext) return;
    ctx = detailContext;
    const w = detailWidth;
    const h = detailHeight;
    const flooded = phase === "riceStage";
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, wet ? "#78908a" : "#d9e6c5");
    sky.addColorStop(.45, wet ? "#9fb3a2" : "#c3d3aa");
    sky.addColorStop(.7, wet ? "#657a63" : "#879d6d");
    sky.addColorStop(1, "#4a392d");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * .26, 24, 2, w * .26, 24, 200);
    glow.addColorStop(0, wet ? "#e6f0e644" : "#fff5cdaa");
    glow.addColorStop(1, "#fff5cd00");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h * .72);

    for (let i = 0; i < 3; i++) {
      const band = ctx.createLinearGradient(0, 106 + i * 8, 0, 140 + i * 8);
      band.addColorStop(0, ["#6c8360", "#7c926b", "#91a477"][i] + "00");
      band.addColorStop(1, ["#6c8360", "#7c926b", "#91a477"][i] + "88");
      ctx.fillStyle = band;
      ctx.fillRect(0, 106 + i * 8, w, 34);
    }
    const hedgeBand = ctx.createLinearGradient(0, 128, 0, 154);
    hedgeBand.addColorStop(0, "#5d765a00");
    hedgeBand.addColorStop(1, "#4b654966");
    ctx.fillStyle = hedgeBand;
    ctx.fillRect(0, 128, w, 26);
    for (let i = 0; i < 16; i++) {
      const x = -4 + i * 32 + random(i + 8) * 10;
      const y = 140 + random(i + 20) * 3;
      ellipse(x, y, 4 + random(i + 30) * 4, 2.5 + random(i + 40) * 2, "#4b654a55");
    }
    const haze = ctx.createLinearGradient(0, 100, 0, 162);
    haze.addColorStop(0, "#d9e6c500");
    haze.addColorStop(.7, wet ? "#a9b99e55" : "#e8efd066");
    haze.addColorStop(1, "#d9e6c500");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 100, w, 62);

    const species = plants.species[crop];
    const { growth, cleared } = pose;
    if (species && cleared < 1) {
      ctx.save();
      ctx.globalAlpha = .12 * (1 - cleared);
      for (let i = 0; i < 6; i++) {
        const x = 20 + i * 62 + random(i + 210) * 18;
        plants.draw(ctx, crop, pose, x, 198, (.45 + random(i + 220) * .12) * growth, i + 301);
      }
      ctx.restore();
    }

    const soilY = 152;
    const soil = ctx.createLinearGradient(0, soilY, 0, h);
    if (flooded) {
      soil.addColorStop(0, wet ? "#7f9f96" : "#9ebdb2");
      soil.addColorStop(.55, wet ? "#638a83" : "#7ea79f");
      soil.addColorStop(1, wet ? "#3e5e59" : "#50776f");
    } else {
      soil.addColorStop(0, wet ? "#7b6651" : "#9b8160");
      soil.addColorStop(1, wet ? "#4a3b31" : "#5d4536");
    }
    polygon([[0, soilY + 3], [48, soilY - 2], [102, soilY + 1], [150, soilY - 4], [203, soilY], [252, soilY - 3], [308, soilY + 1], [360, soilY - 2], [360, h], [0, h]], soil);
    if (flooded) {
      for (let i = 0; i < 34; i++) {
        const y = soilY + 10 + random(i + 400) * (h - soilY - 14);
        const x = random(i + 500) * w;
        ellipse(x, y, 12 + random(i + 600) * 36, .7, "#dcefda52", -.04);
      }
    } else {
      for (let i = 0; i < 180; i++) {
        const x = random(i + 528) * w;
        const y = soilY + random(i + 711) * (h - soilY);
        ellipse(x, y, 1.2 + random(i + 47) * 3.2, .6 + random(i + 51) * 1.6, i % 3 ? "#e0c08c2e" : "#241a1538", -.1);
      }
      for (let i = 0; i < 20; i++) {
        const x = 12 + random(i + 88) * (w - 24);
        const y = 172 + random(i + 99) * (h - 180);
        ellipse(x, y, 3 + random(i + 5) * 9, 1.6 + random(i + 7) * 3.8, "#3b2c2352", -.12);
        ellipse(x - 1, y - 1.5, 2 + random(i + 6) * 5, 1 + random(i + 9) * 2, "#d9bb8752", -.12);
      }
    }

    const baseY = h - 28;
    if (species && cleared < 1) {
      const scale = (.92 + growth * 1.27) * (1 - .3 * cleared);
      ctx.save();
      ctx.globalAlpha = 1 - cleared;
      ellipse(w / 2, baseY + 1, 86, 11, flooded ? "#3f5f5a" : wet ? "#4a382b" : "#4f3b2c", 0);
      ellipse(w / 2 - 18, baseY - 2, 38, 3.4, "#d8b98222", 0);
      ctx.save();
      ctx.globalAlpha *= .28;
      for (const [x, factor] of [[w * .18, .3], [w * .82, .32]]) {
        plants.draw(ctx, crop, pose, x, baseY - 7, scale * factor, x + 17);
      }
      ctx.restore();
      ellipse(w / 2 + scale * 8, baseY - 4, scale * 33, scale * 5, flooded ? "#2f514a55" : "#1f2a1e44", -.1);
      if (flooded) ellipse(w / 2 + scale * 8, baseY, scale * 22, scale * 3, "#d5e9d93b", -.1);
      plants.draw(ctx, crop, pose, w / 2, baseY, scale, w + 12);
      ctx.restore();
    }
    if (cleared > 0) {
      ctx.save();
      ctx.globalAlpha = cleared;
      if (crop === "potato" && phase === "harvestStage") {
        for (let i = 0; i < 4; i++) {
          const x = 70 + i * 70 + random(i + 2) * 8;
          tuber(x, 232 + random(i + 5) * 28, 26 + random(i + 7) * 8, i + 2);
        }
      } else {
        for (let i = 0; i < 16; i++) {
          const x = 12 + i * 21;
          const y = 180 + random(i + 8) * 84;
          path([[x - 9, y + 2], [x, y - 2], [x + 8, y - 5]], "#d0ad6a99", 1.4);
          if (phase === "incorporationStage") ellipse(x - 2, y - 1, 5, 1.8, "#798655", -.32);
        }
      }
      ctx.restore();
    }

    const mound = ctx.createLinearGradient(0, h - 26, 0, h);
    if (flooded) {
      mound.addColorStop(0, "#5b7f78");
      mound.addColorStop(1, "#34534e");
    } else {
      mound.addColorStop(0, wet ? "#5a4638" : "#6f543e");
      mound.addColorStop(1, wet ? "#30251d" : "#463427");
    }
    polygon([[0, h - 25], [52, h - 29], [112, h - 23], [172, h - 28], [232, h - 24], [292, h - 29], [360, h - 23], [360, h], [0, h]], mound);
    if (flooded) {
      for (let i = 0; i < 14; i++) {
        ellipse(random(i + 701) * w, h - 18 + random(i + 702) * 14, 8 + random(i + 703) * 22, .5, "#dcefda40", -.04);
      }
    } else {
      for (let i = 0; i < 52; i++) {
        ellipse(random(i + 704) * w, h - 22 + random(i + 705) * 20, 1 + random(i + 706) * 2.4, .6 + random(i + 707) * 1.2, i % 2 ? "#e0c08c2e" : "#241a1538");
      }
    }

    if (!flooded) {
      for (let i = 0; i < 11; i++) {
        const x = i % 2 ? 6 + random(i + 20) * 36 : w - 6 - random(i + 20) * 36;
        const y = h - 2 - random(i + 30) * 8;
        path([[x - 2, y], [x, y - 6 - random(i + 40) * 8], [x + 2, y]], "#7d965c", 1);
      }
    }

    const vignette = ctx.createRadialGradient(w / 2, h * .6, h * .22, w / 2, h * .55, w * .66);
    vignette.addColorStop(0, "#0c160b00");
    vignette.addColorStop(1, "#0c160b52");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    ctx = fieldContext;
  }

  function paintGround(placeType, wet, flooded, worked) {
    paintLandscape(terrain[placeType], wet);
    for (let i = 0; i < 3; i++) {
      const x = 138 + i * 42 + random(i + 620) * 22;
      const y = 48 + i * 9 + random(i + 640) * 14;
      path([[x - 4, y], [x, y - 2], [x + 4, y]], "#3d513b55", 1);
    }
    const [a, b, c, d] = rim(0, 0, 1, 1);
    polygon([drop(a, 15), drop(b, 15), drop(c, 24), drop(d, 24)], "#26382ca0");
    polygon([a, d, drop(d, 18), drop(a, 12)], "#5d4939");
    polygon([b, c, drop(c, 18), drop(b, 12)], "#4f3d2e");
    const front = ctx.createLinearGradient(0, d[1], 0, d[1] + 18);
    front.addColorStop(0, "#6b5440");
    front.addColorStop(1, "#3d2f25");
    polygon([d, c, drop(c, 18), drop(d, 18)], front);
    polygon([a, b, c, d], "#5f7a50");
    polygon(rim(.025, .045, .977, .948), "#4d6a46");

    const soil = ctx.createLinearGradient(0, 150, 70, 430);
    soil.addColorStop(0, flooded ? "#87a49a" : wet ? "#8a7154" : "#a38761");
    soil.addColorStop(1, flooded ? "#517d79" : wet ? "#554738" : "#73523e");
    polygon(rim(.046, .067, .953, .925), soil);

    for (let row = 0; row < rows; row++) {
      const v = rowValues[row];
      const step = rowStep(row);
      if (!flooded) {
        polygon(rim(.05, v, .95, v + step * .29), worked ? "#c2a5815a" : "#d7ad7a67");
        polygon(rim(.05, v + step * .31, .95, v + step * .42), "#47382c50");
      } else {
        path([place(.055, v), place(.94, v)], "#c1dfc866", 1.2);
      }
    }
    for (let i = 0; i < 580; i++) {
      const u = .055 + random(i + 120) * .89;
      const v = .07 + random(i + 500) * .84;
      const [x, y] = place(u, v);
      if (flooded || wet && i % 11 === 0) {
        ellipse(x, y, 1 + v * 2.5, .55, flooded ? "#d3e9c972" : "#a4b8a479", -.1);
      } else {
        ellipse(x, y, .6 + v * 1.8, .45 + v * .3, i % 2 ? "#e9bc783d" : "#382f253a", -.15);
      }
    }
    for (let i = 0; i < 34; i++) {
      const u = .06 + random(i + 900) * .88;
      const v = .09 + random(i + 930) * .8;
      const [x, y] = place(u, v);
      const size = 0.9 + v * 3.4 + random(i + 960) * 1.8;
      ellipse(x, y, size * 1.8, size * .72, i % 2 ? "#3e2e234d" : "#d8b9823d", -.12);
      if (i % 3 === 0) ellipse(x - size * .4, y - size * .2, size * .8, size * .3, "#efd4a343", -.12);
    }
    for (let i = 0; i < 11; i++) {
      const [x, y] = place(.08 + random(i + 970) * .84, .1 + random(i + 980) * .76);
      ellipse(x, y, 1.2 + random(i + 990) * 2.4, .7 + random(i + 991) * 1.1, "#e4cfa26b", -.2);
    }

    for (let i = 0; i < 210; i++) {
      const edge = i % 4;
      const u = random(i + 32);
      const v = random(i + 493);
      const [x, y] = edge === 0 ? place(u, .955 + v * .04)
        : edge === 1 ? place(.015 + u * .028, v)
          : edge === 2 ? place(u, .012 + v * .035)
            : place(.966 + u * .026, v);
      const scale = 2 + v * 5;
      path([[x - scale, y], [x, y - scale], [x + scale * .4, y]], i % 3 ? "#7c965a" : "#a9ae6c");
    }
  }

  function drawGround(placeType, wet, flooded, worked) {
    const key = `${placeType}:${wet}:${flooded}:${worked}`;
    let layer = grounds.get(key);
    if (!layer) {
      layer = document.createElement("canvas");
      layer.width = width;
      layer.height = height;
      ctx = layer.getContext("2d");
      paintGround(placeType, wet, flooded, worked);
      ctx = fieldContext;
      if (grounds.size >= 8) grounds.delete(grounds.keys().next().value);
      grounds.set(key, layer);
    }
    ctx.drawImage(layer, 0, 0);
  }

  return function paint({ terrain: placeType, crop, replay, day, phase, wet }) {
    const flooded = phase === "riceStage";
    const worked = phase === "harvestStage" || phase === "incorporationStage" || phase === "prepStage" || phase === "delayedStage";
    const pose = appearance(crop, phase, replay, day);
    const { growth, cleared } = pose;
    const species = plants.species[crop];
    drawGround(placeType, wet, flooded, worked);
    for (const { x, y, depth, seed, size, planted } of spots) {
      if (cleared > 0) {
        ctx.globalAlpha = cleared;
        if (random(seed + 9) < .68) {
          const stubble = .8 + depth * 4;
          path([[x - stubble, y + .5], [x, y], [x + stubble * .33, y - stubble]], "#d0ad6aa3", 1);
          if (phase === "incorporationStage") ellipse(x, y, stubble * 1.5, stubble * .42, "#718154aa", -.22);
        }
        if (crop === "potato" && phase === "harvestStage" && seed >= cols * 8 && random(seed + 120) > .56) {
          tuber(x, y - .5, (1.6 + depth * 2.25) * (.75 + random(seed + 38) * .5), seed);
        }
      }
      if (species && planted && cleared < 1) {
        ctx.globalAlpha = 1 - cleared;
        const scale = size * growth * species.size * (1 - .3 * cleared);
        const spread = scale * 32;
        ellipse(x + spread * .42, y, spread, spread * .25, flooded ? "#456a6446" : "#25312452", -.12);
        plants.draw(ctx, crop, pose, x, y, scale, seed);
      }
    }
    ctx.globalAlpha = 1;
    if (wet) {
      ctx.beginPath();
      for (let i = 0; i < 108; i++) {
        const x = random(i + 500) * width;
        const y = random(i + 800) * height;
        ctx.moveTo(x, y);
        ctx.lineTo(x - 4, y + 13);
      }
      ctx.strokeStyle = "#d9f1ed39";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    paintCloseup(crop, phase, wet, pose);
  };
}
