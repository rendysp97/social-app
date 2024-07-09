import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const Modals = ({
  isOpen,
  onClose,
  actionType,
  children,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {actionType === "edit" ? (
              <h1>Edit Data Note</h1>
            ) : actionType === "add" ? (
              <h1>Create Data</h1>
            ) : (
              <h1>Delete</h1>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {actionType === "add" || actionType === "edit"
                ? ""
                : "Are you sure you want to delete ?"}
            </Text>

            {actionType === "add" || actionType === "edit" ? (
              <>{children}</>
            ) : null}
          </ModalBody>

          <ModalFooter>
            {actionType === "edit" ? (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={(e) => {
                  handleEdit(e);
                  onClose();
                }}
              >
                Save Changes
              </Button>
            ) : actionType === "delete" ? (
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                colorScheme="red"
                mr={3}
                onClick={(e) => {
                  handleAdd(e);
                  onClose();
                }}
              >
                Add
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modals;
