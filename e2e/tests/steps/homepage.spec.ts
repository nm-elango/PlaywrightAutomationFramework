import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(1000 * 60 * 2);

Given('user is on home page', async function () {
  await fixture.page.goto('https://ecommerce-playground.lambdatest.io/');
});

When('the user enter the login details, login should be successful', async function () {
  await fixture.page.locator("xpath=//a[contains(.,'My account') and @data-toggle]").click();
  await fixture.page.locator("xpath=//input[@id='input-email']").fill('test2024@test.com');
  await fixture.page.locator("xpath=//input[@id='input-password']").fill('pcfn0123');
  await fixture.page.locator("xpath=//input[@value='Login']").click();
});

Then('logout from application', async function () {
  await fixture.page.locator("xpath=//a[contains(.,'Edit your account information')]").click();
  await fixture.page.locator("xpath=//a[contains(.,'Logout') and @class='list-group-item']").click();
  await fixture.page.getByRole("link", { name: 'Continue' }).click();
  await expect(1).toBe(2);
});