"use strict";

function mountGlobe(canvas, pins) {
  const context = canvas.getContext("2d");
  if (!context) return { focus() {} };
  const size = canvas.width;
  const center = size / 2;
  const radius = size * 0.441;
  const radians = Math.PI / 180;
  const frame = context.createImageData(size, size);
  const points = [];
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  let texture;
  let latitude = 23 * radians;
  let longitude = 103 * radians;
  let pending = 0;
  let pointer;

  for (let index = 0; index < size * size; index++) {
    const x = (index % size + 0.5 - center) / radius;
    const y = (center - Math.floor(index / size) - 0.5) / radius;
    const depth = 1 - x * x - y * y;
    if (depth <= 0) continue;
    const z = Math.sqrt(depth);
    points.push(index * 4, x, y, z, Math.max(.32, .7 + .31 * z - .23 * x + .17 * y));
  }

  function render() {
    const cos = Math.cos(latitude);
    const sin = Math.sin(latitude);
    const pixels = frame.data;
    for (let i = 0; i < points.length; i += 5) {
      const index = points[i];
      const x = points[i + 1];
      const y = points[i + 2];
      const z = points[i + 3];
      const shade = points[i + 4];
      if (texture) {
        const phi = Math.asin(Math.max(-1, Math.min(1, y * cos + z * sin)));
        const lambda = Math.atan2(x, z * cos - y * sin) + longitude;
        const column = Math.floor(((lambda / (2 * Math.PI) + 2.5) % 1) * texture.width);
        const row = Math.min(texture.height - 1, Math.floor((0.5 - phi / Math.PI) * texture.height));
        const offset = (row * texture.width + column) * 4;
        pixels[index] = texture.data[offset] * shade + 7;
        pixels[index + 1] = texture.data[offset + 1] * shade + 14;
        pixels[index + 2] = texture.data[offset + 2] * shade * .86 + 17;
      } else {
        pixels[index] = 21 * shade;
        pixels[index + 1] = 63 * shade;
        pixels[index + 2] = 70 * shade;
      }
      pixels[index + 3] = 255;
    }
    context.clearRect(0, 0, size, size);
    context.putImageData(frame, 0, 0);
    context.beginPath();
    context.arc(center, center, radius + .2, 0, Math.PI * 2);
    context.strokeStyle = "#b8d7b9a0";
    context.lineWidth = 1.3;
    context.stroke();

    for (const { button, site } of pins) {
      const phi = site.lat * radians;
      const lambda = site.lon * radians - longitude;
      const x = Math.cos(phi) * Math.sin(lambda);
      const y = cos * Math.sin(phi) - sin * Math.cos(phi) * Math.cos(lambda);
      const z = sin * Math.sin(phi) + cos * Math.cos(phi) * Math.cos(lambda);
      button.hidden = z < .1;
      button.style.left = `${(center + radius * x) / size * 100}%`;
      button.style.top = `${(center - radius * y) / size * 100}%`;
    }
  }

  function focus(site) {
    cancelAnimationFrame(pending);
    const toLat = site.lat * radians;
    const toLon = site.lon * radians;
    if (still.matches) {
      latitude = toLat;
      longitude = toLon;
      render();
      return;
    }
    const startLat = latitude;
    const startLon = longitude;
    const delta = Math.atan2(Math.sin(toLon - startLon), Math.cos(toLon - startLon));
    const start = performance.now();
    function animate(now) {
      const p = Math.min(1, (now - start) / 530);
      const eased = 1 - (1 - p) ** 3;
      latitude = startLat + (toLat - startLat) * eased;
      longitude = startLon + delta * eased;
      render();
      if (p < 1) pending = requestAnimationFrame(animate);
    }
    pending = requestAnimationFrame(animate);
  }

  canvas.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0) return;
    cancelAnimationFrame(pending);
    canvas.setPointerCapture(event.pointerId);
    pointer = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointermove", event => {
    if (!pointer || !event.isPrimary) return;
    const unit = Math.PI / canvas.getBoundingClientRect().width;
    longitude -= (event.clientX - pointer.x) * unit;
    longitude = Math.atan2(Math.sin(longitude), Math.cos(longitude));
    latitude = Math.max(-1.35, Math.min(1.35, latitude + (event.clientY - pointer.y) * unit));
    pointer = { x: event.clientX, y: event.clientY };
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(render);
  });
  canvas.addEventListener("lostpointercapture", () => { pointer = null; });

  render();
  const image = new Image();
  image.addEventListener("load", () => {
    const layer = document.createElement("canvas");
    layer.width = image.naturalWidth;
    layer.height = image.naturalHeight;
    const drawing = layer.getContext("2d");
    drawing.drawImage(image, 0, 0);
    texture = drawing.getImageData(0, 0, layer.width, layer.height);
    render();
  });
  image.src = earthImage;
  return { focus };
}
