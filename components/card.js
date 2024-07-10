import { LikeContext } from "@/context/likes_context";
import { ReplyContext } from "@/context/reply_context";
import {
  useToast,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Text,
  Box,
  CardFooter,
  Button,
  Heading,
  CardBody,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BiLike, BiChat, BiSolidLike } from "react-icons/bi";
import DropdownMenu from "./dropdown";
import Modals from "./modals";
import CardsDivider from "./card_divider";

export default function Cards({
  name,
  desc,
  email,
  id,
  like,
  count,
  replies,
  ownPost,
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [liked, setLiked] = useState(like || false);

  const { getReply, reply, loading, postReply } = useContext(ReplyContext);
  const { likePost, unLikePost } = useContext(LikeContext);
  const toast = useToast();
  const router = useRouter();

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

  const handleLike = async (e) => {
    e.preventDefault();

    let result;

    if (!liked) {
      result = await likePost({ id });
    } else {
      result = await unLikePost({ id });
    }

    if (result.success) {
      toast({
        title: !liked ? "Like Success." : "Unlike Success",
        description: !liked ? "Your Like successfully." : "Unlike Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setLiked(!liked);
    } else {
      toast({
        title: "Error.",
        description: "Failed to Like post ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Failed to like post:", result.error);
    }
  };

  const handlePostReply = async () => {
    const result = await postReply({ id, description });

    if (result.success) {
      toast({
        title: "Reply Success.",
        description: "Add Replies",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.reload();
    } else {
      toast({
        title: "Error.",
        description: "Error Add Replies",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="10">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={name} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{email}</Text>
            </Box>
          </Flex>
          <DropdownMenu id={id} description={desc} ownPost={ownPost} />
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
        <Button
          flex="1"
          variant="ghost"
          leftIcon={liked ? <BiSolidLike /> : <BiLike />}
          onClick={handleLike}
        >
          {count} Like
        </Button>
        <Button
          onClick={handleCommentOpen}
          flex="1"
          variant="ghost"
          leftIcon={<BiChat />}
        >
          {replies} Comment
        </Button>
      </CardFooter>

      <Modals
        isOpen={isCommentOpen}
        onClose={handleClose}
        actionType="add"
        handleAdd={handlePostReply}
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
              id={item.id}
              name={item.user.name}
              description={item.description}
              ownReply={item.is_own_reply}
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
