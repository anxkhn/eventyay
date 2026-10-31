const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const base = process.env.PREVIEW_URL || "http://127.0.0.1:3785";
  const output =
    process.env.SCREENSHOT_DIR ||
    path.join(os.tmpdir(), "eventyay-redesign-checks");
  fs.mkdirSync(output, { recursive: true });
  const navigate = async (hash) => {
    await page.goto(`${base}/#${hash}`);
    await page.locator("h1").waitFor();
  };
  await page.emulateMedia({ reducedMotion: "reduce" });
  await navigate("discover");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  assert.equal(await page.locator(".event-card").count(), 6);
  await page.screenshot({ path: `${output}/desktop.png`, fullPage: true });
  await page.locator('[data-category="Design"]').click();
  assert.equal(await page.locator(".event-card").count(), 1);
  await page.locator('[data-category="All events"]').click();
  await page.locator("#event-search").fill("nothing matches this");
  assert.equal(await page.locator(".event-card").count(), 0);
  await page.locator('[data-action="reset"]').click();
  await page.locator('[data-save="1"]').click();
  await page.locator('[data-action="saved"]').click();
  assert.equal(await page.locator(".event-card").count(), 1);
  await navigate("event/1");
  await page.locator('[data-action="checkout"]').click();
  await page.locator("#ticket-name").fill("Demo Visitor");
  await page.locator("#ticket-email").fill("visitor@example.test");
  await page.locator("#ticket-quantity").selectOption("2");
  assert.equal(await page.locator("#checkout-total").textContent(), "$98");
  await page.locator('#checkout-form button[type="submit"]').click();
  await page.locator('[data-action="view-tickets"]').click();
  await page.locator(".wallet-ticket").waitFor();
  assert.match(
    await page.locator(".wallet-ticket").textContent(),
    /Demo Visitor/,
  );
  await page.reload();
  assert.equal(await page.locator(".wallet-ticket").count(), 1);
  await navigate("events");
  await page.locator('.workspace-main [data-action="create"]').click();
  await page.locator("#event-name").fill("E2E Community Gathering");
  await page.locator("#event-city").fill("Online");
  await page
    .locator("#event-description")
    .fill("An end-to-end browser test event.");
  await page.locator('button[value="publish"]').click();
  await page.getByText("E2E Community Gathering", { exact: true }).waitFor();
  await navigate("schedule");
  await page.locator('[data-session="0"]').click();
  assert.equal(
    await page.locator('[data-session="0"]').getAttribute("aria-pressed"),
    "true",
  );
  await navigate("checkin");
  await page.locator('[data-checkin="0"]').click();
  assert.match(await page.locator(".checkin-counter").textContent(), /1 \/ 6/);
  await navigate("settings");
  await page.locator("#accent-hex").fill("#45795b");
  await page.locator("#dark-mode").check();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  assert.equal(await page.locator("#accent-hex").inputValue(), "#45795b");
  await page.locator("#motion-mode").uncheck();
  assert.equal(await page.locator("html").getAttribute("data-motion"), "off");
  await page.locator('[data-action="reset-theme"]').click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${output}/appearance.png`, fullPage: true });
  await navigate("dashboard");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${output}/dashboard.png`, fullPage: true });
  const violations = [];
  for (const route of [
    "discover",
    "event/1",
    "dashboard",
    "events",
    "schedule",
    "speakers",
    "submissions",
    "attendees",
    "checkin",
    "video",
    "settings",
    "tickets",
  ]) {
    await navigate(route);
    if (process.env.AXE_PATH) {
      await page.addScriptTag({ path: process.env.AXE_PATH });
      const result = await page.evaluate(
        async () =>
          await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          }),
      );
      violations.push(
        ...result.violations.map((v) => ({
          route,
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      );
    }
  }
  fs.writeFileSync(
    `${output}/checks.json`,
    JSON.stringify(
      {
        flows: "passed so far",
        consoleErrors: errors,
        accessibilityViolations: violations,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(violations, null, 2));
  await page.setViewportSize({ width: 390, height: 844 });
  await navigate("discover");
  await page.waitForTimeout(1000);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.screenshot({ path: `${output}/mobile.png`, fullPage: true });
  for (const route of ["dashboard", "event/1", "settings"]) {
    await navigate(route);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${route} mobile overflow`,
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await navigate("discover");
  assert.equal(
    await page
      .locator(".art-mark")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  await page.keyboard.press("Tab");
  assert.ok(
    await page.evaluate(() => document.activeElement !== document.body),
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#motion-toggle").click();
  assert.equal(await page.locator("html").getAttribute("data-motion"), "off");
  assert.equal(
    await page
      .locator(".art-mark")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  await page.locator("#motion-toggle").click();
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .locator(".art-mark")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  fs.writeFileSync(
    `${output}/checks.json`,
    JSON.stringify(
      {
        flows: "passed",
        consoleErrors: errors,
        accessibilityViolations: violations,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        flows: "passed",
        consoleErrors: errors,
        accessibilityViolations: violations,
      },
      null,
      2,
    ),
  );
  await browser.close();
  assert.equal(errors.length, 0, "Browser console errors");
  assert.equal(violations.length, 0, "Accessibility violations");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
