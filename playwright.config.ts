import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
	timeout: 15_000,
	expect: {
		timeout: 10_000,
	},
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 1,
	workers: process.env.CI ? 2 : undefined,
	reporter: process.env.CI ? 'blob' : 'html',
	use: {
		baseURL: 'https://play1.automationcamp.ir',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'mobile',
			use: { ...devices['iPhone SE'] },
		},
	],
});
