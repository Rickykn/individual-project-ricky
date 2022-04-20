import CardContent from "../../components/ContentCard";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [contentList, setContentList] = useState([]);
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const maxPostsPerPage = 5;

  // get post content data from api
  const fetchContentList = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _sortBy: "createdAt",
          _sortDir: "DESC",
          _limit: maxPostsPerPage,
          _page: page,
        },
      });

      setDataLength(res.data.result.count);
      setContentList((prevPosts) => [...prevPosts, ...res.data.result.rows]);
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

  // render post data for display in ui
  const renderContentList = () => {
    if (contentList.length) {
      return contentList.map((val) => {
        return (
          <CardContent
            username={val?.user_posts?.username}
            caption={val?.caption}
            avatar={val?.user_posts?.profile_picture}
            imageUrl={val?.image_url}
            location={val?.location}
            numberOfLikes={val?.like_count}
            id={val?.id}
            user_id={val?.user_id}
            date={val?.createdAt}
          />
        );
      });
    }
  };

  const fetchNextPage = () => {
    if (page < Math.ceil(dataLength / maxPostsPerPage)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchContentList();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={contentList.length}
      next={fetchNextPage}
      hasMore={page < Math.ceil(dataLength / maxPostsPerPage)}
      loader={
        <p style={{ textAlign: "center" }}>
          <Spinner />
        </p>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Box>{renderContentList()}</Box>
    </InfiniteScroll>
  );
};

// authorize for user must login for access this page
export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default HomePage;
