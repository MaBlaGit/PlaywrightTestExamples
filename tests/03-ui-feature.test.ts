import { test, expect } from '../fixtures/merge.fixture';

test.describe('UI feature test', () => {
    const successMessage = 'Well done!';
    const errorMessage = 'Try Again!';
    const wrongRating = '********';

    test('should be able to read and pass rating stars', async ({ uiFeaturePage }) => {
        await expect(uiFeaturePage.headerText).toBeVisible();
        await uiFeaturePage.enterStarsIntoRatingInput();
        await uiFeaturePage.clickOnCheckRatingButton();
        await expect(uiFeaturePage.successText).toHaveText(successMessage);
    });

    test('should be validated and accepted after passing correct rating', async ({ uiFeaturePage }) => {
        await expect(uiFeaturePage.headerText).toBeVisible();
        await uiFeaturePage.enterStarsIntoRatingInput(wrongRating);
        await uiFeaturePage.clickOnCheckRatingButton();
        await expect(uiFeaturePage.successText).toHaveText(errorMessage);
        await uiFeaturePage.clearRatingInput();
        await uiFeaturePage.enterStarsIntoRatingInput();
        await uiFeaturePage.clickOnCheckRatingButton();
        await expect(uiFeaturePage.successText).toHaveText(successMessage);
    });
});