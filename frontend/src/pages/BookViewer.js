import { useState } from "react";
import Header from "../component/Header";
import LeftPanel from "../component/LeftPanel";
import ViewerContainer from "../component/ViewerContainer";
import styles from "../styles/BookViewer.module.css";
import BookCoverContainer from "../component/BookCoverContainer";

function BookViewer() {
    const [showingCover, setShowingCover] = useState(true);
    //ViewerContainer에서 첫 페이지일 때 이전 페이지 버튼 눌렀을 경우 true로 바꿔줘야함
    return (
        <div id="wrapper" className={styles.wrapper}>
            <div>
                <Header />
            </div>
            <div style={{ borderRight: "1px solid black" }}>
                <LeftPanel />
            </div>
            <div>
                {showingCover ? (
                    <BookCoverContainer setShowingCover={setShowingCover} />
                ) : (
                    <ViewerContainer setShowingCover={setShowingCover} />
                )}
            </div>
        </div>
    );

}

export default BookViewer;
