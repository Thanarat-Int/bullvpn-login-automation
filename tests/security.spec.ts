import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Security Testing (OWASP Top 10 พื้นฐาน)
 * Related Test Cases: TC_017, TC_018, TC_020, TC_021
 */
test.describe('Security - การทดสอบความปลอดภัย', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC_017: ป้องกันการโจมตี SQL Injection', async ({ page }) => {
    const sqlPayload = "admin' OR '1'='1";
    await loginPage.login(sqlPayload, 'anything');

    await page.waitForTimeout(2000);

    // ต้องไม่เข้า dashboard
    expect(page.url()).not.toContain('/dashboard');
    expect(page.url()).not.toContain('/home');

    // ต้องไม่มี SQL error รั่วไหล
    const pageContent = await page.content();
    expect(pageContent.toLowerCase()).not.toMatch(/sqlstate|syntax error|mysql|postgres|sql error/);

    // ต้องแสดง generic error
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_018: ป้องกันการโจมตี XSS', async ({ page }) => {
    let alertTriggered = false;
    page.on('dialog', async (dialog) => {
      alertTriggered = true;
      await dialog.dismiss();
    });

    const xssPayload = "<script>alert('xss')</script>";
    await loginPage.login(xssPayload, 'test');
    await page.waitForTimeout(2000);

    // Script ห้ามถูกรัน
    expect(alertTriggered).toBeFalsy();
  });

  test('TC_020: Login request ใช้ HTTPS', async ({ page }) => {
    let isHttps = false;

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('login') || url.includes('auth') || url.includes('api')) {
        if (url.startsWith('https://')) isHttps = true;
      }
    });

    await loginPage.login('test@bullvpn.com', 'Test@1234');
    await page.waitForTimeout(2000);

    expect(isHttps).toBeTruthy();
  });

  test('TC_021: Password ไม่ปรากฏใน URL', async ({ page }) => {
    const password = 'SuperSecret@123';
    let passwordInUrl = false;

    page.on('request', (request) => {
      if (request.url().includes(password)) {
        passwordInUrl = true;
      }
    });

    await loginPage.login('test@bullvpn.com', password);
    await page.waitForTimeout(2000);

    expect(passwordInUrl).toBeFalsy();
  });
});
