import styles from "../styles/BookCoverContainer.module.css";

function BookCoverContainer({ setShowingCover }) {
    const nextPageClick = () => {
        setShowingCover(false);
    };
    return (
        <div className={styles.wrapper}>
            <div style={{ margin: "auto auto" }}>
                <h3>BookName</h3>
            </div>
            <div className={styles.coverImageArea}>
                <img src="" alt="책 표지 이미지" />
            </div>
            <button onClick={nextPageClick}>다음 페이지</button>
        </div>
    );
}

export default BookCoverContainer;
