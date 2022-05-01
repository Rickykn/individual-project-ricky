import { Text, Flex, Box, Avatar, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../configs/api";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const fetchUserProfile = async () => {
    try {
      console.log(router.query.id);
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
  useEffect(() => {
    if (router.isReady) {
      fetchUserProfile();
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
          <Text>POST</Text>
          <Text>LIKES</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
