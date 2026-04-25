const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const viewports = [
    { name: '390x844', width: 390, height: 844 },
    { name: '1280x800', width: 1280, height: 800 },
  ];

  const results = [];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const cluster = document.querySelector('.hero-cluster');
      if (!cluster) {
        return { found: false };
      }

      const cs = getComputedStyle(cluster);
      const r = cluster.getBoundingClientRect();

      const preferredHero =
        cluster.closest('section') ||
        document.querySelector('.hero') ||
        document.querySelector('#hero') ||
        document.querySelector('[class*="hero"]');

      let heroHeight = null;
      let heroSelectorHint = null;
      if (preferredHero) {
        const hr = preferredHero.getBoundingClientRect();
        heroHeight = hr.height;
        if (preferredHero.id) {
          heroSelectorHint = `#${preferredHero.id}`;
        } else if (preferredHero.className && typeof preferredHero.className === 'string') {
          heroSelectorHint = `.${preferredHero.className.trim().replace(/\s+/g, '.')}`;
        } else {
          heroSelectorHint = preferredHero.tagName.toLowerCase();
        }
      }

      return {
        found: true,
        display: cs.display,
        boundingBox: {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          top: r.top,
          right: r.right,
          bottom: r.bottom,
          left: r.left,
        },
        heroSectionHeight: heroHeight,
        heroElement: heroSelectorHint,
      };
    });

    results.push({ viewport: vp, result: data });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
