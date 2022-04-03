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
  InputGroup,
  InputRightElement,
  Icon,
  FormHelperText,
} from "@chakra-ui/react";

const registerPage = () => {
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
              <FormControl>
                <FormLabel htmlFor="inputUsername">Username</FormLabel>
                <Input placeholder="Enter your Username" />
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="inputEmail">Email</FormLabel>
                <Input placeholder="Enter your Email" />
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl mt={5}>
                <FormLabel htmlFor="inputPassword">Password</FormLabel>
                <Input type="password" placeholder="Enter your password" />
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl mt={5}>
                <FormLabel htmlFor="inputPassword">Repeat Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your repeat password"
                />
                <FormHelperText></FormHelperText>
              </FormControl>

              <Button width="full" mt={4} colorScheme="blue" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default registerPage;
