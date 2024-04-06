import { axiosClient } from "@/utils/api";
import { Starship } from "@/types";

export const fetchStarship = async (id: number): Promise<Starship> =>
  axiosClient()
    .get(`/api/swapi/starships/${id}`)
    .then((res) => res.data);
