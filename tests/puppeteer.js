const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');


(async () => {
  const url    = 'http://localhost:8080';
  const config = {
    headless : false, // Default: true
    slowMo   : 250,
  };

  const browser = await puppeteer.launch(config);
  const page    = await browser.newPage();


  // Enable JS + CSS coverage
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);


  function onPageRequest(interceptedRequest) {
    console.log('> Request:', interceptedRequest.url());
  }

  page.on('request', onPageRequest);
  page.on('console', (msg) => console.log('> Console:', msg.text()));


  await page.goto(url);
  await page.evaluate(() => console.log(`URL: ${location.href}`));


  // Type like a user
  await page.type('#input', 'ABC', {delay: 50});

  const submitButton = await page.$('#submit');
  await submitButton.focus(); // Just for demo
  await submitButton.click();


  // Use with 'ndb'
  // debugger;
  /* * /
  await page.evaluate(() => {
    debugger;
  });
  /* */

  await page.screenshot({ path: 'results/screenshot.png' });


  // Disable JS + CSS coverage
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  pti.write([...jsCoverage, ...cssCoverage], {
    includeHostname : false,
    storagePath     : '.nyc_output',
  });


  await browser.close();

})();
