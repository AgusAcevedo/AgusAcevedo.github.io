import { test as base, expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

/** Collect browser errors for each test and verify the shared log at teardown. */
const test = base.extend<{ runtimeHealth: readonly string[] }>({
  runtimeHealth: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    let expectedInlineRejections = 0;
    page.on("pageerror", error => errors.push(`Uncaught: ${error.message}`));
    page.on("console", message => {
      if (message.type() !== "error") return;
      const text = message.text();
      const intentionalCspRejection = testInfo.title.includes("CSP rejects an injected inline script")
        && testInfo.annotations.some(annotation => annotation.type === "intentional-csp-probe")
        && expectedInlineRejections === 0
        && (/inline script.*Content Security Policy|Refused to execute inline script/iu.test(text)
          || /Content-Security-Policy: The page[’']s settings blocked an inline script \(script-src-elem\)/u.test(text)
          || text === "Refused to execute a script because its hash, its nonce, or 'unsafe-inline' does not appear in the script-src directive of the Content Security Policy.");
      if (intentionalCspRejection) expectedInlineRejections++;
      if (!intentionalCspRejection) errors.push(`Console: ${text}`);
    });
    await use(errors);
    expect.soft(errors, "No uncaught application exceptions or unexpected console errors").toEqual([]);
  }, { auto: true }],
});

const origin = "http://127.0.0.1:4322";
const locales = [
  { code: "es", path: "/", language: "es-AR", otherPath: "/en/", otherLanguage: "en-US" },
  { code: "en", path: "/en/", language: "en-US", otherPath: "/", otherLanguage: "es-AR" },
] as const;

/** Fail immediately when required markup wiring is missing from a control. */
async function requiredAttribute(locator: Locator, attribute: string): Promise<string> {
  const value = await locator.getAttribute(attribute);
  if (value === null) throw new Error(`Expected required attribute "${attribute}" on ${locator}`);
  return value;
}

/** Report actionable WCAG failures and attach the complete axe evidence. */
async function checkAccessibility(page: Page, testInfo: TestInfo, state: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const violations = results.violations.filter(violation => violation.impact === "critical" || violation.impact === "serious");
  if (violations.length) await testInfo.attach(`accessibility-${state}`, {
    body: JSON.stringify(violations, null, 2), contentType: "application/json",
  });
  expect(violations.map(violation => ({
    id: violation.id, impact: violation.impact, description: violation.description,
    targets: violation.nodes.map(node => node.target),
  })), `No serious/critical WCAG A/AA violations in ${state}`).toEqual([]);
}

