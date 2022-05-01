import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../configs/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RegisterPage = () => {
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const Router = useRouter();
  const registerBtn = async (values) => {
    try {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      if (values.password !== values.repeatPassword) {
        throw new Error("Must same password");
      }

      const res = await axiosInstance.post("/auth/register", newUser);

      console.log(res.data);
      toast({
        status: "success",
        title: "Registered user",
        description: res.data.message,
        duration: 2000,
        position: "top-right",
      });
      formik.setSubmitting(false);
      Router.push("/login");
    } catch (err) {
      console.log(Object.keys(err));
      toast({
        status: "error",
        title: "Register Failed",
        description: err?.response?.data?.message || err.message,
        duration: 2000,
        position: "top-right",
      });
      formik.setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      email: Yup.string().required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      repeatPassword: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: registerBtn,
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
            <Heading>Sign Up Your Account</Heading>
          </Box>
          <Box my={8} textAlign="center">
            <form>
              <FormControl isInvalid={formik.errors.username}>
                <FormLabel htmlFor="inputUsername">Username</FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                  placeholder="Enter your Username"
                />
                <FormHelperText>{formik.errors.username}</FormHelperText>
              </FormControl>

              <FormControl isInvalid={formik.errors.email}>
                <FormLabel htmlFor="inputEmail">Email</FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("email", event.target.value)
                  }
                  placeholder="Enter your Email"
                />
                <FormHelperText>{formik.errors.email}</FormHelperText>
              </FormControl>

              <FormControl mt={5} isInvalid={formik.errors.password}>
                <FormLabel htmlFor="inputPassword">Password</FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                  type="password"
                  placeholder="Enter your password"
                />
                <FormHelperText>{formik.errors.password}</FormHelperText>
              </FormControl>

              <FormControl mt={5} isInvalid={formik.errors.repeatPassword}>
                <FormLabel htmlFor="inputRepeatPassword">
                  Repeat Password
                </FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("repeatPassword", event.target.value)
                  }
                  type="password"
                  placeholder="Enter your repeat password"
                />
                <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
              </FormControl>

              <Button
                onClick={formik.handleSubmit}
                width="full"
                mt={4}
                colorScheme="blue"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
