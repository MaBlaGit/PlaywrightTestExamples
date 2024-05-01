import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class UIFeaturePage extends BasePage {
    url = '/advanced.html';

    constructor(page: Page) {
        super(page)
    }

    headerText = this.page.getByRole('heading', {name: 'Challenge 1'});
    rating = this.page.locator('label[class="star-rating"]');
    ratingInput = this.page.locator('input#txt_rating');
    checkRatingButton = this.page.getByRole('button', {name: 'Check Rating'});
    successText = this.page.locator('span#validate_rating');

    async returnRatingStars(): Promise<string> {
        const asterisk = '*';
        const contentAttribute = await this.rating.evaluate(el => {
            return window.getComputedStyle(el, '::after').getPropertyValue('content');
        })
        const rating = contentAttribute.split('').filter(asterisk => {
            if(asterisk === '*') return asterisk;
        })
        return asterisk.repeat(rating.length); 
    }

    async enterStarsIntoRatingInput(): Promise<void> {
        const asterisks = await this.returnRatingStars();
        await this.ratingInput.fill(asterisks);
    }

    async clickOnCheckRatingButton(): Promise<void> {
        await this.checkRatingButton.click();
    }
}