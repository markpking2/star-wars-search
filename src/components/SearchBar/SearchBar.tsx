import React, { useState } from "react";
import { useDebounce } from "ahooks";
import { useQuery } from "@tanstack/react-query";
import { searchCharacter } from "@/utils/api";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  List,
  ListItem,
  ListIcon,
  Spinner,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, { wait: 500 });

  const query = useQuery({
    queryKey: ["searchCharacter", debouncedValue],
    queryFn: () => searchCharacter(debouncedValue),
    enabled: !!debouncedValue,
  });

  const searchIconColor = useColorModeValue("starWars.blue", "starWars.red");

  return (
    <Box>
      <InputGroup>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a Star Wars character"
          bg={"white"}
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
        <List
          spacing={3}
          mt={3}
          bg={"white"}
          p={3}
          borderRadius="md"
          boxShadow="md"
        >
          {query.data.results.map((character, index) => (
            <ListItem key={index}>
              <ListIcon as={FaSearch} color={searchIconColor} />
              {character.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
