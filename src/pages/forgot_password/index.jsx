import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../configs/api";

const ForgotPassword = () => {
  const toast = useToast();

  const sendEmailForgotPassword = async (values) => {
    try {
      const userEmail = {
        email: values.email,
      };
      await axiosInstance.post("/auth/forgot-password", userEmail);
      toast({
        status: "success",
        title: "Email has been sent",
        description: "Please check email for reset password",
        duration: 2000,
        position: "top-right",
      });
      formik.setSubmitting(false);
    } catch (err) {
      toast({
        status: "error",
        title: "Failed to Send Email",
        description: err?.response?.data?.message || err.message,
        duration: 2000,
        position: "top-right",
      });
      formik.setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: sendEmailForgotPassword,
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
            <Heading>Forgot Password</Heading>
          </Box>
          <Box my={8} textAlign="center">
            <form>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel htmlFor="inputUsername">Email</FormLabel>

                <Input
                  onChange={(event) =>
                    formik.setFieldValue("email", event.target.value)
                  }
                  placeholder="Enter your email"
                />

                <FormHelperText>{formik.errors.email}</FormHelperText>
              </FormControl>
            </form>
          </Box>
          <Button
            onClick={formik.handleSubmit}
            width="full"
            mt={4}
            colorScheme="blue"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
