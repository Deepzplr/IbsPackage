import { Page } from "@playwright/test";

export default class HomePage{

    constructor (public page:Page)
    {

    }

    async clickSpecialHotMenu() {
        await this.page.locator("(//a[@class='icon-left both nav-link active'])[2]").click(); 
    }
}