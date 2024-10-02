import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browserManager/manager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/logger/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before( async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
        viewport: null,
        javaScriptEnabled: true
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer | undefined; // Initialize img as undefined
    const path = `./test-results/trace/${pickle.id}.zip`;

    if (result?.status === Status.FAILED) {
        img = await fixture.page.screenshot({
            path: `./test-results/screenshots/${pickle.name}.png`,
            type: "png"
        });
    }

    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();

    if (result?.status === Status.PASSED) {
        // Only attach img if it was assigned (i.e., if the test failed)
        if (img) {
            this.attach(img, "image/png");
        }

        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
});

AfterAll(async function () {
    await browser.close();
})
