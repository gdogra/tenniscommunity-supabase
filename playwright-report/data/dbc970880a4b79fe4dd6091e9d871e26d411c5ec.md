# Test info

- Name: home page should load and display heading
- Location: /Users/gautamdogra/Projects/tenniscommunity-supabase/e2e/basic.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at /Users/gautamdogra/Projects/tenniscommunity-supabase/e2e/basic.spec.ts:4:14
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test'
  2 |
  3 | test('home page should load and display heading', async ({ page }) => {
> 4 |   await page.goto('/')
    |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  5 |   await expect(page).toHaveTitle(/Tennis/i)
  6 | })
  7 |
  8 |
```