import { People } from "@/types";
import { ListIcon, ListItem } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { getIdFromUrl } from "@/utils";

export const PersonListItem = ({
  person,
  searchIconColor,
}: {
  person: People;
  searchIconColor: string;
}) => {
  return (
    <Link href={`/profile/${getIdFromUrl(person.url)}`}>
      <ListItem>
        <ListIcon as={FaSearch} color={searchIconColor} />
        {person.name}
      </ListItem>
    </Link>
  );
};
