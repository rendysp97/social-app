import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Textarea,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Modals from "./modals";
import { PostContext } from "@/context/post_context";

export default function DropdownMenu({ id, description }) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [inputEdit, setInputEdit] = useState(null);
  const [deletedId, setDeletedId] = useState();

  const [desc, setDesc] = useState("");
  const toast = useToast();
  const router = useRouter();

  const { editPost, deletePost } = useContext(PostContext);


  const handleInput = (event) => {
    const { value, name } = event.target;

    setDesc(value);
  };

  const handleClose = () => {
    setEditOpen(false);
    setDesc("");
    setInputEdit(null);
    setDeleteOpen(false);
  };

  const handleEditOpen = () => {
    setInputEdit(id);
    setDesc(description);
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeletedId(id);
    setDeleteOpen(true);
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const result = await editPost({ id: inputEdit, description: desc });

    if (result.success) {
      toast({
        title: "Edit Success.",
        description: "Your data has been edited successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.reload();
    } else {
      toast({
        title: "Error.",
        description: "Failed to edit data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Edit failed:", result.message);
    }
  };

  const handleDelete = async () => {
    const result = await deletePost({ id: deletedId });
    

    if (result.success) {
      toast({
        title: "Delete Success.",
        description: "Your data has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.reload();
    } else {
      toast({
        title: "Error.",
        description: "Failed to delete data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Edit failed:", result.message);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<BsThreeDotsVertical />}
        />
        <MenuList>
          <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
        </MenuList>
      </Menu>

      <Modals
        isOpen={isEditOpen}
        onClose={handleClose}
        actionType="edit"
        handleEdit={handleEdit}
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

      <Modals
        isOpen={isDeleteOpen}
        onClose={handleClose}
        actionType="delete"
        handleDelete={handleDelete}
      >
        <Text>Are you sure you want to delete?</Text>
      </Modals>
    </>
  );
}
