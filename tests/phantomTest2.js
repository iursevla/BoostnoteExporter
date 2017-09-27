
const phantom = require('phantom');

/* (async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });

    const status = await page.open('https://github.com/amir20/phantomjs-node/tree/master/examples');
    const content = await page.property('content');
    console.log(content);

    await instance.exit();
})();
 */

/* var phantom = require('phantom');
var _ph, _page, _outObj;

phantom
  .create()
  .then(ph => {
    _ph = ph;
    return _ph.createPage();
  })
  .then(page => {
    _page = page;
    return _page.open('https://stackoverflow.com/');
  })
  .then(status => {
    console.log(status);
    return _page.property('content');
  })
  .then(content => {
    console.log(content);
    _page.close();
    _ph.exit();
  })
  .catch(e => console.log(e)); */

  (async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
  
    await page.property('viewportSize', { width: 1024, height: 600 });
    const status = await page.open('https://stackoverflow.com/');
    console.log(`Page opened with status [${status}].`);
  
    await page.render('stackoverflow.html');
    console.log(`File created at [./stackoverflow.html]`);
  
    await instance.exit();
  })();