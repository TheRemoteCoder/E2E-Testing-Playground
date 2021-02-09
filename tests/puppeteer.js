const puppeteer = require('puppeteer');

(async () => {

  const url    = 'http://127.0.0.1/tests/e2e-testing/src';
  const config = { 
    headless : false, // Default: true
    slowMo   : 250,
  };

  const browser = await puppeteer.launch(config);
  const page    = await browser.newPage();


  page.on('console', (msg) => console.log('console.log:', msg.text()));

  await page.goto(url);
  await page.evaluate(() => console.log(`URL: ${location.href}`));

  await page.screenshot({ path: 'results/screenshot.png' });
  
  
  /* * /
  debugger;

  await page.evaluate(() => {
    debugger;
  });
  /* */


  await browser.close();

})();

