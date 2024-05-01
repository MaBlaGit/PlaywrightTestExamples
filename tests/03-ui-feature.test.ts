import { test, expect } from '../fixtures/merge.fixture';

test.describe('UI feature test', () => {
    
    test('should be able to read and pass rating stars', async ({ uiFeaturePage }) => {
        const successMessage = 'Well done!';
        await expect(uiFeaturePage.headerText).toBeVisible();
        await uiFeaturePage.enterStarsIntoRatingInput();
        await uiFeaturePage.clickOnCheckRatingButton();
        await expect(uiFeaturePage.successText).toHaveText(successMessage);
    });
});