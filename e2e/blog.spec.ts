import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('renders blog list page with post cards', async ({ page }) => {
    await page.goto('/blog');

    await expect(page.getByRole('heading', { name: 'Our Blog' })).toBeVisible();

    // Post cards are links to /blog/[slug]
    const firstCardLink = page.locator('a[href^="/blog/post-"]').first();
    await expect(firstCardLink).toBeVisible();
  });

  test('navigates from list to a blog post detail page', async ({ page }) => {
    await page.goto('/blog');

    const firstCardLink = page.locator('a[href="/blog/post-1"]').first();
    await firstCardLink.click();

    // Title comes from mock API data
    await expect(page).toHaveURL(/\/blog\/post-1$/);
    await expect(page.locator('h1')).toContainText('The Future of AI Voice');
    await expect(page.getByText(/Published on/i)).toBeVisible();
  });

  test('unknown slug shows not found', async ({ page }) => {
    const res = await page.goto('/blog/this-does-not-exist');
    // Next.js default is 404; content can vary between dev/prod.
    expect(res?.status()).toBe(404);
  });
});

