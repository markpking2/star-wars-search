import { Starship } from "@/types";
import { ItemDisplay, renderDetail as rd } from "@/components/Profile";

interface StarshipsProps {
  starships: Starship[];
}

const renderStarshipDetails = (starship: Starship) => [
  rd("Model", starship.model, starship.url),
  rd("Starship Class", starship.starship_class, starship.url),
  rd("Manufacturer", starship.manufacturer, starship.url),
  rd("Length", starship.length, starship.url, (v) => `${v} m`),
];

export const Starships = ({ starships }: StarshipsProps) => {
  return (
    <ItemDisplay
      title={"Starships Flown"}
      items={starships}
      renderItemDetails={renderStarshipDetails}
    />
  );
};
