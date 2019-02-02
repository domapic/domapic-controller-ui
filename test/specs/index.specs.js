const puppeteer = require("puppeteer");
const test = require("narval");

const config = require("../config");

test.describe("Home page", function() {
  this.timeout(10000);
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

  test.it("should render dashboard", async () => {
    const helloContainer = "body h2";
    await page.waitForSelector(helloContainer);
    const elementText = await page.$eval(helloContainer, element => element.textContent);
    return test.expect(elementText).to.contain("Dashboard");
  });
});
