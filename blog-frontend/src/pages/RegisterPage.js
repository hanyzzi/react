/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { db } from "../firebase";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

function PostListPage() {
  const navigate = useNavigate();
  const userCollection = collection(db, "react-user");

  const [userid, setUserID] = useState("");
  const [username, setUserName] = useState("");
  const [userpw, setUserPW] = useState("");
  const [userpwconfirm, setUserPWConfirm] = useState("");

  const _onChangeID = (e) => {
    setUserID(e.target.value);
  };

  const _onChangeName = (e) => {
    setUserName(e.target.value);
  };

  const _onChangePW = (e) => {
    setUserPW(e.target.value);
  };

  const _onChangePWConfirm = (e) => {
    setUserPWConfirm(e.target.value);
  };

  const _onSubmit = async (e) => {
    e.preventDefault();

    if (userid === "") {
      alert("아이디를 입력해주세요.");
    } else if (username === "") {
      alert("이름을 입력해주세요.");
    } else if (userpw === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (userpwconfirm === "") {
      alert("비밀번호 확인을 입력해주세요.");
    } else {
      const q = query(userCollection, where("userid", "==", userid));
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({ ...doc.data() }));
      if (newData.length !== 0) {
        alert("이미 존재하는 계정입니다.");
      } else {
        if (userpw !== userpwconfirm) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          try {
            const insertData = await addDoc(userCollection, {
              userid: userid,
              username: username,
              userpw: userpw
            })
            console.log(insertData)
            alert("회원가입 되었습니다.")
            navigate('/');
          } catch(e) {
            console.log(e)
          }
        }
      }
    }
  };

  return (
    <AuthTemplate>
      <AuthFormBlock>
        <h3>회원가입</h3>
        <form onSubmit={_onSubmit}>
          <StyledInput
            autoComplete="userid"
            name="userid"
            placeholder="아이디"
            onChange={_onChangeID}
            value={userid}
          />
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="이름"
            onChange={_onChangeName}
            value={username}
          />
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={_onChangePW}
            value={userpw}
          />
          <StyledInput
            autoComplete="new-password"
            name="passwordconfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={_onChangePWConfirm}
            value={userpwconfirm}
          />
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
            회원가입
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link to="/login">로그인</Link>
        </Footer>
      </AuthFormBlock>
    </AuthTemplate>
  );
}

export default PostListPage;
