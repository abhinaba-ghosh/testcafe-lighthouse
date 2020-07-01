import { testcafeAudit } from '../index';

fixture(`Audit Test`).page('https://angular.io/');

test('user audits webpage with specific thresholds', async (t) => {
  const currentURL = await t.eval(() => document.documentURI);
  console.log('url:', currentURL);

  await testcafeAudit({
    url: currentURL,
    thresholds: {
      performance: 50,
      accessibility: 50,
      'best-practices': 50,
      seo: 50,
      pwa: 50,
    },
    cdpPort: 9222,
    htmlReport: true,
  });
});
