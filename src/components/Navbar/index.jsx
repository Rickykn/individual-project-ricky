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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          {/* Button Upload New Post */}
          <Button
            marginRight="5"
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={onOpen}
          >
            New Post
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>INI BUAT NEW POST</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Upload
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* display avatar and name user login  */}
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
