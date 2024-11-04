// BookViewer.js
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import LeftPanel from '../component/LeftPanel';
import ViewerContainer from '../component/ViewerContainer';
import styles from '../styles/BookViewer.module.css';
import BookCoverContainer from '../component/BookCoverContainer';
import BookReviewContainer from '../component/BookReviewContainer';

function BookViewer() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const coverUrl = queryParams.get('coverUrl');
  const title = queryParams.get('title');
  const bookId = queryParams.get('bookId');

  // 디버그용 로그 추가
  console.log('Book ID:', bookId);
  console.log('Cover URL:', coverUrl);
  console.log('Title:', title);

  const [showingCover, setShowingCover] = useState(true);

  return (
    <div id="wrapper" className={styles.wrapper}>
      <div>
        <Header />
      </div>
      <div className={styles.innerWrapper}>
        <LeftPanel />
        {showingCover ? (
          <BookCoverContainer
            setShowingCover={setShowingCover}
            coverUrl={coverUrl}
            title={title}
          />
        ) : (
          <ViewerContainer setShowingCover={setShowingCover} bookId={bookId} />
        )}
        <BookReviewContainer bookId={bookId} />
      </div>
    </div>
  );
}

export default BookViewer;
