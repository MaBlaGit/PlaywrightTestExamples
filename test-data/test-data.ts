import { Alert, AddressForm, FormInputData, Prompt, MinMaxRange } from '@root/helpers/index';

export const ranges: {min: number, max: number}[] = [
	{ min: 1, max: 2 },
	{ min: 1, max: 3 },
	{ min: 2, max: 6 },
]


export const minMaxAlert: Alert = {
	state: 'accept',
	ranges,
};

export const minMaxPrompt: Array<Prompt> = [
	{
		state: 'accept',
		range: { min: 1, max: 1 },
	},
	{
		state: 'dismiss',
		range: { min: 1, max: 2 },
	},
];

export const minSecMaxSec: MinMaxRange = {
	min: 1,
	max: 3,
};

export const formInputsData: FormInputData = {
	checkboxLang: 'python',
	validationCheckboxLang: 'PYTHON',
	frameworkName: 'selenium',
	skillsName: 'cypress',
	programmingLangs: ['Python', 'TypeScript'],
	selectedLangsValidation: 'python,typescript',
	yearsOfExperience: '5',
	noteText: 'This is a test note!',
	fixtureFileOne: 'fixture_1.png',
	fixtureFileTwo: 'fixture_2.png',
	fixtureFileTextValidation: 'fixture_1.png fixture_2.png',
	city: 'Warsaw',
	state: 'Masovian',
	zip: '00-283',
}

export const addressFormData: AddressForm[] = [
	{
		testCase: 'all empty',
		city: '',
	 	state: '', 
	 	zip: '',
		agreementMsgCheckbox: false,
	 	validationMsgCity: { isVisible: true, msg: 'Please provide a valid city.' }, 
	 	validationMsgState: { isVisible: true, msg: 'Please provide a valid state.' }, 
	 	validationMsgZip: {isVisible: true, msg: 'Please provide a valid zip.' },
		validationMsgCheckbox: {isVisible: true, msg: 'You must agree before submitting.' },
	},
	{
		testCase: 'only city',
		city: 'Poznan',
		state: '', 
		zip: '',
	   	agreementMsgCheckbox: false,
		validationMsgCity: { isVisible: false, msg: '' },
		validationMsgState: { isVisible: true, msg: 'Please provide a valid state.' }, 
		validationMsgZip: { isVisible: true, msg: 'Please provide a valid zip.' },
		validationMsgCheckbox: { isVisible: true, msg: 'You must agree before submitting.' },
	},
	{
		testCase: 'city and state',
		city: 'Poznan',
		state: 'Greater Poland', 
		zip: '',
	   	agreementMsgCheckbox: false,
		validationMsgCity: { isVisible: false, msg: '' },
		validationMsgState: { isVisible: false, msg: '' },
		validationMsgZip: { isVisible: true, msg: 'Please provide a valid zip.' },
		validationMsgCheckbox:  { isVisible: true, msg: 'You must agree before submitting.' },
	},
	{	
		testCase: 'city, state and zip',
		city: 'Poznan',
		state: 'Greater Poland', 
		zip: '64-323',
	   	agreementMsgCheckbox: false,
		validationMsgCity: { isVisible: false, msg: '' },
		validationMsgState: { isVisible: false, msg: '' },
		validationMsgZip: { isVisible: false, msg: '' },
		validationMsgCheckbox:  { isVisible: true, msg: 'You must agree before submitting.' },
	}
]
