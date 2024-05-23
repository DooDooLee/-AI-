
import MainPage from './pages/MainPage.js';
import BookMaker from './pages/BookMaker.js';
import BookViewer from './pages/BookViewer.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/BookMaker" element={<BookMaker />} />
      <Route path="/BookViewer" element={<BookViewer />} />
    </Routes>
  );

}

export default App;
