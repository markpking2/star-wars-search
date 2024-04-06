import { GetServerSideProps } from "next";
import { Film, People, Starship } from "@/types";
import { fetchPerson, fetchFilm, fetchStarship } from "@/utils/api";
import { getIdFromUrl } from "@/utils";
import { Footer } from "@/components/Footer";

const ProfilePage = ({
  person,
  films,
  starships,
}: {
  person: People;
  films: Array<Film>;
  starships: Array<Starship>;
}) => {
  console.log({ person, films, starships });

  return (
    <>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const person = await fetchPerson(parseInt(id));
  const filmIds = person.films.map((url) => getIdFromUrl(url)).filter(Boolean);
  const starshipIds = person.starships
    .map((url) => getIdFromUrl(url))
    .filter(Boolean);
  const films = await Promise.all((filmIds as number[]).map(fetchFilm));
  const starships = await Promise.all(
    (starshipIds as number[]).map(fetchStarship),
  );
  return { props: { person, films, starships } };
};

export default ProfilePage;
