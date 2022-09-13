/*
 * Created on Mon Sep 12 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

function getContext(canvas) {
  return canvas.getContext("2d");
}

export function createLinearGradient(canvas, fromColor, toColor) {
  const ctx = getContext(canvas);
  let gradient = ctx.createLinearGradient(0, 0, 150, 0);
  gradient.addColorStop(0, fromColor);
  gradient.addColorStop(1, toColor);
  return gradient;
}

export function drawCircle(
  canvas,
  center,
  radius,
  fillStyle = null,
  strokeStyle = null,
  compositeOperation = null
) {
  const ctx = getContext(canvas);

  ctx.beginPath();
  if (compositeOperation) ctx.globalCompositeOperation = compositeOperation;
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}

export function drawPolygon(
  canvas,
  points,
  fillStyle = null,
  strokeStyle = null,
  compositeOperation = null
) {
  if (typeof points !== "object" || points.length < 2) return;
  const ctx = getContext(canvas);

  ctx.beginPath();

  ctx.moveTo(points[0].x, points[0].y);
  for (let p = 1; p < points.length; ++p) {
    const point = points[p];
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}
