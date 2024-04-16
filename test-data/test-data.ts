import { Alert, Prompt, MinMaxRange } from '../helpers/index';

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
