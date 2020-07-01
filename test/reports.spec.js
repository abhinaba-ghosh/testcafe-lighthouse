import { testcafeAudit } from '../index';

const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

fixture(`Reports test`).page('https://angular.io/');

test('user validates different reports', async (t) => {
  const reportDirectory = `${process.cwd()}/lighthouse`;
  const reportFilename = 'reports-test';
  const reportFileTypes = ['html', 'json'];
  reportFileTypes.forEach((type) => {
    var fileToDelete = `${reportDirectory}/${reportFilename}.${type}`;
    if (fs.existsSync(fileToDelete)) {
      fs.unlinkSync(fileToDelete);
    }
  });

  const currentURL = await t.eval(() => document.documentURI);
  console.log('url:', currentURL);

  await testcafeAudit({
    url: currentURL,
    thresholds: {
      performance: 50,
    },
    cdpPort: 9222,
    reports: {
      formats: {
        json: true,
        html: true,
        csv: false,
      },
      name: reportFilename,
      directory: reportDirectory,
    },
  });

  reportFileTypes.forEach((type) => {
    reportFileTypes.forEach((type) => {
      expect(
        fs.existsSync(`${reportDirectory}/${reportFilename}.${type}`),
        `${type} Report file does not exist.`
      ).to.be.true;
    });
  });
});
