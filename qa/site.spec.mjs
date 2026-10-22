import { test, expect } from '@playwright/test'

const publicRoutes = ['/', '/about', '/services', '/solutions', '/industries', '/projects', '/blog', '/contact', '/request-quote', '/privacy-policy', '/terms-of-service', '/services/network-installation', '/solutions/small-business-it', '/industries/corporate-offices', '/blog/office-network-planning-checklist']

for (const route of publicRoutes) test(`loads ${route}`, async ({ page }) => { const response = await page.goto(route); expect(response?.status()).toBe(200); await expect(page.locator('h1')).toBeVisible(); await expect(page.locator('header')).toBeVisible(); await expect(page.locator('footer')).toBeVisible() })

test('desktop homepage exposes primary conversion paths', async ({ page }) => { test.skip((page.viewportSize()?.width || 0) < 600, 'desktop-only conversion layout check'); await page.goto('/'); await expect(page.getByRole('link', { name: /Request an IT consultation/i })).toBeVisible(); await expect(page.getByRole('link', { name: /Explore our services/i })).toBeVisible(); await expect(page.locator('a[href="/request-quote"]:visible').first()).toBeVisible() })

test('mobile menu opens and exposes navigation', async ({ page }) => { test.skip((page.viewportSize()?.width || 0) >= 600, 'mobile-only navigation check'); await page.goto('/'); await page.getByRole('button', { name: 'Open menu' }).click(); await expect(page.locator('.main-nav.is-open')).toBeVisible(); await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible() })

test('quotation errors associate with fields and focus the first invalid field', async ({ page }) => { await page.goto('/request-quote'); await page.getByRole('button', { name: /Send quotation request/i }).click(); const name = page.getByLabel('Full name'); await expect(name).toBeFocused(); await expect(name).toHaveAttribute('aria-invalid', 'true'); await expect(name).toHaveAttribute('aria-describedby', 'fullName-error'); await expect(page.locator('#fullName-error')).toHaveText('Please enter your name.'); })
test('quotation form shows accessible validation', async ({ page }) => { await page.goto('/request-quote'); await page.getByRole('button', { name: /Send quotation request/i }).click(); await expect(page.getByText('Please enter your name.')).toBeVisible(); await expect(page.getByText('Please enter your company name.')).toBeVisible(); await expect(page.getByText('Consent is required.')).toBeVisible() })

test('public SEO metadata is route-specific and admin is noindex', async ({ page }) => { await page.goto('/about'); await expect(page).toHaveTitle('About A2NY IT WORKS'); await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://a2nyitworks.com/about'); await page.goto('/admin'); await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow') })

test('mobile menu closes on Escape and returns focus to its toggle', async ({ page }) => { test.skip((page.viewportSize()?.width || 0) >= 600, 'mobile-only navigation check'); await page.goto('/'); const toggle = page.getByRole('button', { name: 'Open menu' }); await toggle.click(); await page.keyboard.press('Escape'); await expect(page.locator('.main-nav.is-open')).toBeHidden(); await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused() })
test('mobile submenu follows disclosure state and navigates', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) >= 600, 'mobile disclosure');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  const menu = group.locator('.dropdown-menu');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
  await toggle.click();
  const link = menu.getByRole('link').first();
  const target = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(new RegExp(target + '$'));
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
});
test('desktop submenu opens by keyboard and Escape returns focus to its trigger', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 600, 'desktop-only navigation check');
  await page.goto('/');
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await group.locator('.dropdown-menu').getByRole('link').first().focus();
  await page.keyboard.press('Escape');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toBeFocused();
});
test('desktop hover submenu can be dismissed with Escape without reopening until pointer re-enters', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 600, 'desktop-only navigation check');
  await page.goto('/');
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  await group.hover();
  await expect(group.locator('.dropdown-menu')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await page.mouse.move(0, 0);
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await group.hover();
  await expect(group.locator('.dropdown-menu')).toBeVisible();
});
test('quotation validation associates later fields and advances focus', async ({ page }) => { await page.goto('/request-quote'); const form = page.locator('.contact-form'); await form.getByLabel('Full name').fill('Ada Lovelace'); await form.getByLabel('Company name').fill('Analytical Engines'); await form.getByLabel('Email address').fill('ada@example.com'); await page.getByRole('button', { name: /Send quotation request/i }).click(); const phone = page.getByLabel('Contact number'); await expect(phone).toBeFocused(); await expect(phone).toHaveAttribute('aria-invalid', 'true'); await expect(phone).toHaveAttribute('aria-describedby', 'phone-error'); await expect(page.locator('#phone-error')).toHaveText('Please enter your contact number.'); await expect(form.getByLabel('Project description')).toHaveAttribute('aria-invalid', 'true'); await expect(form.getByLabel('Project description')).toHaveAttribute('aria-describedby', 'projectDescription-error'); await expect(form.getByRole('checkbox', { name: /I agree that A2NY IT WORKS/ })).toHaveAttribute('aria-describedby', 'consent-error'); });

