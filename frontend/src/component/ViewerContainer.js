import { useState } from "react";

import styles from "../styles/ViewerContainer.module.css";

function BookViewer() {
    /*
     */
    const [currentPage, setCurrentPage] = useState({
        image: "",
        content: "",
        pageNumber: -1,
    });

    const prevPageClick = () => {};
    const nextPageClick = () => {};
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src={currentPage.image} alt="페이지 이미지"></img>
            </div>
            <div className={styles.right}>
                <p>{currentPage.content}</p>
            </div>
            <button onClick={prevPageClick}>이전 페이지</button>
            <button onClick={nextPageClick}>다음 페이지</button>
        </div>
    );
}

export default BookViewer;
