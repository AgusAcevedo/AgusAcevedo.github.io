import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4322";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: "test-results",
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL,
    browserName: "chromium",
    colorScheme: "light",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { browserName: "chromium", viewport: { width: 1280, height: 800 } } },
    { name: "chromium-mobile", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "firefox-desktop", use: { browserName: "firefox", viewport: { width: 1280, height: 800 } } },
    { name: "webkit-desktop", use: { browserName: "webkit", viewport: { width: 1280, height: 800 } } },
  ],
  // Build first so these tests exercise generated HTML, scripts, and the CSP.
  webServer: {
    command: "pnpm preview --port 4322 --ignore-lock",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
