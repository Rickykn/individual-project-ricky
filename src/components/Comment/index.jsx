import { Box, Text } from "@chakra-ui/react";

const Comment = ({ username, content }) => {
  return (
    <Box display="inline-flex">
      <Text fontWeight="bold" paddingRight="2">
        {username}
      </Text>
      <Text>{content}</Text>
    </Box>
  );
};

export default Comment;
