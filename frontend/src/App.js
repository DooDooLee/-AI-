import MainPage from "./pages/MainPage.js";
import ListPage from "./pages/ListPage.js";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/2" element={<ListPage />} />
        </Routes>
    );
}

export default App;
