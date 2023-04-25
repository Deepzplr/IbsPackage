import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  fullyParallel:true,
  projects: [
   { 
      name: "chrome",
      use: 
      {
          ...devices["Desktop Chrome"]
      }
    },
    {
        name: "firefox",
        use:
        {
          ...devices["Desktop Firefox"]
        }
    },
     {
      name: 'webkit',
      use:
      {
        ...devices['Desktop Safari'],
      },
     },
   {
     name: 'Microsoft Edge',
     use: {
       // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
       channel: 'msedge',
     },
   }
  ],
testMatch:["IBStest/*"],
use :
    {
    //baseURL:"https://ecommerce-playground.lambdatest.io/index.php?",
   // baseURL:"https://itravelivveks.ibsplc.net/iTravel/production/spring/loginFlow",
    baseURL:"https://focltng.ibsplc.net/iTravel/production/spring/loginFlow",
    headless: false,
    screenshot: "on",
    video: "on"
    // launchOptions: {
    //   slowMo: 1000
    // }
    },
retries :0,
reporter:
    [
      ["dot"],
      ["json",
        {
        outputFile: "jsonReports/jsonReport.json"
        }
      ],
      ["html",
        {
          open :"never"
        }
      ],
      [
        'allure-playwright'
      ]
    ]
};

export default config;
