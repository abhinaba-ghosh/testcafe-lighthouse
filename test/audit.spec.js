import { testcafeLighthouseAudit } from '../index';

fixture(`Audit Test`).page('https://angular.io/');

test('user page performance with specific thresholds', async () => {
  await testcafeLighthouseAudit({
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
