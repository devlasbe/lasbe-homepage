"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── 배경 ──────────────────────────────────
const BG_COLOR = 0x000510;

// ── 렌더링 ────────────────────────────────
const PIXEL_SCALE = 2; // half-resolution: CSS 픽셀 2× 업스케일

// ── 카메라 ────────────────────────────────
const CAMERA_FOV = 60;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 5000;
const CAMERA_Z = 500;

// ── 별 분포 ───────────────────────────────
const STAR_SPREAD_XY = 2000; // ± 1000 범위
const STAR_SPREAD_Z = 500; // ± 250 범위

// ── near 레이어 ───────────────────────────
const NEAR_TOTAL = 150;
const NEAR_DOT_RATIO = 0.8; // dot 비율 (나머지는 cross)

// ── 시차 / LERP ───────────────────────────
const LERP = 0.04;

// ── 자이로스코프 ──────────────────────────
const GYRO_SENSITIVITY = 30; // gamma/beta 정규화 제수

// ── 트윙클 ────────────────────────────────
const TWINKLE_GROUP_SIZE = 100;
const TWINKLE_GROUP_COUNT = 3;
const TWINKLE_SPEED_MIN = 0.8;
const TWINKLE_SPEED_VARIANCE = 1.2; // 최대 속도 = MIN + VARIANCE
const TWINKLE_BRIGHTNESS_MIN = 0.4;
const TWINKLE_BRIGHTNESS_RANGE = 0.6; // 최대 밝기 = MIN + RANGE

// ── 팔레트 ────────────────────────────────
const NEAR_PALETTE = [0xffffff, 0xffffff, 0xc0c0c0, 0x00ffff];
const MID_PALETTE = [0xffffff, 0xc0c0c0, 0xc0c0c0, 0x008080];
const FAR_PALETTE = [0xc0c0c0, 0x008080, 0x008080, 0x000080];

// ── near 카운트 (NEAR_TOTAL · NEAR_DOT_RATIO 파생) ──────────
const NEAR_DOT_COUNT = Math.floor(NEAR_TOTAL * NEAR_DOT_RATIO);
const NEAR_CROSS_COUNT = NEAR_TOTAL - NEAR_DOT_COUNT;

type LayerConfigType = {
  count: number;
  size: number;
  texSize: number;
  cross?: boolean;
  palette: number[];
  parallax: number;
};

// size: render buffer 픽셀 단위 (CSS 픽셀은 PIXEL_SCALE배)
const LAYERS: LayerConfigType[] = [
  { count: 800, size: 2, texSize: 1, palette: FAR_PALETTE, parallax: 3 },
  { count: 400, size: 2, texSize: 2, palette: MID_PALETTE, parallax: 7 },
  { count: NEAR_DOT_COUNT, size: 4, texSize: 4, palette: NEAR_PALETTE, parallax: 15 },
  { count: NEAR_CROSS_COUNT, size: 5, texSize: 5, cross: true, palette: NEAR_PALETTE, parallax: 15 },
];

function createPixelStarTexture(size: number, cross = false): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  if (cross && size >= 5) {
    // 5×5 + 모양:
    // . . X . .
    // . . X . .
    // X X X X X
    // . . X . .
    // . . X . .
    const mid = Math.floor(size / 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, mid, size, 1); // 가로줄
    ctx.fillRect(mid, 0, 1, size); // 세로줄
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

function randomStarPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * STAR_SPREAD_XY;
    positions[i * 3 + 1] = (Math.random() - 0.5) * STAR_SPREAD_XY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * STAR_SPREAD_Z;
  }
  return positions;
}

