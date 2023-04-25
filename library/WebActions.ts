import { Page,expect, BrowserContext } from "@playwright/test";
import * as CryptoJS from 'crypto-js';
import { Workbook } from 'exceljs';
import * as data from "../Testdata/amazon-test-data.json"
import * as fs from 'fs';

const waitForElement = data.waitForElement;
const path = require('path');
let workbook ;
workbook = new Workbook();
export default class WebActions{

    constructor(public page: Page) {}

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async decipherPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        // const cipher = CryptoJS.AES.encrypt('demouat',key);
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(data.password, key).toString(CryptoJS.enc.Utf8);
    }

    async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: parseInt(waitForElement )});
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: parseInt(waitForElement) });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: parseInt(waitForElement) });
        }
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickElement(locator: string): Promise<void> {
        await this.page.click(locator);
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async boundingBoxClickElement(locator: string): Promise<void> {
        await this.delay(1000);
        const elementHandle = await this.page.$(locator);
        const box = await elementHandle?.boundingBox();
        if (box) {
            await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        } else {
            throw new Error('Unable to find the element on the page');
        }          
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text);
    }

    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    async selectOptionFromDropdown(locator: string, option: string): Promise<void> {
        const selectDropDownLocator = await this.page.$(locator);
        selectDropDownLocator?.type(option);
    }

    async getTextFromWebElements(locator: string): Promise<string[]> {
        return this.page.$$eval(locator, elements => elements.map(item => item.textContent ? item.textContent.trim() : ''));
    }

    async verifyWebElementsText(locator: string, expectedText : string): Promise<void> {

        const elementsHandle = await this.page.$$(locator);
            for (const elementHandle of elementsHandle) {
            const textContent = await elementHandle.textContent();
            if (textContent?.includes(expectedText)) {
                console.log(`Found ${expectedText} in element with text: ${textContent}`);
            }
        }
    }

    async downloadFile(locator: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent(`download`),
            this.page.click(locator)
        ]);
        await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
        return download.suggestedFilename();
    }

    async keyPress(locator: string, key: string): Promise<void> {
        this.page.press(locator, key);
    }

    async readDataFromExcel(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string> {
        const workbook = new Workbook();
        return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
            const sheet = workbook.getWorksheet(sheetName);
            return sheet.getRow(rowNum).getCell(cellNum).toString();
        });
    }

    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    async writeDataIntoTextFile(filePath: number | fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }

    async verifyElementText(locator: string, text: string): Promise<void> {
        const textValue = await this.page.textContent(locator);
        expect(textValue?.trim()).toBe(text);
    }

    async getElementText(locator: string): Promise<string> {
        const element = await this.page.locator(locator).first();
        const text = await element.textContent();
        if (text === null) {
            return '';
        }
        return text.trim();      
    }

    async verifyNewWindowUrlAndClick(context: BrowserContext, newWindowLocator: string, urlText: string,clickOnNewWindowLocator:string): Promise<void> {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.page.click(newWindowLocator)
        ])
        await newPage.waitForLoadState();
        expect(newPage.url()).toContain(urlText);
        await newPage.click(clickOnNewWindowLocator);
        await newPage.close();
    }

    async verifyElementContainsText(locator: string, text: string): Promise<void> {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async verifyJSElementValue(locator: string, text: string): Promise<void> {
        const textValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
        expect(textValue.trim()).toBe(text);
    }

    async verifyElementAttribute(locator: string, attribute: string, value: string): Promise<void> {
        const textValue = await this.page.getAttribute(locator, attribute);
        expect(textValue?.trim()).toBe(value);
    }

    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: parseInt(waitForElement) })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
        expect(status, `${errorMessage}`).toBe(true);
    }

    async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
        expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
    }   


    async verifyChildElementCount(locator: string, value: Number): Promise<void> {
        const childElemenets = await this.page.$$(locator);
        expect(childElemenets.length).toEqual(value);
    }

    async verifyChildElements(locator: string): Promise<void> {
        const childElemenets = await this.page.$$(locator);
        expect(childElemenets.length).not.toBe(0);
    }
    
    async  verifyChildElementText(expectedElements:string[], actualElements: string[]) {

        const areEqual: boolean = expectedElements.every((value, index) => value === actualElements[index]);
    
            if (areEqual) {
              console.log("The options are dispalyed correctly");
            } else {
              console.log("The options are not dispalyed correctly");
            }
    }

    async  selectYear(
        dateToSelect: string,
        sellingPage :Page): Promise<Number> {
        
        const yearPostion = await yearBasedOnSelection();
        console.log("successfully selected year");

        async function yearBasedOnSelection():Promise<Number> {
            let customerYearFound = 0;
            let yearPosition =0;
            //selecting year
           const year= await sellingPage.$$("(//div[@class='month-head'])");

            do{
                await monthAndYearSelection();
                console.log(customerYearFound)
                await sellingPage.waitForTimeout(2000);
                if(customerYearFound==0){
                    await sellingPage.locator("//mat-icon[normalize-space()='arrow_forward']").click();
                    //yearList();
                } 
            }while(customerYearFound===0);   

            async function monthAndYearSelection() {

                const year1= await sellingPage.$$("(//div[@class='month-head'])");
                if (year1.length > 0) {
                    const textContents = await Promise.all(
                        year1.map(async (child) => {
                            return await child.evaluate(node => node.textContent);
                        })
                    );
                    for (const y of textContents) {
                        yearPosition++;
                        if (y===dateToSelect) {
                            customerYearFound++;
                            console.log(customerYearFound)
                            break;
                        }
                    }
                    console.log(textContents);
                }
                else {
                    console.log('Parent element has no child elements');
                }
            }
           return yearPosition;
        }
        return yearPostion
    }

    async  dateSelection(
        yearPostion: Number,
        dateToSelect : string,
        sellingPage :Page,
        selectMonth: (dateToSelect: string, locator: string,sellingPage :Page) => Promise<void>) {

        const firstMonthlocatorToUse = "//bi-month[@class='month ng-star-inserted'][1]//div[1]/bi-week//div/div";
        const secondMonthlocatorToUse = "//bi-month[@class='month ng-star-inserted'][2]//div[1]/bi-week//div/div";

        if (yearPostion == 1) {
            await selectMonth(dateToSelect, firstMonthlocatorToUse,sellingPage);
        }
        else {
            await selectMonth(dateToSelect, secondMonthlocatorToUse,sellingPage);
        }
    }

    async  selectMonth(dateToSelect: string, locator :string,sellingPage :Page) {       

        const children = await sellingPage.$$(locator); 
        //const children = await firstDisplayYear?.$$("//span")

        if (await (children as any).length > 0) {
                for (let i = 0; i < await (children as any).length; i++) {
                    const child = await (children as any)[i];
                    const month = await (await  child.getProperty('innerText')).jsonValue()
                    if(await  month===dateToSelect)
                    {
                      child.click();
                      sellingPage.waitForTimeout(2000);
                    }
                }       
        }
        else {
            console.log('Parent element has no child elements');
        }
    }
    }


