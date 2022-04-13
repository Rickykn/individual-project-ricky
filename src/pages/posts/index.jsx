import CardContent from "../../components/ContentCard";
import { Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [contentList, setContentList] = useState([]);
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();

  // get post content data from api
  const fetchContentList = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });

      setContentList(res.data.result.rows);
    } catch (error) {
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

  // render post data for display in ui
  const renderContentList = () => {
    if (contentList.length) {
      return contentList.map((val, idx) => {
        let like_status;

        if (val?.user_likes?.length) {
          like_status = true;
        } else {
          like_status = false;
        }
        return (
          <CardContent
            username={val?.user_posts?.username}
            caption={val?.caption}
            imageUrl={val?.image_url}
            location={val?.location}
            numberOfLikes={val?.like_count}
            id={val?.id}
            user_id={val?.user_id}
            user_like={like_status}
            addLikes={() => {
              addLikes(val?.id, authSelector.id);
            }}
            removeLikes={() => {
              removesLikes(val?.id, authSelector.id);
            }}
          />
        );
      });
    }
  };

  const addLikes = async (postId, userId) => {
    try {
      await axiosInstance.post(`/posts/${postId}/likes/${userId}`);
      fetchContentList();
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
      fetchContentList();
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

  useEffect(() => {
    fetchContentList();
  }, []);

  return <Box>{renderContentList()}</Box>;
};

// authorize for user must login for access this page
export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default HomePage;
