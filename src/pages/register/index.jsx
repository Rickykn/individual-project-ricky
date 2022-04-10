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

const RegisterPage = () => {
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
      password: Yup.string().required("This field is required"),
      repeatPassword: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: registerBtn,
  });

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