/** Exercise forward and backward Tab navigation across a modal boundary. */
async function expectFocusInside(dialog: Locator, page: Page) {
  // Several forward/backward Tabs exercise the actual browser focus boundary.
  for (const key of ["Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
    await page.keyboard.press(key);
    await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
}

for (const locale of locales) {
  test.describe(locale.code.toUpperCase(), () => {
    test("loads meaningful semantic content and opens LinkedIn with the keyboard", async ({ page, context }) => {
      await page.goto(locale.path);
      await expect(page).toHaveTitle(/Agust[ií]n.*Acevedo/iu);
      await expect(page.locator("html")).toHaveAttribute("lang", locale.language);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("main")).toContainText("Cloud");
      await expect.poll(() => page.locator("#top img").first().evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);

      const linkedin = page.locator("#top").getByRole("link", { name: "LinkedIn", exact: true });
      await expect(linkedin).toHaveCount(1);
      const destination = "https://linkedin.com/in/agustinezequielacevedo";
      await expect(linkedin).toHaveAttribute("href", destination);
      await expect(linkedin).toHaveAttribute("target", "_blank");
      await expect(linkedin).toHaveAttribute("rel", /noopener/u);
      // Fulfil the destination locally: verify navigation without hitting LinkedIn.
      await context.route(/^https:\/\/(?:www\.)?linkedin\.com\/in\//u, route => route.fulfill({
        status: 200, contentType: "text/html", body: "<!doctype html><title>LinkedIn navigation observed</title>",
      }));
      await linkedin.focus();
      await expect(linkedin).toBeFocused();
      const popupPromise = page.waitForEvent("popup");
      await linkedin.press("Enter");
      const popup = await popupPromise;
      await expect(popup).toHaveURL(destination);
      await popup.close();
    });

    test("theme choices work with keys and persist through repeated reloads", async ({ page }) => {
      await page.goto(locale.path);
      const toggle = page.locator(".theme-toggle-btn:visible");
      await toggle.press("ArrowDown");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const menu = page.locator(".themes-menu:visible");
      const dark = menu.getByRole("button", { name: locale.code === "es" ? "Oscuro" : "Dark", exact: true });
      await page.keyboard.press("Home");
      await page.keyboard.press("ArrowDown");
      await expect(dark).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(toggle).toBeFocused();
      await expect(page.locator("html")).toHaveClass(/dark/u);
      await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

      for (let reload = 0; reload < 2; reload++) {
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        await expect(page.locator("html")).toHaveClass(/dark/u);
      }
      await toggle.press("ArrowDown");
      await page.keyboard.press("Home");
      await page.keyboard.press("Enter");
      await expect(page.locator("html")).not.toHaveClass(/dark/u);
      await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

      await toggle.press("ArrowDown");
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      await page.emulateMedia({ colorScheme: "dark" });
      await expect(page.locator("html")).toHaveClass(/dark/u);
      await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("system");
    });

    test("downloads the selected locale's complete PDF resume", async ({ page }) => {
      await page.goto(locale.path);
      const filename = `CV-Agustin-Acevedo-${locale.code.toUpperCase()}.pdf`;
      const resume = page.locator("#top a[download]");
      await expect(resume).toHaveAttribute("href", `/${filename}`);
      await expect(resume).toHaveAttribute("download", filename);
      await expect(resume).toHaveAttribute("hreflang", locale.code);
      const downloadPromise = page.waitForEvent("download");
      await resume.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toBe(filename);
      expect(await download.failure()).toBeNull();
      const path = await download.path();
      if (path === null) throw new Error("The resume download did not produce a file");
      const actual = await readFile(path);
      const expected = await readFile(`public/${filename}`);
      expect(actual.subarray(0, 5).toString()).toBe("%PDF-");
      expect(createHash("sha256").update(actual).digest("hex"))
        .toBe(createHash("sha256").update(expected).digest("hex"));
    });

    test("navigation keeps an opaque container while scrolling in both themes and at tablet widths", async ({ page }) => {
      await page.goto(locale.path);
      for (const width of [390, 820, 1280]) {
        await page.setViewportSize({ width, height: 844 });
        const navigation = page.locator("header nav:visible");
        await expect(navigation).toHaveCount(1);
        for (const theme of ["light", "dark"]) {
          await page.locator(".theme-toggle-btn:visible").click();
          await page.locator(`.themes-menu:visible [data-theme="${theme}"]`).click();
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          const initialColor = await navigation.evaluate(element => getComputedStyle(element).backgroundColor);
          expect(initialColor).not.toMatch(/transparent|rgba\(|\//u);
          await page.locator("#blog").scrollIntoViewIfNeeded();
          await expect(navigation).toBeVisible();
          expect(await navigation.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(initialColor);
          const bounds = await navigation.boundingBox();
          if (bounds === null) throw new Error("Navigation has no visible container");
          expect(bounds.y).toBeGreaterThanOrEqual(0);
          expect(bounds.y).toBeLessThan(40);
          expect(bounds.x).toBeGreaterThanOrEqual(0);
          expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
          await page.locator("h1").scrollIntoViewIfNeeded();
        }
        if (width < 1024) await expect(page.locator("#mobile-menu-btn")).toBeVisible();
        else await expect(page.locator("#mobile-menu-btn")).toBeHidden();
      }
    });

    test("language disclosure supports Escape and navigates to the other localized page", async ({ page }) => {
      await page.goto(locale.path);
      const toggle = page.locator(".lang-toggle-btn:visible");
      await toggle.press("ArrowDown");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const menu = page.locator(".lang-menu:visible");
      await expect(menu.locator(`a[hreflang="${locale.code}"]`)).toHaveAttribute("aria-current", "page");
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.press("ArrowDown");
      await page.keyboard.press(locale.code === "es" ? "End" : "Home");
      const destination = menu.locator(`a[href="${locale.otherPath}"]`);
      await expect(destination).toBeFocused();
      await destination.press("Enter");
      await expect(page).toHaveURL(new URL(locale.otherPath, origin).href);
      await expect(page.locator("html")).toHaveAttribute("lang", locale.otherLanguage);
      await expect(page.locator(".lang-toggle-btn:visible")).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#cert-carousel-region")).toBeVisible();
      const otherCode = locale.code === "es" ? "EN" : "ES";
      await expect(page.locator("#top a[download]")).toHaveAttribute("href", `/CV-Agustin-Acevedo-${otherCode}.pdf`);
    });

    test("mobile navigation contains focus, closes with Escape, and reaches a section", async ({ page }, testInfo) => {
      test.skip(!testInfo.project.name.endsWith("-mobile"), "Mobile navigation is hidden on desktop");
      await page.goto(locale.path);
      const toggle = page.locator("#mobile-menu-btn");
      const menu = page.locator("#mobile-menu");
      await toggle.press("Enter");
      await expect(menu).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const close = page.locator("#mobile-menu-close");
      await expect(close).toBeFocused();
      await close.press("Shift+Tab");
      await expect(menu.locator(".mobile-nav-link").last()).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(close).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect.poll(() => page.locator("main").evaluate(element => Boolean(element.closest("[inert]")))).toBe(false);
      await toggle.press("Enter");
      await menu.locator(".mobile-nav-link").first().press("Enter");
      const target = locale.code === "es" ? "sobre-mi" : "about";
      await expect(page).toHaveURL(new RegExp(`#${target}$`, "u"));
      await expect(menu).toBeHidden();
      await expect(page.locator(`#${target}`)).toBeFocused();
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test("certificate filters announce selection, page safely, and open a native keyboard dialog", async ({ page }, testInfo) => {
      await page.goto(locale.path);
      await expect(page.locator("#cert-carousel-region")).toBeVisible();
      const select = page.locator("#filter-select");
      await expect(select).not.toHaveAttribute("aria-label", /\{t\./u);
      if (testInfo.project.name.endsWith("-mobile")) await select.selectOption("all");
      else await page.locator('.filter-btn[data-filter="all"]').click();
      await expect(page.locator('.filter-btn[data-filter="all"]')).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator('.filter-btn[data-filter="featured"]')).toHaveAttribute("aria-pressed", "false");
      const next = page.locator(testInfo.project.name.endsWith("-mobile") ? "#next-page-mobile" : "#next-page");
      await expect(next).toBeEnabled();
      await next.click();
      await expect(page.locator("#cert-status")).toHaveText(new RegExp(locale.code === "es" ? "Página 2 de" : "Page 2 of", "u"));
      const track = page.locator("#carousel-track");
      await expect(track.locator(':scope > div[aria-hidden="false"]')).toHaveCount(1);
      await expect(track.locator(':scope > div[aria-hidden="true"]').first()).toHaveAttribute("inert", "");
      const dots = page.locator(testInfo.project.name.endsWith("-mobile") ? "#page-dots-mobile" : "#page-dots");
      await expect(dots.getByRole("button").nth(1)).toHaveAttribute("aria-pressed", "true");
      const opener = track.locator(':scope > div[aria-hidden="false"] .modal-open').first();
      const title = await requiredAttribute(opener, "data-title");
      await opener.focus();
      await opener.press("Enter");
      const dialog = page.locator("#cert-modal");
      await expect(page.getByRole("dialog", { name: title, exact: true })).toBeVisible();
      await expect.poll(() => dialog.evaluate(element => element.matches(":modal"))).toBe(true);
      await expect(dialog.locator("[data-dialog-initial-focus]")).toBeFocused();
      await expectFocusInside(dialog, page);
      await checkAccessibility(page, testInfo, "certificate-dialog");
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
      await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe("");
      await opener.press("Enter");
      await dialog.locator("[data-dialog-close]").click();
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
    });

    test("project cards expose only visible slides and native dialogs return keyboard focus", async ({ page }, testInfo) => {
      await page.clock.install();
      await page.goto(locale.path);
      const carousel = page.locator("#projects-carousel");
      const visibleCount = testInfo.project.name.endsWith("-mobile") ? 1 : 3;
      await expect(carousel.locator(".project-card:not([inert])")).toHaveCount(visibleCount);
      const totalProjects = await carousel.locator(".project-card").count();
      expect(totalProjects).toBeGreaterThan(visibleCount);
      await expect(carousel.locator('.project-card[inert]')).toHaveCount(totalProjects - visibleCount);
      const first = carousel.locator(".project-card:not([inert]) [data-project-dialog]").first();
      const dialogId = await requiredAttribute(first, "aria-controls");
      await first.focus();
      await first.press("Enter");
      const dialog = page.locator(`#${dialogId}`);
      await expect(dialog).toBeVisible();
      await expect.poll(() => dialog.evaluate(element => element.matches(":modal"))).toBe(true);
      await expect(dialog.locator("[data-dialog-initial-focus]")).toBeFocused();
      await expect(dialog).toContainText(locale.code === "es" ? "Participé" : "I participated");
      await expectFocusInside(dialog, page);
      await checkAccessibility(page, testInfo, "project-dialog");
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(first).toBeFocused();
      await page.locator("#projects-next").click();
      await expect(page.locator("#projects-dots button").nth(1)).toHaveAttribute("aria-pressed", "true");
      const position = await requiredAttribute(carousel, "style");
      await page.clock.fastForward(6_000);
      await expect(carousel).toHaveAttribute("style", position);
      await expect(carousel.locator('.project-card[data-index="0"]')).toHaveAttribute("inert", "");
      await expect(carousel.locator(".project-card:not([inert])")).toHaveCount(visibleCount);
    });

    test("blog articles stay put until asked to advance and hide offscreen slides from focus", async ({ page }, testInfo) => {
      await page.clock.install();
      await page.goto(locale.path);
      const desktopArticles = page.locator(".blog-card");
      const mobileArticles = page.locator(".blog-card-mobile");
      expect(await desktopArticles.count()).toBeGreaterThan(0);
      if (!testInfo.project.name.endsWith("-mobile")) {
        await expect(desktopArticles.first()).toBeVisible();
        return;
      }
      const carousel = page.locator("#blog-carousel");
      await expect(page.locator("#blog-controls")).toBeVisible();
      await expect(mobileArticles.first()).not.toHaveAttribute("inert");
      const articleCount = await mobileArticles.count();
      if (articleCount < 2) {
        await expect(page.locator("#blog-next")).toBeDisabled();
        return;
      }
      await expect(mobileArticles.nth(1)).toHaveAttribute("inert", "");
      const position = await requiredAttribute(carousel, "style");
      await page.clock.fastForward(6_000);
      await expect(carousel).toHaveAttribute("style", position);
      await page.locator("#blog-next").click();
      await expect(mobileArticles.first()).toHaveAttribute("inert", "");
      await expect(mobileArticles.nth(1)).not.toHaveAttribute("inert");
      await expect(page.locator(".blog-dot").nth(1)).toHaveAttribute("aria-current", "true");
      await page.locator("#blog-prev").click();
      await expect(page.locator("#blog-prev")).toBeDisabled();
    });

    test("full page has no serious or critical WCAG A/AA findings in light and dark themes", async ({ page }, testInfo) => {
      await page.goto(locale.path);
      await expect(page.locator("#cert-carousel-region")).toBeVisible();
      await checkAccessibility(page, testInfo, "light-page");
      const toggle = page.locator(".theme-toggle-btn:visible");
      await toggle.press("ArrowDown");
      await page.keyboard.press("Home");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await expect(page.locator("html")).toHaveClass(/dark/u);
      await checkAccessibility(page, testInfo, "dark-page");
    });

    test("CSP rejects an injected inline script while application controls still run", async ({ page }, testInfo) => {
      await page.goto(locale.path);
      const policy = await requiredAttribute(page.locator('meta[http-equiv="Content-Security-Policy"]'), "content");
      expect(policy).toMatch(/script-src/u);
      expect(policy).not.toMatch(/script-src(?:-elem)?[^;]*(?:'unsafe-inline'|'unsafe-eval')/u);
      testInfo.annotations.push({ type: "intentional-csp-probe", description: "The next inline script must be rejected by the page policy" });
      await page.evaluate(() => {
        const securityWindow = window as Window & {
          __portfolioInlineExecuted?: boolean;
          __portfolioCspViolation?: { directive: string; blockedURI: string };
        };
        document.addEventListener("securitypolicyviolation", event => {
          if (event.blockedURI === "inline") securityWindow.__portfolioCspViolation = {
            directive: event.effectiveDirective, blockedURI: event.blockedURI,
          };
        });
        const script = document.createElement("script");
        script.textContent = "window.__portfolioInlineExecuted = true";
        document.body.append(script);
      });
      await expect.poll(() => page.evaluate(() => (window as Window & {
        __portfolioCspViolation?: { blockedURI: string };
      }).__portfolioCspViolation?.blockedURI)).toBe("inline");
      expect(await page.evaluate(() => (window as Window & { __portfolioInlineExecuted?: boolean }).__portfolioInlineExecuted)).toBeUndefined();
      await page.locator(".theme-toggle-btn:visible").press("Enter");
      await expect(page.locator(".theme-toggle-btn:visible")).toHaveAttribute("aria-expanded", "true");
    });

    test("without JavaScript the portfolio still exposes content and native contact links", async ({ browser, page }, testInfo) => {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: page.viewportSize(),
        isMobile: testInfo.project.name.endsWith("-mobile"),
        hasTouch: testInfo.project.name.endsWith("-mobile"),
        colorScheme: "light",
      });
      try {
        const noJsPage = await context.newPage();
        await noJsPage.goto(new URL(locale.path, origin).href);
        await expect(noJsPage.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(noJsPage.locator("main")).toContainText("Cloud");
        await expect(noJsPage.locator("#cert-grid-wrapper")).toBeVisible();
        expect(await noJsPage.locator("#cert-grid .magia:not(.hidden)").count()).toBeGreaterThan(0);
        await expect(noJsPage.locator("#top").getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute("href", /^https:\/\/linkedin\.com\/in\//u);
        await expect(noJsPage.locator('#top a[href^="mailto:"]')).toHaveAttribute("href", "mailto:agus.acevedo2000@gmail.com");
        await expect(noJsPage.locator("#blog-window")).toHaveClass(/overflow-x-auto/u);
      } finally {
        await context.close();
      }
    });
  });
}
