import React from "react";
import { Route, Routes } from 'react-router-dom';
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/PostListPage/:id" element={<PostListPage />} />
        <Route path="/PostPage/:username/:postId" element={<PostPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
  );
};
export default App;
