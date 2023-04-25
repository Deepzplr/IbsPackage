import {test as baseTest} from "@playwright/test";

type pages ={
   
}

const testPages = baseTest.extend<pages>({
   
})

export const test =testPages;
export const expect = testPages.expect;