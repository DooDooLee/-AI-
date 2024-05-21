import MainPage from './pages/MainPage.js';
import BookMaker from './pages/BookMaker.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/BookMaker" element={<BookMaker />} />
    </Routes>
  );

}

export default App;
