import { test, expect } from '../fixtures/merge.fixture';

test.describe('Basic Form tests', () => {
	test(`should be able to send form with all data`, async ({ formPage }) => {
		await expect(formPage.formHeader).toBeVisible();
		await formPage.selectLanguageCheckbox('python');
		await expect(formPage.selectedCheckboxValidationText).toHaveText('PYTHON');
		await formPage.selectFramework('selenium');
		await formPage.selectPrimarySkills('cypress');
		await formPage.enterYearsOfExperience(5);
		await formPage.selectLanguage('Python', 'TypeScript');
		await expect(formPage.selectedLanguageValidationText).toContainText('python,typescript');
		//await expect(formPage.selectedYearsOfExperience).toHaveText('5');
	});
});
