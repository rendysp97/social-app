import {
  Box,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { BiLike, BiChat } from "react-icons/bi";
import DropdownMenu from "./dropdown";
import { useContext, useState, useEffect } from "react";
import { ReplyContext } from "@/context/reply_context";
import Modals from "./modals";
import CardsDivider from "./card_divider";

export default function Cards({ name, desc, email, id }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [commentId, setCommentId] = useState(null);

  const { getReply, reply, loading } = useContext(ReplyContext);

  const toast = useToast();

  const handleInput = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleClose = () => {
    setIsCommentOpen(false);
    setDescription("");
    setCommentId(null);
  };

  const handleCommentOpen = async () => {
    setCommentId(id);
    setIsCommentOpen(true);

    await getReply({ id });
  };

  const handleComment = async (event) => {
    event.preventDefault();

    const result = await getReply({ id: commentId });

    if (result.success) {
      toast({
        title: "Comment Success.",
        description: "Your Reply has been posted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.reload();
    } else {
      toast({
        title: "Error.",
        description: "Failed to post Reply.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Failed to post Reply:", result.error);
    }
  };

  const repliesCount = reply && reply.data ? reply.data.length : 0;

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={name} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{email}</Text>
            </Box>
          </Flex>
          <DropdownMenu id={id} description={desc} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{desc}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button
          onClick={handleCommentOpen}
          flex="1"
          variant="ghost"
          leftIcon={<BiChat />}
        >
          {repliesCount }Comment
        </Button>
      </CardFooter>

      <Modals
        isOpen={isCommentOpen}
        onClose={handleClose}
        actionType="add"
        handleAdd={handleComment}
      >
        <Textarea
          onChange={handleInput}
          name="description"
          id="description"
          value={description}
          size="xl"
          placeholder="Input Your Comment or Reply"
          paddingLeft={2}
        />

        {loading ? (
          <Text textAlign={"center"} my={20}>
            Loading
          </Text>
        ) : reply?.data?.length > 0 ? (
          reply.data.map((item) => (
            <CardsDivider
              key={item.id}
              name={item.user.name}
              description={item.description}
            />
          ))
        ) : (
          <Text textAlign={"center"} my={20}>
            Not Have Comment
          </Text>
        )}
      </Modals>
    </Card>
  );
}
