import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyBookInfoContainer.module.css';
import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

function MyBookInfoContainer({ selectedBook }) {
  useEffect(async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      //로그인하지 않아 token이 undefined일 경우 이전 페이지로 이동.
      navigate(-1);
      alert('로그인이 필요한 페이지입니다!');
      return;
    }
    try {
      const response = await fetch('http://15.164.245.179:8080/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const userData = await response.json();
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);
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
        <button>책 삭제</button>
      </div>
    </div>
  );
}
export default MyBookInfoContainer;
