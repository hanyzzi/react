import React from "react";
// import { useSelector } from 'react-redux';
import Header from "../../components/common/Header";
import { useNavigate } from 'react-router-dom';

function HeaderContainer() {
  const navigate = useNavigate();
  // let [localUserName, setLocalUserName] = useState('');

  // // useEffect(() => {
  // //   if (localStorage.getItem("username")) {
  // //     // localUserName = localStorage.getItem("username")
  // //     setLocalUserName = localStorage.getItem("username")
  // //   }
  // // }, [localUserName]);

  // setLocalUserName = localStorage.getItem("username"); //eslint-disable-line no-unused-vars

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("userid");
      localStorage.removeItem("username");

      navigate('/');
    } else {
      
    }
  };

  return <Header user={localStorage.getItem("username")} onLogout={onLogout} />;
}

export default HeaderContainer;
