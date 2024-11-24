import styles from "../../styles/BestbookComponent.module.css";

function BestbookComponent(props) {
  const Bookcover_default_uri = "./public_assets/bookcover_example1.svg"; // 기본 책 커버
  const thumbsup_uri = "./public_assets/thumbsup.svg"; // 좋아요 아이콘

  const { no, book, handleBookClick } = props;
  const { title, author, cover, bookLike, bookId } = book || {}; // book 데이터 구조 분해

  return (
    <div className={styles.wrapper}>
      <div className={styles.bookLink} onClick={() => handleBookClick(bookId, cover, title)}>
        <img
          src={cover || Bookcover_default_uri}
          alt={title || "책 표지"}
          className={styles.bookCover}
        />
      </div>
      <br />
      <span className={styles.ranking}>{no}</span>
      <div className={styles.bookinfo}>
        <span>{title || "책 제목"}</span>
        <span className={styles.author}>{author || "저자"}</span>
        <span className={styles.likes}>
          <img src={thumbsup_uri} alt="좋아요" />
          {bookLike !== undefined ? `총 추천수(${bookLike || 0})` : "undefined"}
        </span>
      </div>
    </div>
  );
}

export default BestbookComponent;
