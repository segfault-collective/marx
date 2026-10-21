import { expect, test, type Locator, type Page } from '@playwright/test';

// Requests every link's target and returns the ones that don't respond with
// the expected content type, so that all broken links are reported at once.
const findBrokenLinks = async ({
  page,
  links,
  contentType,
}: {
  page: Page;
  links: Locator;
  contentType: string;
}) => {
  const hrefs = await links.evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute('href') ?? '')
  );
  expect(hrefs.length).toBeGreaterThan(0);

  const broken: string[] = [];
  for (const href of new Set(hrefs)) {
    const response = await page.request.get(href);
    if (
      !response.ok() ||
      !response.headers()['content-type']?.includes(contentType)
    ) {
      broken.push(href);
    }
  }

  return broken;
};

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens a session', async ({ page }) => {
    await page.getByRole('link', { name: /^5η Συνάντηση/ }).click();

    await expect(page).toHaveURL('/blog/5-commodity-fetishism-1');
    await expect(
      page.getByRole('heading', { level: 1, name: /^5η Συνάντηση/ })
    ).toBeVisible();
  });

  test('opens a marginalia', async ({ page }) => {
    await page.getByRole('link', { name: /Dancing Tables/ }).click();

    await expect(page).toHaveURL('/marginalia/5-marginalia-1-dancing-tables');
    await expect(
      page.getByRole('heading', { level: 1, name: /Dancing Tables/ })
    ).toBeVisible();
  });

  test('links only to existing sessions and marginalia', async ({ page }) => {
    const broken = await findBrokenLinks({
      page,
      links: page.locator('a[href^="/blog/"], a[href^="/marginalia/"]'),
      contentType: 'text/html',
    });

    expect(broken).toEqual([]);
  });

  test('links only to existing documents', async ({ page }) => {
    const broken = await findBrokenLinks({
      page,
      links: page.locator('a[download]'),
      contentType: 'application/pdf',
    });

    expect(broken).toEqual([]);
  });
});
