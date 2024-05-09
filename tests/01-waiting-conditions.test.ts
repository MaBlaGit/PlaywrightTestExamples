import { test, expect } from '@root/fixtures/merge.fixture';
import {
	minMaxAlert,
	minMaxPrompt,
	minSecMaxSec,
	ranges,
} from '@root/test-data/test-data';

test.describe('Testing different types of waits', () => {
	const playgroundHeader = 'The Playground';
	const waitingConditionsPartialUrl = '/expected_conditions.html';

	test('should be 8 sections on the page', async ({ waitingConditionsPage }) => {
		const numberOfSections = 8;
		await expect(waitingConditionsPage.pageSections).toHaveCount(numberOfSections);
	});

	test('should be able navigate to "Waiting Conditions" page', async ({
		playgroundPage,
	}) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		const waitingConditionsPage = await playgroundPage.selectExpectedConditions();
		expect(waitingConditionsPage.currentPage.url()).toContain(waitingConditionsPage.url);
	});

	test('should be able navigate to "Popup Windows" page', async({ playgroundPage }) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		const popupWindowsPage = await playgroundPage.selectPopupWindowsPage();
		expect(popupWindowsPage.currentPage.url()).toContain(popupWindowsPage.url);
	});

	test('should be able to navigate to "Advanced UI feature" page', async({ playgroundPage }) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		const uiFeaturePage = await playgroundPage.selectSpecialUIFeature();
		expect(uiFeaturePage.currentPage.url()).toContain(uiFeaturePage.url);
	});

	test('should be able to navigate to "Sample Pages" page', async({ playgroundPage }) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		const loginPage = await playgroundPage.selectSamplePages();
		expect(loginPage.currentPage.url()).toContain(loginPage.url);
	});

	for (const second of Object.values(minMaxAlert.ranges)) {
		const waitTime = second.max - second.min;
		test(`should be able to handle dialog in ~${waitTime} sec`, async ({
			waitingConditionsPage,
		}) => {
			const alertAccepted = 'Alert handled';
			await waitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await waitingConditionsPage.manageMinMaxWait(second.min, second.max);
			await waitingConditionsPage.clickOnShowAlertButton();
			await waitingConditionsPage.waitForPopup(minMaxAlert.state);
			await expect(waitingConditionsPage.alertHandledText).toHaveText(
				alertAccepted
			);
		});
	}

	for (const { state, range } of minMaxPrompt) {
		const waitTime = range.max - range.min;
		test(`should be able to handle prompt in ~${waitTime} sec when "${state}"`, async ({
			waitingConditionsPage,
		}) => {
			const promptAccepted = 'OK';
			const promptDismissed = 'Cancelled';
			const acceptedState = 'accept';

			await waitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await waitingConditionsPage.manageMinMaxWait(range.min, range.max);
			await waitingConditionsPage.clickOnShowPromptButton();
			await waitingConditionsPage.waitForPopup(state);
			state === acceptedState
				? await expect(waitingConditionsPage.promptOkText).toHaveText(
						promptAccepted
				  )
				: await expect(waitingConditionsPage.promptDismissedText).toHaveText(
						promptDismissed
				  );
		});
	}

	test('"Click Me" button should be visible after certain amount of time', async ({
		waitingConditionsPage,
	}) => {
		const clickMeButtonText = 'Click Me';
		const { min, max } = minSecMaxSec;
		await waitingConditionsPage.waitFor(waitingConditionsPartialUrl);
		await waitingConditionsPage.manageMinMaxWait(min, max);
		await waitingConditionsPage.clickOnVisibilityTriggerButton();
		await expect(waitingConditionsPage.clickMeVisibleButton).toHaveText(
			clickMeButtonText
		);
	});

	test('should trigger spinner disappearance after button click', async ({
		waitingConditionsPage,
	}) => {
		const spinnerState = 'hidden';
		const spinnerGoneMessage = 'Thank God that spinner is gone!';
		const { min, max } = minSecMaxSec;
		await waitingConditionsPage.waitFor(waitingConditionsPartialUrl);
		await waitingConditionsPage.manageMinMaxWait(min, max);
		await waitingConditionsPage.clickDisappearanceButton();
		const spinner = waitingConditionsPage.spinnerVisible;
		await waitingConditionsPage.waitForState(spinner, spinnerState);
		await expect(waitingConditionsPage.spinnerInvisible).toHaveText(
			spinnerGoneMessage
		);
	});

	for(const range of ranges) {
		const waitTime = range.max - range.min;
		test(`should be able to wait ~${waitTime} sec for button to be enabled`, async ({ waitingConditionsPage }) => {
			await waitingConditionsPage.manageMinMaxWait(range.min, range.max);
			await waitingConditionsPage.clickOnTriggerDisabledButton();
			await expect(waitingConditionsPage.enabledButton).toBeEnabled();
		});
	}

	for(const range of ranges) {
		const buttonName = 'Submit';
		const waitTime = range.max - range.min;
		test(`should button be enabled after ~${waitTime} sec`, async({ waitingConditionsPage }) => {
			await waitingConditionsPage.clickOnSpecificValuesButton();
			await expect(waitingConditionsPage.submitButton).toHaveText(buttonName);
		});
	}

	for(const range of ranges) {
		const waitTime = range.max - range.min;
		test(`should be able to wait ~${waitTime} sec for iframe and interact with it`, async({ waitingConditionsPage }) => {
			const buttonNameAfterClick = 'Clicked';
			await waitingConditionsPage.clickOnIFrameButton();
			await waitingConditionsPage.clickOnIFrameInnerButton();
			const clickedIFrameButtonName = await waitingConditionsPage.returnClickedButtonName();
			expect(clickedIFrameButtonName).toHaveText(buttonNameAfterClick);
		});
	}
});
