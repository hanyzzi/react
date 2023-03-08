import React, { useEffect, useState } from "react";
// import qs from "qs";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import PostList from "../../components/posts/PostList";
// import { listPosts } from '../../modules/posts';
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import styled from "styled-components";
import Responsive from "../../components/common/Responsive";
import Button from "../../components/common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../../components/common/SubInfo";
import Tags from "../../components/common/Tags";

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostListContainer = () => {
  const [postData, setPostData] = useState([]);

  const getPostsData = async () => {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection);
    const data = await getDocs(q);

    setPostData(data.docs.map((doc) => ({ ...doc.data() })));
    console.log(data.docs.map((doc) => ({ ...doc.data() })));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    getPostsData();
  }, []);

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {localStorage.getItem("userid") !== null && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      <div>
        {postData && postData.map((post) => (
          <PostItemBlock key={post["_id"]}>
            <h2>
              {/* {post["title"]} */}
              <Link to={`/@${post["user"]}/${post["_id"]}`}>
                {post["title"]}
              </Link>
            </h2>
            <SubInfo
              username={post["user"]}
              publishedDate={new Date(post["publishedDate"])}
            />
            <Tags tags={post["tags"]} />
            <p>{post["body"]}</p>
          </PostItemBlock>
        ))}
      </div>
    </PostListBlock>
  );
};

export default PostListContainer;