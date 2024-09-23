import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";

setDefaultTimeout(1000 * 60 * 2);
let browser: Browser
let bCtx: BrowserContext
let page: Page

Before( async function() {
  browser = await chromium.launch({ headless: false, channel: "chrome", args: ['--start-maximized'] });
  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  page = await bCtx.newPage();
});

After( async function() {
  await page.close();
  await bCtx.close();
  await browser.close();
});

Given('user is on home page', async function () {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
});

When('the user enter the login details, login should be successful', async function () {
  await page.locator("xpath=//a[contains(.,'My account') and @data-toggle]").click();
  await page.locator("xpath=//input[@id='input-email']").fill('test2024@test.com');
  await page.locator("xpath=//input[@id='input-password']").fill('pcfn0123');
  await page.locator("xpath=//input[@value='Login']").click();
});

Then('logout from application', async function () {
  await page.locator("xpath=//a[contains(.,'Edit your account information')]").click();
  await page.locator("xpath=//a[contains(.,'Logout') and @class='list-group-item']").click();
  await page.getByRole("link", { name: 'Continue' }).click();
});