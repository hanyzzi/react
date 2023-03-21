import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

import SubInfo from "../../components/common/SubInfo";
import Tags from "../../components/common/Tags";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../../components/common/Responsive";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;
const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewerContainer = () => {
  const { postId } = useParams();
  const [postDetailData, setPostDetailData] = useState([]);

  const getPostsDetailData = async () => {
    const q = query(collection(db, "posts"), where("_id", "==", postId));
    const data = await getDocs(q);
    const addData = data.docs.map((doc) => ({ ...doc.data() }));

    setPostDetailData(addData);

    setTimeout(() => {
      console.log(addData);
    }, 2000);
  };

  useEffect(() => {
    getPostsDetailData();
  }, []);

  return (
    <div>
      {postDetailData &&
        postDetailData.map((postDetail) => (
          <PostViewerBlock key={postDetail["_id"]}>
            <PostHead>
              <h1>{postDetail["title"]}</h1>
              <SubInfo
                username={postDetail["user"]}
                publishedDate={postDetail["publishedDate"]}
                hasMarginTop
              />
              <Tags tags={postDetail["tags"]} />
            </PostHead>
            <PostContent
              dangerouslySetInnerHTML={{ __html: postDetail["body"] }}
            />
          </PostViewerBlock>
        ))}
      ;
    </div>
  );
};

export default PostViewerContainer;
