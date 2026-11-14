"use strict";

function makeFieldArt(canvas, closeupCanvas) {
  let ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const fieldContext = ctx;
  const detailContext = closeupCanvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
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
    154 + 526 * u + 139 * v - 20 * u * v,
    201 - 56 * u + 205 * v + 21 * u * v,
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
    const w = closeupCanvas.width;
    const h = closeupCanvas.height;
    const backdrop = ctx.createLinearGradient(0, 0, 0, h);
    backdrop.addColorStop(0, wet ? "#9db8ae" : "#d9e6c8");
    backdrop.addColorStop(.62, wet ? "#cbd3ae" : "#b0c293");
    backdrop.addColorStop(1, "#6f8464");
    ctx.fillStyle = backdrop;
    ctx.fillRect(0, 0, w, h);
    const flooded = phase === "riceStage";
    for (let i = 0; i < 27; i++) {
      const x = random(i + 293) * w;
      const y = random(i + 540) * h * .76;
      const radius = 6 + random(i + 48) * 20;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, i % 2 ? "#f5f2c64c" : "#4c775c37");
      glow.addColorStop(1, "#8ca97500");
      ellipse(x, y, radius, radius, glow);
    }
    const soil = ctx.createLinearGradient(0, 80, 0, h);
    soil.addColorStop(0, flooded ? "#93ad96" : "#a08b65");
    soil.addColorStop(1, flooded ? "#71918b" : "#6a5141");
    polygon([[0, 85], [102, 81], [210, 82], [320, 77], [320, 108], [0, 108]], soil);
    for (let i = 0; i < 190; i++) {
      const x = random(i + 528) * w;
      const y = 86 + random(i + 711) * 22;
      ellipse(x, y, 1 + random(i + 47) * 1.6, .5, i % 2 ? "#f2d29e61" : "#51473854");
    }
    const dormant = ["harvestStage", "incorporationStage", "prepStage", "delayedStage", "fallowStage"].includes(phase);
    if (dormant) {
      for (let i = 0; i < 11; i++) {
        const x = 12 + 29 * i;
        const y = 87 + random(i + 8) * 8;
        if (crop === "potato" && phase === "harvestStage") {
          tuber(x, y - 2, 7 + random(i + 54) * 5, i);
        } else {
          path([[x - 4, y + 2], [x, y], [x - 2, y - 5]], "#d7bb74", 1.35);
        }
      }
    } else if (plants.species[crop]) {
      const scale = Math.min(.93, .33 + growth * .67);
      const positions = [[62, 92, .78], [261, 87, .7], [162, 96, 1]];
      for (const [x, y, factor] of positions) {
        ellipse(x + 6, y + 1, scale * 27, scale * 5.1, "#26352236", -.11);
        plants.draw(ctx, crop, stage, x, y, scale * factor, x + 43);
      }
    }
    ctx = fieldContext;
  }

  return function paint({ terrain: placeType, crop, progress, phase, growthPhase, wet }) {
    landscape(placeType, wet);
    const [a, b, c, d] = rim(0, 0, 1, 1);
    polygon([drop(a, 19), drop(b, 21), drop(c, 34), drop(d, 32)], "#26382ca0");
    polygon([a, d, drop(d, 23), drop(a, 17)], "#5d4939");
    polygon([d, c, drop(c, 25), drop(d, 23)], "#564333");
    polygon([a, b, c, d], "#a99b69");
    polygon(rim(.025, .045, .977, .948), "#52734f");

    const flooded = phase === "riceStage";
    const worked = phase === "harvestStage" || phase === "incorporationStage" || phase === "prepStage" || phase === "delayedStage";
    const fallow = crop === "fallow" && !flooded;
    const soil = ctx.createLinearGradient(0, 150, 70, 430);
    soil.addColorStop(0, flooded ? "#87a49a" : wet ? "#8a7154" : "#a38761");
    soil.addColorStop(1, flooded ? "#517d79" : wet ? "#554738" : "#73523e");
    polygon(rim(.046, .067, .953, .925), soil);

    const rows = 13;
    const cols = 16;
    for (let row = 0; row < rows; row++) {
      const v = .09 + row * .062;
      if (!flooded) {
        polygon(rim(.05, v, .95, v + .018), worked ? "#c2a5815a" : "#d7ad7a67");
        polygon(rim(.05, v + .019, .95, v + .026), "#47382c50");
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

    const species = plants.species[crop];
    const stage = plantStage(growthPhase);
    const growth = flooded ? .64 : .26 + Math.min(1, progress * 1.24) * .74;
    for (let row = 0; row < rows; row++) {
      for (let col = cols - 1; col >= 0; col--) {
        const seed = row * cols + col;
        const v = .102 + row * .062 + (random(seed + 31) - .5) * .019;
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
        } else if (species && (progress > .28 || random(seed + 3) > .22)) {
          const scale = (.15 + v * .29) * growth * species.size * (.76 + random(seed + 60) * .47);
          const lean = scale * 32;
          ellipse(x + lean * .42, y, lean, lean * .25, flooded ? "#456a6446" : "#25312452", -.12);
          plants.draw(ctx, crop, stage, x, y, scale, seed);
        }
      }
    }
    for (let i = 0; i < 175; i++) {
      const u = random(i + 32);
      const v = random(i + 493);
      const [x, y] = i % 2 ? place(u, .955 + v * .04) : place(.015 + u * .028, v);
      const scale = 2 + v * 5;
      path([[x - scale, y], [x, y - scale], [x + scale * .4, y]], i % 3 ? "#7c965a" : "#a9ae6c");
    }
    path([drop(d, 8), drop(c, 9)], "#bc9a6a79", 1.4);
    path([drop(d, 18), drop(c, 20)], "#362d288c", 1.6);

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
