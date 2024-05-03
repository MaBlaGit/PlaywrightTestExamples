import { test, expect } from '@root/fixtures/merge.fixture';
import { credentials } from '@root/helpers/credentials.helper';

test.describe('Login form tests', () => {
    test('should be able to login with valid credentials', async ({ loginPage }) => {
        const { username, password } = credentials.valid;
        const headerText = 'Dinesh\'s Pizza House';

        const orderSubmitPage = await loginPage.logUser(username, password);
        expect(orderSubmitPage.orderSubmitHeader).toHaveText(headerText);
    });

    for(const { username, password } of credentials.invalid) {
        test(`shouldn't be able to login with ${username} and ${password}`, async({ loginPage }) => {
            const errorMessage = 'Incorrect username or password. Try again!!'

            await loginPage.enterUserName(username);
            await loginPage.enterUserPassword(password);
            await loginPage.clickOnLoginButton();
            await expect(loginPage.errorMessage).toHaveText(errorMessage);
        });  
    }
});