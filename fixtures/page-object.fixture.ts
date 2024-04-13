import { PlaygroundPage } from '../pages/the-playground.page';
import { WaitingConditionsPage } from '../pages/waiting-conditions.page';
import { test as baseTest } from '@playwright/test';

interface Pages {
	playgroundPage: PlaygroundPage;
	waitingConditionsPage: WaitingConditionsPage;
	moveToWaitingConditionsPage: WaitingConditionsPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
	playgroundPage: async ({ page }, use) => {
		const playgroundPage = new PlaygroundPage(page);
		await playgroundPage.goto();
		use(playgroundPage);
	},

	waitingConditionsPage: async ({ page }, use) => {
		const waitingConditionsPage = new WaitingConditionsPage(page);
		use(waitingConditionsPage);
	},

	moveToWaitingConditionsPage: async ({ page }, use) => {
		const waitingConditionsPage = new WaitingConditionsPage(page);
		waitingConditionsPage.goto();
		use(waitingConditionsPage);
	},
});
