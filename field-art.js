"use strict";

function makeFieldArt(canvas, closeupCanvas) {
  let ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const fieldContext = ctx;
  const detailContext = closeupCanvas.getContext("2d");
  const width = 960;
  const height = 500;
  const detailWidth = 320;
  const detailHeight = 180;
  fieldContext.scale(canvas.width / width, canvas.height / height);
  if (detailContext) detailContext.scale(closeupCanvas.width / detailWidth, closeupCanvas.height / detailHeight);
  const terrain = {
    delta: ["#889776", "#a0ac87", "#576c49", "#67865c", "#7b9361"],
    plain: ["#a4a879", "#b6bb91", "#647657", "#8b995f", "#a2a96f"],
    river: ["#909c83", "#adba93", "#626f50", "#839768", "#a2aa74"],
    valley: ["#a0a18e", "#b9b59d", "#717456", "#89906d", "#a0a17b"],
  };
  const plants = makePlantArt();
  const landscapes = new Map();

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

  function landscape(placeType, wet) {
    const key = `${placeType}:${wet}`;
    if (!landscapes.has(key)) {
      const layer = document.createElement("canvas");
      layer.width = width;
      layer.height = height;
      ctx = layer.getContext("2d");
      paintLandscape(terrain[placeType], wet);
      ctx = fieldContext;
      landscapes.set(key, layer);
    }
    ctx.drawImage(landscapes.get(key), 0, 0);
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

  function plantStage(phase) {
    if (phase === "flowerStage" || phase === "headingStage" || phase === "tasselStage") return "bloom";
    if (phase === "fullBloomStage") return "full";
    if (phase === "matureStage") return "mature";
    if (phase === "seedlingStage" || phase === "riceStage") return "seedling";
    return "growing";
  }

  function paintCloseup(crop, phase, wet, growth, stage) {
    if (!detailContext) return;
    ctx = detailContext;
    const w = detailWidth;
    const h = detailHeight;
    const flooded = phase === "riceStage";
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, wet ? "#78908a" : "#d9e6c5");
    sky.addColorStop(.48, wet ? "#9fb3a2" : "#c3d3aa");
    sky.addColorStop(.72, wet ? "#657a63" : "#879d6d");
    sky.addColorStop(1, "#4a392d");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * .26, 18, 2, w * .26, 18, 155);
    glow.addColorStop(0, wet ? "#e6f0e644" : "#fff5cdaa");
    glow.addColorStop(1, "#fff5cd00");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h * .75);

    for (let i = 0; i < 3; i++) {
      const band = ctx.createLinearGradient(0, 58 + i * 7, 0, 80 + i * 7);
      band.addColorStop(0, ["#6c8360", "#7c926b", "#91a477"][i] + "00");
      band.addColorStop(1, ["#6c8360", "#7c926b", "#91a477"][i] + "88");
      ctx.fillStyle = band;
      ctx.fillRect(0, 58 + i * 7, w, 20);
    }
    const hedgeBand = ctx.createLinearGradient(0, 72, 0, 84);
    hedgeBand.addColorStop(0, "#5d765a00");
    hedgeBand.addColorStop(1, "#4b654966");
    ctx.fillStyle = hedgeBand;
    ctx.fillRect(0, 72, w, 12);
    for (let i = 0; i < 12; i++) {
      const x = -4 + i * 29 + random(i + 8) * 10;
      const y = 78 + random(i + 20) * 2;
      ellipse(x, y, 4 + random(i + 30) * 4, 2.5 + random(i + 40) * 2, "#4b654a55");
    }
    const haze = ctx.createLinearGradient(0, 58, 0, 92);
    haze.addColorStop(0, "#d9e6c500");
    haze.addColorStop(.7, wet ? "#a9b99e55" : "#e8efd066");
    haze.addColorStop(1, "#d9e6c500");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 58, w, 34);

    const species = plants.species[crop];
    if (species) {
      ctx.save();
      ctx.globalAlpha = .13;
      for (let i = 0; i < 6; i++) {
        const x = 24 + i * 54 + random(i + 210) * 18;
        plants.draw(ctx, crop, stage === "seedling" ? "growing" : stage, x, 112, .48 + random(i + 220) * .12, i + 301);
      }
      ctx.restore();
    }

    const soilY = 82;
    const soil = ctx.createLinearGradient(0, soilY, 0, h);
    if (flooded) {
      soil.addColorStop(0, wet ? "#7f9f96" : "#9ebdb2");
      soil.addColorStop(.55, wet ? "#638a83" : "#7ea79f");
      soil.addColorStop(1, wet ? "#3e5e59" : "#50776f");
    } else {
      soil.addColorStop(0, wet ? "#7b6651" : "#9b8160");
      soil.addColorStop(1, wet ? "#4a3b31" : "#5d4536");
    }
    polygon([[0, soilY + 3], [42, soilY - 2], [90, soilY + 1], [132, soilY - 4], [178, soilY], [222, soilY - 3], [270, soilY + 1], [320, soilY - 2], [320, h], [0, h]], soil);
    if (flooded) {
      for (let i = 0; i < 26; i++) {
        const y = soilY + 6 + random(i + 400) * (h - soilY - 8);
        const x = random(i + 500) * w;
        ellipse(x, y, 8 + random(i + 600) * 28, .55, "#dcefda52", -.04);
      }
    } else {
      for (let i = 0; i < 110; i++) {
        const x = random(i + 528) * w;
        const y = soilY + random(i + 711) * (h - soilY);
        ellipse(x, y, 1 + random(i + 47) * 2.4, .5 + random(i + 51) * 1.2, i % 3 ? "#e0c08c2e" : "#241a1538", -.1);
      }
      for (let i = 0; i < 12; i++) {
        const x = 12 + random(i + 88) * (w - 24);
        const y = 96 + random(i + 99) * (h - 102);
        ellipse(x, y, 3 + random(i + 5) * 7, 1.4 + random(i + 7) * 2.8, "#3b2c2352", -.12);
        ellipse(x - 1, y - 1.5, 2 + random(i + 6) * 4, .9 + random(i + 9) * 1.6, "#d9bb8752", -.12);
      }
    }

    const dormant = ["harvestStage", "incorporationStage", "prepStage", "delayedStage", "fallowStage"].includes(phase);
    if (!dormant && species) {
      const base = stage === "seedling" ? 1.3 : 1.34 + growth * .24;
      const positions = stage === "seedling"
        ? [[28, h, .9], [96, h, 1.05], [162, h, 1.12], [228, h, 1.02], [296, h, .88]]
        : [[40, h, .78], [160, h, 1.04], [280, h - 4, .82]];
      for (const [x, y, factor] of positions) {
        const scale = base * factor;
        ellipse(x + scale * 8, y - 4, scale * 29, scale * 5, flooded ? "#2f514a55" : "#1f2a1e44", -.1);
        if (flooded) ellipse(x + scale * 8, y - 1, scale * 20, scale * 3, "#d5e9d93b", -.1);
        plants.draw(ctx, crop, stage, x, y, scale, x + 43);
      }
    } else if (dormant) {
      if (crop === "potato" && phase === "harvestStage") {
        for (let i = 0; i < 5; i++) {
          const x = 36 + i * 63 + random(i + 2) * 10;
          tuber(x, 132 + random(i + 5) * 18, 17 + random(i + 7) * 9, i + 2);
        }
      } else if (species) {
        const closeStage = crop === "vetch" || crop === "hairy" ? "full" : "mature";
        for (const [x, y, scale] of [[38, h, .86], [162, h, 1.18], [282, h - 5, .88]]) {
          ellipse(x + scale * 8, y - 4, scale * 27, scale * 4.5, "#1f2a1e38", -.1);
          plants.draw(ctx, crop, closeStage, x, y, scale, x + 29);
        }
        for (let i = 0; i < 7; i++) {
          const x = 12 + i * 46;
          const y = 126 + random(i + 8) * 22;
          path([[x - 3, y + 2], [x, y - 8], [x + 2, y]], "#d0ad6a99", 1.2);
        }
      } else {
        for (let i = 0; i < 12; i++) {
          const x = 10 + i * 27;
          const y = 102 + random(i + 8) * 20;
          path([[x - 3, y + 2], [x, y - 7], [x + 2, y]], "#d0ad6a99", 1.2);
        }
      }
    }

    const mound = ctx.createLinearGradient(0, h - 26, 0, h);
    if (flooded) {
      mound.addColorStop(0, "#5b7f78");
      mound.addColorStop(1, "#34534e");
    } else {
      mound.addColorStop(0, wet ? "#5a4638" : "#6f543e");
      mound.addColorStop(1, wet ? "#30251d" : "#463427");
    }
    polygon([[0, h - 25], [48, h - 29], [104, h - 23], [158, h - 28], [214, h - 24], [270, h - 29], [320, h - 23], [320, h], [0, h]], mound);
    if (flooded) {
      for (let i = 0; i < 12; i++) {
        ellipse(random(i + 701) * w, h - 18 + random(i + 702) * 14, 7 + random(i + 703) * 18, .5, "#dcefda40", -.04);
      }
    } else {
      for (let i = 0; i < 38; i++) {
        ellipse(random(i + 704) * w, h - 22 + random(i + 705) * 20, 1 + random(i + 706) * 2, .6 + random(i + 707), i % 2 ? "#e0c08c2e" : "#241a1538");
      }
    }

    if (!flooded) {
      for (let i = 0; i < 9; i++) {
        const x = i % 2 ? 6 + random(i + 20) * 30 : w - 6 - random(i + 20) * 30;
        const y = h - 2 - random(i + 30) * 8;
        path([[x - 2, y], [x, y - 6 - random(i + 40) * 8], [x + 2, y]], "#7d965c", 1);
      }
    }

    const vignette = ctx.createRadialGradient(w / 2, h * .58, h * .2, w / 2, h * .55, w * .72);
    vignette.addColorStop(0, "#0c160b00");
    vignette.addColorStop(1, "#0c160b52");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    ctx = fieldContext;
  }

  return function paint({ terrain: placeType, crop, progress, phase, growthPhase, wet }) {
    landscape(placeType, wet);
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

    const flooded = phase === "riceStage";
    const worked = phase === "harvestStage" || phase === "incorporationStage" || phase === "prepStage" || phase === "delayedStage";
    const fallow = crop === "fallow" && !flooded;
    const soil = ctx.createLinearGradient(0, 150, 70, 430);
    soil.addColorStop(0, flooded ? "#87a49a" : wet ? "#8a7154" : "#a38761");
    soil.addColorStop(1, flooded ? "#517d79" : wet ? "#554738" : "#73523e");
    polygon(rim(.046, .067, .953, .925), soil);

    const rows = 13;
    const cols = 16;
    const rowValues = Array.from({ length: rows }, (_, row) => .09 + .78 * (row / (rows - 1)) ** 1.22);
    const rowStep = row => row < rows - 1 ? rowValues[row + 1] - rowValues[row] : rowValues[row] - rowValues[row - 1];
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

    const species = plants.species[crop];
    const stage = plantStage(growthPhase);
    const growth = flooded ? .64 : .26 + Math.min(1, progress * 1.24) * .74;
    for (let row = 0; row < rows; row++) {
      for (let col = cols - 1; col >= 0; col--) {
        const seed = row * cols + col;
        const v = rowValues[row] + rowStep(row) * .19 + (random(seed + 31) - .5) * .019;
        const u = .079 + col * .056 + (random(seed + 7) - .5) * .026;
        const [x, y] = place(u, v);
        if (worked || fallow) {
          if (random(seed + 9) < .68) {
            const stubble = .8 + v * 4;
            path([[x - stubble, y + .5], [x, y], [x + stubble * .33, y - stubble]], "#d0ad6aa3", 1);
          }
          if (crop === "potato" && phase === "harvestStage" && row >= 8 && random(seed + 120) > .56) {
            tuber(x, y - .5, (1.6 + v * 2.25) * (.75 + random(seed + 38) * .5), seed);
          }
        } else if (species && (progress > .28 || random(seed + 3) > .22) && random(seed + 210) > .045) {
          const scale = (.15 + v * .29) * growth * species.size * (.76 + random(seed + 60) * .47);
          const lean = scale * 32;
          ellipse(x + lean * .42, y, lean, lean * .25, flooded ? "#456a6446" : "#25312452", -.12);
          plants.draw(ctx, crop, stage, x, y, scale, seed);
        }
      }
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
    if (wet) {
      for (let i = 0; i < 108; i++) {
        const x = random(i + 500) * width;
        const y = random(i + 800) * height;
        path([[x, y], [x - 4, y + 13]], "#d9f1ed39", 1);
      }
    }
    paintCloseup(crop, phase, wet, growth, stage);
  };
}
