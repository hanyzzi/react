import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { writePost } from '../../modules/write';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const postsCollection = collection(db, "posts");
  const uuid = uuidv4()
  // const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  // 포스트 등록
  const onPublish = async () => {
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatted = `${year}-${month}-${day}`;
    
    const newbody = body.replace(/<[^>]*>?/g, '');

    const insertData = await addDoc(postsCollection, {
      _id: uuid,
      title: title,
      body: newbody,
      publishedDate: formatted,
      tags: tags,
      user: localStorage.getItem("username"),
      userid: localStorage.getItem("userid"),
    });
    console.log(insertData);

    alert("등록되었습니다.")
    navigate("/");
  };

  // 취소
  const onCancel = () => {
    navigate("/");
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      // push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
