import { test, expect } from '../fixtures/merge.fixture';
import {
	minMaxAlert,
	minMaxPrompt,
	minSecMaxSec,
} from '../test-data/test-data';

test.describe('Testing different types of waits', () => {
	const playgroundHeader = 'The Playground';
	const waitingConditionsPartialUrl = '/expected_conditions.html';

	test('should be able navigate to Waiting Conditions page', async ({
		playgroundPage,
	}) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		const waitingConditionsPage =
			await playgroundPage.selectExpectedConditions();
		expect(waitingConditionsPage.currentPage.url()).toContain(
			waitingConditionsPartialUrl
		);
	});

	for (const second of Object.values(minMaxAlert.ranges)) {
		test(`should be able to handle dialog between ${second.min} - ${second.max} sec`, async ({
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
		test(`should be able to handle prompt when "${state}" in range ${range.min} - ${range.max} sec`, async ({
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
});