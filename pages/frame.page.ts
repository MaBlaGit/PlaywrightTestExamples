import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';

export class FramePage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    }

    clickMeButton = this.page.locator('#click_me_2');

    async clickClickMeButton(): Promise<void> {
        await this.clickMeButton.click();
    }
}
