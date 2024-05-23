import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import BookMaker from './pages/BookMaker.js';
import BookViewer from './pages/BookViewer.js';

function App() {
  useEffect(() => {
    document.body.style.zoom = '80%'; // 페이지가 로드될 때 브라우저의 화면을 80%로 축소
    return () => {
      document.body.style.zoom = ''; // 컴포넌트가 언마운트될 때 화면 축소 효과 해제
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/BookMaker" element={<BookMaker />} />
      <Route path="/BookViewer" element={<BookViewer />} />
    </Routes>
  );
}

export default App;
