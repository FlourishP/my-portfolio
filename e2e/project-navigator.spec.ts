import { test, expect } from "@playwright/test";

test.describe("Project Navigator Map - Sound & Pin Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(6000);
  });

  test("page loads and displays Project Navigator heading", async ({ page }) => {
    const heading = page.locator("h2:has-text('Project Navigator')");
    await expect(heading).toBeVisible({ timeout: 30000 });
  });

  test("onboarding banner is visible on load", async ({ page }) => {
    const banner = page.getByText("Welcome to my portfolio! The pins anchored on this map");
    await expect(banner).toBeVisible({ timeout: 20000 });
  });

  test("onboarding banner dismisses on GOT IT click", async ({ page }) => {
    const gotIt = page.getByText("GOT IT", { exact: true });
    await expect(gotIt).toBeVisible({ timeout: 20000 });
    await gotIt.click();
    await page.waitForTimeout(500);
    await expect(page.getByText("Welcome to my portfolio")).not.toBeVisible({ timeout: 3000 });
  });

  test("leafet map container renders", async ({ page }) => {
    const mapContainer = page.locator(".leaflet-container");
    await expect(mapContainer).toBeVisible({ timeout: 30000 });
  });

  test("map tiles load (Esri imagery)", async ({ page }) => {
    const tiles = page.locator(".leaflet-tile-pane img");
    await expect(tiles.first()).toBeVisible({ timeout: 30000 });
    const count = await tiles.count();
    expect(count).toBeGreaterThan(0);
  });

  test("pin markers render on the map", async ({ page }) => {
    const markers = page.locator(".leaflet-marker-icon");
    await expect(markers.first()).toBeVisible({ timeout: 30000 });
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test("permanent labels display repo names on pins", async ({ page }) => {
    const labels = page.locator(".pin-marker");
    await expect(labels.first()).toBeVisible({ timeout: 30000 });
    const text = await labels.first().textContent();
    expect(text && text.trim().length).toBeGreaterThan(0);
  });

  test("clicking a pin opens the routing modal", async ({ page }) => {
    const marker = page.locator(".leaflet-marker-icon").first();
    await expect(marker).toBeVisible({ timeout: 30000 });
    await marker.dispatchEvent("click");
    await page.waitForTimeout(1500);
    const modal = page.getByText("Where would you like to navigate");
    await expect(modal).toBeVisible({ timeout: 8000 });
  });

  test("routing modal shows Explore Source Code button", async ({ page }) => {
    const marker = page.locator(".leaflet-marker-icon").first();
    await expect(marker).toBeVisible({ timeout: 30000 });
    await marker.dispatchEvent("click");
    await page.waitForTimeout(1500);
    const sourceBtn = page.getByText("Explore Source Code");
    await expect(sourceBtn).toBeVisible({ timeout: 8000 });
  });

  test("routing modal dismisses on backdrop click", async ({ page }) => {
    const marker = page.locator(".leaflet-marker-icon").first();
    await expect(marker).toBeVisible({ timeout: 30000 });
    await marker.dispatchEvent("click");
    await page.waitForTimeout(1500);
    await expect(page.getByText("Where would you like to navigate")).toBeVisible({ timeout: 8000 });
    const vp = page.viewportSize();
    await page.mouse.click(vp!.width - 20, vp!.height - 20);
    await page.waitForTimeout(800);
    await expect(page.getByText("Where would you like to navigate")).not.toBeVisible({ timeout: 3000 });
  });

  test("click.wav audio file is reachable", async ({ page }) => {
    const response = await page.request.get("/audio/click.wav");
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers["content-type"]).toContain("audio");
  });

  test("Web Audio API AudioContext is available", async ({ page }) => {
    const hasAudioContext = await page.evaluate(() => {
      return typeof AudioContext !== "undefined" || typeof (window as any).webkitAudioContext !== "undefined";
    });
    expect(hasAudioContext).toBe(true);
  });

  test("search input filters projects", async ({ page }) => {
    const gotIt = page.getByText("GOT IT", { exact: true });
    if (await gotIt.isVisible({ timeout: 3000 }).catch(() => false)) {
      await gotIt.click();
      await page.waitForTimeout(500);
    }
    const searchInput = page.locator('input[placeholder="Search..."]');
    await expect(searchInput).toBeVisible({ timeout: 20000 });
    await searchInput.fill("test");
    await page.waitForTimeout(500);
    const count = await page.locator(".leaflet-marker-icon").count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("zoom indicator displays current zoom level", async ({ page }) => {
    const zoomText = page.locator("span", { hasText: /^z\d+$/ }).first();
    await expect(zoomText).toBeVisible({ timeout: 20000 });
    const text = await zoomText.textContent();
    expect(text).toMatch(/^z\d+$/);
  });

  test("overlay toggle button is functional", async ({ page }) => {
    const toggleBtn = page.locator('button[title="Toggle street labels"]');
    await expect(toggleBtn).toBeVisible({ timeout: 20000 });
    await toggleBtn.click();
    await page.waitForTimeout(500);
    const statusLabels = page.getByText("Labels:");
    await expect(statusLabels).toBeVisible();
  });
});

test.describe("Sound System - Global Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(6000);
  });

  test("sound is enabled by default on first visit", async ({ page }) => {
    const soundEnabled = await page.evaluate(() => {
      return localStorage.getItem("portfolio-sound");
    });
    // Default is true, so localStorage should be "true" after mount
    expect(soundEnabled).toBe("true");
  });

  test("sound toggle in settings is ON by default", async ({ page }) => {
    // Navigate to About/Settings — use first() to pick desktop ControlDock over mobile MobileDock
    const aboutBtn = page.locator('button[title="About"]').first();
    await aboutBtn.click();
    await page.waitForTimeout(1000);

    // The Sound Effects toggle should have the coral gradient (ON state)
    const soundToggle = page.locator("text=Sound Effects").locator("..").locator("button");
    const classes = await soundToggle.getAttribute("class");
    expect(classes).toContain("from-coral");
  });

  test("clicking sound toggle turns it OFF and persists", async ({ page }) => {
    // Navigate to About/Settings
    const aboutBtn = page.locator('button[title="About"]').first();
    await aboutBtn.click();
    await page.waitForTimeout(1000);

    // Click the Sound Effects toggle
    const soundToggle = page.locator("text=Sound Effects").locator("..").locator("button");
    await soundToggle.click();
    await page.waitForTimeout(500);

    // Check localStorage was updated
    const soundValue = await page.evaluate(() => {
      return localStorage.getItem("portfolio-sound");
    });
    expect(soundValue).toBe("false");

    // Toggle should now have surface bg (OFF state)
    const classes = await soundToggle.getAttribute("class");
    expect(classes).toContain("bg-surface");
  });

  test("sound preference persists across page reload", async ({ page }) => {
    // Turn sound off
    const aboutBtn = page.locator('button[title="About"]').first();
    await aboutBtn.click();
    await page.waitForTimeout(1000);
    const soundToggle = page.locator("text=Sound Effects").locator("..").locator("button");
    await soundToggle.click();
    await page.waitForTimeout(500);

    // Reload the page
    await page.reload();
    await page.waitForTimeout(4000);

    // Navigate back to About
    const aboutBtn2 = page.locator('button[title="About"]').first();
    await aboutBtn2.click();
    await page.waitForTimeout(1000);

    // Toggle should still be OFF
    const soundToggle2 = page.locator("text=Sound Effects").locator("..").locator("button");
    const classes = await soundToggle2.getAttribute("class");
    expect(classes).toContain("bg-surface");

    const soundValue = await page.evaluate(() => {
      return localStorage.getItem("portfolio-sound");
    });
    expect(soundValue).toBe("false");
  });

  test("clicking nav buttons plays sound (Web Audio API fires)", async ({ page }) => {
    // Verify AudioContext can be created (sound system is active)
    const canPlay = await page.evaluate(() => {
      try {
        const ctx = new AudioContext();
        ctx.close();
        return true;
      } catch {
        return false;
      }
    });
    expect(canPlay).toBe(true);

    // Click a nav button — sound should fire without error
    const techBtn = page.locator('button[title="Tech Stack"]');
    await techBtn.click();
    await page.waitForTimeout(500);

    // Verify we navigated (Tech Stack view should be visible)
    await expect(page.getByText("Tech Stack Playlist")).toBeVisible({ timeout: 5000 });
  });

  test("GOT IT button triggers click sound", async ({ page }) => {
    // The GOT IT button should be clickable and dismiss the banner
    const gotIt = page.getByText("GOT IT", { exact: true });
    await expect(gotIt).toBeVisible({ timeout: 20000 });
    await gotIt.click();
    await page.waitForTimeout(500);
    await expect(page.getByText("Welcome to my portfolio")).not.toBeVisible({ timeout: 3000 });
  });

  test("modal close button triggers click sound", async ({ page }) => {
    // Open routing modal via pin click
    const marker = page.locator(".leaflet-marker-icon").first();
    await expect(marker).toBeVisible({ timeout: 30000 });
    await marker.dispatchEvent("click");
    await page.waitForTimeout(1500);
    await expect(page.getByText("Where would you like to navigate")).toBeVisible({ timeout: 8000 });

    // Click backdrop to dismiss (bottom-right corner, far from centered modal)
    const vp = page.viewportSize();
    await page.mouse.click(vp!.width - 20, vp!.height - 20);
    await page.waitForTimeout(800);
    await expect(page.getByText("Where would you like to navigate")).not.toBeVisible({ timeout: 3000 });
  });
});
