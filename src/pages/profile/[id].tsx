import { GetServerSideProps } from "next";
import { Film, People, Species, Starship } from "@/types";
import {
  fetchPerson,
  fetchFilm,
  fetchStarship,
  fetchSpecies,
} from "@/utils/api";
import { getIdFromUrl } from "@/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Profile } from "@/components/Profile";

const ProfilePage = ({
  person,
  films,
  starships,
  species,
}: {
  person: People;
  films: Array<Film>;
  starships: Array<Starship>;
  species: Array<Species>;
}) => {
  return (
    <>
      <Header />
      <Profile
        person={person}
        films={films}
        starships={starships}
        species={species}
      />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const person = await fetchPerson(parseInt(id));
  const speciesIds = person.species
    .map((url) => getIdFromUrl(url))
    .filter(Boolean);
  const filmIds = person.films.map((url) => getIdFromUrl(url)).filter(Boolean);
  const starshipIds = person.starships
    .map((url) => getIdFromUrl(url))
    .filter(Boolean);

  const [films, starships, species] = await Promise.all([
    Promise.all((filmIds as number[]).map(fetchFilm)),
    Promise.all((starshipIds as number[]).map(fetchStarship)),
    Promise.all((starshipIds as number[]).map(fetchStarship)),
    Promise.all((speciesIds as number[]).map(fetchSpecies)),
  ]);

  return { props: { person, films, starships, species } };
};

export default ProfilePage;
