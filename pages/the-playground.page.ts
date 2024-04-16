import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { WaitingConditionsPage } from './waiting-conditions.page';

export class PlaygroundPage extends BasePage {
	url = '/';
	constructor(page: Page) {
		super(page);
	}

	waitConditionsButton = this.page.locator(
		'a[href="expected_conditions.html"]'
	);

	playgroundPageHeader = this.page.getByText('The Playground');

	async selectExpectedConditions(): Promise<WaitingConditionsPage> {
		await this.waitConditionsButton.click();
		return new WaitingConditionsPage(this.page);
	}
}
