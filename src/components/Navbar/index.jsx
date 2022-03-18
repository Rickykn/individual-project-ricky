import {
  Text,
  Box,
  Avatar,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import auth_types from "../../redux/types/auth";
import jsCookie from "js-cookie";
import Router from "next/router";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandlerBtn = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove("user_data");

    Router.push("/login");
  };

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
      <Link href="/posts">
        <Box>
          <Icon
            boxSize={6}
            as={FaHome}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Link>
      {authSelector.id ? (
        <Box display="inline-flex" alignItems="center">
          <Button
            marginRight="5"
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            New Post
          </Button>
          <Menu>
            <MenuButton>
              <Box display="inline-flex" alignItems="center">
                <Avatar src={authSelector.avatar} size="sm" />
                <Box paddingX="3">
                  <Text fontSize="sm">{authSelector.username}</Text>
                </Box>
              </Box>
            </MenuButton>
            <MenuList>
              <Link href="/myprofile">
                <MenuItem>My Profile</MenuItem>
              </Link>
              <MenuItem onClick={logoutHandlerBtn}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </Box>
  );
};

export default Navbar;
