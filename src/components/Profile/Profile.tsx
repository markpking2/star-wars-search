import { Box } from "@chakra-ui/react";
import { Film, People, Species, Starship } from "@/types";
import {
  Films,
  Starships,
  renderDetail as rd,
  ItemDisplay,
} from "@/components/Profile";

interface ProfileProps {
  person: People;
  films: Film[];
  starships: Starship[];
  species: Species[];
}

const renderPersonDetails = ({
  person,
  species,
}: {
  person: People;
  species: Species[];
}) => [
  rd("Height", person.height, (v) => `${v} cm`),
  rd("Weight", person.mass, (v) => `${v} kg`),
  rd("Hair Color", person.hair_color, (v) =>
    v === "n/a"
      ? "No hair"
      : (v as string).charAt(0).toUpperCase() + v.slice(1),
  ),
  rd("Date of Birth", person.birth_year),
  rd("Species", species.map((s) => s.name).join(", ")),
];

export const Profile = ({
  person,
  films,
  starships,
  species,
}: ProfileProps) => {
  return (
    <Box>
      <ItemDisplay
        title={`About ${person.name}`}
        items={[{ person, species }]}
        renderItemDetails={renderPersonDetails}
      />
      <Films films={films} />
      <Starships starships={starships} />
    </Box>
  );
};
