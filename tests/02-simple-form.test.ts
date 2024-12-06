import { test, expect } from '@root/fixtures/merge.fixture';
import { addressFormData, formInputsData } from '@root/test-data/test-data';

test.describe('Basic Form tests', () => {

	test(`should be able to send form with all data`, { tag: '@fix-on-mobile' }, async ({ formPage }) => {
		await formPage.selectLanguageCheckbox(formInputsData.checkboxLang);
		await expect(formPage.selectedCheckboxValidationText).toHaveText(formInputsData.validationCheckboxLang);
		await formPage.selectFramework(formInputsData.frameworkName);
		await formPage.selectPrimarySkills(formInputsData.skillsName);
		await formPage.selectLanguage(formInputsData.programmingLangs);
		await formPage.enterYearsOfExperience(formInputsData.yearsOfExperience);
		await expect(formPage.selectedYearsOfExperience).toHaveText(formInputsData.yearsOfExperience);
		await expect(formPage.selectedLanguageValidationText).toContainText(formInputsData.selectedLangsValidation);
		await formPage.enterNote(formInputsData.noteText);
		await formPage.uploadSingleFile(formInputsData.fixtureFileOne);
		await expect(formPage.fileNameValidationText).toHaveText(formInputsData.fixtureFileOne);
		await formPage.uploadMultipleFiles(formInputsData.fixtureFileOne, formInputsData.fixtureFileTwo);
		await expect(formPage.fileNamesValidationText).toContainText(formInputsData.fixtureFileTextValidation);
		await formPage.fillFormWithValidations(formInputsData.city, formInputsData.state, formInputsData.zip, true);
	});

	for(let address of addressFormData) {
		const { testCase, city, state, zip, agreementMsgCheckbox, 
			    validationMsgCity, validationMsgState, validationMsgZip } = address;
		test(`should be able to trigger validation when - ${testCase} inputs`, async({ formPage }) => {
			await formPage.fillFormWithValidations(city, state, zip, agreementMsgCheckbox);
			await formPage.assertFormErrorMessages(validationMsgCity, validationMsgState, validationMsgZip);
		})
	}
});
