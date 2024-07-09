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
import { useContext, useState, useEffect } from "react";
import { BiLike, BiChat, BiSolidLike } from "react-icons/bi";
import DropdownMenu from "./dropdown";
import Modals from "./modals";
import CardsDivider from "./card_divider";

export default function Cards({ name, desc, email, id, like }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [liked, setLiked] = useState(like || false);

  const { getReply, reply, loading } = useContext(ReplyContext);
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

  const handleComment = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const result = await getReply({ id });

      if (result.success) {
        toast({
          title: "Comment Success.",
          description: "Your Reply has been posted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        router.reload();
        toast({
          title: "Error.",
          description: "Failed to post Reply.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        console.log("Failed to post Reply:", result.error);
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="10" >
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
        <Button
          flex="1"
          variant="ghost"
          leftIcon={liked ? <BiSolidLike /> : <BiLike />}
          onClick={handleLike}
        >
          Like
        </Button>
        <Button
          onClick={handleCommentOpen}
          flex="1"
          variant="ghost"
          leftIcon={<BiChat />}
        >
          Comment
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
