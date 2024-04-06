import { test, expect } from "@playwright/test";

test.describe("Search functionality", () => {
  test("should allow typing and display results", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.fill(
      'input[placeholder="Search for a Star Wars character"]',
      "Luke",
    );

    await page.waitForSelector("text=Luke Skywalker");

    await page.click("text=Luke Skywalker");

    await expect(page).toHaveURL(/\/profile\//);
  });
});
