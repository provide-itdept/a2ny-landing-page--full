import { test, expect } from '@playwright/test'

const publicRoutes = ['/', '/about', '/services', '/solutions', '/industries', '/projects', '/blog', '/contact', '/request-quote', '/privacy-policy', '/terms-of-service', '/services/network-installation', '/solutions/small-business-it', '/industries/corporate-offices', '/blog/office-network-planning-checklist']

for (const route of publicRoutes) test(`loads ${route}`, async ({ page }) => { const response = await page.goto(route); expect(response?.status()).toBe(200); await expect(page.locator('h1')).toBeVisible(); await expect(page.locator('header')).toBeVisible(); await expect(page.locator('footer')).toBeVisible() })

test('desktop homepage exposes primary conversion paths', async ({ page }) => { test.skip((page.viewportSize()?.width || 0) < 600, 'desktop-only conversion layout check'); await page.goto('/'); await expect(page.getByRole('link', { name: /Request an IT consultation/i })).toBeVisible(); await expect(page.getByRole('link', { name: /Explore our services/i })).toBeVisible(); await expect(page.locator('a[href="/request-quote"]:visible').first()).toBeVisible() })

test('mobile menu opens and exposes navigation', async ({ page }) => { test.skip((page.viewportSize()?.width || 0) >= 600, 'mobile-only navigation check'); await page.goto('/'); await page.getByRole('button', { name: 'Open menu' }).click(); await expect(page.locator('.main-nav.is-open')).toBeVisible(); await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible() })

test('quotation form shows accessible validation', async ({ page }) => { await page.goto('/request-quote'); await page.getByRole('button', { name: /Send quotation request/i }).click(); await expect(page.getByText('Please enter your name.')).toBeVisible(); await expect(page.getByText('Please enter your company name.')).toBeVisible(); await expect(page.getByText('Consent is required.')).toBeVisible() })

test('public SEO metadata is route-specific and admin is noindex', async ({ page }) => { await page.goto('/about'); await expect(page).toHaveTitle('About A2NY IT WORKS'); await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://a2nyitworks.com/about'); await page.goto('/admin'); await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow') })