test('quotation form guides invalid email format', async ({ page }) => { await page.goto('/request-quote'); await page.getByLabel('Full name').fill('Ada Lovelace'); await page.getByLabel('Company name').fill('Analytical Engines'); await page.getByLabel('Email address').fill('ada@'); await page.getByRole('button', { name: /Send quotation request/i }).click(); const email = page.getByLabel('Email address'); await expect(email).toBeFocused(); await expect(email).toHaveAttribute('aria-describedby', 'email-error'); await expect(page.locator('#email-error')).toHaveText('Please enter a valid email address.'); });
test('contact email error clears after correction without submitting externally', async ({ page }) => {
  await page.goto('/contact');
  let externalSubmission = false;
  page.on('request', request => {
    if (request.url().includes('/api/')) externalSubmission = true;
  });
  const form = page.locator('.contact-form');
  const email = form.getByLabel('Email address');
  await form.getByLabel('Full name').fill('Ada Lovelace');
  await email.fill('ada@');
  await form.getByRole('button', { name: /Send message/i }).click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(email).toHaveAttribute('aria-describedby', 'email-error');
  await expect(form.locator('#email-error')).toBeVisible();
  await email.fill('ada@example.com');
  await expect(email).toHaveAttribute('aria-invalid', 'false');
  await expect(email).not.toHaveAttribute('aria-describedby');
  await expect(form.locator('#email-error')).toBeHidden();
  expect(externalSubmission).toBe(false);
});

test('disclosure hover state follows desktop breakpoint and mobile stays collapsed', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 844 });
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  await group.hover();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.mouse.move(0, 0);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await group.hover();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await group.hover();
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('route navigation clears stale disclosures before navigation is reopened', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
});

test('browser history clears the mobile menu and submenu state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  const group = page.locator('.nav-dropdown').first();
  const openMenu = page.getByRole('button', { name: 'Open menu' });
  await openMenu.click();
  await group.getByRole('button').click();
  await expect(group.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.main-nav.is-open')).toBeHidden();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(group.getByRole('button', { includeHidden: true })).toHaveAttribute('aria-expanded', 'false');
  await expect(group.locator('.dropdown-menu')).toBeHidden();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await group.getByRole('button').click();
  await expect(group.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

  await page.goForward();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('.main-nav.is-open')).toBeHidden();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(group.getByRole('button', { includeHidden: true })).toHaveAttribute('aria-expanded', 'false');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
});


test('resizing an open mobile menu to desktop releases scrolling and clears disclosure', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const group = page.locator('.nav-dropdown').first();
  await group.getByRole('button').click();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.mouse.move(0, 800);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(group.getByRole('button', { includeHidden: true })).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.main-nav')).toBeHidden();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(group.locator('.dropdown-menu')).toBeHidden();
});


test('desktop disclosure closes when keyboard focus leaves its group', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.mouse.move(0, 800);
  const group = page.locator('.nav-dropdown').first();
  const toggle = group.getByRole('button');
  const links = group.locator('.dropdown-menu').getByRole('link');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(links.first()).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await links.last().focus();
  await page.keyboard.press('Tab');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Shift+Tab');
  await expect(group.locator('.dropdown-menu')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});


test('desktop navigation exposes a visible keyboard focus indicator', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 701, 'desktop-only navigation check');
  await page.goto('/');
  const toggle = page.locator('.nav-dropdown').first().getByRole('button');
  await toggle.focus();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
  await expect(toggle).toHaveCSS('outline-width', '3px');
  await expect(toggle).toHaveCSS('outline-color', 'rgb(244, 91, 105)');
});

