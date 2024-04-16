import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class WaitingConditionsPage extends BasePage {
	url = '/expected_conditions.html';

	constructor(page: Page) {
		super(page);
	}

	showAlertButton = this.page.getByRole('button', { name: 'Show Alert' });
	showPromptButton = this.page.getByRole('button', { name: 'Show Prompt' });
	alertHandledText = this.page.locator('#alert_handled_badge');
	promptOkText = this.page.locator('#confirm_ok_badge');
	promptDismissedText = this.page.locator('#confirm_cancelled_badge');
	minWait = this.page.locator('#min_wait');
	maxWait = this.page.locator('#max_wait');
	visibilityTriggerButton = this.page.locator('#visibility_trigger');
	clickMeVisibleButton = this.page.locator('#visibility_target');
	disappearanceButton = this.page.locator('#invisibility_trigger');
	spinnerVisible = this.page.locator('#invisibility_target');
	spinnerInvisible = this.page.locator('#spinner_gone');

	async clickOnShowAlertButton(): Promise<void> {
		await this.showAlertButton.click();
	}

	async clickOnShowPromptButton(): Promise<void> {
		this.showPromptButton.click();
	}

	async manageMinMaxWait(min: number, max: number): Promise<void> {
		await this.minWait.clear();
		await this.minWait.fill(min.toString());
		await this.maxWait.clear();
		await this.maxWait.fill(max.toString());
	}

	async clickOnVisibilityTriggerButton(): Promise<void> {
		await this.visibilityTriggerButton.click();
	}

	async clickDisappearanceButton(): Promise<void> {
		await this.disappearanceButton.click();
	}
}
