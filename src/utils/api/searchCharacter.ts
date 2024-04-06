import axios from "axios";

interface SearchCharacterResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }>;
}

export const searchCharacter = async (
  search: string,
): Promise<SearchCharacterResponse> =>
  axios.get(`/api/swapi/people?search=${search}`).then((res) => res.data);
