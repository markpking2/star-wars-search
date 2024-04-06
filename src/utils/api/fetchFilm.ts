import { axiosClient } from "@/utils/api";
import { Film } from "@/types";

export const fetchFilm = async (id: number): Promise<Film> =>
  axiosClient()
    .get(`/api/swapi/films/${id}`)
    .then((res) => res.data);
