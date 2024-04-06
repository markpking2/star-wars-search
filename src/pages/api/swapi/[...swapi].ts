import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface CacheEntry {
  expiry: number;
  data: any;
}

const cache: Record<string, CacheEntry> = {};
const CACHE_DURATION =
  parseInt(String(process.env.CACHE_DURATION), 10) || 60 * 60 * 1000;

const getFromCache = (key: string): any => {
  const entry = cache[key];
  if (entry && entry.expiry > Date.now()) {
    return entry.data;
  }
  return null;
};

const addToCache = (key: string, data: any): void => {
  const expiry = Date.now() + CACHE_DURATION;
  cache[key] = { expiry, data };
};

export default async function swapiHandler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const path = req.url?.replace(/^\/api\/swapi/, "");
  const { query } = req;

  const baseSwapiUrl = new URL(`https://swapi.dev/api${path}`);

  query &&
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => baseSwapiUrl.searchParams.append(key, val));
      } else {
        if (typeof value !== "undefined") {
          baseSwapiUrl.searchParams.append(key, value);
        }
      }
    });

  const swapiUrl = baseSwapiUrl.toString();

  const cachedData = getFromCache(swapiUrl);

  if (cachedData) {
    res.setHeader("X-Cache-Hit", "true");
    return res.status(200).json(cachedData);
  }

  try {
    const response = await axios.get(swapiUrl);

    addToCache(swapiUrl, response.data);

    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status || 500)
        .json({ error: "Failed to fetch data from SWAPI" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}
