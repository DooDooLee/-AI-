import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MainPage from './pages/MainPage.js';
import BookMaker from './pages/BookMaker.js';
import BookViewer from './pages/BookViewer.js';
import ListPage from './pages/ListPage.js';
import BookIntroduction from './pages/BookIntroduction.js';
import ProductionSteps from './pages/ProductionSteps.js';

import './App.css'; // 애니메이션에 필요한 CSS 파일
import MyLibrary from './pages/MyLibrary.js';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.zoom = '80%'; // 페이지가 로드될 때 브라우저의 화면을 80%로 축소

    // 페이지가 랜더링될 때 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    return () => {
      document.body.style.zoom = ''; // 컴포넌트가 언마운트될 때 화면 축소 효과 해제
    };
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/BookMaker" element={<BookMaker />} />
          <Route path="/BookViewer" element={<BookViewer />} />
          <Route path="/ListPage" element={<ListPage />} />
          <Route
            path="/more-details/instruction"
            element={<BookIntroduction />}
          />
          <Route
            path="/more-details/steps-description"
            element={<ProductionSteps />}
          />
          <Route path="/MyLibrary" element={<MyLibrary />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
