import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBookListComponent from './MyBookListComponent';
import MyBookInfoContainer from './MyBookInfoContainer';
import styles from '../../styles/MyBookListContainer.module.css';
import Cookies from 'js-cookie';

function MyBookListContainer() {
  const bookTypeMenuRef = useRef(null);
  const currentMenuNum = useRef(0);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const onBookTypeClick = (e) => {
    const selectedMenuNum = parseInt(e.target.value);
    if (selectedMenuNum !== currentMenuNum.current) {
      currentMenuNum.current = selectedMenuNum;
    } else return;

    const menus = bookTypeMenuRef.current.childNodes;
    menus.forEach((menu) => {
      menu.style.backgroundColor = 'transparent';
    });
    e.target.style.backgroundColor = '#f3e7ca';
  };

  useEffect(() => {
    const fetchBooks = async () => {
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
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : (
        <>
          <div className={styles.bookTypeMenu} ref={bookTypeMenuRef}>
            <button
              onClick={onBookTypeClick}
              value="0"
              style={{ backgroundColor: '#f3e7ca' }}
            >
              즐겨찾기한 책
            </button>
            <button onClick={onBookTypeClick} value="1">
              내가 쓴 책
            </button>
          </div>
          {groupedBooks.map((group, index) => (
            <div
              key={index}
              className={styles.innerWrapper}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              {group.map((book) => (
                <MyBookListComponent
                  key={`mybook-${book.bookId}`}
                  title={book.title}
                  cover={book.cover}
                  onClick={() => handleBookClick(book)}
                />
              ))}
            </div>
          ))}
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
          {selectedBook && (
            <MyBookInfoContainer
              authorName={selectedBook.userName}
              authorEmail={selectedBook.userEmail}
              title={selectedBook.title}
              likes={selectedBook.bookLike}
              createdAt={selectedBook.createdAt}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MyBookListContainer;
