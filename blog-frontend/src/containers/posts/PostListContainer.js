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
  collectionGroup,
  getDocs,
  limit,
  query,
  startAfter,
  endAt,
  orderBy,
  onSnapshot,
  limitToLast,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";
import Responsive from "../../components/common/Responsive";
import Button from "../../components/common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../../components/common/SubInfo";
import Tags from "../../components/common/Tags";
import Pagination from "../../components/posts/Pagination";
import PostActionButtons from "../../components/post/PostActionButtons";

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
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

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const PostListContainer = () => {
  // const PAGE_SIZE = 3;
  // const postsCollection = collection(db, "posts");
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  // const [lastVisible, setLastVisible] = useState(null);
  // const [firstVisible, setFirstVisible] = useState(null);

  // const nextPage = async () => {
  //   if (lastVisible != null) {
  //     const q = query(
  //       postsCollection,
  //       orderBy("publishedDate", "desc"),
  //       startAfter(lastVisible.data().publishedDate), // Pass the reference
  //       limit(PAGE_SIZE)
  //     );
  //     const documents = await getDocs(q);
  //     updateState(documents);
  //   }
  // };

  // const previousPage = async () => {
  //   if (firstVisible != null) {
  //     const q = query(
  //       postsCollection,
  //       orderBy("publishedDate", "desc"),
  //       endAt(firstVisible.data().publishedDate), // Use `endAt()` method and pass the reference
  //       limitToLast(PAGE_SIZE)
  //     );
  //     const documents = await getDocs(q);
  //     updateState(documents);
  //   }
  // };

  // const updateState = (documents) => {
  //   if (!documents.empty) {
  //     const tempPosts = [];
  //     documents.forEach((document) => {
  //       tempPosts.push({
  //         id: document.id,
  //         ...document.data(),
  //       });
  //     });
  //     setPostData(tempPosts);
  //   }
  //   if (documents?.docs[0]) {
  //     setFirstVisible(documents.docs[0]);
  //   }
  //   if (documents?.docs[documents.docs.length - 1]) {
  //     setLastVisible(documents.docs[documents.docs.length - 1]);
  //   }
  // };

  const editPost = (docName) => {
    console.log(docName);
    navigate("/write", {id: docName});
  };

  const deletePost = async (docName) => {
    console.log(docName);
    alert("삭제되었습니다.")

    const postRef = doc(db, "posts", docName);
    await deleteDoc(postRef);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (documents) => {
      const tempPosts = [];
      documents.forEach((document) => {
        tempPosts.push({
          id: document.id,
          ...document.data(),
        });
      });
      setPostData(tempPosts);
      // setLastVisible(documents.docs[documents.docs.length - 1]);
      // setFirstVisible(documents.docs[0]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <PostListBlock>
        <WritePostButtonWrapper>
          {localStorage.getItem("userid") !== null && (
            <Button cyan to="/write">
              새 글 작성하기
            </Button>
          )}
        </WritePostButtonWrapper>
        <div>
          {postData &&
            postData.map((post) => (
              <PostItemBlock key={post["_id"]}>
                <h2>
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
                {post["userid"] === localStorage.getItem("userid") && (
                  <PostActionButtons onEdit={() => editPost(post["id"])} onRemove={() => deletePost(post["id"])} />
                )}
              </PostItemBlock>
            ))}
        </div>
      </PostListBlock>
      {/* <Pagination>
        <PaginationBlock>
          <Button onClick={nextPage()}>이전</Button>
          <Button onClick={previousPage()}>다음</Button>
        </PaginationBlock>
      </Pagination> */}
    </div>
  );
};

export default PostListContainer;
