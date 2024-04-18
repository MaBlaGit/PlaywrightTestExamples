import { Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';

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
	fileNameValidationText = this.page.locator('span#validate_cv');

	async enterYearsOfExperience(yearsOfExperience: number): Promise<void> {
		await this.yearsOfExperienceInput.fill(yearsOfExperience.toString());
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
		...langs: ('Java' | 'Python' | 'JavaScript' | 'TypeScript')[]
	): Promise<void> {
		for(let lang of langs) {
			this.page.locator(`option[value=${lang.toLowerCase()}]`)
					 .click({modifiers: ['Control']});
		}
	}

	async enterNote(note: string):Promise<void> {
		await this.notesTextarea.fill(note);
	}

	async uploadSingleFile(fileName: string):Promise<void> {
		await this.fileUpload.click();
		await this.fileUpload.setInputFiles(`../test-files/${fileName}`);
	}
}
