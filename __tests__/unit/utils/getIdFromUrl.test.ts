import { getIdFromUrl } from "@/utils";

describe("getIdFromUrl", () => {
  it("should extract the ID as a number from a valid SWAPI URL", () => {
    const url = "https://swapi.dev/api/people/1/";
    expect(getIdFromUrl(url)).toBe(1);
  });

  it("should extract the ID as a number even if the URL does not end with a slash", () => {
    const url = "https://swapi.dev/api/people/1";
    expect(getIdFromUrl(url)).toBe(1);
  });

  it("should return null for URLs that do not contain an ID", () => {
    const url = "https://swapi.dev/api/people/";
    expect(getIdFromUrl(url)).toBeNull();
  });

  it("should return null for invalid URLs", () => {
    const url = "https://example.com";
    expect(getIdFromUrl(url)).toBeNull();
  });

  it("should return null for empty strings", () => {
    const url = "";
    expect(getIdFromUrl(url)).toBeNull();
  });

  it("should handle URLs with query parameters correctly", () => {
    const url = "https://swapi.dev/api/people/1/?search=luke";
    expect(getIdFromUrl(url)).toBe(1);
  });

  it("should return null for non-string inputs", () => {
    // @ts-ignore: Testing runtime error for non-string input
    expect(getIdFromUrl(null)).toBeNull();
    // @ts-ignore: Testing runtime error for non-string input
    expect(getIdFromUrl(undefined)).toBeNull();
    // @ts-ignore: Testing runtime error for non-string input
    expect(getIdFromUrl(123)).toBeNull();
  });
});
