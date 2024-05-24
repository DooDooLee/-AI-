import { useState } from "react";

import styles from "../styles/ViewerContainer.module.css";

function BookViewer({ setShowingCover }) {
    const [currentPage, setCurrentPage] = useState({
        //현재 페이지 정보
        image: "",
        content: "",
        pageNumber: 0,
    });

    const prevPageClick = () => {};
    const nextPageClick = () => {};
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.imgArea}>
                    <img src={currentPage.image} alt="페이지 이미지"></img>
                </div>
            </div>
            <div className={styles.right}>
                <div>
                    <div>{currentPage.content}</div>
                </div>
            </div>
            <span className={styles.pageNumber}>{currentPage.pageNumber}</span>
            <button className={styles.leftButton} onClick={prevPageClick}>
                이전 페이지
            </button>
            <button className={styles.rightButton} onClick={nextPageClick}>
                다음 페이지
            </button>
        </div>
    );
}

export default BookViewer;
