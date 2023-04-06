import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Editor from "../../components/write/Editor";
import { useSelector, useDispatch } from "react-redux";
import write, { changeField, initialize } from "../../modules/write";

import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );
  const { postId } = useParams();
  let postArray = [];

  const getPostsEditData = async () => {
    const q = query(collection(db, "posts"), where("_id", "==", postId));
    const data = await getDocs(q);
    const addData = data.docs.map((doc) => ({ ...doc.data() }));

    postArray = addData;
    
    if (postArray.length !== 0) {
      const getTitle = postArray.map((data) => data["title"]);
      const getBody = postArray.map((data) => data["body"]);

      dispatch(changeField({ key: "title", value: getTitle }));
      dispatch(changeField({ key: "body", value: getBody }));
    }
  };

  // 언마운트될 때 초기화
  useEffect(() => {
    if (postId !== null && postId !== undefined) {
      getPostsEditData();
    }

    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
