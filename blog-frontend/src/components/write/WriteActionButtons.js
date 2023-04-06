import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";

const WriteActionButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
  height: 3rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish, onEdited }) => {
  const { postId } = useParams();

  return (
    <WriteActionButtonsBlock>
      {(postId === null || postId === undefined) && (
        <StyledButton blue onClick={onPublish}>
          포스트 등록
        </StyledButton>
      )}
      {postId !== null && postId !== undefined && (
        <StyledButton blue onClick={onEdited}>
          포스트 수정
        </StyledButton>
      )}
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
