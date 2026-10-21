import { defineConfig, devices } from '@playwright/test'
export default defineConfig({ testDir: '.', timeout: 30000, use: { baseURL: 'http://127.0.0.1:4173', screenshot: 'only-on-failure', trace: 'off' }, projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true } }] })
