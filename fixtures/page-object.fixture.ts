import { test as baseTest, expect } from '@playwright/test';
import { FormPage } from '@root/pages/form.page';
import { LoginPage } from '@root/pages/login.page';
import { OrderSubmitPage } from '@root/pages/order-submit.page';
import { PlaygroundPage } from '@root/pages/the-playground.page';
import { UIFeaturePage } from '@root/pages/ui-feature.page';
import { WaitingConditionsPage } from '@root/pages/waiting-conditions.page';
import { credentials } from '@root/helpers/credentials.helper';

interface Pages {
	formPage: FormPage;
	loginPage: LoginPage;
	orderSubmitPage: OrderSubmitPage;
	playgroundPage: PlaygroundPage;
	uiFeaturePage: UIFeaturePage;
	waitingConditionsPage: WaitingConditionsPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
	formPage: async ({ page }, use) => {
		const formPage = new FormPage(page);
		await formPage.goto();
		use(formPage);
	},
	
	loginPage: async({ page }, use) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		use(loginPage);
	},

	playgroundPage: async ({ page }, use) => {
		const playgroundPage = new PlaygroundPage(page);
		await playgroundPage.goto();
		use(playgroundPage);
	},

	uiFeaturePage: async({ page }, use) => {
		const uiFeaturePage = new UIFeaturePage(page);
		await uiFeaturePage.goto();
		use(uiFeaturePage);
	},

	waitingConditionsPage: async ({ page }, use) => {
		const waitingConditionsPage = new WaitingConditionsPage(page);
		await waitingConditionsPage.goto();
		use(waitingConditionsPage);
	},

	orderSubmitPage: async ({ page }, use) => {
		const { username, password } = credentials.valid;
		const loginPage = new LoginPage(page);
		const orderSubmitPage = new OrderSubmitPage(page);
		await loginPage.goto();
		await loginPage.logUser(username, password);
		use(orderSubmitPage);
	}
});
