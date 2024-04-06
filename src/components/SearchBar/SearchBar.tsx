import React, { useState } from "react";
import { useDebounce } from "ahooks";
import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "@/utils/api";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  List,
  Spinner,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { PersonListItem } from "@/components/SearchBar/PersonListItem";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, { wait: 500 });

  const query = useQuery({
    queryKey: ["searchCharacter", debouncedValue],
    queryFn: () => searchPeople(debouncedValue),
    enabled: !!debouncedValue,
  });

  const searchIconColor = useColorModeValue("starWars.blue", "starWars.red");

  return (
    <Box w={"100%"} maxW={"400px"}>
      <InputGroup>
        <Input
          onBlur={() => setInputValue("")}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a Star Wars character"
        />
        <InputRightElement>
          {query.isLoading ? (
            <Spinner />
          ) : (
            <Icon as={FaSearch} color={searchIconColor} />
          )}
        </InputRightElement>
      </InputGroup>
      {query.isSuccess && (
        <List spacing={3} mt={3} p={3} borderRadius="md" boxShadow="md">
          {query.data.results.map((person) => (
            <PersonListItem
              key={person.name}
              person={person}
              searchIconColor={searchIconColor}
            />
          ))}
        </List>
      )}
    </Box>
  );
};
