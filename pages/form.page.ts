import { Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';

export class FormPage extends BasePage {
	url = '/forms.html';

	constructor(page: Page) {
		super(page);
	}

	yearsOfExperienceInput = this.page.locator('#exp');
	pythonCheckbox = this.page.locator('#check_python');
	javaScriptCheckbox = this.page.locator('#check_javascript');
	seleniumRadioButton = this.page.locator('#rad_selenium');
	protractorRadioButton = this.page.locator('#rad_protractor');
	primarySkillSelect = this.page.locator('#select_tool');

	async enterYearsOfExperience(yearsOfExperience: number): Promise<void> {
		await this.yearsOfExperienceInput.fill(yearsOfExperience.toString());
	}

	async selectLanguageCheckbox(lang: 'python' | 'selenium'): Promise<void> {
		lang === 'python'
			? await this.pythonCheckbox.check()
			: await this.javaScriptCheckbox.check();
	}

	async selectFramework(framework: 'selenium' | 'protractor'): Promise<void> {
		framework === 'selenium'
			? await this.seleniumRadioButton.click()
			: await this.protractorRadioButton.check();
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
}
