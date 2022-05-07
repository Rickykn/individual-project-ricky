import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  FormHelperText,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../configs/api";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const resetPasswordHandler = async (values) => {
    try {
      const newPassword = {
        password: values.newPassword,
        forgotPasswordToken: router.query.fp_token,
      };

      await axiosInstance.patch("/auth/change-password", newPassword);

      toast({
        status: "success",
        title: "Change Password Success",
        description: "You can login with new password",
        duration: 2000,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed reset password",
        description: err.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      newRepeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required("This field is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      newRepeatPassword: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: resetPasswordHandler,
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
            <Heading>Change Your Password</Heading>
          </Box>
          <Box my={8} textAlign="center">
            <form>
              <FormControl isInvalid={formik.errors.newPassword}>
                <FormLabel htmlFor="inputUsername">New Password</FormLabel>

                <Input
                  onChange={(event) =>
                    formik.setFieldValue("newPassword", event.target.value)
                  }
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your new passwoord"
                />

                <FormHelperText>{formik.errors.newPassword}</FormHelperText>
              </FormControl>

              <FormControl mt={5} isInvalid={formik.errors.newRepeatPassword}>
                <FormLabel htmlFor="inputNewRepeatPassword">
                  Repeat Password
                </FormLabel>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue(
                      "newRepeatPassword",
                      event.target.value
                    )
                  }
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your new repeat password"
                />
                <FormHelperText>
                  {formik.errors.newRepeatPassword}
                </FormHelperText>
              </FormControl>
            </form>
          </Box>
          <Checkbox
            onChange={() => setPasswordVisible(!passwordVisible)}
            size="sm"
          >
            Show Password
          </Checkbox>
          <Button
            onClick={formik.handleSubmit}
            width="full"
            mt={4}
            colorScheme="blue"
            type="submit"
            // disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
