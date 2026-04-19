# BullVPN Login - Automation Test Suite

Automation Test Suite สำหรับทดสอบฟีเจอร์ Login ของ BullVPN โดยใช้ **Playwright** + **TypeScript**

## 🎯 Features

- ✅ ทดสอบ Email Login (Positive + Negative)
- ✅ ทดสอบ Input Validation
- ✅ ทดสอบ Security (SQL Injection, XSS, HTTPS)
- ✅ รองรับหลาย Browser (Chrome, Firefox, Safari, Mobile)
- ✅ Page Object Model (POM) Pattern
- ✅ HTML Test Report พร้อม Screenshot + Video

## 📂 โครงสร้างโปรเจกต์

```
bullvpn-automation/
├── pages/
│   └── LoginPage.ts            # Page Object Model
├── tests/
│   ├── email-login.spec.ts     # Email Login tests
│   ├── validation.spec.ts      # Input validation tests
│   └── security.spec.ts        # Security tests (SQLi, XSS)
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json
└── package.json
```

## 🚀 วิธีติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ติดตั้ง Browser สำหรับ Playwright
```bash
npm run install:browsers
```

### 3. รัน Test

รันทั้งหมด (Headless)
```bash
npm test
```

รันแบบเห็น Browser
```bash
npm run test:headed
```

รันแบบ UI Mode (Interactive)
```bash
npm run test:ui
```

รันเฉพาะกลุ่มทดสอบ
```bash
npm run test:email       # Email Login
npm run test:validation  # Validation
npm run test:security    # Security
```

Debug Mode
```bash
npm run test:debug
```

### 4. ดู Report
```bash
npm run report
```

## 📊 Test Coverage

| Test Suite | Test Cases | Description |
|---|---|---|
| email-login.spec.ts | TC_003, TC_005-008, TC_011-012 | Email login positive & negative |
| validation.spec.ts | TC_009, TC_010, TC_014, TC_016 | Input validation |
| security.spec.ts | TC_017, TC_018, TC_020, TC_021 | SQL Injection, XSS, HTTPS |

## 🛠️ เครื่องมือที่ใช้

- **Playwright** - E2E Testing Framework
- **TypeScript** - Type-safe JavaScript
- **Page Object Model** - Design Pattern

## 📸 ตัวอย่าง Report

Report จะอยู่ที่ `playwright-report/index.html` หลังรัน Test เสร็จ

## 👤 ผู้จัดทำ

[ชื่อของคุณ] - Software Tester Candidate

## 📄 License

MIT
