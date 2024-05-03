import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';

export class RegisterPage extends BasePage {
    url = '/register.html';

    constructor(page: Page) {
        super(page);
    }

    registerHeader = this.page.getByText('Register');
}