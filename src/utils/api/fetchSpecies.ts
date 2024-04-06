import { axiosClient } from "@/utils/api";
import { Species } from "@/types";

export const fetchSpecies = async (id: number): Promise<Species> =>
  axiosClient()
    .get(`/api/swapi/species/${id}`)
    .then((res) => res.data);
