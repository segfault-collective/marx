import { expect, type Page } from '@playwright/test';

type Theme = 'light' | 'dark';

/**
 * Asserts that the page is showing the given theme, i.e. whether the `dark`
 * class is set on the document element.
 */
export const expectTheme = async ({
  page,
  theme,
}: {
  page: Page;
  theme: Theme;
}) => {
  const html = page.locator('html');

  if (theme === 'dark') {
    await expect(html).toHaveClass(/\bdark\b/);
  } else {
    await expect(html).not.toHaveClass(/\bdark\b/);
  }
};

/**
 * Stores a theme choice in local storage before any page script runs, as if
 * the visitor had picked it on a previous visit. Applies to every navigation
 * of the page.
 */
export const storeTheme = async ({
  page,
  theme,
}: {
  page: Page;
  theme: Theme;
}) => {
  await page.addInitScript((theme) => {
    localStorage.setItem('theme', theme);
  }, theme);
};
