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
  where
} from "firebase/firestore";
import styled from "styled-components";
import Responsive from "../../components/common/Responsive";
import Button from "../../components/common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../../components/common/SubInfo";
import Tags from "../../components/common/Tags";
// import Pagination from "../../components/posts/Pagination";
import PostActionButtons from "../../components/post/PostActionButtons";
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
  margin-bottom: 5rem;
`;

const PostItemWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostItemBlock = styled.div`
  flex: 0 0 auto;
  width: calc(33% - 1rem);
  min-height: 450px;
  max-height: 500px;
  padding: 2rem 3rem;
  margin: 0 0.5rem 2.5rem;
  border: 1px solid #f7f7f7;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 30px;
  cursor: pointer;
  transition: box-shadow, transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    color: ${palette.gray[6]};
    
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    color: ${palette.gray[8]};
  }
  p {
    overflow: hidden;
    max-height: 295px;
    margin-top: 2rem;
    word-break: break-all;
  }
`;

const PostListContainer = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);

  let lastVisible = "";
  let realArr = [];

  const editPost = (docName) => {
    navigate("/edit/" + docName);
  };

  const deletePost = async (docName) => {
    let collectionID = ""
    
    const q = query(collection(db, "posts"), where("_id", "==", docName));
    const data = await getDocs(q);
    
    data.forEach((docs) => {
      // 가져온 모든 문서들을 확인
      collectionID = docs.id;
    });

    const postRef = doc(db, "posts", collectionID);
    await deleteDoc(postRef);

    alert("삭제되었습니다.");
    window.location.reload();
  };

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {let nextq;

      if(searchKeyword) { 
        console.log(searchKeyword);
        nextq = query(
          collection(db, "posts"),
          where(searchCategory, ">=", searchKeyword),
          where(searchCategory, "<=", searchKeyword + "\uf8ff"),
          orderBy(searchCategory, "desc"),
          orderBy("publishedTime", "desc"),
          startAfter(lastVisible),
          limit(4)
        );
      }else{
        nextq = query(
          collection(db, "posts"),
          orderBy("publishedTime", "desc"),
          startAfter(lastVisible),
          limit(4)
        );
      }
     
      
      const data = await getDocs(nextq);
      const addData = data.docs.map((doc) => ({ ...doc.data() }));
      const nextPost = realArr.concat(addData);

      realArr = nextPost;
      setPostData(nextPost);

      lastVisible = data.docs[data.docs.length - 1];
    }
  };
  const handleSearch = async (category, keyword) => {
   
    console.log("handleSearch");
    const searchCategory = category.value;
    setSearchCategory(searchCategory);
    setSearchKeyword(keyword);
    
    let q;
    if(searchCategory === 'comment' && keyword){
      q = query(
        collection(db, "comment"),
        where("body", ">=", keyword),
        where("body", "<=", keyword + "\uf8ff"),
        orderBy("publishedTime", "desc"),
        limit(4)
      );
    }else if(keyword){
      q = query(
        collection(db, "posts"),
        where(searchCategory, ">=", keyword),
        where(searchCategory, "<=", keyword + "\uf8ff"),
        orderBy(searchCategory, "desc"),
        orderBy("publishedTime", "desc"),
        limit(4)
      );
    }else{
      q = query(
        collection(db, "posts"),
        orderBy("publishedTime", "desc"),
        startAfter(lastVisible),
        limit(4)
      );
    }

    const data = await getDocs(q);
    
    const addData = data.docs.map((doc) => ({ ...doc.data() }));

    //const nextPost = postData.concat(addData);
   // realArr = nextPost;
    setPostData([]);
    setPostData(addData);

    console.log(realArr);
    console.log("handleSearch end");
    lastVisible = data.docs[data.docs.length - 1];
      
  
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
          <SearchBar onSearch={handleSearch}></SearchBar>
        </SearchBarBlock>
          {localStorage.getItem("userid") !== null && (
            <Button blue to="/write">
              새 글 작성하기
            </Button>
          )}
        </WritePostButtonWrapper>
        <PostItemWrap>
          {postData &&
            postData.map((post) => (
              <PostItemBlock key={post["_id"]}>
                <Link to={`PostPage/${post["_id"]}`}>
                  <h2>
                    {post["title"]}
                  </h2>
                  <SubInfo
                    username={post["user"]}
                    publishedDate={new Date(post["publishedDate"])}
                  />
                  <Tags tags={post["tags"]} />
                  <p>{post["body"]}</p>
                </Link>
                {post["userid"] === localStorage.getItem("userid") && (
                    <PostActionButtons
                      onEdit={() => editPost(post["_id"])}
                      onRemove={() => deletePost(post["_id"])}
                    />
                  )}
              </PostItemBlock>
            ))}
        </PostItemWrap>
      </PostListBlock>
    </div>
  );
};

export default PostListContainer;
