export interface Alert {
	state: 'accept';
	ranges: { min: number; max: number }[];
}

export interface Prompt {
	state: 'accept' | 'dismiss';
	range: { min: number; max: number };
}
