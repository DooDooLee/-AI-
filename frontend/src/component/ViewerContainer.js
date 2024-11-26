import React, { useState, useEffect } from 'react';
import styles from '../styles/ViewerContainer.module.css';

function ViewerContainer({ bookId, setShowingCover }) {
  const [bookData, setBookData] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        console.log(`Fetching data for bookId: ${bookId}`); // 디버그용 로그 추가
        const response = await fetch(
          `http://15.164.245.179:8080/book/${bookId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch book data');
        }
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handlePrevPageClick = () => {
    if (currentPageIndex === 0) {
      setShowingCover(true);
      return;
    }
    setCurrentPageIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextPageClick = () => {
    if (currentPageIndex === bookData.pages.length - 1) {
      return;
    }
    setCurrentPageIndex((prevIndex) => prevIndex + 1);
  };

  if (!bookData) {
    return;
  }

  const currentPage = bookData.pages[currentPageIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.imgArea}>
          <img
            src={currentPage.image}
            alt={`Page ${currentPage.pageNumber}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.textContent}>
          {currentPage.content ? (
            currentPage.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <span className={styles.pageNumber}>{currentPage.pageNumber}</span>
      <button className={styles.leftButton} onClick={handlePrevPageClick}>
        이전 페이지
      </button>
      <button className={styles.rightButton} onClick={handleNextPageClick}>
        다음 페이지
      </button>
    </div>
  );
}

export default ViewerContainer;
