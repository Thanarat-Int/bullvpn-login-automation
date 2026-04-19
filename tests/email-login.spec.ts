import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Email Login (Positive + Negative)
 * Related Test Cases: TC_001 - TC_016
 */
test.describe('Email Login - ฟังก์ชันพื้นฐาน', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC_003: Password ถูกซ่อนเป็นจุดโดยอัตโนมัติ', async () => {
    await loginPage.passwordInput.fill('Test@1234');
    const inputType = await loginPage.getPasswordInputType();
    expect(inputType).toBe('password');
  });

  test('TC_005: ลิงก์ Forgot Password ทำงานถูกต้อง', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('password');
  });

  test('TC_006: ช่อง email ว่างแสดง error', async () => {
    await loginPage.passwordInput.fill('Test@1234');
    await loginPage.loginButton.click();
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_007: ช่อง password ว่างแสดง error', async () => {
    await loginPage.usernameInput.fill('test@bullvpn.com');
    await loginPage.loginButton.click();
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_008: ทั้งสองช่องว่างแสดง error', async () => {
    await loginPage.loginButton.click();
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_011: Password ผิดแสดง error', async () => {
    await loginPage.login('test@bullvpn.com', 'WrongPass123');
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
    const errorText = await loginPage.getErrorText();
    expect(errorText.toLowerCase()).toMatch(/invalid|incorrect|wrong|failed|try again/);
  });

  test('TC_012: Email ที่ไม่ได้ลงทะเบียนแสดง error', async () => {
    await loginPage.login('notexist_' + Date.now() + '@bullvpn.com', 'Test@1234');
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });
});
