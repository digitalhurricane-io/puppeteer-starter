const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth())

const chromeLocation = require('chrome-location');

export class Task {
    page: any;
    browser: any;
    headless: boolean = true;
    // width and height of browser window
    width: number;
    height: number;

    constructor() {}

    async launchBrowser() {
        try {
            this.browser = await puppeteer.launch(this.getBrowserOptions());

        } catch (e) {
            console.error(e);
        }

        try {
            this.page = await this.browser.newPage();
        } catch (e) {
            console.error(e);
        }
    }

    private getBrowserOptions() {
        console.log('Setting browser options')
        let args = [
            '--mute-audio',
            '--disable-gpu',
        ];

        if (this.width && this.height) {
            args.push(`--window-size=${this.width},${this.height}`);
        }

        return {
            'headless': this.headless,
            'args': args,
            'executablePath': chromeLocation,
            'defaultViewport': null, // makes page take up whole browser window,
        };

    }
}

export interface CustomTask {
    start(): void
}