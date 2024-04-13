export type StateAndRange = {
	state: 'accept' | 'dismiss';
	ranges: { min: number; max: number };
}[];
