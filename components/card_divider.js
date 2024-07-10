import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { ReplyContext } from "@/context/reply_context";
import { useRouter } from "next/router";

export default function MyCard({ name, description, ownReply, id }) {
  const { deleteReplyPost} = useContext(ReplyContext);

  const toast = useToast();
  const router = useRouter()


  const handleDelete = async () => {
    const result = await deleteReplyPost({ id });

    if (result.success) {
      toast({
        title: "Delete Success.",
        description: "Delete Reply",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      router.reload()

    } else {
      toast({
        title: "Error.",
        description: "Delete Fail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      
    }
  };

  return (
    <Box p={5}>
      <Card>
        <CardBody position="relative">
          <Stack spacing="4">
            <Box position="relative">
              {ownReply ? (
                <IconButton
                  onClick={handleDelete}
                  aria-label="Close"
                  icon={<CloseIcon />}
                  size="sm"
                  position="absolute"
                  top="0"
                  right="0"
                />
              ) : null}

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
}
