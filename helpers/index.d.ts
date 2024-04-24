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