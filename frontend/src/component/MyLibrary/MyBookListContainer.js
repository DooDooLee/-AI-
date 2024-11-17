import { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBookListComponent from './MyBookListComponent';
import styles from '../../styles/MyBookListContainer.module.css';
import Cookies from 'js-cookie';

function MyBookListContainer({ onBookClick }) {
  const bookTypeMenuRef = useRef(null);
  const currentMenuNum = useRef(0);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //책 타입(즐겨찾기, 내가 쓴 책) 클릭 시 콜백 함수
  const onBookTypeClick = (e) => {
    const selectedMenuNum = parseInt(e.target.value);
    if (selectedMenuNum !== currentMenuNum.current) {
      currentMenuNum.current = selectedMenuNum;
    } else return;

    if (currentMenuNum.current === 0) fetchFavoriteBooks();
    else fetchMyBooks();
    const menus = bookTypeMenuRef.current.childNodes;
    menus.forEach((menu) => {
      menu.style.backgroundColor = 'transparent';
      menu.style.color = 'black';
    });
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
  };

  const fetchFavoriteBooks = useCallback(async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      //로그인하지 않아 token이 undefined일 경우 이전 페이지로 이동.
      navigate(-1);
      alert('로그인이 필요한 페이지입니다!');
      return;
    }
    try {
      const response = await fetch(
        'http://15.164.245.179:8080/favorites/list',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setBooks(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching favorite books:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyBooks = useCallback(async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      //로그인하지 않아 token이 undefined일 경우 이전 페이지로 이동.
      navigate(-1);
      alert('로그인이 필요한 페이지입니다!');
      return;
    }
    let queryPage = 1;

    try {
      const response = await fetch(
        `http://15.164.245.179:8080/myPage/list?page=${queryPage}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setBooks(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching mybooks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoriteBooks();
  }, [navigate]);

  const handleNextPage = () => {
    if ((currentPage + 1) * booksPerPage < books.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const displayedBooks = books.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  );

  const groupedBooks = [];
  for (let i = 0; i < displayedBooks.length; i += 4) {
    groupedBooks.push(displayedBooks.slice(i, i + 4));
  }

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.bookTypeMenu} ref={bookTypeMenuRef}>
        <button
          onClick={onBookTypeClick}
          value="0"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          즐겨찾기한 책
        </button>
        <button onClick={onBookTypeClick} value="1">
          내가 쓴 책
        </button>
      </div>
      <div className={styles.wrapper}>
        {loading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : (
          <>
            {groupedBooks.map((group, index) => (
              <div key={index} className={styles.innerWrapper}>
                {group.map((book) => (
                  <MyBookListComponent
                    key={`mybook-${book.bookId}`}
                    book={book}
                    onBookClick={onBookClick}
                  />
                ))}
              </div>
            ))}
            {/* 추후 삭제(
              <MyBookInfoContainer
                authorName={selectedBook.userName}
                authorEmail={selectedBook.userEmail}
                title={selectedBook.title}
                likes={selectedBook.bookLike}
                createdAt={selectedBook.createdAt}
              />
            )*/}
          </>
        )}
      </div>
      <div className={styles.prevNextBtn}>
        <button
          onClick={handlePrevPage}
          style={{ left: '-250px' }}
          disabled={currentPage === 0}
        >
          ◀ 이전
        </button>
        <button
          onClick={handleNextPage}
          style={{ right: '-250px' }}
          disabled={(currentPage + 1) * booksPerPage >= books.length}
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
}

export default MyBookListContainer;
