import CardContent from "../../components/ContentCard";
import { axiosInstance } from "../../configs/api";

const PostDetail = ({ postDetailData }) => {
  return (
    <CardContent
      username={postDetailData?.User?.username}
      caption={postDetailData?.caption}
      imageUrl={postDetailData?.image_url}
      location={postDetailData?.location}
      numberOfLikes={postDetailData?.like_count}
      id={postDetailData?.id}
      user_id={postDetailData.user_id}
    />
  );
};

export const getServerSideProps = async (context) => {
  try {
    const postId = context.params.postDetail;

    const res = await axiosInstance.get(`/posts/${postId}`);

    return {
      props: {
        postDetailData: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
export default PostDetail;
