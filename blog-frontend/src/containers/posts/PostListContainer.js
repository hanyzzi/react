import React, { useEffect, useState } from "react";
// import qs from "qs";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import PostList from "../../components/posts/PostList";
// import { listPosts } from '../../modules/posts';
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";
import Responsive from "../../components/common/Responsive";
import Button from "../../components/common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../../components/common/SubInfo";
import Tags from "../../components/common/Tags";
// import Pagination from "../../components/posts/Pagination";
import PostActionButtons from "../../components/post/PostActionButtons";
// import SearchIcon from "../../components/search/SearchIcon";
import SearchBar from "../../components/search/SearchBar";

const SearchBarBlock = styled.div`
  width: 80%;
  margin-right: auto;
`;

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
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);

  let lastVisible = "";
  let realArr = [];

  const editPost = (docName) => {
    navigate("/write/" + docName);
  };

  const deletePost = async (docName) => {
    alert("삭제되었습니다.");

    const postRef = doc(db, "posts", docName);
    await deleteDoc(postRef);
  };

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      const nextq = query(
        collection(db, "posts"),
        orderBy("publishedTime", "desc"),
        startAfter(lastVisible),
        limit(4)
      );

      const data = await getDocs(nextq);
      const addData = data.docs.map((doc) => ({ ...doc.data() }));
      const nextPost = realArr.concat(addData);

      realArr = nextPost;
      setPostData(nextPost);

      lastVisible = data.docs[data.docs.length - 1];
    }
  };

  const getPostsData = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("publishedTime", "desc"),
      limit(4)
    );
    const data = await getDocs(q);
    const addData = data.docs.map((doc) => ({ ...doc.data() }));

    const nextPost = postData.concat(addData);
    realArr = nextPost;
    setPostData(nextPost);

    console.log(realArr);
    lastVisible = data.docs[data.docs.length - 1];
  };

  useEffect(() => {
    getPostsData();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <PostListBlock>
        <WritePostButtonWrapper>
        <SearchBarBlock>
          <SearchBar></SearchBar>
        </SearchBarBlock>
          {localStorage.getItem("userid") !== null && (
            <Button blue to="/write">
              새 글 작성하기
            </Button>
          )}
        </WritePostButtonWrapper>
        <div>
          {postData &&
            postData.map((post) => (
              <PostItemBlock key={post["_id"]}>
                <h2>
                  <Link to={`PostPage/${post["_id"]}`}>
                    {post["title"]}
                  </Link>
                </h2>
                <SubInfo
                  username={post["user"]}
                  publishedDate={new Date(post["publishedDate"])}
                />
                <Tags tags={post["tags"]} />
                <p>{post["body"]}</p>
                {post["userid"] === localStorage.getItem("userid") && (
                  <PostActionButtons
                    onEdit={() => editPost(post["id"])}
                    onRemove={() => deletePost(post["id"])}
                  />
                )}
              </PostItemBlock>
            ))}
        </div>
      </PostListBlock>
    </div>
  );
};

export default PostListContainer;
