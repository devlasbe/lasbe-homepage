await (async () => {
  const { origin, label, outDir, viewport, paths } = globalThis.VC;
  const sizes = { desktop: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } };
  if (!origin || !label || !outDir || !path.isAbsolute(outDir) || !sizes[viewport] || !Array.isArray(paths)) {
    throw new Error('VC에 origin, label, 절대 경로 outDir, viewport, paths를 설정하세요.');
  }

  const directory = path.join(outDir, label, viewport);
  await fs.mkdir(directory, { recursive: true });
  const page = await openTab('about:blank');
  try {
    await page.setViewportSize(sizes[viewport]);
    await page._sendToTarget('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        window.__visualPageErrors = [];
        window.addEventListener('error', (event) => {
          if (event.message) window.__visualPageErrors.push(event.message);
        });
        window.addEventListener('unhandledrejection', (event) => {
          const message = event.reason?.message || String(event.reason);
          window.__visualPageErrors.push(message);
        });
      `,
    });

    for (const route of paths) {
      const url = new URL(route, origin).href;
      const hostname = new URL(url).hostname;
      const routeSlug = new URL(url).pathname.replace(/\//g, '') || 'home';
      const slug = `${hostname === 'portfolio.lasbe.kr' ? 'portfolio-' : ''}${routeSlug}`;
      await page.console.clear();
      await page.goto(url, { waitUntil: 'interactive' });
      const initialSnapshot = await snapshot(page, { interactive: true });
      console.log(initialSnapshot.tree);
      await sleep(6000);
      const settledSnapshot = await snapshot(page, { interactive: true });
      console.log(settledSnapshot.diff);
      await page.screenshot({ path: path.join(directory, `${slug}.png`) });
      const domSnapshot = await page.evaluate(() => {
        const dom = Array.from(document.body.querySelectorAll('*')).flatMap((element) => {
          if (['CANVAS', 'SCRIPT', 'STYLE'].includes(element.tagName)) return [];
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (!rect.width || !rect.height || style.display === 'none' || style.visibility === 'hidden') return [];
          const directText = Array.from(element.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent || '')
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\d{1,2}:\d{2}/g, 'HH:MM')
            .slice(0, 80);
          return [[element.tagName, rect.x, rect.y, rect.width, rect.height, directText, style.fontSize, style.color, style.backgroundColor].join('|')];
        });
        const brokenImages = Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.src);
        const resources = performance.getEntriesByType('resource').map((entry) => ({
          url: entry.name,
          status: entry.responseStatus || 0,
          initiatorType: entry.initiatorType,
        }));
        if (!Array.isArray(window.__visualPageErrors)) throw new Error('Page error instrumentation missing');
        return { dom, brokenImages, resources, pageErrors: window.__visualPageErrors };
      });
      const consoleEntries = await page.console.logs();
      const consoleErrors = consoleEntries.filter((entry) => ['error', 'warn', 'warning'].includes(entry.level));
      const responses = domSnapshot.resources;
      if (!responses.length) throw new Error('No resource responses captured');
      const badResponses = responses.filter((response) => {
        return response.status !== 0 && response.status >= 400;
      });
      const result = {
        url,
        viewport,
        capturedAt: new Date().toISOString(),
        dom: domSnapshot.dom,
        console: consoleErrors,
        pageErrors: domSnapshot.pageErrors,
        responses,
        badResponses,
        brokenImages: domSnapshot.brokenImages,
        method: 'performance + Aside page.console.logs + document-start error listeners',
      };
      await fs.writeFile(path.join(directory, `${slug}.json`), JSON.stringify(result, null, 2));
      console.log(`${slug}: dom=${result.dom.length} console=${result.console.length} pageErrors=${result.pageErrors.length} badResponses=${badResponses.length} brokenImages=${result.brokenImages.length}`);
    }
  } finally {
    await closeTab(page);
  }
})();
