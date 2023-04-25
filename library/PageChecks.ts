import { Page,expect } from "@playwright/test";

export default class PageChecks{

    constructor(public page: Page) {}

    // Verifying page title 
    async pageTitleCheck( page: Page, expectedTitle: string) {
        const title = await page.title();
        expect(title).toEqual(expectedTitle);
        console.log("Sucessfully landed to the page")
    }

    async elementVisibleCheck(page:Page, locatorToUse: string) {
        return await expect(page.locator(locatorToUse)).toBeVisible();
    }

    async elementFindWithPlaceHolder(page:Page, locatorToUse: string) {
        return  page.getByPlaceholder(locatorToUse);
    }

    async getChildElementsUsingParent(page:Page, parentLocator: string){
        return await page.$$(parentLocator);
    }

    async childElementTextMatch(resultTableElements, textToCheck :string) {
        const childElementText = await Promise.all(
          resultTableElements.map(async (element) => {
            return await element.evaluate(node => node.textContent);
          })
        );
        let resultCheck = childElementText.filter(text => text?.includes("Fire Tv"));
        expect(resultCheck.length).toBeGreaterThan(0);
    }

     // Verifying page title 
     async getPageTitle( page: Page) {
        return await page.title();
    }
      
    async getElement(page: Page,locator:string) {
      return page.locator(locator);
    }

    async elementToBeEnable( page: Page, locator: string) {
        const element = await page.locator(locator);
        expect(element).toBeEnabled();
    }

    async elementClick( page: Page, locator) {
        const element = await locator;
        element.click;
    }

    async elementIsCheck(locatorToUse) {
        return await (locatorToUse).isVisible();
    }

    async retrieveElementText(locatorToUse) {
         const productPrice= await (locatorToUse);
         expect(productPrice).toBeVisible();
         return productPrice.textContent();
    }


    async childElementsText(locator: string): Promise<string> {
         // Get all child elements under a div with id "my-div"
         const childElements  = await this.page.$$("div[class='bkng_left_06 m-t-10'] div[class='all_hlr']");
      
         // Loop through the child elements and get their text
          const childElementText= await Promise.all(
              childElements .map(async element => {
                  return await element.evaluate(node => node.textContent);
              })
          );
          
       // await pagetoUse.waitForTimeout(3000);
        let filteredText = childElementText.filter(text => text !== null).join(" ");
       
        //remove line breaks
        filteredText = filteredText.replace(/(\r\n|\n|\r)/gm, "").replace(/\t/g, "");
        console.log(filteredText);
         await this.page.waitForTimeout(3000);
        return filteredText;
    }
}


