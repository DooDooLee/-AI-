import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ListPage.module.css';
import Cookies from 'js-cookie';

function ListBody() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [likedBooks, setLikedBooks] = useState(new Set()); // 좋아요 상태
  const [bookmarkedBooks, setBookmarkedBooks] = useState(new Set()); // 즐겨찾기 상태
  const loader = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm || enterPressed) {
      fetchBooks(page, sortOrder);
    }
  }, [page, sortOrder, searchTerm, enterPressed]);

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
      if (searchTerm && enterPressed) {
        url = `http://localhost:8080/book/search?bookName=${searchTerm}&page=${page}`;
      } else {
        if (sortOrder === 'recent') {
          url = `http://localhost:8080/book/list/recent?page=${page}`;
        } else if (sortOrder === 'old') {
          url = `http://localhost:8080/book/list/old?page=${page}`;
        } else if (sortOrder === 'popular') {
          url = `http://localhost:8080/book/list/popular?page=${page}`;
        }
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
      if (searchTerm && enterPressed) {
        setSearchResults((prevResults) =>
          page === 1 ? formattedBooks : [...prevResults, ...formattedBooks]
        );
        setEnterPressed(false); // 검색 후 상태 초기화
      } else {
        setBooks((prevBooks) =>
          page === 1 ? formattedBooks : [...prevBooks, ...formattedBooks]
        );
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setPage(1);
    setSearchResults([]);
    setBooks([]);
    setSearchTerm(''); // 정렬 변경 시 검색어 비우기
  };

  const handleBookClick = (bookId, coverUrl, title) => {
    const encodedbookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    navigate(
      `/BookViewer/?bookId=${encodedbookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`
    );
  };

  const handleLike = (bookId) => {
    setLikedBooks((prevLikedBooks) => {
      const updatedLikedBooks = new Set(prevLikedBooks);
      if (updatedLikedBooks.has(bookId)) {
        updatedLikedBooks.delete(bookId);
      } else {
        updatedLikedBooks.add(bookId);
      }
      return updatedLikedBooks;
    });
    // 좋아요 API 호출
  };

  const handleBookmark = (bookId) => {
    setBookmarkedBooks((prevBookmarkedBooks) => {
      const updatedBookmarkedBooks = new Set(prevBookmarkedBooks);
      if (updatedBookmarkedBooks.has(bookId)) {
        updatedBookmarkedBooks.delete(bookId);
      } else {
        updatedBookmarkedBooks.add(bookId);
      }
      return updatedBookmarkedBooks;
    });
    // 즐겨찾기 API 호출
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setPage(1);
              setSearchResults([]);
              setBooks([]); 
              setEnterPressed(true); // 검색 후 상태 변경
              setSortOrder(''); // 엔터 누르면 정렬 상태 초기화
            }
          }}
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
          {(searchResults.length > 0 ? searchResults : books).map(
            (book, index) => (
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
                      <span style={{ fontWeight: 'bold' }}>
                        {book.userName}
                      </span>{' '}
                      ({book.userEmail})
                    </p>
                    <p>좋아요: {book.bookLike}개</p>
                    <p>출판일: {book.createdAt}</p>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleLike(book.bookId)} // 좋아요 버튼
                        className={`${styles.likeButton} ${
                          likedBooks.has(book.bookId) ? styles.active : ''
                        }`}
                      >
                        좋아요 👍
                      </button>
                      <button
                        onClick={() => handleBookmark(book.bookId)} // 즐겨찾기 버튼
                        className={`${styles.bookmarkButton} ${
                          bookmarkedBooks.has(book.bookId) ? styles.active : ''
                        }`}
                      >
                        즐겨찾기 ⭐
                      </button>
                    </div>
                  </div>
                </div>
                {index ===
                  (searchTerm && searchResults.length > 0
                    ? searchResults.length
                    : books.length) - 1 && <hr className={styles.separator} />}
              </React.Fragment>
            )
          )}
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
