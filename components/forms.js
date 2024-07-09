import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

export default function Forms({ children, image }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        alignItems={"center"}
        padding={10}
        borderWidth={2}
        borderRadius={25}
        margin=" auto"
        width={{ base: "90%", md: "80%", lg: "70%" }}
      >
        <Image
          objectFit="cover"
          width={350}
          height={350}
          src={image}
          alt="images"
        />
        <Stack marginLeft={50}>{children}</Stack>
      </Card>
    </Box>
  );
}
