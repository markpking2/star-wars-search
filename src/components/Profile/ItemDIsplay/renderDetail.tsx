import { Tag, Td, Tr, Wrap, WrapItem } from "@chakra-ui/react";

export const renderDetail = (
  label: string,
  value: string | string[],
  key: string,
  format: (value: string | string[]) => any = (v) => v,
) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <Tr key={`${key}-${label}`}>
      <Td fontWeight="semibold">{label}</Td>
      <Td>
        {Array.isArray(value) ? (
          <Wrap>
            {value.map(format).map((item, index) => (
              <WrapItem key={item}>
                <Tag size="md" variant="solid" colorScheme="teal">
                  {item}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          format(value)
        )}
      </Td>
    </Tr>
  );
};
