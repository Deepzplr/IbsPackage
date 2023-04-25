/*import { test, chromium, expect } from '@playwright/test';

test('Login_Test', async ({  }) => {
     // Launching Browsers and initalising variables
     const browser = await chromium.launch({
      headless : false
  });
  const context = await browser.newContext();
    const newpage = await context.newPage();
  await newpage.goto('https://ecommerce-playground.lambdatest.io/');
  await newpage.getByRole('button', { name: ' My account' }).click();
  await newpage.getByPlaceholder('E-Mail Address').click();
  await newpage.getByPlaceholder('E-Mail Address').fill('deepthiuday1@gmail.com');
  await newpage.getByPlaceholder('Password').click();
  await newpage.getByPlaceholder('Password').fill('Playwright123!');
  await newpage.getByRole('button', { name: 'Login' }).click();
  await newpage.getByRole('link', { name: ' Edit your account information' }).click();
  await newpage.waitForTimeout(7000);
  //mousehover on my account
  await newpage.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
  await newpage.waitForTimeout(7000);
  await newpage.locator("//span[normalize-space()='Logout']").click();
  //assertion
  await expect(newpage).toHaveURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");

  
});*/