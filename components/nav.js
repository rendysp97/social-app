import { AuthContext } from "@/context/auth_context";
import {
  Avatar,
  Box,
  Flex,
  Input,
  Text,
  IconButton,
  useToast,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosNotifications, IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";
import { PostContext } from "@/context/post_context";
import Modals from "./modals";

const Nav = () => {
  const [isAddOpen, setAddOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const { me, logout } = useContext(AuthContext);
  const { addPost } = useContext(PostContext);

  const router = useRouter();
  const toast = useToast();

  

  const handleInput = (event) => {
    const { value } = event.target;
    setDesc(value);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleLogout = async () => {
    const stats = await logout();

    if (stats.success) {
      toast({
        title: "Logout",
        description: "Logout Your Account",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      router.push("/auth/login");
    } else {
      toast({
        title: "Failed",
        description: "Fail Logout Your Account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    
  };

  const handleClose = () => {
    setAddOpen(false);
    setDesc("");
  };

  const handleAdd = async () => {
    const stats = await addPost({ desc });
    if (stats.success) {
      toast({
        title: "Create Data",
        description: "Success Create Data",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleClose();
    } else {
      toast({
        title: "Failed",
        description: "Fail to create Data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    router.reload();
  };

  return (
    <Box position="sticky" top={0} bg="white" zIndex={10} p={2} boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Flex alignItems="center">
          <Text
            as="b"
            mr={4}
            fontSize="3xl"
            onClick={() => router.push("/dashboard")}
          >
            Social App
          </Text>
        </Flex>

        <IconButton icon={<IoMdAdd />} onClick={handleAddOpen} />

        <Flex alignItems="center">
          <IconButton mr={4} icon={<IoIosNotifications />} />
          <IconButton mr={4} icon={<BiLogOutCircle />} onClick={handleLogout} />
          <Avatar name={me?.name} onClick={() => router.push("/profile")} />
        </Flex>
      </Flex>

      <Modals
        isOpen={isAddOpen}
        onClose={handleClose}
        actionType="add"
        handleAdd={handleAdd}
      >
        <Textarea
          onChange={handleInput}
          name="description"
          id="description"
          value={desc}
          size="xl"
          placeholder="Input Your Comment"
          paddingLeft={2}
        />
      </Modals>
    </Box>
  );
};

export default Nav;
