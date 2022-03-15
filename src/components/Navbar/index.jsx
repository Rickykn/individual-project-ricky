import { Text, Box, Avatar, Icon, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="50px"
      marginBottom="5"
      paddingX="5"
      pos="sticky"
      w="100%"
      top={0}
      zIndex={1}
      background="white"
      boxShadow="dark-lg"
    >
      <Link href="/">
        <Box>
          <Icon boxSize={6} as={FaHome} />
        </Box>
      </Link>

      <Box display="inline-flex" alignItems="center">
        <Button marginRight="5" colorScheme="blue" variant="outline" size="sm">
          New Post
        </Button>
        <Link href="/profile">
          <Box display="inline-flex" alignItems="center">
            <Avatar src="https://bit.ly/dan-abramov" size="sm" />
            <Box paddingX="3">
              <Text fontSize="sm">{authSelector.username}</Text>
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
