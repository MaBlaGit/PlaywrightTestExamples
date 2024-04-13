import { test, expect } from '../fixtures/merge.fixture';
import { minMax } from '../test-data/test-data';

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

	for (const data of minMax) {
		test(`should be able to handle dialog popup when ${data.state}`, async ({
			moveToWaitingConditionsPage,
		}) => {
			const alertAccepted = 'Alert handled';
			await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
			await moveToWaitingConditionsPage.clickOnShowAlertButton();
			await moveToWaitingConditionsPage.waitForPopup(data.state);
			await expect(moveToWaitingConditionsPage.alertHandledText).toHaveText(
				alertAccepted
			);
		});
	}

	// for (const range of minMaxRangePrompt) {
	// 	test(`should be able to handle prompt when "${range.state}" was selected`, async ({
	// 		moveToWaitingConditionsPage,
	// 	}) => {
	// 		const promptAccepted = 'OK';
	// 		const promptDismissed = 'Cancelled';
	// 		await moveToWaitingConditionsPage.waitFor(waitingConditionsPartialUrl);
	// 		await moveToWaitingConditionsPage.clickOnShowPromptButton();
	// 		await moveToWaitingConditionsPage.waitForPopup(range.state);
	// 		if (range.state === 'accept') {
	// 			await expect(moveToWaitingConditionsPage.promptOkText).toHaveText(
	// 				promptAccepted
	// 			);
	// 		} else {
	// 			await expect(
	// 				moveToWaitingConditionsPage.promptDismissedText
	// 			).toHaveText(promptDismissed);
	// 		}
	// 	});
	// }
});
