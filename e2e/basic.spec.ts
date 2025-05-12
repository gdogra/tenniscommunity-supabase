import { test, expect } from '@playwright/test'

test('home page should load and display heading', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Tennis/i)
})

