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
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import Comment from "../Comment";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../configs/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/router";

const DetailPost = ({
  username,
  caption,
  imageUrl,
  location,
  numberOfLikes,
  id,
  avatar,
  user_like,
  addLikes,
  removeLikes,
}) => {
  const [comments, setComments] = useState([]);
  const toast = useToast();
  const [likeStatus, setLikeStatus] = useState(user_like);
  const maxCommentPerPage = 5;
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const router = useRouter();

  // get comment pagination from api
  const fetchAllComment = async () => {
    try {
      const res = await axiosInstance.get(`/comments/${id}`, {
        params: {
          _limit: maxCommentPerPage,
          _sortBy: "createdAt",
          _sortDir: "DESC",
          _page: page,
        },
      });
      // console.log(res.data.result);
      // setComments(res.data.result.rows);
      setDataLength(res.data.result.count);
      setComments((prevComment) => [...prevComment, ...res.data.result.rows]);
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

  // render comment for display in ui
  const renderComment = () => {
    return comments.map((val) => {
      return (
        <Comment
          username={val?.User?.username}
          content={val?.comment_content}
          date={val?.createdat}
        />
      );
    });
  };

  // function button for add new post
  const commentHandleBtn = async (values) => {
    try {
      const newComment = {
        comment_content: values.comment,
        post_id: id,
      };

      const res = await axiosInstance.post("/comments", newComment);
      toast({
        title: "Added Comment",
        description: "Success added comment! ",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      // fetchAllComment();
      formik.setFieldValue("comment", "");
      // let newArr = [...comments, ...res.data.result];
      setComments((prevComment) => [res.data.result, ...prevComment]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPage = () => {
    if (page < Math.ceil(dataLength / maxCommentPerPage)) {
      setPage(page + 1);
    }
  };

  // validation and handle form input
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
  }, [page]);

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
        </Box>

        {/* Content */}
        <AspectRatio ratio={4 / 3}>
          <Box position="relative" borderRadius={16}>
            <Image minWidth="full" src={imageUrl} />
          </Box>
        </AspectRatio>

        {/* Action */}
        <Box marginTop={2} display="flex">
          {likeStatus ? (
            <Icon
              boxSize={6}
              sx={{ _hover: { cursor: "pointer" } }}
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
              sx={{ _hover: { cursor: "pointer" } }}
              onClick={() => {
                addLikes();
                setLikeStatus(true);
              }}
            />
          )}
          <Text paddingLeft="2">{numberOfLikes}</Text>
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
                value={formik.values.comment}
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
          {comments.length ? (
            <Text
              fontSize="sm"
              sx={{ _hover: { cursor: "pointer" } }}
              onClick={fetchNextPage}
            >
              {page === Math.ceil(dataLength / maxCommentPerPage)
                ? ""
                : "See More Comment"}
            </Text>
          ) : (
            <Text>No Comments</Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default DetailPost;
