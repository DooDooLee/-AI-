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
  const scrollPosition = useRef(0); // 스크롤 위치 저장용

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

  const refreshData = async () => {
    scrollPosition.current = window.scrollY; // 현재 스크롤 위치 저장
    setPage(1);
    setBooks([]);
    setSearchResults([]);
    await fetchBooks(1, sortOrder);
    // 데이터 로드 후 스크롤 복원
    window.setTimeout(() => {
      window.scrollTo(0, scrollPosition.current);
    }, 100); // 데이터가 완전히 로드된 후 스크롤 위치를 복원하기 위해 약간의 지연 추가
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

  const handleLike = async (bookId) => {
    const token = Cookies.get('authToken');

    try {
      const response = await axios.post(
        `http://localhost:8080/book/${bookId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const message = response.data;
      alert(message);

      setLikedBooks((prevLikedBooks) => {
        const updatedLikedBooks = new Set(prevLikedBooks);
        if (message === "책 좋아요를 눌렀습니다.") {
          updatedLikedBooks.add(bookId);
        } else if (message === "책 좋아요를 취소했습니다.") {
          updatedLikedBooks.delete(bookId);
        }
        return updatedLikedBooks;
      });

      // 좋아요 상태 변경 후 책 리스트 새로고침
      refreshData();

    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다.", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleBookmark = async (bookId) => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.post(
        `http://localhost:8080/favorites/add/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status === 201 || status === 409,
        }
      );

      const message = response.status === 409
        ? "이미 즐겨찾기 추가된 책입니다."
        : "이제 즐겨찾기가 추가되었습니다.";

      alert(message);

      if (response.status === 201) {
        setBookmarkedBooks((prevBookmarkedBooks) => {
          const updatedBookmarkedBooks = new Set(prevBookmarkedBooks);
          updatedBookmarkedBooks.add(bookId);
          return updatedBookmarkedBooks;
        });
      }

      // 즐겨찾기 상태 변경 후 책 리스트 새로고침
      fetchBooks(page, sortOrder);

    } catch (error) {
      console.error("즐겨찾기 추가 중 오류가 발생했습니다.", error);
      alert("즐겨찾기 추가 중 오류가 발생했습니다.");
    }
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
                        className={styles.likeButton}
                      >
                        좋아요 👍
                      </button>
                      <button
                        onClick={() => handleBookmark(book.bookId)} // 즐겨찾기 버튼
                        className={styles.bookmarkButton}
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
