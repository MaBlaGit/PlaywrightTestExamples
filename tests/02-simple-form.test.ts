import { test, expect } from '../fixtures/merge.fixture';
import { addressFormData } from '../test-data/test-data';
import { ProgrammingLanguages } from '../helpers/index';

test.describe('Basic Form tests', () => {
	test(`should be able to send form with all data`, async ({ formPage }) => {

		const checkboxLang = 'python';
		const validationCheckboxLang = 'PYTHON';
		const frameworkName = 'selenium'
		const skillsName = 'cypress';
		const programmingLangs: ProgrammingLanguages[] = ['Python', 'TypeScript'];
		const selectedLangsValidation = 'python,typescript';
		const yearsOfExperience = '5';
		const noteText = 'This is a test note!'
		const fixtureFileOne = 'fixture_1.png';
		const fixtureFileTwo = 'fixture_2.png'
		const fixtureFileTextValidation = 'fixture_1.png fixture_2.png';
		const city = 'Warsaw';
		const state = 'Masovian';
		const zip = '00-283';

		await formPage.selectLanguageCheckbox(checkboxLang);
		await expect(formPage.selectedCheckboxValidationText).toHaveText(validationCheckboxLang);
		await formPage.selectFramework(frameworkName);
		await formPage.selectPrimarySkills(skillsName);
		await formPage.selectLanguage(programmingLangs);
		await formPage.enterYearsOfExperience(yearsOfExperience);
		await expect(formPage.selectedYearsOfExperience).toHaveText(yearsOfExperience);
		await expect(formPage.selectedLanguageValidationText).toContainText(selectedLangsValidation);
		await formPage.enterNote(noteText);
		await formPage.uploadSingleFile(fixtureFileOne);
		await expect(formPage.fileNameValidationText).toHaveText(fixtureFileOne);
		await formPage.uploadMultipleFiles(fixtureFileOne, fixtureFileTwo);
		await expect(formPage.fileNamesValidationText).toContainText(fixtureFileTextValidation);
		await formPage.fillFormWitValidations(city, state, zip, true);
	});

	for(let address of addressFormData) {
		const { testCase, city, state, zip, agreementMsgCheckbox, 
			    validationMsgCity, validationMsgState, validationMsgZip } = address;
		test(`should be able to trigger validation when - ${testCase} inputs`, async({ formPage }) => {
			await formPage.fillFormWitValidations(city, state, zip, agreementMsgCheckbox);
			await formPage.assertFormErrorMessages(validationMsgCity, validationMsgState, validationMsgZip);
		})
	}
});
