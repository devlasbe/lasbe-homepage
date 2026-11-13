import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const [outDir, baseLabel, newLabel] = process.argv.slice(2);
if (!outDir || !baseLabel || !newLabel) {
  console.error('Usage: node scripts/visual-check/compare.mjs <outDir> <baseLabel> <newLabel>');
  process.exit(1);
}

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  try {
    const require = createRequire(import.meta.url);
    const nextRequire = createRequire(require.resolve('next/package.json'));
    const sharpUrl = pathToFileURL(nextRequire.resolve('sharp')).href;
    sharp = (await import(sharpUrl)).default;
  } catch {
    sharp = null;
  }
}

async function listCaptures(label) {
  const root = path.join(outDir, label);
  const viewports = await readdir(root, { withFileTypes: true });
  const captures = new Map();
  for (const viewport of viewports.filter((entry) => entry.isDirectory())) {
    const files = await readdir(path.join(root, viewport.name));
    for (const file of files.filter((name) => name.endsWith('.json'))) {
      const slug = file.slice(0, -5);
      captures.set(`${viewport.name}/${slug}`, { viewport: viewport.name, slug });
    }
  }
  return captures;
}

function difference(first, second) {
  const counts = new Map();
  for (const line of second) counts.set(line, (counts.get(line) || 0) + 1);
  return first.filter((line) => {
    const count = counts.get(line) || 0;
    if (!count) return true;
    counts.set(line, count - 1);
    return false;
  });
}

async function comparePixels(viewport, slug) {
  if (!sharp) return 'skipped (sharp unavailable)';
  const basePath = path.join(outDir, baseLabel, viewport, `${slug}.png`);
  const newPath = path.join(outDir, newLabel, viewport, `${slug}.png`);
  try {
    const base = await sharp(basePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const next = await sharp(newPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    if (base.info.width !== next.info.width || base.info.height !== next.info.height) {
      return `skipped (dimensions differ: ${base.info.width}×${base.info.height} vs ${next.info.width}×${next.info.height})`;
    }
    const pixels = base.info.width * base.info.height;
    const diff = Buffer.from(next.data);
    let changed = 0;
    for (let index = 0; index < pixels; index += 1) {
      const offset = index * 4;
      const different = [0, 1, 2, 3].some((channel) => Math.abs(base.data[offset + channel] - next.data[offset + channel]) > 32);
      if (different) {
        changed += 1;
        diff[offset] = 255;
        diff[offset + 1] = 0;
        diff[offset + 2] = 0;
        diff[offset + 3] = 255;
      }
    }
    const diffDirectory = path.join(outDir, 'diff', viewport);
    await mkdir(diffDirectory, { recursive: true });
    await sharp(diff, { raw: { width: base.info.width, height: base.info.height, channels: 4 } })
      .png().toFile(path.join(diffDirectory, `${slug}.png`));
    return `${(changed / pixels * 100).toFixed(2)}%`;
  } catch (error) {
    return `skipped (${error.message})`;
  }
}

function formatList(items) {
  if (!items.length) return '- 없음';
  return items.map((item) => `- ${typeof item === 'string' ? item : JSON.stringify(item)}`).join('\n');
}

const baseCaptures = await listCaptures(baseLabel);
const newCaptures = await listCaptures(newLabel);
const keys = [...new Set([...baseCaptures.keys(), ...newCaptures.keys()])].sort();
const rows = [];
const details = [];
for (const key of keys) {
  const capture = baseCaptures.get(key) || newCaptures.get(key);
  const { viewport, slug } = capture;
  if (!baseCaptures.has(key) || !newCaptures.has(key)) {
    const missing = baseCaptures.has(key) ? newLabel : baseLabel;
    rows.push(`| ${viewport} | ${slug} | — | — | — | — | — | missing ${missing} |`);
    details.push(`## ${key}\n\n캡처 누락: ${missing}`);
    continue;
  }
  const base = JSON.parse(await readFile(path.join(outDir, baseLabel, viewport, `${slug}.json`), 'utf8'));
  const next = JSON.parse(await readFile(path.join(outDir, newLabel, viewport, `${slug}.json`), 'utf8'));
  const onlyBase = difference(base.dom, next.dom);
  const onlyNew = difference(next.dom, base.dom);
  const pixelDiff = await comparePixels(viewport, slug);
  rows.push(`| ${viewport} | ${slug} | ${onlyBase.length} | ${onlyNew.length} | ${next.console.length} | ${next.badResponses.length} | ${next.brokenImages.length} | ${pixelDiff} |`);
  details.push(`## ${key}\n\n### DOM only ${baseLabel} (최대 5개)\n\n${formatList(onlyBase.slice(0, 5))}\n\n### DOM only ${newLabel} (최대 5개)\n\n${formatList(onlyNew.slice(0, 5))}\n\n### Console\n\n${formatList(next.console)}\n\n### Page errors\n\n${formatList(next.pageErrors)}\n\n### Bad responses\n\n${formatList(next.badResponses)}\n\n### Broken images\n\n${formatList(next.brokenImages)}\n\nPixel diff: ${pixelDiff}`);
}
const report = [`# Visual check: ${baseLabel} vs ${newLabel}`, '', '| viewport | slug | domOnlyBase | domOnlyNew | console | badResp | broken | pixelDiff% |', '| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |', ...rows, '', ...details.flatMap((detail) => [detail, ''])].join('\n');
const reportPath = path.join(outDir, `report-${baseLabel}-vs-${newLabel}.md`);
await writeFile(reportPath, report);
console.log(report);
console.log(`Report: ${reportPath}`);
