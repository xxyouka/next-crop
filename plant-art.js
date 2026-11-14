"use strict";

function makePlantArt() {
  const species = {
    potato: { habit: "potato", size: 1.18, leaves: ["#263e26", "#4b7337", "#83a251", "#acc47c"] },
    vetch: { habit: "vetch", size: 1.10, leaves: ["#283f32", "#4b7043", "#80a469", "#b2c796"], flowers: ["#a34b7f", "#e287ba", "#ffe1ef"] },
    hairy: { habit: "vetch", size: 1.17, leaves: ["#273e38", "#52735b", "#80a67b", "#abbfa0"], flowers: ["#5c4c9a", "#9e85d0", "#d5c3ef"] },
    maize: { habit: "maize", size: 1.84, leaves: ["#2f4929", "#56783a", "#8ca84d", "#bdc77a"] },
    mung: { habit: "mung", size: 1.04, leaves: ["#253f2c", "#4c7744", "#83a854", "#b1c780"] },
    mustard: { habit: "mustard", size: 1.34, leaves: ["#30462e", "#597847", "#8ba766", "#b8c78a"] },
    rye: { habit: "rye", size: 1.4, leaves: ["#2d4631", "#5e7b46", "#8eaa65", "#b9c685"] },
    rice: { habit: "rice", size: 1.45, leaves: ["#315839", "#5a8844", "#9bb953", "#c6d37d"] },
  };
  const sprites = new Map();
  const random = seed => {
    const value = Math.sin(seed * 157.73 + 15.43) * 43758.5453;
    return value - Math.floor(value);
  };

  function stroke(ctx, color, width, coordinates) {
    ctx.beginPath();
    ctx.moveTo(coordinates[0], coordinates[1]);
    if (coordinates.length === 4) ctx.lineTo(...coordinates.slice(2));
    else ctx.quadraticCurveTo(...coordinates.slice(2));
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function oval(ctx, x, y, rx, ry, angle, fill) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function leaf(ctx, x, y, tx, ty, width, palette, detailed, blade = false) {
    const dx = tx - x;
    const dy = ty - y;
    const length = Math.hypot(dx, dy);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.atan2(dy, dx));
    const shade = ctx.createLinearGradient(length * .16, -width * .7, length * .51, width);
    shade.addColorStop(0, palette[2]);
    shade.addColorStop(.43, palette[1]);
    shade.addColorStop(1, palette[0]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    if (blade) {
      ctx.bezierCurveTo(length * .3, -width * 2.3, length * .76, -width * 1.3, length, 0);
      ctx.bezierCurveTo(length * .67, -width * .63, length * .3, width * .42, 0, 0);
    } else {
      ctx.bezierCurveTo(length * .23, -width, length * .61, -width * .98, length, 0);
      ctx.bezierCurveTo(length * .59, width * .85, length * .29, width, 0, 0);
    }
    ctx.fillStyle = shade;
    ctx.fill();
    if (detailed) {
      stroke(ctx, palette[3] + "aa", .8, [length * .05, 0, length * .56, -width * .12, length * .93, 0]);
      if (!blade && length > 11) {
        for (let i = 1; i <= 3; i++) {
          const v = length * (.18 + i * .145);
          stroke(ctx, palette[3] + "66", .5, [v, 0, v + length * .17, -width * .48]);
          stroke(ctx, palette[3] + "55", .5, [v, 0, v + length * .14, width * .39]);
        }
      }
    }
    ctx.restore();
  }

  function stem(ctx, palette, x, y, tx, ty, thickness = 1.9) {
    stroke(ctx, palette[0], thickness + .65, [x, y, x * .7 + tx * .3, ty + (y - ty) * .43, tx, ty]);
    stroke(ctx, palette[2], thickness * .46, [x - .45, y - .6, x * .7 + tx * .3 - .5, ty + (y - ty) * .43, tx - .3, ty]);
  }

  function pinnate(ctx, start, end, pairs, breadth, palette, detailed) {
    const [x, y] = start;
    const [tx, ty] = end;
    const dx = tx - x;
    const dy = ty - y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    stroke(ctx, palette[2], 1, [x, y, tx, ty]);
    for (let i = 0; i < pairs; i++) {
      const f = .25 + i * (.59 / pairs);
      const lx = x + dx * f;
      const ly = y + dy * f;
      const span = breadth * (1 - .47 * i / pairs);
      for (const side of [-1, 1]) {
        leaf(ctx, lx, ly, lx + dx * .16 + nx * span * side, ly + dy * .16 + ny * span * side, span * .63, palette, detailed);
      }
    }
    leaf(ctx, x + dx * .73, y + dy * .73, tx + dx * .11, ty + dy * .11, breadth * .59, palette, detailed);
  }

  function starFlower(ctx, x, y, radius, count, colors, twist) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(twist);
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const a = i * Math.PI * 2 / count;
      const next = a + Math.PI / count;
      const px = Math.cos(a) * radius;
      const py = Math.sin(a) * radius * .86;
      const vx = Math.cos(next) * radius * .46;
      const vy = Math.sin(next) * radius * .41;
      if (!i) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    const shade = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    shade.addColorStop(0, colors[0]);
    shade.addColorStop(.64, colors[1]);
    shade.addColorStop(1, colors[2]);
    ctx.fillStyle = shade;
    ctx.fill();
    oval(ctx, .3, -.3, radius * .25, radius * .2, -.55, "#e6af3b");
    ctx.restore();
  }

  function peaFlower(ctx, x, y, size, angle, colors) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const tint = ctx.createLinearGradient(-size, -size, size, size);
    tint.addColorStop(0, colors[2]);
    tint.addColorStop(.55, colors[1]);
    tint.addColorStop(1, colors[0]);
    oval(ctx, 0, -size * .29, size * .62, size * .94, -.3, tint);
    oval(ctx, size * .16, size * .26, size * .44, size * .73, .22, colors[0]);
    oval(ctx, size * .02, size * .12, size * .28, size * .57, .1, colors[2]);
    ctx.restore();
  }

  function potato(ctx, crop, stage, seed, detailed) {
    const mature = stage === "mature";
    const palette = crop.leaves;
    const old = ["#453d22", "#726b3e", "#a99b53", "#c8b874"];
    const branches = stage === "seedling" ? 3 : 6;
    for (let i = 0; i < branches; i++) {
      const side = i % 2 ? -1 : 1;
      const lift = i < 2 ? 26 : 33 + random(seed + i * 8) * 20;
      const x = side * (i < 4 ? 22 + random(seed + i * 9) * 12 : 8 + random(seed + i * 9) * 16);
      const y = -lift;
      const tone = mature && i < 3 ? old : palette;
      const petioleX = x * .31;
      const petioleY = y * .76 + 8;
      stem(ctx, tone, 0, 0, petioleX, petioleY, 2.5);
      pinnate(ctx, [petioleX, petioleY], [x, y], stage === "seedling" ? 2 : 3, i < 2 ? 13 : 10, tone, detailed);
      if (stage !== "seedling") {
        leaf(ctx, x * .69, petioleY + (y - petioleY) * .51, x * 1.23, y - 2, 8.9, tone, detailed);
      }
    }
    if (stage === "bloom") {
      const x = -7 + random(seed + 31) * 13;
      stem(ctx, palette, 0, -24, x, -64);
      for (let i = 0; i < 5; i++) {
        const fx = x - 16 + i * 8;
        const fy = -66 - random(seed + 44 + i) * 10;
        stem(ctx, palette, x, -58, fx, fy, 1);
        starFlower(ctx, fx, fy, 4.5 + random(seed + i) * 2, 5, ["#89669a", "#dfcce5", "#f8eff2"], i * .71);
      }
    }
  }

  function vetch(ctx, crop, stage, seed, detailed) {
    const palette = crop.leaves;
    const stems = stage === "seedling" ? 3 : 6;
    for (let i = 0; i < stems; i++) {
      const side = i % 2 ? -1 : 1;
      const x = side * (13 + random(seed + i * 9) * 24);
      const y = -21 - random(seed + i * 8) * 29;
      stem(ctx, palette, 0, 0, x * .55, y * .75, 1.3);
      pinnate(ctx, [x * .42, y * .58], [x, y], stage === "seedling" ? 2 : 4, 5.5, palette, detailed);
    }
    if (stage !== "bloom" && stage !== "full") return;
    const hairy = crop === species.hairy;
    const heads = stage === "full" ? 4 : 2 + Math.round(random(seed + 13));
    for (let i = 0; i < heads; i++) {
      const x = -25 + i * (49 / (heads - 1)) + random(seed + i * 3) * 6;
      const y = -43 - random(seed + i * 5) * 20;
      stem(ctx, palette, x * .22, -10, x, y, 1.25);
      for (let j = 0; j < 7; j++) {
        const angle = j * Math.PI * 2 / 7;
        const fx = hairy ? x + (j % 2 ? -3 : 3) : x + Math.cos(angle) * (8 + i % 2);
        const fy = hairy ? y - j * 3.1 : y + Math.sin(angle) * 3.2 - 2;
        stroke(ctx, palette[0], .75, [x, hairy ? fy + 2 : y + 3, fx, fy]);
        peaFlower(ctx, fx, fy - 2.2, hairy ? 3.35 : 4.1, hairy ? (j % 2 ? .6 : -.6) : Math.cos(angle) * .72, crop.flowers);
      }
    }
  }

  function mung(ctx, crop, stage, seed, detailed) {
    const palette = crop.leaves;
    const leaves = stage === "seedling" ? 2 : 5;
    stem(ctx, palette, 0, 0, 2, -55);
    for (let i = 0; i < leaves; i++) {
      const x = (i % 2 ? -1 : 1) * (17 + random(seed + i) * 10);
      const y = -16 - 8 * i;
      stem(ctx, palette, 1, y + 8, x, y, 1.1);
      for (const offset of [-1, 0, 1]) {
        leaf(ctx, x, y, x + offset * 14 + x * .14, y - (offset ? 8 : 17), offset ? 5 : 7.8, palette, detailed);
      }
      if (stage === "bloom" && i > 1) {
        peaFlower(ctx, x * .72, y - 4, 3.9, .2, ["#a68a36", "#e8c85b", "#f9e39e"]);
      }
      if (stage === "mature" && i > 0) {
        stroke(ctx, "#4d392b", 3.4, [x * .6, y - 1, x + 4, y + 7, x + 2, y + 23]);
        stroke(ctx, "#927254", .8, [x * .6 + 1, y, x + 5, y + 7, x + 3, y + 22]);
      }
    }
  }

  function mustard(ctx, crop, stage, seed, detailed) {
    const palette = crop.leaves;
    const flowering = stage === "bloom";
    stem(ctx, palette, 0, 0, 2, stage === "seedling" ? -33 : -66, 2.5);
    for (let i = 0; i < 6; i++) {
      const side = i % 2 ? -1 : 1;
      const y = -5 - i * (stage === "seedling" ? 4 : 7);
      const x = side * (18 + random(seed + i) * 16 - i * 2);
      leaf(ctx, 0, y, x, y - 12, i < 2 ? 8 : 5.5, palette, detailed);
    }
    if (!flowering && stage !== "mature") return;
    for (let i = 0; i < 8; i++) {
      const x = (i % 2 ? -1 : 1) * (5 + random(seed + i) * 10);
      const y = -45 - i * 4.6;
      stem(ctx, palette, 1, y + 7, x, y, 1);
      if (flowering) {
        for (let j = 0; j < 4; j++) {
          const a = j * Math.PI / 2 + i * .42;
          oval(ctx, x + Math.cos(a) * 2.3, y + Math.sin(a) * 2.3, 2.55, 1.74, a, j % 2 ? "#f2c337" : "#ffdf65");
        }
        oval(ctx, x, y, .9, .8, 0, "#b0832a");
      } else {
        stroke(ctx, "#a19852", 1.85, [x, y, x * 1.38, y - 6, x * 1.54, y - 12]);
      }
    }
  }

  function grass(ctx, crop, stage, seed, detailed) {
    const palette = crop.leaves;
    const maize = crop.habit === "maize";
    const rye = crop.habit === "rye";
    const seedling = stage === "seedling";
    if (maize && !seedling) {
      const upper = -73;
      stem(ctx, palette, 0, 0, 4, upper, 4);
      for (let i = 0; i < 7; i++) {
        const y = -9 - i * 8.7;
        const side = i % 2 ? -1 : 1;
        const span = 22 + random(seed + i) * 11;
        leaf(ctx, i * .5, y, side * span, y - 16 + (i < 2 ? 10 : 0), 4.9 - i * .22, palette, detailed, true);
      }
      if (stage === "bloom" || stage === "mature") {
        const gold = stage === "mature" ? "#b59a5d" : "#d1bc7c";
        stroke(ctx, gold, 1.85, [4, upper + 2, 5, upper - 16]);
        for (let i = -3; i <= 3; i++) {
          stroke(ctx, gold, 1.2, [4, upper + 1, i * 4.3 + 4, upper - 4, i * 4.3 + 5, upper - 10 - (3 - Math.abs(i)) * 2]);
        }
        oval(ctx, -5, -42, 4.8, 12, -.43, palette[2]);
        leaf(ctx, -2, -30, -11, -53, 3.7, palette, detailed, true);
        stroke(ctx, "#ad733a", 1.25, [-11, -50, -16, -50, -14, -55]);
      }
      return;
    }
    const blades = maize ? 4 : seedling ? 5 : 9;
    for (let i = 0; i < blades; i++) {
      const side = i % 2 ? -1 : 1;
      const x = side * (5 + random(seed + i * 9) * (rye ? 25 : 27));
      const y = -27 - random(seed + i * 3) * 37;
      leaf(ctx, (i - blades / 2) * 1.3, 0, x, y, maize ? 4.5 : 1.65 + random(seed + i) * 1.6, palette, detailed, true);
    }
    if (rye && (stage === "bloom" || stage === "mature")) {
      const grain = stage === "mature" ? "#d4b579" : "#b6bb72";
      for (let i = 0; i < 5; i++) {
        const x = -19 + i * 9.5;
        const y = -59 - random(seed + i) * 16;
        stem(ctx, palette, 0, 0, x, y, 1.5);
        for (let j = 0; j < 7; j++) {
          const side = j % 2 ? -1 : 1;
          const gx = x + side * 1.8;
          const gy = y - j * 2.55;
          oval(ctx, gx, gy, 1.38, 2.8, side * .32, grain);
          stroke(ctx, grain, .55, [gx, gy - 1, gx + side * 2.4, gy - 7.3]);
        }
      }
    }
  }

  const drawings = { potato, vetch, mung, mustard, maize: grass, rye: grass, rice: grass };

  function sprite(id, stage, variation) {
    const key = `${id}:${stage}:${variation}`;
    const cached = sprites.get(key);
    if (cached) {
      sprites.delete(key);
      sprites.set(key, cached);
      return cached;
    }
    const image = document.createElement("canvas");
    image.width = 176;
    image.height = 230;
    const ctx = image.getContext("2d");
    ctx.scale(2, 2);
    ctx.translate(44, 101);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const crop = species[id];
    drawings[crop.habit](ctx, crop, stage, variation * 61 + 11, true);
    if (sprites.size >= 96) sprites.delete(sprites.keys().next().value);
    sprites.set(key, image);
    return image;
  }

  function draw(ctx, id, stage, x, y, scale, seed) {
    const image = sprite(id, stage, Math.floor(random(seed + 73) * 6));
    ctx.drawImage(image, x - 44 * scale, y - 101 * scale, 88 * scale, 115 * scale);
  }

  return { draw, species };
}
