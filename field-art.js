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
  const plants = {
    potato: { type: "broad", colors: ["#315636", "#588346", "#92ae60"], bloom: "#ede1e9", size: 1.08 },
    vetch: { type: "fern", colors: ["#365e3d", "#629351", "#9fbb69"], bloom: "#ed8ccc", size: 1.04 },
    hairy: { type: "fern", colors: ["#36513b", "#608758", "#9baa72"], bloom: "#c4a4f2", size: 1.03 },
    maize: { type: "blade", colors: ["#3b6234", "#668f43", "#a6b959"], bloom: "#efc77a", size: 1.95 },
    mung: { type: "broad", colors: ["#3b6443", "#6a9753", "#a6bc67"], bloom: "#e9d36a", size: .83 },
    mustard: { type: "stalk", colors: ["#476733", "#719542", "#a5b85d"], bloom: "#f7cc4f", size: 1.28 },
    rye: { type: "blade", colors: ["#405a36", "#6d9251", "#b8bb69"], bloom: "#dfbb70", size: 1.43 },
    rice: { type: "blade", colors: ["#3d7441", "#71a64f", "#aed36b"], bloom: "#c7c96f", size: 1.4 },
  };

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

  function drawPlant(crop, x, y, size, seed, bloom, mature) {
    const [dark, green, light] = crop.colors;
    ellipse(x + size * .44, y + 1, size * .92, size * .23, "#26332135", -.16);
    const branches = crop.type === "fern" ? 5 : crop.type === "blade" ? 6 : 4;
    const lean = (random(seed + 72) - .5) * size * .45;
    for (let i = 0; i < branches; i++) {
      const flip = i % 2 ? -1 : 1;
      const tipX = x + lean + flip * size * (.22 + random(seed + 3 * i) * .59);
      const tipY = y - size * (.32 + random(seed + 9 * i + 1) * .74);
      if (crop.type === "blade") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + (tipX - x) * .28, tipY - size * .18, tipX, tipY);
        ctx.quadraticCurveTo(x + (tipX - x) * .43 + flip * size * .13, tipY + size * .44, x, y);
        ctx.fillStyle = i % 3 === 0 ? light : i % 3 === 1 ? green : dark;
        ctx.fill();
      } else {
        path([[x, y], [x + lean * .5, (y + tipY) / 2], [tipX, tipY]], dark, Math.max(.5, size * .046));
        const leafPairs = crop.type === "fern" ? 3 : 2;
        for (let j = 0; j < leafPairs; j++) {
          const fraction = .36 + .24 * j;
          const lx = x + (tipX - x) * fraction;
          const ly = y + (tipY - y) * fraction;
          const leaf = size * (crop.type === "fern" ? .135 : .24) * (1 - j * .14);
          ellipse(lx + flip * leaf * .5, ly, leaf, leaf * .54, i % 3 === 0 ? light : green, flip * -.48);
          ellipse(lx - flip * leaf * .42, ly - leaf * .2, leaf * .77, leaf * .4, j % 2 ? light : dark, flip * .62);
        }
        ellipse(tipX, tipY, size * .19, size * .09, green, flip * -.55);
      }
      if (bloom && i % 2 === 0 && random(seed + i) > .16) {
        if (crop.type === "blade") {
          path([[tipX, tipY], [tipX + flip * size * .1, tipY - size * .21]], crop.bloom, Math.max(.75, size * .064));
          if (mature) ellipse(tipX + flip * size * .09, tipY - size * .14, size * .06, size * .18, crop.bloom, flip * .24);
        } else {
          for (let petal = 0; petal < 4; petal++) {
            const angle = petal * Math.PI / 2;
            const distance = size * .092;
            ellipse(tipX + Math.cos(angle) * distance, tipY + Math.sin(angle) * distance, size * .084, size * .069, crop.bloom);
          }
          ellipse(tipX, tipY, size * .038, size * .032, "#f5dc88");
        }
      }
    }
  }

  function paintCloseup(crop, phase, wet, growth, blooming) {
    if (!detailContext) return;
    ctx = detailContext;
    const w = closeupCanvas.width;
    const h = closeupCanvas.height;
    const backdrop = ctx.createLinearGradient(0, 0, 0, h);
    backdrop.addColorStop(0, wet ? "#c5d3cd" : "#e3e8d0");
    backdrop.addColorStop(1, "#a9bb9a");
    ctx.fillStyle = backdrop;
    ctx.fillRect(0, 0, w, h);
    const flooded = phase === "riceStage";
    polygon([[0, 85], [102, 81], [210, 82], [320, 77], [320, 108], [0, 108]], flooded ? "#88a797" : "#9d8060");
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
          ellipse(x + 3, y + 2, 8, 3.5, "#45392d61", -.2);
          ellipse(x, y - 1, 7.1, 4.7, i % 3 ? "#caa96d" : "#b48c58", -.32);
          ellipse(x - 1, y - 2, 3, 1.6, "#efd197", -.32);
        } else {
          path([[x - 4, y + 2], [x, y], [x - 2, y - 5]], "#d7bb74", 1.35);
        }
      }
    } else if (plants[crop]) {
      const plant = plants[crop];
      const scale = Math.min(68, 63 * growth * Math.sqrt(plant.size));
      for (let i = 0; i < 3; i++) {
        drawPlant(plant, 70 + i * 88, 90 - i * 2, scale * (i === 1 ? 1 : .72), i * 27 + 11, blooming, phase === "matureStage");
      }
    }
    ctx = fieldContext;
  }

  return function paint({ terrain: placeType, crop, progress, phase, wet }) {
    const palette = terrain[placeType];
    paintLandscape(palette, wet);
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

    const species = plants[flooded ? "rice" : crop];
    const blooming = ["flowerStage", "headingStage", "tasselStage", "fullBloomStage", "matureStage"].includes(phase)
      || phase === "occupiedStage" && progress >= .79;
    const growth = flooded ? .31 : .17 + Math.min(1, progress * 1.3) * .83;
    for (let row = 0; row < rows; row++) {
      for (let col = cols - 1; col >= 0; col--) {
        const seed = row * cols + col;
        const v = .101 + row * .062 + random(seed + 31) * .012;
        const u = .072 + col * .057 + random(seed + 7) * .012;
        const [x, y] = place(u, v);
        if (worked || fallow) {
          if (random(seed + 9) < .68) {
            const stubble = .8 + v * 4;
            path([[x - stubble, y + .5], [x, y], [x + stubble * .33, y - stubble]], "#d0ad6aa3", 1);
          }
          if (crop === "potato" && phase === "harvestStage" && row >= 8 && random(seed + 120) > .56) {
            const size = 1.8 + v * 2;
            ellipse(x + 1, y + .7, size * 1.25, size * .63, "#382e284f", -.32);
            ellipse(x, y - 1, size, size * .65, "#be955e", -.32);
            ellipse(x - size * .23, y - 1.65, size * .47, size * .21, "#dfba76", -.32);
          }
        } else if (species && (progress > .28 || random(seed + 3) > .22)) {
          const scale = (8 + v * 17) * growth * species.size * (.74 + random(seed + 60) * .47);
          drawPlant(species, x, y, scale, seed, blooming, phase === "matureStage");
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
    paintCloseup(crop, phase, wet, growth, blooming);
  };
}
