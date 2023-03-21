import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import WriteActionButtons from '../components/write/WriteActionButtons';
import Responsive from "../components/common/Responsive";
import EditorContainer from "../containers/write/EditorContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";

const WritePage = () => {
  // const params = useParams();
  // const postid = params["postID"];

  return (
    <Responsive>
      {/* <EditorContainer editData={postid} /> */}
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
