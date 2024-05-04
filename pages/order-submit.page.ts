import { Page } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';
import { Size, Flavour, Sauces, Toppings } from '@root/helpers/index';

export class OrderSubmitPage extends BasePage {
    url='/order_submit.html';

    constructor(page: Page) {
        super(page);
    }

    orderSubmitHeader = this.page.getByText('Dinesh\'s Pizza House');
    pizzaFlavourSelect = this.page.locator('#select_flavor');
    quantityInput = this.page.locator('input#quantity');
    addToCartButton = this.page.getByRole('button', {name: 'Add to Cart'});
    addToCartSpinnerMessage = this.page.locator('#wait_pizza_add > span');
    addedToCardSuccessMessage = this.page.getByRole('heading', {name: 'Pizza added to the cart!'});
    
    pizzaSize = {
        large: this.page.locator('#rad_large'),
        medium: this.page.locator('#rad_medium'),
        small: this.page.locator('#rad_small'),
    }

    sauces = {
        marinara: this.page.locator('#rad_marinara'),
        buffalo: this.page.locator('#rad_buffalo'),
        barbeque: this.page.locator('#rad_barbeque'),
    }

    toppings = {
        onions: this.page.getByLabel('Onions'),
        green_olive: this.page.getByLabel('Green Olive'),
        tomatoes: this.page.getByLabel('Tomatoes'),
    }

    async selectPizzaSize(size: Size): Promise<void> {
        await this.pizzaSize[size].click();
    }

    async selectPizzaFlavour(flavour: Flavour): Promise<void> {
        await this.pizzaFlavourSelect.selectOption({value: flavour});
    }

    async selectSauce(sauce: Sauces): Promise<void> {
        await this.sauces[sauce].click();
    }

    async selectToppings(topping: Toppings): Promise<void> {
        await this.toppings[topping].check();
    }

    async enterQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(quantity.toString());
    }

    async clickOnAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
