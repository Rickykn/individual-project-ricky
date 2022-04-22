import {
  Box,
  Avatar,
  Text,
  Flex,
  Image,
  Icon,
  useToast,
  AspectRatio,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { axiosInstance } from "../../configs/api";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import moment from "moment";

const CardContent = ({
  username,
  caption,
  imageUrl,
  location,
  numberOfLikes,
  id,
  avatar,
  user_id,
  date,
}) => {
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const {
    isOpen: isDelete,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEdit,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const cancelRef = React.useRef();

  const refreshPage = () => {
    window.location.reload(false);
  };

  //delete post by id post
  const deletePost = async () => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      toast({
        title: "Deleted posts",
        description: "Success for delete your posts",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onDeleteClose();
      refreshPage();
    } catch (err) {
      toast({
        title: "Fetch data failed",
        description: "There is an error at the server",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //edit post caption by id post
  const editPost = async (values) => {
    try {
      const newCaption = {
        caption: values.caption,
      };
      await axiosInstance.patch(`/posts/${id}`, newCaption);
      toast({
        title: "Edited Caption",
        description: "Success for edit your caption",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onEditClose();
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    validationSchema: Yup.object().shape({
      caption: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: editPost,
  });

  return (
    <Flex justifyContent="center">
      <Box
        borderWidth="3px"
        px={4}
        width="full"
        borderRadius="lg"
        textAlign={4}
        boxShadow="lg"
        paddingY="2"
        marginY="13"
        maxWidth="50vw"
      >
        {/* Heading */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Box display="inline-flex">
            <Avatar size="md" src={avatar} />
            <Box paddingX="3">
              <Text fontSize="lg">{username}</Text>
              <Text fontSize="sm" color="gray.500">
                {location}
              </Text>
            </Box>
          </Box>
          <Box paddingX="3">
            <Menu>
              <MenuButton as={IconButton} icon={<Icon as={BsThreeDots} />} />
              <MenuList>
                <Link href={`/posts/${id}`}>
                  <MenuItem>Detail Post</MenuItem>
                </Link>
                {user_id === authSelector.id ? (
                  <>
                    <MenuItem onClick={onEditOpen}>Edit Post</MenuItem>
                    <Modal isOpen={isEdit} onClose={onEditClose}>
                      <ModalOverlay>
                        <ModalContent>
                          <ModalHeader>Edit Your Post</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <form>
                              <FormControl isInvalid={formik.errors.caption}>
                                <FormLabel htmlFor="inputCaption">
                                  Caption
                                </FormLabel>
                                <Input
                                  value={formik.values.caption}
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      "caption",
                                      e.target.value
                                    )
                                  }
                                  placeholder={caption}
                                />
                                <FormHelperText>
                                  {formik.errors.caption}
                                </FormHelperText>
                              </FormControl>
                            </form>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              variant="ghost"
                              mr={3}
                              onClick={onEditClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              colorScheme="blue"
                              onClick={formik.handleSubmit}
                            >
                              Save
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </ModalOverlay>
                    </Modal>

                    <MenuItem onClick={onDeleteOpen}>Delete Post</MenuItem>
                    <AlertDialog
                      isOpen={isDelete}
                      leastDestructiveRef={cancelRef}
                      onClose={onDeleteClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Post
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure delete this post?
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onDeleteClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={deletePost}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                ) : null}
              </MenuList>
            </Menu>
          </Box>
        </Box>

        {/* modal edit post */}

        {/* Content */}
        <AspectRatio ratio={4 / 3}>
          <Box position="relative" borderRadius={16}>
            <Image minWidth="full" src={imageUrl} />
          </Box>
        </AspectRatio>

        {/* Action */}
        <Box marginTop={2}>
          <Text> {moment(date).format("MMM DD, YYYY")}</Text>
          <Text fontWeight="bold">{numberOfLikes} Likes</Text>
        </Box>

        {/* caption */}
        <Box display="inline-flex">
          <Text fontWeight="bold" paddingRight="2">
            {username}
          </Text>
          <Text>{caption}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default CardContent;
