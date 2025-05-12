import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  retries: 1, // optional: retry failed tests once
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry'
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
})