function randomColorsFromPalette(count: number, palette: number[]): Float32Array {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const hex = palette[Math.floor(Math.random() * palette.length)];
    const color = new THREE.Color(hex);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return colors;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- 렌더러 ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(1);
    renderer.setClearColor(BG_COLOR, 1);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    // half-resolution: CSS 크기의 1/2로 렌더, imageRendering:pixelated로 2× 업스케일
    renderer.setSize(Math.floor(w / PIXEL_SCALE), Math.floor(h / PIXEL_SCALE), false);

    // --- 씬 / 카메라 ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, CAMERA_NEAR, CAMERA_FAR);
    camera.position.z = CAMERA_Z;

    // --- 레이어별 Points 생성 ---
    const pointsObjects: THREE.Points[] = [];
    const materials: THREE.PointsMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    for (const layer of LAYERS) {
      const texture = createPixelStarTexture(layer.texSize, layer.cross);
      textures.push(texture);

      const geometry = new THREE.BufferGeometry();
      const positions = randomStarPositions(layer.count);
      const colors = randomColorsFromPalette(layer.count, layer.palette);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: layer.size,
        map: texture,
        vertexColors: true,
        transparent: true,
        alphaTest: 0.5, // hard edge: alpha < 0.5 완전 투명, ≥ 0.5 완전 불투명
        opacity: 1.0,
        sizeAttenuation: false,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      pointsObjects.push(points);
      materials.push(material);
      geometries.push(geometry);
    }

    // --- Twinkle 그룹 ---
    type TwinkleGroupType = {
      indices: number[];
      phase: number;
      speed: number;
      layerIndex: number;
    };
    const twinkleGroups: TwinkleGroupType[] = [];

    for (let g = 0; g < TWINKLE_GROUP_COUNT; g++) {
      const layerIndex = g % LAYERS.length;
      const count = LAYERS[layerIndex].count;
      const indices: number[] = [];
      for (let k = 0; k < TWINKLE_GROUP_SIZE; k++) {
        indices.push(Math.floor(Math.random() * count));
      }
      twinkleGroups.push({
        indices,
        phase: Math.random() * Math.PI * 2,
        speed: TWINKLE_SPEED_MIN + Math.random() * TWINKLE_SPEED_VARIANCE,
        layerIndex,
      });
    }

    // --- 마우스 / 자이로스코프 ---
    const mouse = { x: 0, y: 0 };
    const currentOffset = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.x = Math.max(-1, Math.min(1, e.gamma / GYRO_SENSITIVITY));
        mouse.y = Math.max(-1, Math.min(1, e.beta / GYRO_SENSITIVITY));
      }
    };
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    // --- 리사이즈 처리 ---
    const handleResize = () => {
      const newW = canvas.clientWidth;
      const newH = canvas.clientHeight;
      if (newW === 0 || newH === 0) return;
      renderer.setSize(Math.floor(newW / PIXEL_SCALE), Math.floor(newH / PIXEL_SCALE), false);
      camera.aspect = newW / newH; // 시각적 비율은 CSS 크기 기준
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // --- 애니메이션 루프 ---
    let animId: number;
    let elapsed = 0;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += delta;

      // LERP 오프셋
      currentOffset.x += (mouse.x - currentOffset.x) * LERP;
      currentOffset.y += (-mouse.y - currentOffset.y) * LERP;

      // 레이어별 시차 적용
      for (let i = 0; i < pointsObjects.length; i++) {
        pointsObjects[i].position.x = currentOffset.x * LAYERS[i].parallax;
        pointsObjects[i].position.y = currentOffset.y * LAYERS[i].parallax;
      }

      // Twinkle: 특정 별의 밝기를 sin으로 진동
      for (const group of twinkleGroups) {
        const opacity = 0.5 + 0.5 * Math.sin(elapsed * group.speed * Math.PI * 2 + group.phase);
        const posAttr = geometries[group.layerIndex].getAttribute("position") as THREE.BufferAttribute;
        const colorAttr = geometries[group.layerIndex].getAttribute("color") as THREE.BufferAttribute;

        for (const idx of group.indices) {
          if (idx < posAttr.count) {
            const brightness = TWINKLE_BRIGHTNESS_MIN + TWINKLE_BRIGHTNESS_RANGE * opacity;
            colorAttr.setXYZ(idx, brightness, brightness, brightness);
          }
        }
        colorAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 정리 ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      resizeObserver.disconnect();

      for (const geo of geometries) geo.dispose();
      for (const mat of materials) mat.dispose();
      for (const tex of textures) tex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}
