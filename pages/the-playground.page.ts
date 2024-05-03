import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';
import { LoginPage } from '@root/pages/login.page';
import { UIFeaturePage } from '@root/pages/ui-feature.page';
import { WaitingConditionsPage } from '@root/pages/waiting-conditions.page';

export class PlaygroundPage extends BasePage {
	url = '/';
	
	constructor(page: Page) {
		super(page);
	}
	
	playgroundPageHeader = this.page.getByText('The Playground');
	waitConditionsButton = this.page.locator(
		'a[href="expected_conditions.html"]'
	);
	advancedUIFeaturesButton = this.page.locator('a[href="advanced.html"]');
	samplePagesButton = this.page.locator('a[href="login.html"]');

	async selectExpectedConditions(): Promise<WaitingConditionsPage> {
		await this.waitConditionsButton.click();
		return new WaitingConditionsPage(this.page);
	}

	async selectSpecialUIFeature(): Promise<UIFeaturePage> {
		await this.advancedUIFeaturesButton.click();
		return new UIFeaturePage(this.page);
	}

	async selectSamplePages(): Promise<LoginPage> {
		await this.samplePagesButton.click();
		return new LoginPage(this.page);
	}
}
