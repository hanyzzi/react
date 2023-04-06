import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { writePost } from '../../modules/write';
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const postsCollection = collection(db, "posts");
  const uuid = uuidv4();
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
    const formatted = moment().format("YYYY-MM-DD");
    const time = moment().format("YYYY-MM-DD HH:mm:ss");

    const newbody = body.replace(/<[^>]*>?/g, "");

    const insertData = await addDoc(postsCollection, {
      _id: uuid,
      title: title,
      body: newbody,
      publishedDate: formatted,
      publishedTime: time,
      tags: tags,
      user: localStorage.getItem("username"),
      userid: localStorage.getItem("userid"),
    });
    console.log(insertData);

    alert("등록되었습니다.");
    navigate("/");
  };

  // 포스트 수정
  const onEdited = async () => {
    let collectionID = "";
    const formatted = moment().format("YYYY-MM-DD");
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    const newbody = body.replace(/<[^>]*>?/g, "");

    const q = query(postsCollection, where("_id", "==", postId));
    const data = await getDocs(q);
    
    data.forEach((docs) => {
      // 가져온 모든 문서들을 확인
      collectionID = docs.id;
    });

    if (collectionID !== "") {
      const updateQ = doc(postsCollection, collectionID);
      await updateDoc(updateQ, {
        title: title,
        body: newbody,
        publishedDate: formatted,
        publishedTime: time,
        tags: tags,
      });
      alert("수정되었습니다.");
      navigate("/");
    } else {
      alert("수정에 실패하였습니다.");
    }
  };

  // 취소
  const onCancel = () => {
    navigate("/");
  };

  return (
    <div>
      {(postId === null || postId === undefined) && (
        <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
      )}
      {postId !== null && postId !== undefined && (
        <WriteActionButtons onEdited={onEdited} onCancel={onCancel} />
      )}
    </div>
  );
};

export default WriteActionButtonsContainer;
