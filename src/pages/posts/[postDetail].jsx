import {
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  IconButton,
  Icon,
  Button,
  Box,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import DetailPost from "../../components/DetailPost";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { BiCopy } from "react-icons/bi";
import { useRouter } from "next/router";
import { WEB_URL } from "../../configs/url";
import PageTitle from "../../components/PageTitle";

const PostDetail = ({ postDetailData }) => {
  const [data, setData] = useState(postDetailData);
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addLikes = async (postId, userId) => {
    try {
      await axiosInstance.post(`/posts/${postId}/likes/${userId}`);
      let newArr = { ...data };
      newArr.like_count++;
      setData(newArr);
    } catch (err) {
      console.log(err);
      toast({
        title: "Fetch data failed",
        description: "There is an error at the server",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const removesLikes = async (postId, userId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}/likes/${userId}`);
      let newArr = { ...data };
      newArr.like_count--;
      setData(newArr);
    } catch (err) {
      console.log(err);
      toast({
        title: "Fetch data failed",
        description: "There is an error at the server",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(`${WEB_URL}${router.asPath}`);

    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
  };

  let like_status;

  if (data?.user_likes?.length) {
    like_status = true;
  } else {
    like_status = false;
  }
  return (
    <PageTitle
      title={`${data?.user_posts?.username} || ${data?.caption}`}
      description={data?.caption}
      image={data?.image_url}
      url={`${WEB_URL}${router.asPath}`}
    >
      <Box>
        <Center>
          <Button colorScheme="teal" onClick={onOpen}>
            Share this content!
          </Button>
        </Center>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share Content</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack mt={2} direction="row">
                <FacebookShareButton
                  url={`${WEB_URL}${router.asPath}`}
                  quote={`Cek ${data?.caption} sekarang juga! By ${data?.user_posts?.username}`}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton
                  title={`Cek ${data?.caption} sekarang juga!`}
                  url={`${WEB_URL}${router.asPath}`}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`${WEB_URL}${router.asPath}`}
                  title={`${data?.caption}`}
                  separator={" || "}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <IconButton
                  onClick={copyLinkBtnHandler}
                  borderRadius="50%"
                  icon={<Icon as={BiCopy} />}
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <DetailPost
          username={data?.user_posts?.username}
          avatar={data?.user_posts?.profile_picture}
          caption={data?.caption}
          imageUrl={data?.image_url}
          location={data?.location}
          numberOfLikes={data?.like_count}
          id={data?.id}
          user_id={data?.user_id}
          user_like={like_status}
          addLikes={() => {
            addLikes(data?.id, authSelector.id);
          }}
          removeLikes={() => {
            removesLikes(data?.id, authSelector.id);
          }}
        ></DetailPost>
      </Box>
    </PageTitle>
  );
};

// get post data by id from server side for detail post data
export const getServerSideProps = requiresAuth(async (context) => {
  try {
    const postId = context.params.postDetail;

    const res = await axios.get(`http://localhost:2000/posts/${postId}`, {
      headers: {
        Authorization: context.req.cookies.auth_token,
      },
    });

    return {
      props: {
        postDetailData: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
});
export default PostDetail;