test('desktop pointer movement transfers disclosure ownership between groups', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 701, 'desktop-only navigation check');
  await page.goto('/');
  const groups = page.locator('.nav-dropdown');
  const first = groups.nth(0);
  const second = groups.nth(1);
  await first.getByRole('button').focus();
  await page.keyboard.press('Enter');
  await expect(first.locator('.dropdown-menu')).toBeVisible();
  await second.hover();
  await expect(first.locator('.dropdown-menu')).toBeHidden();
  await expect(first.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  await expect(second.locator('.dropdown-menu')).toBeVisible();
  await expect(second.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(second.locator('.dropdown-menu')).toBeHidden();
  await expect(second.getByRole('button')).toBeFocused();
});


test('contact fields support browser autofill and mobile input modes', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByLabel('Full name')).toHaveAttribute('autocomplete', 'name');
  await expect(page.getByLabel('Company name')).toHaveAttribute('autocomplete', 'organization');
  await expect(page.getByLabel('Email address')).toHaveAttribute('autocomplete', 'email');
  await expect(page.getByLabel('Email address')).toHaveAttribute('inputmode', 'email');
  await expect(page.getByLabel('Contact number')).toHaveAttribute('type', 'tel');
  await expect(page.getByLabel('Contact number')).toHaveAttribute('autocomplete', 'tel');
  await expect(page.getByLabel('Contact number')).toHaveAttribute('inputmode', 'tel');
});


test('footer links and quote CTA expose visible keyboard focus', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('.site-footer');
  for (const name of ['Request a quotation →', 'Privacy', 'Terms']) {
    const link = footer.getByRole('link', { name, exact: true });
    await link.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
    await expect(link).toHaveCSS('outline-width', '3px');
    await expect(link).toHaveCSS('outline-color', 'rgb(244, 91, 105)');
    await expect(link).toHaveCSS('outline-offset', '4px');
  }
});

test('primary content CTAs expose visible keyboard focus', async ({ page }) => {
  await page.goto('/');
  const heroCta = page.getByRole('link', { name: /Get a free consultation/ });
  await heroCta.focus();
  await expect(heroCta).toHaveCSS('outline-style', 'solid');
  await expect(heroCta).toHaveCSS('outline-width', '3px');
  await expect(heroCta).toHaveCSS('outline-color', 'rgb(244, 91, 105)');
  await expect(heroCta).toHaveCSS('outline-offset', '4px');

  await page.goto('/services/cloud-hosting');
  const detailCta = page.getByRole('link', { name: 'Discuss this service' });
  await detailCta.focus();
  await expect(detailCta).toHaveCSS('outline-style', 'solid');
  await expect(detailCta).toHaveCSS('outline-width', '3px');
  await expect(detailCta).toHaveCSS('outline-color', 'rgb(244, 91, 105)');
  await expect(detailCta).toHaveCSS('outline-offset', '4px');
});


test('contact and quote fields expose visible keyboard focus', async ({ page }) => {
  for (const route of ['/contact', '/request-quote']) {
    await page.goto(route);
    for (const field of [
      page.getByLabel('Full name'),
      page.getByLabel('Customer type'),
      page.getByLabel(route === '/contact' ? 'How can we help?' : 'Project description'),
      page.getByRole('checkbox', { name: /I agree that A2NY IT WORKS/ }),
    ]) {
      await field.focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(field).toBeFocused();
      await expect(field).toHaveCSS('outline-style', 'solid');
      await expect(field).toHaveCSS('outline-width', '3px');
      await expect(field).toHaveCSS('outline-color', 'rgb(244, 91, 105)');
      await expect(field).toHaveCSS('outline-offset', '3px');
    }
  }
});


