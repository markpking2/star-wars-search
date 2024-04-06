import { Box, Heading, Table, Tbody, Grid } from "@chakra-ui/react";

interface ItemDisplayProps {
  title: string;
  items: any[];
  renderItemDetails: (item: any) => any;
}

export const ItemDisplay = ({
  title,
  items,
  renderItemDetails,
}: ItemDisplayProps) => {
  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>
        {title}
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {items.length > 0
          ? items.map((item, i) => (
              <Box
                key={`${item.name}`}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
              >
                <Heading as="h3" size="md" mb={4}>
                  {item.name || item.title}
                </Heading>
                <Table variant="simple" size="sm">
                  <Tbody>{renderItemDetails(item)}</Tbody>
                </Table>
              </Box>
            ))
          : "No items found 🥲"}
      </Grid>
    </Box>
  );
};
