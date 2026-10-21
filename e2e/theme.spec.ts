import { expect, test } from '@playwright/test';

import { expectTheme, storeTheme } from './shared/helpers';

test.describe('theme', () => {
  test.describe('with a light system preference', () => {
    // `colorScheme` emulates the CSS `prefers-color-scheme` media feature
    test.use({ colorScheme: 'light' });

    test('shows the light theme', async ({ page }) => {
      await page.goto('/');

      await expectTheme({ page, theme: 'light' });
    });

    test('shows the dark theme when it was picked before', async ({ page }) => {
      await storeTheme({ page, theme: 'dark' });

      await page.goto('/');

      await expectTheme({ page, theme: 'dark' });
    });
  });

  test.describe('with a dark system preference', () => {
    test.use({ colorScheme: 'dark' });

    test('shows the dark theme', async ({ page }) => {
      await page.goto('/');

      await expectTheme({ page, theme: 'dark' });
    });

    test('shows the light theme when it was picked before', async ({
      page,
    }) => {
      await storeTheme({ page, theme: 'light' });

      await page.goto('/');

      await expectTheme({ page, theme: 'light' });
    });

    // Module scripts are deferred, so a theme applied by them shows up only
    // after the page has been parsed and possibly painted in the light theme.
    // `readystatechange` to "interactive" fires right before deferred scripts
    // run, so the theme has to be in place by then.
    test('applies the theme before deferred scripts run', async ({ page }) => {
      await page.addInitScript(() => {
        document.addEventListener(
          'readystatechange',
          () => {
            document.documentElement.dataset.darkBeforeScripts = String(
              document.documentElement.classList.contains('dark')
            );
          },
          { once: true }
        );
      });

      await page.goto('/');

      await expect(page.locator('html')).toHaveAttribute(
        'data-dark-before-scripts',
        'true'
      );
    });
  });

  test.describe('toggling', () => {
    test.use({ colorScheme: 'light' });

    test('switches between the light and dark theme', async ({ page }) => {
      await page.goto('/');
      const toggle = page.getByRole('button', { name: 'Toggle dark mode' });

      await toggle.click();
      await expectTheme({ page, theme: 'dark' });

      await toggle.click();
      await expectTheme({ page, theme: 'light' });
    });

    test('keeps the picked theme on other pages', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: 'Toggle dark mode' }).click();
      await page.goto('/blog');

      await expectTheme({ page, theme: 'dark' });
    });
  });
});
