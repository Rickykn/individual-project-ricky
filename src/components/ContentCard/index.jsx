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
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { FaRegCommentDots, FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import Comment from "../Comment";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../configs/api";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const CardContent = ({
  username,
  caption,
  imageUrl,
  location,
  numberOfLikes,
  id,
  user_id,
}) => {
  const [comments, setComments] = useState([]);
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();

  const fetchAllComment = async () => {
    //  const res = await axiosInstance.get("/comments")
    try {
      const res = await axiosInstance.get(`/comments/${id}`, {
        params: {
          _limit: 5,
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      // console.log(res.data.result);
      setComments(res.data.result.rows);
    } catch (error) {
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

  const renderComment = () => {
    console.log(comments);
    return comments.map((val) => {
      return (
        <Comment
          username={val?.User?.username}
          content={val?.comment_content}
        />
      );
    });
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

  const commentHandleBtn = async (values) => {
    try {
      const newComment = {
        comment_content: values.comment,
        post_id: id,
      };

      await axiosInstance.post("/comments", newComment);
      toast({
        title: "Added Comment",
        description: "Success added comment! ",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      fetchAllComment();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object().shape({
      comment: Yup.string()
        .max(300, "Too Long!")
        .required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: commentHandleBtn,
  });

  useEffect(() => {
    fetchAllComment();
  }, []);

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
                    <MenuItem>Edit Post</MenuItem>
                    <MenuItem onClick={deletePost}>Delete Post</MenuItem>
                  </>
                ) : null}
              </MenuList>
            </Menu>
          </Box>
        </Box>

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
              <Icon boxSize={6} as={FaRegHeart} />
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

        {/* Comment */}
        <Box display="flex" flexDirection="column">
          <Text marginTop="3" as="i">
            COMMENT
          </Text>
          {/* input comment */}
          <Box display="flex" marginTop="2">
            <FormControl
              isInvalid={formik.errors.comment}
              display="inline-flex"
            >
              <FormLabel htmlFor="inputComment"></FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("comment", event.target.value)
                }
                marginBottom="2"
                type="text"
                placeholder="Add a new comment"
                marginRight="2"
              />
              <FormHelperText>{formik.errors.comment}</FormHelperText>
              <Button
                onClick={formik.handleSubmit}
                colorScheme="green"
                type="submit"
              >
                Post
              </Button>
            </FormControl>
          </Box>
          {renderComment()}
        </Box>
      </Box>
    </Flex>
  );
};

export default CardContent;
