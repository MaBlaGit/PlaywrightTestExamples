export interface Alert {
	state: 'accept';
	ranges: Array<MinMaxRange>;
}

export interface Prompt {
	state: 'accept' | 'dismiss';
	range: MinMaxRange;
}

interface MinMaxRange {
	min: number;
	max: number;
}

export interface FormInputData {
	checkboxLang: 'python' | 'javascript',
	validationCheckboxLang: string,
	frameworkName: 'selenium' | 'protractor',
	skillsName: 'selenium' | 'protractor' | 'cypress',
	programmingLangs: ProgrammingLanguages[],
	selectedLangsValidation: string,
	yearsOfExperience: string,
	noteText: string,
	fixtureFileOne: string,
	fixtureFileTwo: string,
	fixtureFileTextValidation: string,
	city: string,
	state: string,
	zip: string,
}

export interface AddressForm {
	testCase: string;
	city: string;
	state: string;
	zip: string;
	agreementMsgCheckbox: boolean;
	validationMsgCity: ValidationMessage;
	validationMsgState: ValidationMessage;
	validationMsgZip: ValidationMessage;
	validationMsgCheckbox: ValidationMessage;
  }

  export interface ValidationMessage {
	isVisible: boolean;
	msg: string;
  }
  
  export type ProgrammingLanguages = 'Java' | 'Python' | 'JavaScript' | 'TypeScript';

  export interface Credentials {
	valid: UsernameAndPassword,
	invalid: UsernameAndPassword[],
  }

  interface UsernameAndPassword {
	username: string,
	password: string
  }

