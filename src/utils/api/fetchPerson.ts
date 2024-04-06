import { axiosClient } from "@/utils/api";
import { People } from "@/types";

export const fetchPerson = async (id: number): Promise<People> =>
  axiosClient()
    .get(`/api/swapi/people/${id}`)
    .then((res) => res.data);
