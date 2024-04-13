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
