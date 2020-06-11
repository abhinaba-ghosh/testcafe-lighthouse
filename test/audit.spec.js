import { testcafeLighthouseAudit } from '../index';

fixture(`Audit Test`).page('https://angular.io/');

test('user audits webpage with specific thresholds', async (t) => {
  const currentURL = await t.eval(() => document.documentURI);
  console.log('url:', currentURL);

  await testcafeLighthouseAudit({
    url: currentURL,
    cdpPort: 9222,
  });
});
