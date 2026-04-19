import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model สำหรับหน้า Login ของ BullVPN
 * ใช้ Pattern: Page Object Model (POM) ตามมาตรฐานการเขียน Automation Test
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly errorMessage: Locator;
  readonly passwordToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], input[type="email"], input[placeholder*="sername" i], input[placeholder*="mail" i]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.getByRole('button', { name: /login|sign in/i }).first();
    this.forgotPasswordLink = page.getByText(/forgot.*password/i);
    this.registerLink = page.getByText(/register/i);
    this.errorMessage = page.locator('form').getByText(/invalid|incorrect|failed|error|required|wrong|try again|please/i).first();
    this.passwordToggle = page.locator('[class*="eye"], button[aria-label*="password" i]').first();
  }

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.passwordInput.getAttribute('type');
  }

  async togglePasswordVisibility() {
    await this.passwordToggle.click();
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getErrorText(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
