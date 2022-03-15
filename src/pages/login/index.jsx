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
} from "@chakra-ui/react";
import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      formik.setFieldValue("password", "");
    },
  });
  return (
    <Flex minHeight="90vh" align="center" justifyContent="center">
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
              <FormControl>
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
              </FormControl>

              <FormControl mt={5}>
                <FormLabel htmlFor="inputPassword">password</FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                  id="inputPassword"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                />
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
