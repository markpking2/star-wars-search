import { Starship } from "@/types";
import { ItemDisplay, renderDetail as rd } from "@/components/Profile";

interface StarshipsProps {
  starships: Starship[];
}

const renderStarshipDetails = (starship: Starship) => [
  rd("Model", starship.model),
  rd("Starship Class", starship.starship_class),
  rd("Manufacturer", starship.manufacturer),
  rd("Length", starship.length, (v) => `${v} m`),
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
