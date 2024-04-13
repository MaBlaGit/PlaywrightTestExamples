import { Page } from '@playwright/test';

export class BasePage {
	url = '';
	currentPage = this.page;

	constructor(protected page: Page) {}

	async goto(): Promise<void> {
		await this.page.goto(this.url);
	}

	async waitFor(url: string): Promise<void> {
		await this.page.waitForURL(url);
	}
}
