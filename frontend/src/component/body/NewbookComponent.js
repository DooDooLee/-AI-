import styles from "../../styles/NewbookComponent.module.css";

function NewbookComponent(props) {
  const Bookcover_default_uri = "./public_assets/bookcover_example4.svg";
  const thumbsup_uri = "./public_assets/thumbsup.svg";

  const { no, book } = props;
  const { title, author, cover, bookLike, bookId} = book || {};

  const handleBookClick = (bookId, coverUrl, title) => {
    const encodedBookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    
    return `/BookViewer/?bookId=${encodedBookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`;
  };

  return (
    <div className={styles.wrapper}>
      <a href={handleBookClick(bookId, cover, title)} className={styles.bookLink}>
        <img
          src={cover || Bookcover_default_uri}
          alt={title || "책 표지"}
          className={styles.bookCover}
        />
      </a>
      <span>{no}</span>
      <div className={styles.bookinfo}>
        <span className={styles.bookname}>{title || "책 제목"}</span>
        <span className={styles.author}>{author || "저자"}</span>
        <span className={styles.likes}>
          <img src={thumbsup_uri} alt="Thumbsup" />
          추천수({bookLike || 0})
        </span>
      </div>
    </div>
  );
}

export default NewbookComponent;