test('contact and quote submissions expose busy and persistent outcome states', async ({ page }) => {
  for (const path of ['/contact', '/request-quote']) {
    await page.goto(path);
    const form = page.locator('.contact-form');
    const status = form.getByRole('status');
    const submit = form.getByRole('button', { name: /Send/ });
    let finish;
    let requests = 0;
    await page.route('**/api/' + (path === '/contact' ? 'contact' : 'quotations'), async route => {
      requests++;
      await new Promise(resolve => { finish = resolve; });
      await route.fulfill({ status: requests === 1 ? 500 : 200, contentType: 'application/json', body: '{}' });
    });
    await page.getByLabel('Full name').fill('QA User');
    await page.getByLabel('Company name').fill('QA Company');
    await page.getByLabel('Email address').fill('qa@example.com');
    await page.getByLabel('Contact number').fill('09171234567');
    const description = page.getByLabel(path === '/contact' ? 'How can we help?' : 'Project description');
    await description.fill('Please discuss an IT support project.');
    await form.getByRole('checkbox').check();
    for (const attempt of [1, 2]) {
      finish = undefined;
      await submit.click();
      await expect(form).toHaveAttribute('aria-busy', 'true');
      await expect(submit).toBeDisabled();
      await expect(submit).toHaveText('Sending…');
      await expect(status).toBeEmpty();
      await expect.poll(() => typeof finish).toBe('function');
      expect(requests).toBe(attempt);
      finish();
      await expect(form).toHaveAttribute('aria-busy', 'false');
      await expect(submit).toBeEnabled();
      await expect(status).toHaveAttribute('aria-live', 'polite');
      if (attempt === 1) {
        await expect(status).toHaveText('We could not send your request. Please try again.');
        await expect(page.getByLabel('Full name')).toHaveValue('QA User');
        await expect(description).toHaveValue('Please discuss an IT support project.');
      } else {
        await expect(status).toHaveText('Thanks — your request has been received.');
        await expect(page.getByLabel('Full name')).toHaveValue('');
      }
    }
    await page.unrouteAll({ behavior: 'wait' });
  }
});


test('invalid contact and quote submissions provide actionable summary and preserve input', async ({ page }) => {
  for (const path of ['/contact', '/request-quote']) {
    await page.goto(path);
    const form = page.locator('.contact-form');
    const summary = form.locator('.form-validation-summary');
    await page.getByLabel('Full name').fill('QA preserved name');
    await form.getByRole('button', { name: /Send/ }).click();
    await expect(summary).toContainText('Please review the highlighted fields and try again.');
    await expect(page.getByLabel(path === '/contact' ? 'Email address' : 'Company name')).toBeFocused();
    await expect(summary).toHaveAttribute('role', 'alert');
    await expect(page.getByLabel('Full name')).toHaveValue('QA preserved name');
    await expect(page.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.getByRole('status')).toBeEmpty();
    await summary.getByRole('button', { name: 'Contact number' }).click();
    await expect(page.getByLabel('Contact number')).toBeFocused();
    await form.getByRole('button', { name: /Send/ }).click();
    await expect(page.getByLabel(path === '/contact' ? 'Email address' : 'Company name')).toBeFocused();
    await page.getByLabel('Company name').fill('QA Company');
    await page.getByLabel('Email address').fill('qa@example.com');
    await page.getByLabel('Contact number').fill('09171234567');
    await page.getByLabel(path === '/contact' ? 'How can we help?' : 'Project description').fill('Please discuss IT support.');
    await form.getByRole('checkbox').check();
    await page.route('**/api/' + (path === '/contact' ? 'contact' : 'quotations'), route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
    await form.getByRole('button', { name: /Send/ }).click();
    await expect(form.getByRole('status')).toHaveText('Thanks — your request has been received.');
    await expect(summary).toHaveCount(0);
    await page.unrouteAll({ behavior: 'wait' });
  }
});

test('validation summary supports keyboard activation and removes corrected fields', async ({ page }) => {
  for (const path of ['/contact', '/request-quote']) {
    await page.goto(path);
    const form = page.locator('.contact-form');
    const summary = form.locator('.form-validation-summary');
    await form.getByRole('button', { name: /Send/ }).click();
    for (const [name, key, value] of [['Email address', 'Enter', 'qa@example.com'], ['Contact number', 'Space', '09171234567']]) {
      const control = summary.getByRole('button', { name, exact: true });
      await control.focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(control).toBeFocused();
      await page.keyboard.press(key);
      const field = page.getByLabel(name);
      await expect(field).toBeFocused();
      await field.fill(value);
      await expect(control).toHaveCount(0);
      await expect(field).toHaveAttribute('aria-invalid', 'false');
      await expect(field).not.toHaveAttribute('aria-describedby', /.+/);
      await expect(summary.getByRole('button', { name: 'Full name', exact: true })).toBeVisible();
      await expect(field).toHaveValue(value);
    }
    await form.getByRole('button', { name: /Send/ }).click();
    await expect(page.getByLabel('Full name')).toBeFocused();
    await expect(summary.getByRole('button', { name: 'Email address', exact: true })).toHaveCount(0);
    await expect(summary.getByRole('button', { name: 'Contact number', exact: true })).toHaveCount(0);
  }
});


test('skip link bypasses navigation and continues through main content', async ({ page }) => {
  for (const path of ['/', '/contact', '/request-quote']) {
    await page.goto(path);
    const skip = page.getByRole('link', { name: 'Skip to main content', exact: true });
    const main = page.locator('#main-content');
    const hiddenBounds = await skip.boundingBox();
    expect(hiddenBounds.y + hiddenBounds.height).toBeLessThan(0);
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await expect(skip).toHaveCSS('outline-width', '3px');
    await page.keyboard.press('Enter');
    await expect(main).toBeFocused();
    await expect(page).toHaveURL(new RegExp(path === '/' ? '/#main-content$' : path + '#main-content$'));
    await page.keyboard.press('Tab');
    expect(await main.evaluate(element => element.contains(document.activeElement))).toBe(true);
    const restoredBounds = await skip.boundingBox();
    expect(restoredBounds.y + restoredBounds.height).toBeLessThan(0);
  }
});


test('reduced motion shortens CSS effects and preserves portfolio navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/portfolio');
  const card = page.locator('.portfolio-card').first();
  await expect(card).toBeVisible();
  await expect(card).toHaveCSS('transition-duration', '0.25s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => card.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThanOrEqual(0.00001);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  const link = card.locator('a').first();
  const destination = await link.getAttribute('href');
  await link.focus();
  await expect(link).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(destination + '$'));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/portfolio');
  await expect(card).toHaveCSS('transition-duration', '0.25s');
});


