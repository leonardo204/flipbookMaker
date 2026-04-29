import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://lsx333.axshare.com/?g=14&id=release_history';
const OUTPUT = 'raw/sitemap.json';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  console.log('Waiting for $axure.document.sitemap...');
  await page.waitForFunction(() => window.$axure?.document?.sitemap, { timeout: 30000 });

  const axureFields = await page.evaluate(() => {
    const doc = window.$axure?.document;
    if (!doc) return null;
    return {
      topLevelKeys: Object.keys(doc),
      sitemapKeys: doc.sitemap ? Object.keys(doc.sitemap) : [],
      rootNodesType: doc.sitemap?.rootNodes ? typeof doc.sitemap.rootNodes : 'undefined',
      rootNodesLength: doc.sitemap?.rootNodes?.length ?? 0,
      firstNodeKeys: doc.sitemap?.rootNodes?.[0] ? Object.keys(doc.sitemap.rootNodes[0]) : [],
    };
  });
  console.log('$axure.document fields:', JSON.stringify(axureFields, null, 2));

  const sitemap = await page.evaluate(() => {
    function serialize(node) {
      return {
        id: node.id,
        pageName: node.pageName,
        type: node.type,
        url: node.url,
        children: (node.children || []).map(serialize),
      };
    }
    return window.$axure.document.sitemap.rootNodes.map(serialize);
  });

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(sitemap, null, 2));

  function countNodes(nodes) {
    return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children || []), 0);
  }
  console.log(`Sitemap saved to ${OUTPUT}`);
  console.log(`Total nodes: ${countNodes(sitemap)}`);

  await browser.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
