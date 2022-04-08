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
} from "@chakra-ui/react";
import { FaRegCommentDots, FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import Comment from "../Comment";
import axios from "axios";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../configs/api";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

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
  // const [commentInput, setCommentInput] = useState("");

  // const fetchAllComment = async () => {
  //   //  const res = await axiosInstance.get("/comments")
  //   try {
  //     const res = await axiosInstance.get("/comments", {
  //       params: {
  //         _expand: "user",
  //         postId: id,
  //       },
  //     });
  //     setComments(res.data);
  //   } catch (error) {
  //     toast({
  //       title: "Fetch data failed",
  //       description: "There is an error at the server",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   }
  // };

  const renderAllComment = () => {
    return comments.map((val) => {
      return <Comment username={val.user.username} content={val.content} />;
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

  useEffect(() => {
    // fetchAllComment();
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
                <MenuItem>View Details</MenuItem>
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
          {/* {renderAllComment()} */}
        </Box>
      </Box>
    </Flex>
  );
};

export default CardContent;