test('home reduced motion keeps hero and process static with usable consultation CTA', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hero = page.locator('.hero-grid > div').first();
  const visual = page.locator('.hero-visual-wrap');
  // Sample multiple rendered frames: final-state-only checks would miss motion.
  const samples = await page.locator('.hero-grid').evaluate(async el => {
    const values = [];
    for (let frame = 0; frame < 30; frame++) {
      await new Promise(requestAnimationFrame);
      values.push([...el.children].map(child => {
        const style = getComputedStyle(child);
        return { opacity: style.opacity, transform: style.transform };
      }));
    }
    return values.flat();
  });
  for (const sample of samples) {
    expect(sample.opacity).toBe('1');
    expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(sample.transform);
  }
  await expect(hero).toBeVisible();
  await expect(visual).toBeVisible();
  const steps = page.locator('.timeline-step');
  await steps.first().scrollIntoViewIfNeeded();
  for (const step of await steps.all()) {
    await expect(step).toHaveCSS('opacity', '1');
    await expect(step).toHaveCSS('transform', 'none');
  }
  const cta = page.getByRole('link', { name: 'Get a free consultation' });
  await cta.focus();
  await expect(cta).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/request-quote$/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(hero).toHaveCSS('opacity', '1');
  await expect(visual).toHaveCSS('opacity', '1');
  await expect(visual).toHaveCSS('transform', 'none');
});


test('navigation decorative icons stay out of accessible controls', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.site-header');
  const toggle = header.locator('.menu-toggle');
  if (await toggle.isVisible()) {
    await expect(toggle).toHaveAccessibleName('Open menu');
    await toggle.click();
    await expect(toggle).toHaveAccessibleName('Close menu');
  }
  const trigger = header.locator('.nav-dropdown > button').first();
  const label = (await trigger.innerText()).trim();
  await expect(trigger).toHaveAccessibleName(label);
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const link = header.locator('.nav-dropdown').first().locator('.dropdown-menu a').first();
  await expect(link).toBeVisible();
  await expect(link).toHaveAccessibleName((await link.innerText()).trim());
  for (const icon of await header.locator('.nav-dropdown svg, .menu-toggle svg').all()) {
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon).toHaveAttribute('focusable', 'false');
  }
  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  const destination = await link.getAttribute('href');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(destination + '$'));
});


