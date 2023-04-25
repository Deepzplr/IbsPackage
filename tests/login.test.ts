import { expect,test,Page } from "@playwright/test";


test("Login test with valid creds", async ({ page}) =>{
    
    // Launching Browsers and initalising variables
    //const browser = await chromium.launch({
    //    headless : false
    //});
    //const context = await browser.newContext();
    //const page = await context.newPage();


    //Navigating to url
    await page.goto("https://ecommerce-playground.lambdatest.io/");

    //mousehover on my account
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");

    // click login
    //await page.click("text=Login");
    const login = page.locator("//span[text()[normalize-space()='Login']]");
    await expect(login).toBeVisible();
    await login.click();
    //await page.waitForTimeout(5000)

    //providing creds
    const username =  page.locator("//input[@id='input-email']");
    await username.waitFor({state:"visible"})
    //await expect(username).toBeVisible();
       await page.fill("//input[@id='input-email']", "deepthiuday1@gmail.com");
    await page.fill("//input[@id='input-password']", "Playwright123!");
      await page.click("//input[@value='Login']");

     //providing  sleep
        //await page.waitForTimeout(7000);

        const edit= page.locator("//a[contains(.,'Edit your account information')]");
        await expect(edit).toBeVisible();
        await expect(edit).toBeEnabled();
        await edit.click();
        const fname=page.locator("//input[@placeholder='First Name']");
        await fname.fill("deepthikttt");
         const submitbutton = page.locator("//input[@type='submit']");
         await submitbutton.waitFor({state:"visible"})
         submitbutton.click();

        
        
  await page.getByRole('link', { name: ' Edit your account information' }).click();
        await page.getByPlaceholder('First Name').click();
 const a =page.getByPlaceholder('First Name');
 await a.waitFor({state:"visible"})
 await a.fill('deepthiktt');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('pratheesh1ggg');
  await page.getByPlaceholder('Telephone').click();
  await page.getByPlaceholder('Telephone').fill('9567681596');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Edit Account' }).click();
  await a.waitFor({state:"visible"})
  await page.getByRole('link', { name: 'Home' }).click();
const b= page.locator("//div[@class='mb-4 mb-lg-0']/following-sibling::a[1]");
await expect(b).toBeVisible();
await expect(b).toBeEnabled();
  await page.locator("(//input[@name='search'])[1]").fill("watch"); 

  await page.locator("//button[text()='Search']").click();
  //await page.getByRole('link', { name: 'Special Hot', exact: true }).click();
 // await page.locator('#mz-product-grid-image-86-212499').click();
//
   // await page.hover("//div[@class='image']/a",
   // {
   //     strict: false
   // }) ;
//
   // await page.locator("(//button[@title='Add to Cart'])")
   //     .nth(0).click();
//
//
//
//
   // const toast = page.locator("//a[.='View Cart ']");
   // await toast.waitFor({state:"visible"});
   //
   // 
//
  ////await page.getByRole('button', { name: 'Add to Cart' }).click();
  ////await page.getByRole('link', { name: 'View Cart ' }).click();
  ////await page.locator('input[name="quantity\\[4154\\]"]').click();
  ////await page.locator('input[name="quantity\\[4154\\]"]').fill('2');
  ////await page.getByRole('cell', { name: '$98.00' }).nth(2).click();
  a//wait page.getByRole('link', { name: 'My order' }).click();
  a//wait page.getByRole('link', { name: 'Continue' }).click();
   //  //mousehover on my account
   //  await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
   //  //await page.waitForTimeout(7000);
   //  await page.locator("//span[normalize-space()='Logout']").click();
   // //opening  a new tab with cache
   //  //const newPageTab = await context.newPage();
   // // await newPageTab.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/account");
   // //providing  sleep
   // // await newPageTab.waitForTimeout(5000);
   // 
//
   // // // new page without cache
   // // const  newContext = await browser.newContext();
   // // const newPage = await newContext.newPage();
   // // await newPage.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/account");
//
   // // //providing  sleep
   // // await newPage.waitForTimeout(5000);
})//
//
//
//



test('OHRMtest', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'My Info' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Paulq');
    await page.getByPlaceholder('Middle Name').click();
    await page.getByPlaceholder('Middle Name').fill('testq');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Collings1w');
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').first().fill('002523');
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').nth(1).click();
    await page.locator('div').filter({ hasText: 'Employee IdOther Id' }).getByRole('textbox').nth(1).fill('333');
    await page.locator('div').filter({ hasText: 'Driver\'s License NumberLicense Expiry Date' }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: 'Driver\'s License NumberLicense Expiry Date' }).getByRole('textbox').first().fill('112344333');
    await page.locator('div').filter({ hasText: 'SSN NumberSIN Number' }).getByRole('textbox').first().click();
    await page.locator('div').filter({ hasText: 'SSN NumberSIN Number' }).getByRole('textbox').first().fill('123456333');
    await page.locator('div').filter({ hasText: 'SSN NumberSIN Number' }).getByRole('textbox').nth(1).click();
    await page.locator('div').filter({ hasText: 'SSN NumberSIN Number' }).getByRole('textbox').nth(1).fill('333455333');
    //await page.locator('form').filter({ hasText: 'Employee Full NameEmployee IdOther IdDriver\'s License NumberLicense Expiry DateS' }).locator('i').nth(1).click();
    await page.getByRole('option', { name: 'Albanian' }).click();
    await page.locator('form').filter({ hasText: 'Employee Full NameEmployee IdOther IdDriver\'s License NumberLicense Expiry DateS' }).locator('i').nth(2).click();
    //await page.getByText('Single').click();
    await page.getByRole('option', { name: 'Married' }).click();
    await page.getByText('NationalityAlbanianMarital StatusMarried').click();
    await page.getByRole('option', { name: 'Married' }).getByText('Married').click();
    await page.locator('label').filter({ hasText: 'Female' }).locator('span').click();
    await page.locator('form').filter({ hasText: 'Blood Type-- Select -- Save' }).locator('i').click();
    await page.getByRole('option', { name: 'A+' }).click();
    await page.locator('div').filter({ hasText: '* Required Save' }).getByRole('button', { name: 'Save' }).click();
    await page.locator('form').filter({ hasText: 'Blood TypeA+ Save' }).getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Qualifications' }).click();
    await page.getByRole('row', { name: ' Company Job Title From To Comment Actions' }).locator('i').click();
    await page.getByRole('row', { name: ' Level Year GPA/Score Actions' }).locator('i').click();
    await page.getByRole('row', { name: ' Skill Years of Experience Actions' }).locator('i').click();
    await page.getByRole('link', { name: 'Memberships' }).click();
    await page.getByRole('button', { name: ' Add' }).nth(1).click();
    await page.getByPlaceholder('Type comment here').click();
    await page.getByPlaceholder('Type comment here').fill('test');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByText('No file selected').click();
    await page.locator('input[type="file"]').setInputFiles('PlayWright_Scenario_Estimation.xlsx');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Dashboard' }).click();
  });