import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';
import { WaitingConditionsPage } from '@root/pages/waiting-conditions.page';
import { UIFeaturePage } from '@root/pages/ui-feature.page';

export class PlaygroundPage extends BasePage {
	url = '/';
	
	constructor(page: Page) {
		super(page);
	}

	waitConditionsButton = this.page.locator(
		'a[href="expected_conditions.html"]'
	);

	advancedUIFeatures = this.page.locator('a[href="advanced.html"]');

	playgroundPageHeader = this.page.getByText('The Playground');

	async selectExpectedConditions(): Promise<WaitingConditionsPage> {
		await this.waitConditionsButton.click();
		return new WaitingConditionsPage(this.page);
	}

	async selectSpecialUIFeature(): Promise<UIFeaturePage> {
		await this.advancedUIFeatures.click();
		return new UIFeaturePage(this.page);
	}
}
