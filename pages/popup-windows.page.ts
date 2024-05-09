import { Page } from '@playwright/test';
import { FramePage } from '@root/pages/frame.page';
import { BasePage } from '@root/pages/base.page';

export class PopupWindowsPage extends BasePage {
    url = '/multi_window.html';

    constructor(page: Page) {
        super(page);
    }

    windowOneButton = this.page.locator('#window1');
    windowTwoButton = this.page.locator('#window2');

    async clickOnWindowOneButton(): Promise<FramePage> {
        const newPromise = this.page.context().waitForEvent('page');
        await this.windowOneButton.click();
        const page = await newPromise;
        await page.bringToFront();
        return new FramePage(page);
    }

    async clickOnWindowTwoButton(): Promise<FramePage> {
        const newPromise = this.page.context().waitForEvent('page');
        await this.windowTwoButton.click();
        const page = await newPromise;
        await page.bringToFront();
        return new FramePage(page);   
    }
}
