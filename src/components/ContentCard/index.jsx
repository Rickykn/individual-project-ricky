import {
  Box,
  Avatar,
  Text,
  Flex,
  Image,
  Icon,
  Grid,
  GridItem,
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
import { FaRegCommentDots, FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import { axiosInstance } from "../../configs/api";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const CardContent = ({
  username,
  caption,
  imageUrl,
  location,
  numberOfLikes,
  id,
  user_id,
  user_like,
  addLikes,
  removeLikes,
}) => {
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [likeStatus, setLikeStatus] = useState(user_like);
  const cancelRef = React.useRef();

  const refreshPage = () => {
    window.location.reload(false);
  };

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
      onClose();
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
      onClose();
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
            <Avatar size="md" />
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
                    {/* <MenuItem onClick={onOpen}>Edit Post</MenuItem>
                    <Modal isOpen={isOpen} onClose={onClose}>
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
                            <Button variant="ghost" mr={3} onClick={onClose}>
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
                    </Modal> */}

                    <MenuItem onClick={onOpen}>Delete Post</MenuItem>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
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
                            <Button ref={cancelRef} onClick={onClose}>
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
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem display="inline-flex" justifyContent="center">
              {likeStatus ? (
                <Icon
                  boxSize={6}
                  as={AiFillHeart}
                  onClick={() => {
                    removeLikes();
                    setLikeStatus(false);
                  }}
                />
              ) : (
                <Icon
                  boxSize={6}
                  as={FaRegHeart}
                  onClick={() => {
                    addLikes();
                    setLikeStatus(true);
                  }}
                />
              )}

              <Text paddingLeft="2">{numberOfLikes}</Text>
            </GridItem>

            <GridItem paddingLeft="5" display="flex" justifyContent="center">
              <Icon boxSize={6} as={FaRegCommentDots} />
            </GridItem>

            <GridItem paddingLeft="5" display="flex" justifyContent="center">
              <Icon boxSize={6} as={FaRegShareSquare} />
            </GridItem>
          </Grid>
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
