import http from "http";
import { apiResolver } from "next/dist/server/api-utils/node/api-resolver";
import supertest from "supertest";
import swapiHandler from "@/pages/api/swapi/[...swapi]";
import {
  fetchFilm,
  fetchPerson,
  fetchStarship,
  fetchSpecies,
  searchPeople,
} from "@/utils/api";
import { axiosClient } from "@/utils";
import axios from "axios";
import * as _ from "lodash/fp";
import { Film, People, Species, Starship } from "@/types";

jest.mock("@/utils/api/axiosClient", () => ({
  axiosClient: jest.fn(),
}));

const mockAxiosClient = axiosClient as jest.MockedFunction<typeof axiosClient>;

const expectProperties = (
  response: People | Film | Starship | Species,
  properties: string[],
) => {
  expect(_.every((property) => _.has(property, response), properties)).toBe(
    true,
  );
};

describe("SWAPI API handler", () => {
  let server: http.Server;

  beforeAll((done) => {
    server = http
      .createServer((request, response) =>
        // @ts-ignore
        apiResolver(request, response, null, swapiHandler, {}, true),
      )
      .listen(0, () => {
        const { port } = server.address() as {
          port: number;
        };
        const baseURL = `http://localhost:${port}`;
        mockAxiosClient.mockImplementation(() => {
          return axios.create({ baseURL });
        });
        done();
      });
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should fetch an individual character", async () => {
    const response = await fetchPerson(1);
    const properties = [
      "name",
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
      "homeworld",
      "films",
      "species",
      "vehicles",
      "starships",
      "created",
      "edited",
      "url",
    ];
    expectProperties(response, properties);
  });

  it("should fetch a film", async () => {
    const response = await fetchFilm(1);
    expectProperties(response, [
      "title",
      "episode_id",
      "opening_crawl",
      "director",
      "producer",
      "release_date",
      "characters",
      "planets",
      "starships",
      "vehicles",
      "species",
      "created",
      "edited",
      "url",
    ]);
  });

  it("should fetch a starship", async () => {
    const response = await fetchStarship(2);
    expectProperties(response, [
      "name",
      "model",
      "manufacturer",
      "cost_in_credits",
      "length",
      "max_atmosphering_speed",
      "crew",
      "passengers",
      "cargo_capacity",
      "consumables",
      "hyperdrive_rating",
      "MGLT",
      "starship_class",
      "pilots",
      "films",
      "created",
      "edited",
      "url",
    ]);
  });

  it("should fetch a species", async () => {
    const response = await fetchSpecies(1);
    expectProperties(response, [
      "name",
      "classification",
      "designation",
      "average_height",
      "average_lifespan",
      "eye_colors",
      "hair_colors",
      "skin_colors",
      "language",
      "homeworld",
      "people",
      "films",
      "url",
      "created",
      "edited",
    ]);
  });

  it("should search for characters", async () => {
    const response = await searchPeople("luke");
    expect(response).toHaveProperty("count");
    expect(typeof response.count).toBe("number");
    expect(response).toHaveProperty("next");
    expect(response).toHaveProperty("previous");
    expect(response).toHaveProperty("results");
    expect(Array.isArray(response.results)).toBe(true);
  });

  it("should use cache for subsequent requests", async () => {
    const path = "/people/2";

    const firstResponse = await supertest(server).get(path);
    expect(firstResponse.status).toBe(200);
    expect(firstResponse.headers).not.toHaveProperty("x-cache-hit");

    const secondResponse = await supertest(server).get(path);
    expect(secondResponse.status).toBe(200);
    expect(secondResponse.headers["x-cache-hit"]).toBe("true");
  });
});
