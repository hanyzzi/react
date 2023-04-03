import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import palette from "../../lib/styles/palette";

const CommentWrapper = styled.div`
    margin: 10px 0;
    padding: 10px 20px; 
    background-color: #f5f5f5; 
    border-radius: 5px;
 `;
const UserName = styled.div`
    margin-bottom: 5px;
    color: ${palette.blue[5]};
`;
const CommentText = styled.div`
 `;
const CommentInput = styled.input`
    width: 80%;
    height: 50px;
    padding: 10px 20px;
    border-radius: 25px 0 0 25px;
    border: none;
    background-color: #e9ecef7a;
    outline: none;
 `;
const CommentSubmit = styled.button`
    width: 20%;
    height: 50px;
    padding: 10px;
    border-radius: 0 25px 25px 0;
    border: none;
    background-color: ${palette.blue[5]}; #2196F3;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    &:hover { background-color: ${palette.blue[4]}; #2196F3; }
 `;

 function Comment({ user, text }) {
    return (
        <CommentWrapper>
            <UserName>{localStorage.getItem("username")}</UserName>
            <CommentText>{text}</CommentText>
        </CommentWrapper>
    );
}

function CommentForm({ onSubmit }) {
    const [text, setText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex'}}>
            <CommentInput
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="댓글을 작성해주세요."
            />
            <CommentSubmit type="submit">등록</CommentSubmit>
        </form>
    );
}

function CommentList({ comments }) {
    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment.id} text={comment.text} />
            ))}
        </div>
    );
}

const PostComment = () => {
    const [comments, setComments] = useState([]);

    const handleAddComment = (text) => {
        setComments([...comments, { id: comments.length, text }]);
    };

    return (
        <div>
            <CommentForm onSubmit={handleAddComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default PostComment;