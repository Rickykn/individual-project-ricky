import { Text, Flex, Box, Avatar, Divider } from "@chakra-ui/react";

const MyProfile = () => {
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
          <Avatar size="2xl"></Avatar>

          <Box display="inline-block" paddingLeft="16">
            <Text fontSize="3xl">Username</Text>
            <Text paddingTop="3" fontWeight="bold">
              Full Name
            </Text>
            <Text paddingTop="3">Email</Text>
          </Box>
        </Box>
        <Text paddingTop="3" textAlign="center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
