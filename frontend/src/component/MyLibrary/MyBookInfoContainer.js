import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyBookInfoContainer.module.css';

function MyBookInfoContainer({ selectedBook, currentBookMenu }) {
  const navigate = useNavigate();
  const handleBookClick = (bookId, coverUrl, title) => {
    const encodedbookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    navigate(
      `/BookViewer/?bookId=${encodedbookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`
    );
  };
  return (
    <div className={styles.wrapper}>
      <h2>{selectedBook.title}</h2>
      <div className={styles.innerWrapper}>
        <div>
          {selectedBook.cover ? (
            <img alt="책 표지" src={selectedBook.cover} />
          ) : (
            ''
          )}
        </div>
        <span>저자: {selectedBook.userName}</span>
        <span>출판일: {selectedBook.createdAt.slice(0, 10)}</span>
      </div>
      <div>
        <button
          onClick={() => {
            handleBookClick(
              selectedBook.bookId,
              selectedBook.cover,
              selectedBook.title
            );
          }}
        >
          책 읽기
        </button>
        {currentBookMenu ? (
          <>
            <button>책 수정</button>
            <button>책 삭제</button>
          </>
        ) : (
          <button>즐겨찾기 해제</button>
        )}
      </div>
    </div>
  );
}
export default MyBookInfoContainer;
