import { defineConfig, devices } from '@playwright/test';

// ถ้าตั้งค่า DEMO=1 ใน env → จะรันช้าลงเพื่ออัดวิดีโอ
const isDemoMode = process.env.DEMO === '1';

export default defineConfig({
  testDir: './tests',
  fullyParallel: !isDemoMode,     // Demo: รันทีละเคส เห็นชัด
  workers: isDemoMode ? 1 : undefined,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    baseURL: 'https://bullvpn.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    launchOptions: {
      slowMo: isDemoMode ? 1500 : 0,   // Demo: 1500ms ต่อ action (Tutorial pace มาตรฐานสากล)
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
