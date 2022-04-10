import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosInstance } from "../../configs/api";
import { useDispatch, useSelector } from "react-redux";
import auth_types from "../../redux/types/auth";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import * as Yup from "yup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth);
  const Router = useRouter();

  const toast = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginHandleBtn = async (values) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const userResponse = res.data.result;
      console.log(userResponse);

      jsCookie.set("auth_token", userResponse.token);

      if (userResponse.token) {
        dispatch({
          type: auth_types.LOGIN_USER,
          payload: userResponse.user,
        });
      }

      console.log(authSelector);
      Router.push("/posts");
      formik.setSubmitting(false);
    } catch (err) {
      toast({
        status: "error",
        title: "Login Failed",
        description: err.message,
        duration: 2000,
      });
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: loginHandleBtn,
  });

  useEffect(() => {
    if (authSelector.id) {
      Router.push("/posts");
    }
  }, [authSelector.id]);
  return (
    <Flex minHeight="75vh" align="center" justifyContent="center">
      <Box
        borderWidth="2px"
        px={4}
        width="full"
        maxWidth="lg"
        borderRadius={10}
        textAlign={4}
        boxShadow="lg"
      >
        <Box p={4} borderRadius={10}>
          <Box textAlign="center">
            <Heading>Sign In to Your Account</Heading>
          </Box>
          <Box my={8} textAlign="center">
            <form>
              <FormControl isInvalid={formik.errors.username}>
                <FormLabel htmlFor="inputUsername">
                  Email address or Username
                </FormLabel>

                <Input
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                  placeholder="Enter your email address or Username"
                  id="inputUsername"
                  name="username"
                  value={formik.values.username}
                />
                <FormHelperText>{formik.errors.username}</FormHelperText>
              </FormControl>

              <FormControl mt={5} isInvalid={formik.errors.password}>
                <FormLabel htmlFor="inputPassword">password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)
                    }
                    id="inputPassword"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                  />
                  <InputRightElement
                    children={
                      <Icon
                        fontSize="xl"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        as={passwordVisible ? IoMdEyeOff : IoMdEye}
                        sx={{ _hover: { cursor: "pointer" } }}
                      ></Icon>
                    }
                  ></InputRightElement>
                </InputGroup>
                <FormHelperText>{formik.errors.password}</FormHelperText>
              </FormControl>

              <Stack isInline justifyContent="space-between" mt={5}>
                <Box>
                  <ChakraLink>Forgot your password?</ChakraLink>
                </Box>
              </Stack>

              <Button
                onClick={formik.handleSubmit}
                width="full"
                mt={4}
                colorScheme="blue"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
