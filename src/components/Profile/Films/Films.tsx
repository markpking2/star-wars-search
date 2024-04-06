import { Film } from "@/types";
import { ItemDisplay, renderDetail as rd } from "@/components/Profile";

interface FilmsProps {
  films: Film[];
}

const renderFilmDetails = (film: Film) => [
  rd("Release Date", film.release_date),
  rd("Director", film.director),
  rd("Producer(s)", film.producer),
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
