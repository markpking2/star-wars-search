import { axiosClient } from "@/utils/api/axiosClient";
import { People } from "@/types";

interface SearchPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<People>;
}

export const searchPeople = async (
  search: string,
): Promise<SearchPeopleResponse> =>
  axiosClient()
    .get(`/api/swapi/people?search=${search}`)
    .then((res) => res.data);
