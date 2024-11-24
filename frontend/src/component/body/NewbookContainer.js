import React, { useEffect, useState } from "react";
import NewbookComponent from "./NewbookComponent";
import styles from "../../styles/NewbookContainer.module.css";
import { useNavigate } from "react-router-dom";

function NewbookContainer() {
  const [books, setBooks] = useState([]); // 책 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://15.164.245.179:8080/book/list/recent?page=1"
      );

      if (!response.ok) {
        throw new Error(`HTTP error. status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      setBooks(
        data.map(({ bookId, title, userName, cover, bookLike = 0 }) => ({
          bookId,
          title: title || "제목 없음",
          author: userName || "작가 미상",
          cover: cover || null,
          bookLike,
        }))
      );
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookClick = (bookId, coverUrl, title) => {
    const encodedBookId = encodeURIComponent(bookId);
    const encodedCoverUrl = encodeURIComponent(coverUrl);
    const encodedTitle = encodeURIComponent(title);
    navigate(`/BookViewer/?bookId=${encodedBookId}&coverUrl=${encodedCoverUrl}&title=${encodedTitle}`);
  };

  if (loading) return <div className={styles.wrapper}>Loading...</div>;
  if (error) return <div className={styles.wrapper}>Error: {error}</div>;


  return (
    <div className={styles.wrapper}>
      <h3>이달의 P-Book 신작</h3>
      <div className={styles.gridContainer}>
        {books.map((book, index) => (
          <NewbookComponent
            key={book.bookId || index}
            no={index + 1}
            book={book}
            handleBookClick={handleBookClick}
          />
        ))}
      </div>
    </div>
  );
}

export default NewbookContainer;