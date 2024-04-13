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
		waitingConditionsPage,
	}) => {
		await expect(playgroundPage.playgroundPageHeader).toHaveText(
			playgroundHeader
		);
		await playgroundPage.selectExpectedConditions();
		expect(waitingConditionsPage.currentPage.url()).toContain(
			waitingConditionsPartialUrl
		);
	});

	for (const second of Object.values(minMaxAlert.ranges)) {
		test(`should be able to handle dialog between ${second.min} - ${second.max} sec`, async ({
			moveToWaitingConditionsPage,
		}) => {
			const alertAccepted = 'Alert handled';
			await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await moveToWaitingConditionsPage.manageMinMaxWait(
				second.min,
				second.max
			);
			await moveToWaitingConditionsPage.clickOnShowAlertButton();
			await moveToWaitingConditionsPage.waitForPopup(minMaxAlert.state);
			await expect(moveToWaitingConditionsPage.alertHandledText).toHaveText(
				alertAccepted
			);
		});
	}

	for (const { state, range } of minMaxPrompt) {
		test(`should be able to handle prompt when "${state}" in range ${range.min} - ${range.max} sec`, async ({
			moveToWaitingConditionsPage,
		}) => {
			const promptAccepted = 'OK';
			const promptDismissed = 'Cancelled';
			const acceptedState = 'accept';

			await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await moveToWaitingConditionsPage.manageMinMaxWait(range.min, range.max);
			await moveToWaitingConditionsPage.clickOnShowPromptButton();
			await moveToWaitingConditionsPage.waitForPopup(state);
			state === acceptedState
				? await expect(moveToWaitingConditionsPage.promptOkText).toHaveText(
						promptAccepted
				  )
				: await expect(
						moveToWaitingConditionsPage.promptDismissedText
				  ).toHaveText(promptDismissed);
		});
	}

	test('"Click Me" button should be visible after cartain amount of time', async ({
		moveToWaitingConditionsPage,
	}) => {
		const clickMeButtonText = 'Click Me';
		const { min, max } = minSecMaxSec;
		await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
		await moveToWaitingConditionsPage.manageMinMaxWait(min, max);
		await moveToWaitingConditionsPage.clickOnVisibilityTriggerButton();
		await expect(moveToWaitingConditionsPage.clickMeVisibleButton).toHaveText(
			clickMeButtonText
		);
	});

	test('should trigger spinner dissaperance after button click', async ({
		moveToWaitingConditionsPage,
	}) => {
		const spinnerGoneMessage = 'Thank God that spinner is gone!';
		const { min, max } = minSecMaxSec;
		await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
		await moveToWaitingConditionsPage.manageMinMaxWait(min, max);
		await moveToWaitingConditionsPage.clickDissaperanceButton();
		const spinner = moveToWaitingConditionsPage.spinnerVisible;
		await spinner.waitFor({ state: 'hidden' });
		await expect(moveToWaitingConditionsPage.spinnerInvisible).toHaveText(
			spinnerGoneMessage
		);
	});
});
