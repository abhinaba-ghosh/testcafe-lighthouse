export interface testCafeLighthouseConfig {
  url: string;
  cdpPort: number;
  thresholds?: any;
  opts?: any;
  config?: any;
  reports?: {};
}

/**
 * @description
 * Performs lighthouse audit based on the testcafe lighthouse configuration
 *
 * @example
 *
 * import { testcafeLighthouseAudit } from 'testcafe-lighthouse';
 *
 * test('user page performance with specific thresholds', async () => {
 *      await testcafeLighthouseAudit({
 *              thresholds: {
 *                  performance: 50,
 *                  accessibility: 50,
 *                  'best-practices': 50,
 *                  seo: 50,
 *                  pwa: 50,
 *               },
 *              cdpPort: 9222
 *      });
 * });
 *
 */
export function testcafeAudit(
  testcafeLHConfiguration: testCafeLighthouseConfig
): Promise<void>;
