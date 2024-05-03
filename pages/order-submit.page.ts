import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';

export class OrderSubmitPage extends BasePage {
    url='/order_submit.html';

    constructor(page: Page) {
        super(page);
    }

    orderSubmitHeader = this.page.getByText('Dinesh\'s Pizza House');
}
