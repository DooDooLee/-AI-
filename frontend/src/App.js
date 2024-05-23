import MainPage from "./pages/MainPage.js";
import { Routes, Route } from "react-router-dom";
import BookViewer from "./pages/BookViewer.js";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/BookViewer" element={<BookViewer />} />
        </Routes>
    );
}

export default App;
