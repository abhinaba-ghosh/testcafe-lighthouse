export interface testCafeLighthouseConfig {
  cdpPort: number;
  thresholds?: any;
  opts?: any;
  config?: any;
  htmlReport?: boolean;
  reportDir?: string;
  reportName?: string;
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
export function testcafeLighthouseAudit(
  testcafeLHConfiguration: testCafeLighthouseConfig
): Promise<void>;
