import DetailPost from "../../components/DetailPost";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";

const PostDetail = ({ postDetailData }) => {
  return (
    <DetailPost
      username={postDetailData?.user_posts?.username}
      caption={postDetailData?.caption}
      imageUrl={postDetailData?.image_url}
      location={postDetailData?.location}
      numberOfLikes={postDetailData?.like_count}
      id={postDetailData?.id}
      user_id={postDetailData.user_id}
    ></DetailPost>
  );
};

// get post data by id from server side for detail post data
export const getServerSideProps = requiresAuth(async (context) => {
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
});
export default PostDetail;
