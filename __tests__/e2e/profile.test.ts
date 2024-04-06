import { test, expect } from "@playwright/test";

test.describe("Profile page", () => {
  test("should display character details", async ({ page }) => {
    await page.goto("http://localhost:3000/profile/1");

    await expect(page.locator("text=About Luke Skywalker")).toBeVisible();
    await expect(page.locator("text=Films Appeared In")).toBeVisible();
    await expect(page.locator("text=Starships Flown")).toBeVisible();
  });
});
