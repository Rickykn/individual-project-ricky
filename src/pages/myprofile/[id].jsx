import {
  Text,
  Flex,
  Box,
  Avatar,
  Divider,
  Icon,
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
  useToast,
  FormHelperText,
  Button,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import requiresAuth from "../../lib/requiresAuth";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../configs/api";
import { useDispatch } from "react-redux";
import auth_types from "../../redux/types/auth";

const MyProfile = ({ userDetail }) => {
  const [data, setData] = useState(userDetail);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userPostData, setUserPostData] = useState([]);
  const [userLikeData, setUserLikeData] = useState([]);
  const [renderList, setRenderList] = useState(true);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    const { username, fullname, bio } = formik.values;

    if (username !== data.username) {
      formData.append("username", username);
    }

    formData.append("fullname", fullname);
    formData.append("bio", bio);
    formData.append("profile_image_file", selectedFile);

    try {
      const res = await axiosInstance.patch(`/users`, formData);
      dispatch({
        type: auth_types.LOGIN_USER,
        payload: res.data.result,
      });

      const newArr = { ...data, ...res.data.result };
      setData(newArr);
      toast({
        title: "Edited Profle",
        description: "Profile updated!!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPostData = async () => {
    try {
      const res = await axiosInstance.get("/users/user-post", {
        params: { id: data.id },
      });

      setUserPostData(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserLikeData = async () => {
    try {
      const res = await axiosInstance.get("/users/user-like", {
        params: { id: data.id },
      });
      console.log(res.data.result);
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

  const formik = useFormik({
    initialValues: {
      username: data.username,
      fullname: data.fullname,
      bio: data.bio,
    },
    validateOnChange: false,
    onSubmit: editProfileHandler,
  });

  const resendEmailHandler = async () => {
    try {
      await axiosInstance.post("/auth/resend-verification");
      toast({
        title: "Resend Email Verification",
        description: "Please check your email for verification account",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPostData();
    fetchUserLikeData();
  }, []);

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
            <Avatar src={data.profile_picture} size="2xl"></Avatar>
            <Box display="inline-block" paddingLeft="16">
              <Text fontSize="3xl">{data.username}</Text>
              <Text paddingTop="3" fontWeight="bold">
                {data.fullname}
              </Text>
              <Text paddingTop="3">{data.email}</Text>
            </Box>
          </Box>

          <Box>
            {data.is_verified ? (
              <Icon
                boxSize={6}
                as={FaEdit}
                sx={{
                  _hover: {
                    cursor: "pointer",
                  },
                }}
                onClick={onOpen}
              />
            ) : (
              <>
                <Text>Please verify your account</Text>
                <Button
                  onClick={resendEmailHandler}
                  colorScheme="teal"
                  size="xs"
                >
                  Resend Email
                </Button>
              </>
            )}
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <FormControl isInvalid={formik.errors.username}>
                    <FormLabel htmlFor="inputCaption">username</FormLabel>
                    <Input
                      value={formik.values.username}
                      onChange={(e) =>
                        formik.setFieldValue("username", e.target.value)
                      }
                      placeholder="Enter your username"
                    />
                    <FormHelperText>{formik.errors.username}</FormHelperText>
                  </FormControl>

                  <FormControl isInvalid={formik.errors.fullname}>
                    <FormLabel htmlFor="inputLocation">fullname</FormLabel>
                    <Input
                      value={formik.values.fullname}
                      onChange={(e) =>
                        formik.setFieldValue("fullname", e.target.value)
                      }
                      placeholder={formik.values.fullname}
                    />
                    <FormHelperText>{formik.errors.fullname}</FormHelperText>
                  </FormControl>
                  <FormControl isInvalid={formik.errors.bio}>
                    <FormLabel htmlFor="inputCaption">bio</FormLabel>
                    <Input
                      value={formik.values.bio}
                      onChange={(e) =>
                        formik.setFieldValue("bio", e.target.value)
                      }
                      placeholder="Enter your bio"
                    />
                    <FormHelperText>{formik.errors.bio}</FormHelperText>
                  </FormControl>
                  <FormLabel>Profile Picture</FormLabel>
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
                <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Text paddingTop="3" textAlign="center">
          {data.bio}
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

export const getServerSideProps = requiresAuth(async (context) => {
  try {
    const id = context.params.id;

    const res = await axiosInstance.get(`/users`, {
      params: {
        id,
      },
    });

    return {
      props: {
        userDetail: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
});

export default MyProfile;
