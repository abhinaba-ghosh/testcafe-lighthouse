import { t, ClientFunction } from 'testcafe';
import uaParser from 'ua-parser-js';
import { lighthouse } from './task';

const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

export const cafeLighthouse = async (thresholds, opts, config) => {
  const getUA = ClientFunction(() => navigator.userAgent);
  const ua = await getUA();
  const browserAlias = uaParser(ua).browser.name;

  if (!VALID_BROWSERS[browserAlias]) {
    throw new Error(`${browserAlias} is not supported. Skipping...`);
  }

  const currentPageURL = await t.eval(() => document.documentURI);

  if (!thresholds) {
    console.log(
      'cypress-audit',
      'It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :).'
    );
  }

  console.log('-------- cy.lighthouse --------');
  console.log('current page url:', currentPageURL);

  const { errors, results } = await lighthouse({
    url: currentPageURL,
    thresholds: thresholds || defaultThresholds,
    opts,
    config,
  });

  console.log(`errors: ${errors}`);
  console.log(`results: ${results}`);
  // .then(({ errors, results }) => {
  //   results.forEach((res) => {
  //     console.log(res);
  //   });
  //   console.log('-----------------------------');

  //   console.log(errors);
  // })
  // .then((errors) => {
  //   if (errors.length > 0) {
  //     const formatedErrors = `\n\n${errors.join('\n')}`;

  //     const label =
  //       errors.length === 1
  //         ? `cy.lighthouse - A threshold has been crossed.${formatedErrors}`
  //         : `cy.lighthouse - Some thresholds have been crossed.${formatedErrors}`;
  //     throw new Error(label);
  //   }
  // });
};
