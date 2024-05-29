import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ListPage.module.css';
import Cookies from 'js-cookie';

function ListBody() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('recent');
  const loader = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(page, sortOrder);
  }, [page, sortOrder]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchBooks = async (page, sortOrder) => {
    try {
      const token = Cookies.get('authToken');
      let url;
      if (sortOrder === 'recent') {
        url = `http://localhost:8080/book/list/recent?page=${page}`;
      } else if (sortOrder === 'old') {
        url = `http://localhost:8080/book/list/old?page=${page}`;
      } else if (sortOrder === 'popular') {
        url = `http://localhost:8080/book/list/popular?page=${page}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedBooks = response.data.map((book) => ({
        ...book,
        bookLike: book.bookLike ?? 0,
        createdAt: book.createdAt.split('T')[0],
      }));
      setBooks((prevBooks) => [...prevBooks, ...formattedBooks]);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setPage(1);
    setBooks([]);
  };

  const handleBookClick = (bookId, coverUrl, title) => {
    const encodedbookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    navigate(
      `/BookViewer/?bookId=${encodedbookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.listBody}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="도서명, 저자명으로 검색 가능"
          className={styles.searchInput}
          disabled
        />
      </div>
      <div className={styles.sortButtons}>
        <button
          className={`${styles.sortButton} ${
            sortOrder === 'recent' ? styles.activeButton : ''
          }`}
          onClick={() => handleSortChange('recent')}
        >
          최신순
        </button>
        <button
          className={`${styles.sortButton} ${
            sortOrder === 'old' ? styles.activeButton : ''
          }`}
          onClick={() => handleSortChange('old')}
        >
          오래된순
        </button>
        <button
          className={`${styles.sortButton} ${
            sortOrder === 'popular' ? styles.activeButton : ''
          }`}
          onClick={() => handleSortChange('popular')}
        >
          인기순
        </button>
      </div>
      <div className={styles.bookListContainer}>
        <div className={styles.bookList}>
          {books.map((book, index) => (
            <React.Fragment key={book.bookId}>
              {index > 0 && <hr className={styles.separator} />}
              <div className={styles.bookItem}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className={styles.bookCover}
                  onClick={() =>
                    handleBookClick(book.bookId, book.cover, book.title)
                  }
                  style={{ cursor: 'pointer' }}
                />

                <div className={styles.bookDetails}>
                  <h3>{book.title}</h3>
                  <p style={{ marginBottom: '5px' }}>
                    저자:{' '}
                    <span style={{ fontWeight: 'bold' }}>{book.userName}</span>{' '}
                    ({book.userEmail})
                  </p>
                  <p>좋아요: {book.bookLike}개</p>
                  <p>출판일: {book.createdAt}</p>
                </div>
              </div>
              {index === books.length - 1 && (
                <hr className={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div ref={loader} className={styles.loader} />
      </div>
      <div className={styles.scrollButtons}>
        <button onClick={scrollToTop} className={styles.scrollButton}>
          ↑
        </button>
        <button onClick={scrollToBottom} className={styles.scrollButton}>
          ↓
        </button>
      </div>
    </div>
  );
}

export default ListBody;
