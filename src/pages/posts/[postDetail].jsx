import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import DetailPost from "../../components/DetailPost";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";

const PostDetail = ({ postDetailData }) => {
  const [data, setData] = useState(postDetailData);
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();

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

  const removesLikes = async (postId, userId, idx) => {
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

  let like_status;

  if (data?.user_likes?.length) {
    like_status = true;
  } else {
    like_status = false;
  }
  return (
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
  );
};

// get post data by id from server side for detail post data
export const getServerSideProps = requiresAuth(async (context) => {
  try {
    const postId = context.params.postDetail;
    const token = context.req.cookies.auth_token;

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
