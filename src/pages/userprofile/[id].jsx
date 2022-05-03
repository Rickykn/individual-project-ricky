import {
  Text,
  Flex,
  Box,
  Avatar,
  Divider,
  GridItem,
  Center,
  Grid,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../configs/api";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const [userPostData, setUserPostData] = useState([]);
  const [userLikeData, setUserLikeData] = useState([]);
  const [renderList, setRenderList] = useState(true);
  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get(`/users`, {
        params: {
          id: router.query.id,
        },
      });
      setUserData(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userData);
  const fetchUserPostData = async () => {
    try {
      const res = await axiosInstance.get("/users/user-post", {
        params: { id: router.query.id },
      });

      setUserPostData(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserLikeData = async () => {
    try {
      const res = await axiosInstance.get("/users/user-like", {
        params: { id: router.query.id },
      });

      setUserLikeData(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUserLikeData = () => {
    if (userLikeData.length) {
      return userLikeData.map((val) => {
        return (
          <GridItem w="100%">
            <Image
              boxSize="150px"
              src={val?.Post?.image_url}
              fallbackSrc="https://via.placeholder.com/250"
              m={1}
              rounded="20px"
            />
          </GridItem>
        );
      });
    }
  };

  const renderUserPostData = () => {
    if (userPostData.length) {
      return userPostData.map((val) => {
        return (
          <GridItem w="100%">
            <Image
              boxSize="150px"
              src={val?.image_url}
              fallbackSrc="https://via.placeholder.com/250"
              m={1}
              rounded="20px"
            />
          </GridItem>
        );
      });
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchUserProfile();
      fetchUserPostData();
      fetchUserLikeData();
    }
  }, [router.isReady]);
  return (
    <Flex align="center" justifyContent="center">
      <Box
        borderWidth="2px"
        px={4}
        width="full"
        maxWidth="50vw"
        borderRadius={10}
        textAlign={4}
        boxShadow="lg"
      >
        <Box display="flex" justifyContent="space-between" padding="5">
          <Box>
            <Avatar src={userData.profile_picture} size="2xl"></Avatar>
            <Box display="inline-block" paddingLeft="16">
              <Text fontSize="3xl">{userData.username}</Text>
              <Text paddingTop="3" fontWeight="bold">
                {userData.fullname}
              </Text>
              <Text paddingTop="3">{userData.email}</Text>
            </Box>
          </Box>
        </Box>
        <Text paddingTop="3" textAlign="center">
          {userData.bio}
        </Text>

        <Divider orientation="horizontal" variant="solid" marginTop="3" />
        <Box marginTop="3" display="flex" justifyContent="space-around">
          <Text
            onClick={() => setRenderList(true)}
            sx={{ _hover: { cursor: "pointer" } }}
          >
            POST
          </Text>
          <Text
            onClick={() => setRenderList(false)}
            sx={{ _hover: { cursor: "pointer" } }}
          >
            LIKES
          </Text>
        </Box>
        <Center>
          <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={4}>
            {renderList ? renderUserPostData() : renderUserLikeData()}
          </Grid>
        </Center>
      </Box>
    </Flex>
  );
};

export default UserProfile;
