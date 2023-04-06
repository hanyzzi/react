import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField, updatePost, writePost } from '../../modules/write';
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.write.tags);

  const { postId } = useParams();
  let postArray = [];
  let getTags = [];

  const getPostsEditData = async () => {
    const q = query(collection(db, "posts"), where("_id", "==", postId));
    const data = await getDocs(q);
    const addData = data.docs.map((doc) => ({ ...doc.data() }));

    postArray = addData;

    if (postArray.length !== 0) {
      getTags = postArray.map((data) => data["tags"]);

      getTags.map((tag) => 
        dispatch(changeField({ key: "tags", value: tag })),
      );
    }
  };

  useEffect(() => {
    if (postId !== null && postId !== undefined) {
      getPostsEditData();
    }
  }, []);

  const onChangeTags = nextTags => {
    dispatch(
      changeField({
        key: 'tags',
        value: nextTags,
      }),
    );
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;