import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/PostListPage/:id" element={<PostListPage />} />
        <Route path="/PostPage/:postId" element={<PostPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:postId" element={<WritePage />} />
      </Routes>
    );
  }
}

export default App;
