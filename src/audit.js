const { t, ClientFunction } = require('testcafe');
const uaParser = require('ua-parser-js');
const { lighthouse } = require('./task');
const chalk = require('chalk');

const log = console.log;

const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS = ['Chrome', 'Chromium', 'Canary'];

export const testcafeLighthouseAudit = async (auditConfig = {}) => {
  const currentBrowserName = await getBrowserName();
  const currentPageURL = await getCurrentURI();

  if (!checkBrowserIsValid(currentBrowserName)) {
    throw new Error(`${currentBrowserName} is not supported. Skipping...`);
  }

  if (!auditConfig.cdpPort) {
    throw new Error(
      `cdpPort is not set in testcafe lighthouse config. Refer to https://github.com/abhinaba-ghosh/testcafe-lighthouse to have more information and set remote debugging port by yourself :). `
    );
  }

  if (!auditConfig.thresholds) {
    log(
      chalk.yellow.italic(
        'testcafe-lighthouse-audit',
        'It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/abhinaba-ghosh/testcafe-lighthouse to have more information and set thresholds by yourself :).'
      )
    );
  }

  const { errors, results } = await lighthouse({
    url: currentPageURL,
    thresholds: auditConfig.thresholds || defaultThresholds,
    opts: auditConfig.opts,
    config: auditConfig.config,
    htmlReport: auditConfig.htmlReport || false,
    reportDir: auditConfig.reportDir || `${process.cwd()}/lighthouse`,
    reportName:
      auditConfig.reportName || `lighthouse-${new Date().getTime()}.html`,
    cdpPort: auditConfig.cdpPort,
  });

  log('\n');
  log(chalk.blue('-------- testcafe lighthouse audit reports --------'));
  log('\n');

  results.forEach((res) => {
    log(chalk.greenBright(res));
  });

  if (errors.length > 0) {
    const formateErrors = `\n\n${errors.join('\n')}`;

    const label =
      errors.length === 1
        ? `testcafe lighthouse - A threshold is not matching the expectation.${formateErrors}`
        : `testcafe lighthouse - Some thresholds are not matching the expectations.${formateErrors}`;
    throw new Error(label);
  }
};

const getBrowserName = async () => {
  const getUA = ClientFunction(() => navigator.userAgent);
  const ua = await getUA();
  return uaParser(ua).browser.name;
};

const getCurrentURI = async () => {
  const currentPageURL = await t.eval(() => document.documentURI);
  return currentPageURL;
};

const checkBrowserIsValid = (browserName) => {
  const matches = VALID_BROWSERS.filter((pattern) => {
    return new RegExp(pattern).test(browserName);
  });

  if (matches.length > 0) {
    return true;
  }
  return false;
};
