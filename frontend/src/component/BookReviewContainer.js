import styles from '../styles/BookReviewContainer.module.css';
import { useRef, useState } from 'react';
import BookReviewComponent from './BookReviewComponent';

function BookReviewContainer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapperRef = useRef(null);
  const onExpandBtnClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
      wrapperRef.current.style.translate = '400px';
    } else {
      setIsExpanded(true);
      wrapperRef.current.style.translate = '0px';
    }
  };

  let tempTime = new Date();

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.reviewWrapper}>
        <BookReviewComponent
          {...{ userName: '임시유저', time: tempTime, text: '서평내용' }}
        />
      </div>
      <textarea className={styles.reviewWritingArea}></textarea>
      <button className={styles.expandButton} onClick={onExpandBtnClick}>
        {isExpanded ? '>덛가' : '<서평'}
      </button>
    </div>
  );
}

export default BookReviewContainer;
