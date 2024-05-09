import { test, expect } from '@root/fixtures/merge.fixture';

test.describe('Handing browser tabs', () => {
    const popupWindowButtonName = 'Open New Window 1';
    const iFrameButton = 'Click Me 2';
    const iFrameButtonClicked = 'Clicked';

    test('should be able open new tab after click on "Open New Window 1" button', async ({ popupWindowsPage }) => {
        await expect(popupWindowsPage.windowOneButton).toHaveText(popupWindowButtonName);
        const newWindowTab = await popupWindowsPage.clickOnWindowOneButton();
        await expect(newWindowTab.clickMeButton).toHaveText(iFrameButton);
        await newWindowTab.clickClickMeButton();
        await expect(newWindowTab.clickMeButton).toHaveText(iFrameButtonClicked);
    });
});