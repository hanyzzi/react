/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
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

function LoginPage() {
  const navigate = useNavigate();
  const [userid, setUserID] = useState("");
  const [userpw, setUserPW] = useState("");

  const _onChangeID = (e) => {
    setUserID(e.target.value);
  };

  const _onChangePW = (e) => {
    setUserPW(e.target.value);
  };

  const _onSubmit = async (e) => {
    e.preventDefault();

    const userCollection = collection(db, "react-user");
    const q = query(userCollection, where("userid", "==", userid), where("userpw", "==", userpw) )
    // const q = query(userCollection, where("userid", "==", userid) )
    const data = await getDocs(q);
    const newData = data.docs.map(doc => ({ ...doc.data() }));
    
    if (newData.length === 0) {
      alert("로그인 실패!\n아이디 또는 비밀번호를 확인해주세요.")
    } else {
      alert("로그인 되었습니다.")
      
      const getUserID = newData.map((user) => (
        user["userid"]
      ));
      const getUserName = newData.map((user) => (
        user["username"]
      ));

      try {
        localStorage.setItem('userid', getUserID);
        localStorage.setItem('username', getUserName);
      } catch (e) {
        console.log('localStorage is not working');
      }

      navigate('/');
    }
  };

  return (
    <AuthTemplate>
      <AuthFormBlock>
        <h3>로그인</h3>
        <form onSubmit={_onSubmit}>
          <StyledInput
            autoComplete="userid"
            name="userid"
            placeholder="아이디"
            onChange={_onChangeID}
            value={userid}
          />
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={_onChangePW}
            value={userpw}
          />
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
            로그인
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link to="/register">회원가입</Link>
        </Footer>
      </AuthFormBlock>
    </AuthTemplate>
  );
}

export default LoginPage;
