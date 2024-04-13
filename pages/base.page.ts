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

	async waitForPopup(event: 'accept' | 'dismiss'): Promise<void> {
		const waifFor = await this.page.waitForEvent('dialog');
		event === 'accept' ? await waifFor.accept() : await waifFor.dismiss();
	}
}
