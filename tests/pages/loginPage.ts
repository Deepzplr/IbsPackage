import { Page } from "@playwright/test";
export default class LoginPage{

    constructor(public page: Page) {}

    async enterEmail(emailaddress: string){
        await this.page.locator("input[name=email]")
            .type(emailaddress);
    }

    async enterPassword(password: string){
        await this.page.locator("input[name=password]")
            .type(password);
    }

    async clcikLoginButton(){
        await this.page.click("//input[@type='submit']");         
    }
}