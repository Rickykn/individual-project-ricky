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
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import auth_types from "../../redux/types/auth";
import jsCookie from "js-cookie";
import Router from "next/router";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { axiosInstance } from "../../configs/api";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
  });

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const uploadContentHandler = async () => {
    // Proteksi jika file belum dipilih
    if (!selectedFile) {
      alert("Anda belum pilih file");
      return;
    }

    const formData = new FormData();
    const { caption, location } = formik.values;

    formData.append("caption", caption);
    formData.append("location", location);
    // formData.append("user_id", authSelector.id)
    formData.append("post_image_file", selectedFile);

    try {
      await axiosInstance.post("/posts", formData);
      setSelectedFile(null);
      formik.setFieldValue("caption", "");
      formik.setFieldValue("location", "");
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandlerBtn = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove("auth_token");

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
                <form>
                  <FormControl>
                    <FormLabel htmlFor="inputCaption">Caption</FormLabel>
                    <Input
                      value={formik.values.caption}
                      onChange={(e) =>
                        formik.setFieldValue("caption", e.target.value)
                      }
                      placeholder="Enter your Caption"
                    />
                    <FormHelperText></FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="inputLocation">Location</FormLabel>
                    <Input
                      value={formik.values.location}
                      onChange={(e) =>
                        formik.setFieldValue("location", e.target.value)
                      }
                      placeholder="Enter your Location"
                    />
                    <FormHelperText></FormHelperText>
                  </FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                    ref={inputFileRef}
                    type="file"
                    display="none"
                  />
                  <Button
                    onClick={() => inputFileRef.current.click()}
                    colorScheme="facebook"
                  >
                    Choose File
                  </Button>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={uploadContentHandler}
                >
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
