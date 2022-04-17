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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import requiresAuth from "../../lib/requiresAuth";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";

import { useRef, useState } from "react";
import { axiosInstance } from "../../configs/api";

const MyProfile = ({ data }) => {
  const authSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    const { username, fullname, bio } = formik.values;

    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("bio", bio);
    formData.append("profile_image_file", selectedFile);

    try {
      await axiosInstance.patch(`/users`, formData);
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

  const formik = useFormik({
    initialValues: {
      username: data.username,
      fullname: data.fullname,
      bio: data.bio,
    },
    validateOnChange: false,
    onSubmit: editProfileHandler,
  });

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
            <Avatar src={authSelector.avatar} size="2xl"></Avatar>
            <Box display="inline-block" paddingLeft="16">
              <Text fontSize="3xl">{authSelector.username}</Text>
              <Text paddingTop="3" fontWeight="bold">
                {authSelector.full_name}
              </Text>
              <Text paddingTop="3">{authSelector.email}</Text>
            </Box>
          </Box>

          <Box>
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

export const getServerSideProps = requiresAuth(async (context) => {
  try {
    const id = context.params.id;

    const res = await axiosInstance.get(`/users/${id}`);

    return {
      props: {
        data: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
});

export default MyProfile;
