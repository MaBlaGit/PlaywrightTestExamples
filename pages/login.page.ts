import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';
import { OrderSubmitPage } from '@root/pages/order-submit.page';
import { RegisterPage } from '@root/pages/register.page';

export class LoginPage extends BasePage {
    url = '/login.html'

    constructor(page: Page) {
        super(page);
    }

    userNameInput = this.page.locator('input#user');
    passwordInput = this.page.locator('input#password');
    loginButton = this.page.locator('button#login');
    rememberCheckbox = this.page.getByLabel('Remember me');
    newUserLink = this.page.getByText('New user? Register!');
    errorMessage = this.page.locator('span#message');

    async enterUserName(userName: string): Promise<void> {
        await this.userNameInput.fill(userName);
    }

    async enterUserPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async checkRememberMeCheckbox(): Promise<void> {
        await this.rememberCheckbox.check();
    }

    async clickOnNewUserLink(): Promise<RegisterPage> {
        await this.newUserLink.click();
        return new RegisterPage(this.page);
    }

    async logUser(userName: string, password: string): Promise<OrderSubmitPage> {
        await this.enterUserName(userName);
        await this.enterUserPassword(password);
        await this.clickOnLoginButton();
        return new OrderSubmitPage(this.page);
    }
}