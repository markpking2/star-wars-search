import http from "http";
import { apiResolver } from "next/dist/server/api-utils/node/api-resolver";
import supertest from "supertest";
import swapiHandler from "../../src/pages/api/swapi/[...swapi]";

describe("SWAPI API handler", () => {
  const getSwapiServer = () =>
    http.createServer((request, response) =>
      apiResolver(
        request,
        response,
        null,
        swapiHandler,
        // @ts-ignore
        {},
        true,
      ),
    );

  it("should fetch all characters", async () => {
    const response = await supertest(getSwapiServer()).get("/people");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(typeof response.body.count).toBe("number");
    expect(response.body).toHaveProperty("next");
    expect(response.body).toHaveProperty("previous");
    expect(response.body).toHaveProperty("results");
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  it("should fetch an individual character", async () => {
    const response = await supertest(getSwapiServer()).get("/people/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(typeof response.body.name).toBe("string");
  });

  it("should search for characters", async () => {
    const response = await supertest(getSwapiServer()).get(
      "/people?search=luke",
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(typeof response.body.count).toBe("number");
    expect(response.body).toHaveProperty("next");
    expect(response.body).toHaveProperty("previous");
    expect(response.body).toHaveProperty("results");
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  it("should use cache for subsequent requests", async () => {
    const server = getSwapiServer();
    const path = "/people/2";

    const firstResponse = await supertest(server).get(path);
    expect(firstResponse.status).toBe(200);
    expect(firstResponse.headers).not.toHaveProperty("x-cache-hit");

    const secondResponse = await supertest(server).get(path);
    expect(secondResponse.status).toBe(200);
    expect(secondResponse.headers["x-cache-hit"]).toBe("true");

    server.close();
  });
});
