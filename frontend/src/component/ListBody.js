import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ListPage.module.css';
import Cookies from 'js-cookie';

function ListBody() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, loading]);

  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      const token = Cookies.get('authToken');
      const response = await axios.get(
        `http://localhost:8080/book/list/recent?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedBooks = response.data.map((book) => ({
        ...book,
        bookLike: book.bookLike ?? 0, // Default to 0 if bookLike is null or undefined
        createdAt: book.createdAt.split('T')[0], // Extract date part
      }));
      setBooks((prevBooks) => [...prevBooks, ...formattedBooks]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/BookViewer/${bookId}`);
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
          className={`${styles.sortButton} ${styles.activeButton}`}
          disabled
        >
          최신순
        </button>
        <button className={styles.sortButton} disabled>
          오래된순
        </button>
        <button className={styles.sortButton} disabled>
          인기순
        </button>
      </div>
      <div className={styles.bookListContainer}>
        <div className={styles.bookList}>
          {books.map((book, index) => (
            <React.Fragment key={book.bookId}>
              {index > 0 && <hr className={styles.separator} />}
              <div
                className={styles.bookItem}
                onClick={() => handleBookClick(book.bookId)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className={styles.bookCover}
                />
                <div className={styles.bookDetails}>
                  <h3>{book.title}</h3>
                  <p>저자: {book.name}</p>
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
        <div ref={loader} className={styles.loader}>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default ListBody;
