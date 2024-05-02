import { Page, expect } from '@playwright/test';
import { BasePage } from '@root/pages/base.page';
import { ProgrammingLanguages, ValidationMessage } from '@root/helpers/index';

export class FormPage extends BasePage {
	url = '/forms.html';

	constructor(page: Page) {
		super(page);
	}

	formHeader = this.page.getByText('Basic Form Controls');
	yearsOfExperienceInput = this.page.locator('#exp');
	selectedYearsOfExperience = this.page.locator('#exp_help');
	pythonCheckbox = this.page.locator('#check_python+label');
	javaScriptCheckbox = this.page.locator('#check_javascript');
	selectedCheckboxValidationText = this.page.locator('#check_validate');
	seleniumRadioButton = this.page.locator('#rad_selenium');
	protractorRadioButton = this.page.locator('#rad_protractor');
	primarySkillSelect = this.page.locator('#select_tool');
	chooseLanguageSelect = this.page.locator('#select_lang');
	selectedLanguageValidationText = this.page.locator('#select_lang_validate');
	notesTextarea = this.page.locator('textarea#notes');
	fileUpload = this.page.locator('input#upload_cv');
	filesUpload = this.page.locator('input#upload_files');
	fileNameValidationText = this.page.locator('span#validate_cv');
	fileNamesValidationText = this.page.locator('span#validate_files');
	downloadFileLink = this.page.locator('#download_file');
	cityInput = this.page.locator('#validationCustom03');
	cityStateInput = this.page.locator('#validationCustom04');
	cityZipInput = this.page.locator('#validationCustom05');
	termsAndConditionsCheckbox = this.page.locator('#invalidCheck');
	cityValidationMessage = this.page.locator('#invalid_city');
	stateValidationMessage = this.page.locator('#invalid_state');
	zipValidationMessage = this.page.locator('#invalid_zip');
	submitFormButton = this.page.getByRole('button', { name: 'Submit Form' });


	async enterYearsOfExperience(yearsOfExperience: string): Promise<void> {
		await this.yearsOfExperienceInput.fill(yearsOfExperience);
	}

	async selectLanguageCheckbox(lang: 'python' | 'javascript'): Promise<void> {
		lang === 'python'
			? await this.pythonCheckbox.click()
			: await this.javaScriptCheckbox.click();
	}

	async selectFramework(framework: 'selenium' | 'protractor'): Promise<void> {
		framework === 'selenium'
			? await this.seleniumRadioButton.click()
			: await this.protractorRadioButton.click();
	}

	async selectPrimarySkills(
		skill: 'selenium' | 'protractor' | 'cypress'
	): Promise<void> {
		switch (skill) {
			case 'selenium':
				await this.primarySkillSelect.selectOption({ label: 'Selenium' });
				break;
			case 'protractor':
				await this.primarySkillSelect.selectOption({ label: 'Protractor' });
				break;
			case 'cypress':
				await this.primarySkillSelect.selectOption({ label: 'Cypress' });
				break;
		}
	}
	async selectLanguage(
		langs: ProgrammingLanguages[]
	): Promise<void> {
		for (let lang of langs) {
			this.page
				.locator(`option[value=${lang.toLowerCase()}]`)
				.click({ modifiers: ['Control'] });
		}
	}

	async enterNote(note: string): Promise<void> {
		await this.notesTextarea.fill(note);
	}

	async uploadSingleFile(fileName: string): Promise<void> {
		await this.fileUpload.setInputFiles(`../test-files/${fileName}`);
	}

	async uploadMultipleFiles(...fileNames: string[]): Promise<void> {
		const uploadFilesArray = fileNames.map((fileName) => {
			return `../test-files/${fileName}`;
		});
		await this.filesUpload.setInputFiles(uploadFilesArray);
	}

	async fillFormWitValidations(
		city: string,
		state: string,
		zip: string,
		termsAndConditions?: boolean
	): Promise<void> {
		await this.cityInput.fill(city);
		await this.cityStateInput.fill(state);
		await this.cityZipInput.fill(zip);
		if (termsAndConditions) {
			const responsePromise = this.page.waitForRequest(
				(request) =>
					request.url().includes('/forms.html?') && request.method() === 'GET'
			);
			await this.termsAndConditionsCheckbox.click();
			await this.submitFormButton.click();
			await responsePromise;
		}
		await this.submitFormButton.click();
	}

	async assertFormErrorMessages(validationMsgCity: ValidationMessage,
								  validationMsgState: ValidationMessage, 
								  validationMsgZip: ValidationMessage): Promise<void> {
		if(validationMsgCity.isVisible) {
			await expect(this.cityValidationMessage).toHaveText(validationMsgCity.msg);
		} else {
			await expect(this.cityValidationMessage).not.toBeVisible();
		}

		if(validationMsgState.isVisible) {
			await expect(this.stateValidationMessage).toHaveText(validationMsgState.msg);
		} else {
			await expect(this.stateValidationMessage).not.toBeVisible();
		}
		if(validationMsgZip.isVisible) {
			await expect(this.zipValidationMessage).toHaveText(validationMsgZip.msg);
		} else {
			await expect(this.zipValidationMessage).not.toBeVisible();
		}
	}
}
