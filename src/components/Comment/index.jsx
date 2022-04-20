import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

const Comment = ({ username, content, date }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="inline-flex">
        <Text fontWeight="bold" paddingRight="2">
          {username}
        </Text>
        <Text>{content}</Text>
      </Box>
      <Box ml="5">
        <Text>{moment(date).format("MMM DD, YYYY")}</Text>
      </Box>
    </Box>
  );
};

export default Comment;
