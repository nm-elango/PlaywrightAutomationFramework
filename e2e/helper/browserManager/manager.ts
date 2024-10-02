import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

export const invokeBrowser = () => {
    const browserType = process.env.browser || "chrome";

    const options: LaunchOptions = {
        headless: Boolean(process.env.headless),
        args: ['--start-maximized']
    };

    console.log(`Selected browser is  ${browserType}`)
    switch (browserType) {
        case 'chrome':
            return chromium.launch({ ...options, channel: 'chrome' });
            // return chromium.launch(options);
        case 'firefox':
            const ffPath = 'C:\\Program Files\\ffexecutable\Application\\firefox.exe'; // Adjust this path if needed
            return firefox.launch({ ...options, executablePath: ffPath });
        case 'webkit':
            return webkit.launch(options);
        case 'edge':
            // If you want to launch Microsoft Edge specifically, you can provide the executable path
            
            return chromium.launch({ ...options, channel: 'msedge'}); 
        default:
            throw new Error("Please set the proper browser!")
    }

    // const options: LaunchOptions = {
    //     headless: !true
    // }
    // export const invokeBrowser = () => {
    //     const browserType = process.env.npm_config_BROWSER || "chrome";
    //     switch (browserType) {
    //         case "chrome":
    //             return chromium.launch(options);
    //         case "firefox":
    //             return firefox.launch(options);
    //         case "webkit":
    //             return webkit.launch(options);
    //         default:
    //             throw new Error("Please set the proper browser!")
    //     }
}