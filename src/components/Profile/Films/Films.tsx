import { Film } from "@/types";
import { ItemDisplay, renderDetail as rd } from "@/components/Profile";

interface FilmsProps {
  films: Film[];
}

const renderFilmDetails = (film: Film) => [
  rd("Release Date", film.release_date, film.url),
  rd("Director", film.director, film.url),
  rd("Producer(s)", film.producer, film.url),
];

export const Films = ({ films }: FilmsProps) => {
  return (
    <ItemDisplay
      title="Films Appeared In"
      items={films}
      renderItemDetails={renderFilmDetails}
    />
  );
};
