import { test, expect } from '../fixtures/merge.fixture';
import { minMaxAlert, minMaxPrompt } from '../test-data/test-data';

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

			await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await moveToWaitingConditionsPage.manageMinMaxWait(range.min, range.max);
			await moveToWaitingConditionsPage.clickOnShowPromptButton();
			await moveToWaitingConditionsPage.waitForPopup(state);
			state === 'accept'
				? await expect(moveToWaitingConditionsPage.promptOkText).toHaveText(
						promptAccepted
				  )
				: await expect(
						moveToWaitingConditionsPage.promptDismissedText
				  ).toHaveText(promptDismissed);
		});
	}
});
