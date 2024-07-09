import {
  Box,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  Divider,
} from "@chakra-ui/react";

const CardsDivider = ({ name, description }) => {
  return (
    <Box p={5}>
      <Card>
        <CardBody>
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {name}
              </Heading>
              <Text pt="2" fontSize="sm">
                {description}
              </Text>
            </Box>
            <Divider />
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CardsDivider;
