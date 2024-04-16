import { test as baseTest } from '@playwright/test';
import { PlaygroundPage } from '../pages/the-playground.page';
import { FormPage } from '../pages/form.page';
import { WaitingConditionsPage } from '../pages/waiting-conditions.page';

interface Pages {
	playgroundPage: PlaygroundPage;
	waitingConditionsPage: WaitingConditionsPage;
	formPage: FormPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
	playgroundPage: async ({ page }, use) => {
		const playgroundPage = new PlaygroundPage(page);
		await playgroundPage.goto();
		use(playgroundPage);
	},

	waitingConditionsPage: async ({ page }, use) => {
		const waitingConditionsPage = new WaitingConditionsPage(page);
		await waitingConditionsPage.goto();
		use(waitingConditionsPage);
	},

	formPage: async ({ page }, use) => {
		const formPage = new FormPage(page);
		await formPage.goto();
		use(formPage);
	},
});
