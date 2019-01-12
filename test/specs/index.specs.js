const puppeteer = require("puppeteer");
const test = require("narval");

const config = require("../config");

test.describe("Home page", function() {
  let browser;
  let page;

  test.before(function() {
    return puppeteer
      .launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      })
      .then(br => {
        browser = br;
        return browser.newPage().then(pg => {
          page = pg;
          return page.goto(config.urls.application);
        });
      });
  });

  test.after(() => {
    return browser.close();
  });

  test.it("should render hello world", async () => {
    const helloContainer = ".app h1";
    await page.waitForSelector(helloContainer);
    const elementText = await page.$eval(helloContainer, element => element.textContent);
    return test.expect(elementText).to.contain("Hello World!");
  });
});
