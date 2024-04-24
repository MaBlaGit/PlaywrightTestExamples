import { Alert, Prompt, MinMaxRange, AddressForm } from '../helpers/index';

export const minMaxAlert: Alert = {
	state: 'accept',
	ranges: [
		{ min: 1, max: 1 },
		{ min: 1, max: 2 },
		{ min: 2, max: 4 },
	],
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
