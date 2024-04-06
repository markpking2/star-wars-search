import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import swapiHandler from "../../../../src/pages/api/swapi/[...swapi]";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SWAPI API handler", () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      query: {},
    } as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    } as unknown as NextApiResponse;
  });

  it("should fetch all characters", async () => {
    req.url = "people";
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [] } });

    await swapiHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ results: [] });
  });

  it("should fetch an individual character", async () => {
    req.url = "people/1";
    mockedAxios.get.mockResolvedValueOnce({ data: { name: "Luke Skywalker" } });

    await swapiHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: "Luke Skywalker" });
  });

  it("should search for characters", async () => {
    req.url = "people?search=luke";
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [] } });

    await swapiHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ results: [] });
  });

  it("should use cache for subsequent requests", async () => {
    req.url = "people/2";

    const now = Date.now();
    jest.spyOn(Date, "now").mockImplementation(() => now);

    mockedAxios.get.mockResolvedValueOnce({ data: { name: "C-3PO" } });
    await swapiHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: "C-3PO" });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    jest.spyOn(Date, "now").mockImplementation(() => now + 1000);

    await swapiHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: "C-3PO" });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
