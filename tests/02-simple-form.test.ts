import { test, expect } from '../fixtures/merge.fixture';

test.describe('Basic Form tests', () => {
	test(`should be able to send form with all data`, async ({ formPage }) => {
		await expect(formPage.formHeader).toBeVisible();
		await formPage.selectLanguageCheckbox('python');
		await expect(formPage.selectedCheckboxValidationText).toHaveText('PYTHON');
		await formPage.selectFramework('selenium');
		await formPage.selectPrimarySkills('cypress');
		await formPage.enterYearsOfExperience(5);
		await formPage.selectLanguage('Python');
		await expect(formPage.selectedLanguageValidationText).toHaveText('python');
		//await expect(formPage.selectedYearsOfExperience).toHaveText('5');
	});
});
