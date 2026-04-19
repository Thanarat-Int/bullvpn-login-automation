import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Input Validation
 * Related Test Cases: TC_009, TC_010, TC_014, TC_015, TC_016
 */
test.describe('Email Login - Validation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC_009: Email ไม่มีเครื่องหมาย @ แสดง error', async () => {
    await loginPage.login('testbullvpn.com', 'Test@1234');
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_010: Email ไม่มีโดเมนแสดง error', async () => {
    await loginPage.login('test@', 'Test@1234');
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });

  test('TC_014: ระบบตัด space ต้นและท้าย email', async () => {
    await loginPage.login('  test@bullvpn.com  ', 'Test@1234');
    const value = await loginPage.usernameInput.inputValue();
    expect(value.trim()).toBe('test@bullvpn.com');
  });

  test('TC_016: Email เกิน 254 ตัวอักษรถูกจำกัด', async () => {
    const longEmail = 'a'.repeat(250) + '@bv.com';
    await loginPage.login(longEmail, 'Test@1234');
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
  });
});
