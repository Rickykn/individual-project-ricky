import CardContent from "../../components/ContentCard";
import { Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";

const HomePage = () => {
  const [contentList, setContentList] = useState([]);
  const toast = useToast();

  const fetchContentList = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      console.log(res.data);

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

  const renderContentList = () => {
    if (contentList.length) {
      return contentList.map((val) => {
        return (
          <CardContent
            username={val?.User?.username}
            caption={val.caption}
            imageUrl={val.image_url}
            location={val.location}
            numberOfLikes={val.like_count}
            id={val.id}
          />
        );
      });
    }
  };

  useEffect(() => {
    fetchContentList();
  }, []);

  return <Box>{renderContentList()}</Box>;
};

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default HomePage;
