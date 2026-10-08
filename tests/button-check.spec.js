const { test, expect } = require('@playwright/test');

const baseURL = 'http://127.0.0.1:4173';

async function registerErrors(page) {
  const errors = [];
  page.on('console', function (message) {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', function (error) {
    errors.push(error.message);
  });
  return errors;
}

test('home navigation and main buttons work without console errors', async ({ page }) => {
  const errors = await registerErrors(page);

  await page.goto(baseURL + '/#/home');
  await expect(page).toHaveURL(/#\/home/);

  await page.getByRole('button', { name: 'Continue where I left off' }).click();
  await expect(page).toHaveURL(/#\/unit\/1\/overview/);

  await page.goto(baseURL + '/#/home');
  await page.getByRole('button', { name: 'AP Exam' }).click();
  await expect(page).toHaveURL(/#\/exam/);

  await page.getByRole('button', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL(/#\/dashboard/);

  await page.goto(baseURL + '/#/home');
  await page.getByRole('button', { name: 'Daily 10' }).click();
  await expect(page).toHaveURL(/#\/dashboard/);

  await page.goto(baseURL + '/#/home');
  await page.getByRole('button', { name: 'Unit 2' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/overview/);

  await page.getByRole('button', { name: 'How To' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/howto/);

  await page.getByRole('button', { name: 'Lessons' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/lessons/);

  await page.getByRole('button', { name: 'Practice' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/practice/);

  await page.getByRole('button', { name: 'Unit Quiz' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/unit-quiz/);

  await page.getByRole('button', { name: 'Flashcards' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/flashcards/);

  expect(errors).toEqual([]);
});

test('settings, breadcrumbs, and lesson controls work', async ({ page }) => {
  const errors = await registerErrors(page);

  await page.goto(baseURL + '/#/unit/2/howto');
  await page.getByRole('button', { name: '⚙' }).click();
  await expect(page.locator('#settings-panel')).toHaveClass(/open/);

  await page.getByRole('button', { name: 'Dark mode' }).click();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('button', { name: 'Home' }).click();
  await expect(page).toHaveURL(/#\/home/);

  await page.goto(baseURL + '/#/unit/2/lessons');
  const lessonButton = page.locator('[data-action="open-lesson"]').first();
  await lessonButton.click();
  await expect(page).toHaveURL(/#\/unit\/2\/lesson\/2\.1\/slide\/1/);

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/lesson\/2\.1\/slide\/2/);

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page).toHaveURL(/#\/unit\/2\/lesson\/2\.1\/slide\/1/);

  await page.getByRole('button', { name: 'Restart lesson' }).click();
  await page.on('dialog', dialog => dialog.accept());
  await expect(page).toHaveURL(/#\/unit\/2\/lesson\/2\.1\/slide\/1/);

  const search = page.locator('[data-role="recipe-search"]');
  if (await search.count()) {
    await search.fill('friction');
    await expect(page.locator('.recipe-card')).toHaveCount(1);
  }

  expect(errors).toEqual([]);
});
