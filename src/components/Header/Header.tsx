import { Box, Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "@/components/SearchBar";

export const Header = () => {
  return (
    <Box w="100%" p={4}>
      <Flex direction="column" align="center" justify="center">
        <Heading as="h1" size="2xl" mb={4}>
          Star Wars Character Search
        </Heading>
        <SearchBar />
      </Flex>
    </Box>
  );
};
