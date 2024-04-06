import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { SearchBar } from "@/components/SearchBar";

export const Header = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} color={textColor} w="100%" p={4}>
      <Flex direction="column" align="center" justify="center">
        <Heading as="h1" size="2xl" mb={4}>
          Star Wars Character Search
        </Heading>
        <SearchBar />
      </Flex>
    </Box>
  );
};
