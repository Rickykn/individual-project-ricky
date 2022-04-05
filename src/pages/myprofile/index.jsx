import { Text, Flex, Box, Avatar, Divider } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);

  console.log(authSelector);
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
        <Box display="inline-flex" padding="5">
          <Avatar src={authSelector.avatar} size="2xl"></Avatar>

          <Box display="inline-block" paddingLeft="16">
            <Text fontSize="3xl">
              {authSelector.username} {authSelector.id}
            </Text>
            <Text paddingTop="3" fontWeight="bold">
              {authSelector.full_name}
            </Text>
            <Text paddingTop="3">{authSelector.email}</Text>
          </Box>
        </Box>
        <Text paddingTop="3" textAlign="center">
          {authSelector.bio}
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

export default MyProfile;
