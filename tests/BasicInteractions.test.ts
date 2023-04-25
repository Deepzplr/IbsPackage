/*import{expect,Page,test} from "@playwright/test";
import moment from "moment";

test ("Basic_InteractionsCheck",async ({page}) => {

    //navigation
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");

    //locator and scrool into view
    const emailIdLocator = page.locator("//input[@id='user-message']");
    await emailIdLocator.scrollIntoViewIfNeeded();

    //finding placeholdervalue
    var placeholderValue =emailIdLocator.getAttribute("placeholder");
    console.log(`place holder value for input field is => ${placeholderValue}`);

    //vadlidating attribute
    expect(emailIdLocator).toHaveAttribute("placeholder","Please enter your Message");
    await emailIdLocator.fill("deepthiuday");   

    //getting user input value
    var givenValue =await emailIdLocator.inputValue();
    console.log(`User eneterd value is => ${givenValue}`);

    //validating the vaule filled is correct or not
    expect(emailIdLocator).toHaveValue("deepthiuday");
})


test("Sum_Check_OtherFucntions",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");

    // finding input fields with locators
    let num1 = 125 ,num2 =100;
    const fistInputLocator = page.locator("//input[@id='sum1']");
    const secondInputLocator =page.locator("//input[@id='sum2']");

    // verfiying whether editable or not
    expect(fistInputLocator).toBeEditable();
    expect(secondInputLocator).toBeEditable();

    //filling values
    await fistInputLocator.type(`${num1}`);
    await secondInputLocator.type(`${num2}`);

    let sum=num1+num2;
    //let a=89;
    await page.locator("//button[normalize-space()='Get values']").click();

    // validing teh result
    const result =page.locator("//p[@id='addmessage']");
    await expect(result).toBeVisible();
    await expect(result).toHaveText(""+sum);

    // getting teh inner visbile text of an element
    console.log(`sum is printed as ${await result.innerText()}`);
})

test("CheckBox",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");

    await page.locator("//a[normalize-space()='Checkbox Demo']").click();
    await page.waitForTimeout(5000);
    const a=page.getByText("Single Checkbox Demo");
    console.log(a);

    //finding chekbox
    const checkBox = page.locator("//input[@id='isAgeSelected']");

    //confirming chkbox is not checked
    expect(checkBox).not.toBeChecked();

    // check
    await checkBox.check();

    //confirming check
    expect(checkBox).toBeChecked();
    
})

test("Alerts",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo")

    //handling simple alert
    // page.on("dialog",async (alert) => {
    //     const text = alert.message();
    //         console.log(text);
    //         await alert.accept();      
    // })

    // await page.locator("button:has-text('Click Me')").nth(0).click();

    //confirmation alert
    // page.on("dialog",async (alert1) => {
    //     const text = alert1.message();
    //         console.log(text);
    //         await alert1.dismiss();      
    // })

    // await page.locator("button:has-text('Click Me')").nth(1).click();

    // await page.waitForTimeout(5000);
    // expect(page.locator("id=confirm-demo")).toContainText("Cancel!");

    //prompt alert
    const stringToPass ='deepthi';
    page.on("dialog",async (alert1) => {
        const text = alert1.message();
            console.log(text);
            await alert1.accept(stringToPass);      
    })

    await page.locator("button:has-text('Click Me')").nth(2).click();

    await page.waitForTimeout(5000);
    var displaytext = await page.locator("id=prompt-demo").innerText();
    expect(page.locator("id=prompt-demo")).toContainText(stringToPass);

    if (displaytext.includes(stringToPass))
    {
        console.log("successfully handled alert");
    }     
})

test("Dropdowns",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo")

    const dropDown = page.locator("//select[@id='select-demo']");

    await dropDown.scrollIntoViewIfNeeded();
    await dropDown.selectOption("Tuesday");

    console.log("true");

    await page.selectOption("//select[@id='select-demo']",{
        //label: "Monday"
        //value: "Monday"
        index:5
    })

    await page.waitForTimeout(3000);

    //multiselect dropdown
    await page.selectOption("#multi-select",
        [
            {label:"Texas"},
            {index: 4},
            {value:"Washington"}
        ]
    )
})

test("BootstrapDropdown",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo")
    await selectCountry("India");
    await selectCountry("Denmark");


    async function selectCountry(countryName : string) {
    await page.click("#country+span");
    await page.locator("ul#select2-country-results")
        .locator("li",{
            hasText: countryName
        }).click()
    }

        await page.waitForTimeout(3000);
})

test("FrameInteraction",async ({page}) => {

    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("mo of frames :"+allframes.length);


    const myframe = page.frame("firstFr");
    if(myframe!=null)
    {
         await myframe?.fill("input[name='fname']","deepthi123");
    }
    await page.waitForTimeout(3000);

    await myframe?.fill("input[name='fname']","deepthi");
    await myframe?.fill("input[name='lname']","pratheesh");

    await page.waitForTimeout(3000);

    expect(await myframe?.locator("p.has-text-info").textContent()).toContain("deepthi pratheesh");

})

test("FrameInteraction_WithFrameLocator",async ({page}) => {

    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("mo of frames :"+allframes.length);

    const frame= page.frameLocator("#firstFr");
    await frame.locator("input[name='fname']").fill("deepthi");
})

test("NestedFrame",async ({page}) => {

    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("mo of frames :"+allframes.length);

    const frame= page.frameLocator("#firstFr");
    await frame.locator("input[name='fname']").fill("deepthi");

    const innerFrame = frame.frameLocator("iframe[src='innerFrame']");
    innerFrame.locator("input[name='email']").fill("deepthi@gmail.com");

    await page.waitForTimeout(3000);
})

test("windowtest",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    const currentUrl = page.url();
    console.log("current url is "+currentUrl);

    const [newWindow] = await Promise.all(
        [
            page.waitForEvent("popup"),
            page.click("'Follow On Twitter'")
        ]
    );
    
    const newUrl = newWindow.url();
    console.log("new url is "+newUrl);

    if(currentUrl!=newUrl)
    {
        console.log("successfull");

        // all actions in new window can do with newwindo object
        //newWindow.fill
    }
})

test("MultipleWindowtest",async ({page}) => {
    let  facebookPage: Page;
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    const currentUrl = page.url();
    console.log("current url is "+currentUrl);

    const [multiPage] = await Promise.all(
        [
            page.waitForEvent("popup"),
            page.click("#followboth")
        ]
    );
    await page.waitForLoadState();
    const pages = multiPage.context().pages();
    console.log('no of tabs:'+pages.length);

    // printing tab urls
    pages.forEach(tab =>{
        console.log(tab.url())
    });

    //doing cation on specific tab
    
    for (let index =0; index < pages.length ;index++)
    {
        const url = pages[index].url();
        if (url == "https://www.facebook.com/lambdatest/")
        {
            facebookPage = pages[index];
        }
    }

    const text =await facebookPage.textContent("//h1");
    console.log(text);
})

test("DatePicker using fill",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    let date = "2020-05-04"
    await page.fill("id=birthday",date);
    await page.waitForTimeout(3000);   
})

test("DatePicker using moment",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    //await page.click("//input[@placeholder='Start date']");
    await selectDate(12,"December 2017");

    await page.reload();

    await selectDate(7,"December 2023");

    await page.reload();

    await selectDate(19,"January 2023");

    await page.waitForTimeout(3000);

    async function selectDate(date: number, dateToSelect: string) {
        await page.click("//input[@placeholder='Start date']");
       
        const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
        const next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
        console.log("this month?" +thisMonth);

        while (await mmYY.textContent() != dateToSelect)
        {
            if (thisMonth)
            {
                await prev.click();
            }
            else{
                await next.click();
            }
            
        }
        await page.click(`//td[@class='day'][text()= '${date}']`);
    }
});

test("Download file",async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");
    await page.type("#textbox","this is my trial scenario");
    await page.click("id=create");
   
    const download = await Promise.all([
        page.waitForEvent("download"),
        page.click("id=link-to-download")
    ])

    // const path = await download[0].path();
    // console.log(path);

    const fileName = await download[0].suggestedFilename();
    await download[0].saveAs(fileName);
});

test("upload file",async ({page}) => {

    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
    await page.setInputFiles("input[type='file']",
        ["uploadItems/apple.png","uploadItems/fruits.jpg"]);

        await page.waitForTimeout(5000);

});*/