test('dropdown navigation identifies only the current page after route changes', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const home = nav.getByRole('link', { name: 'Home', exact: true });
  const toggle = page.locator('.menu-toggle');
  const reveal = async () => {
    if (await toggle.isVisible() && await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
    const trigger = nav.locator('.nav-dropdown > button').first();
    if (await trigger.getAttribute('aria-expanded') === 'false') await trigger.click();
  };
  await reveal();
  await expect(home).toHaveAttribute('aria-current', 'page');
  const links = nav.locator('.nav-dropdown').first().locator('.dropdown-menu a');
  const first = links.nth(0);
  const second = links.nth(1);
  const firstPath = await first.getAttribute('href');
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(firstPath + '$'));
  await reveal();
  await expect(first).toHaveAttribute('aria-current', 'page');
  await expect(first).toHaveClass(/active/);
  await expect(first).toHaveCSS('color', 'rgb(14, 120, 199)');
  await expect(home).not.toHaveAttribute('aria-current', 'page');
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
  const secondPath = await second.getAttribute('href');
  await second.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(secondPath + '$'));
  await reveal();
  await expect(second).toHaveAttribute('aria-current', 'page');
  await expect(first).not.toHaveAttribute('aria-current', 'page');
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
});

test('contact and quote expose required fields before validation', async ({ page }) => {
  for (const path of ['/contact', '/request-quote']) {
    await page.goto(path);
    const form = page.locator('.contact-form');
    for (const name of ['Full name', 'Email address', 'Contact number', path === '/contact' ? 'How can we help?' : 'Project description']) {
      await expect(form.getByLabel(name)).toHaveAttribute('aria-required', 'true');
      await expect(form.getByLabel(name)).toHaveAttribute('aria-invalid', 'false');
    }
    await expect(form.getByLabel('Company name')).toHaveAttribute('aria-required', path === '/request-quote' ? 'true' : 'false');
    await expect(form.getByRole('checkbox')).toHaveAttribute('aria-required', 'true');
    await expect(form.getByLabel('Customer type')).toHaveAttribute('aria-required', 'true');
    await form.getByRole('button', { name: /Send/ }).click();
    await expect(form.getByLabel('Full name')).toBeFocused();
    await expect(form.getByLabel('Full name')).toHaveAttribute('aria-required', 'true');
    await expect(form.getByLabel('Full name')).toHaveAttribute('aria-invalid', 'true');
  }
});


test('portfolio filter exposes its selected state', async ({ page }) => {
  await page.goto('/portfolio');
  const filters = page.getByRole('group', { name: 'Filter portfolio' }).getByRole('button');
  await expect(filters.first()).toHaveAttribute('aria-pressed', 'true');
  await filters.nth(1).click();
  await expect(filters.first()).toHaveAttribute('aria-pressed', 'false');
  await expect(filters.nth(1)).toHaveAttribute('aria-pressed', 'true');
});


test('portfolio keyboard filtering announces results and resets', async ({ page }) => {
  await page.goto('/portfolio')
  const group = page.getByRole('group', { name: 'Filter portfolio' })
  const buttons = group.getByRole('button')
  const cards = page.locator('.portfolio-card')
  const total = await cards.count()
  const status = page.getByRole('status')
  await expect(status).toHaveText(`Showing ${total} ${total === 1 ? 'project' : 'projects'} — All work.`)
  await expect(status).toHaveAttribute('aria-live', 'polite')
  await expect(status).toHaveAttribute('aria-atomic', 'true')
  const category = await buttons.nth(1).innerText()
  await buttons.nth(1).focus()
  await page.keyboard.press('Enter')
  await expect(buttons.nth(1)).toHaveAttribute('aria-pressed', 'true')
  await expect(buttons.nth(1)).toBeFocused()
  await expect(status).toContainText(category)
  const filtered = await cards.count()
  expect(filtered).toBeLessThan(total)
  await expect(status).toHaveText(`Showing ${filtered} ${filtered === 1 ? 'project' : 'projects'} — ${category}.`)
  await buttons.first().focus()
  await page.keyboard.press('Space')
  await expect(buttons.first()).toBeFocused()
  await expect(buttons.first()).toHaveAttribute('aria-pressed', 'true')
  await expect(cards).toHaveCount(total)
  await expect(status).toContainText('All work')
})
