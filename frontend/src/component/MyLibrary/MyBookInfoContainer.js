import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyBookInfoContainer.module.css';
import Cookies from 'js-cookie';

const API_URL = 'http://15.164.245.179:8080';

function MyBookInfoContainer({ selectedBook, currentBookMenu }) {
  const token = Cookies.get('authToken');
  const navigate = useNavigate();

  //UTC -> KST 변환해 출력
  let writtenTime = '';
  if (selectedBook.createdAt !== '') {
    const KST = new Date(selectedBook.createdAt + '+00:00');
    writtenTime =
      KST.getFullYear() +
      '. ' +
      (KST.getMonth() + 1) +
      '. ' +
      KST.getDate() +
      '.';
  }

  //책 읽기 함수
  const handleBookRead = (bookId, coverUrl, title) => {
    if (selectedBook.title == '') {
      alert('책을 선택하세요.');
      return;
    }
    const encodedbookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    navigate(
      `/BookViewer/?bookId=${encodedbookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`
    );
  };

  //즐겨찾기 해제 함수
  const handleFavoriteCancel = async (bookId) => {
    if (bookId == -1) {
      alert('책을 선택하세요.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/favorites/remove/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (await response.ok) {
        alert('즐겨찾기가 해제되었습니다.');
        navigate(0);
      }
    } catch (error) {
      alert('즐겨찾기 해제에 실패했습니다.');
      console.error('Error removing favorites: ', error);
    }
  };

  //책 삭제 함수
  const handleBookDelete = async (bookId) => {
    if (bookId == -1) {
      alert('책을 선택하세요.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/book/delete/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (await response.ok) {
        alert('책 삭제가 완료되었습니다.');
        navigate(0);
      }
    } catch (error) {
      alert('책 삭제에 실패했습니다.');
      console.error('Error removing book: ', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>{selectedBook.title || '책을 선택하세요.'}</h2>
      <div className={styles.innerWrapper}>
        <div>
          {selectedBook.cover ? (
            <img alt="책 표지" src={selectedBook.cover} />
          ) : (
            ''
          )}
        </div>
        <span>저자: {selectedBook.userName}</span>
        <span>출판일: {writtenTime}</span>
      </div>
      <div>
        <button
          onClick={() => {
            handleBookRead(
              selectedBook.bookId,
              selectedBook.cover,
              selectedBook.title
            );
          }}
        >
          책 읽기
        </button>
        {currentBookMenu ? ( //1이면 내가 쓴 책, 0이면 즐겨찾기한 책
          <>
            <button>책 수정</button>
            <button
              onClick={() => {
                handleBookDelete(selectedBook.bookId);
              }}
            >
              책 삭제
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              handleFavoriteCancel(selectedBook.bookId);
            }}
          >
            즐겨찾기 해제
          </button>
        )}
      </div>
    </div>
  );
}
export default MyBookInfoContainer;
