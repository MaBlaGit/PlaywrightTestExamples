import { test, expect } from '../fixtures/merge.fixture';

test.describe('Basic Form tests', () => {
	test.only(`should be able to send form with all data`, async ({ page, formPage }) => {
		await formPage.waitFor('/forms.html');
		await expect(formPage.formHeader).toBeVisible();
		await formPage.selectLanguageCheckbox('python');
		await expect(formPage.selectedCheckboxValidationText).toHaveText('PYTHON');
		await formPage.selectFramework('selenium');
		await formPage.selectPrimarySkills('cypress');
		await formPage.selectLanguage('Python', 'TypeScript');
		await formPage.enterYearsOfExperience(5);
		await expect(formPage.selectedYearsOfExperience).toHaveText('5');
		await expect(formPage.selectedLanguageValidationText).toContainText('python,typescript');
		await formPage.enterNote('This is a test note!');
		await formPage.uploadSingleFile('fixture_1.png');
		await expect(formPage.fileNameValidationText).toHaveText('fixture_1.png');
		await formPage.uploadMultipleFiles('fixture_1.png', 'fixture_2.png');
		await expect(formPage.fileNamesValidationText).toContainText('fixture_1.png fixture_2.png');
	});
});
