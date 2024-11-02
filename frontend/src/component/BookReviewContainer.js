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
      <hr />
      {/*
      <textarea className={styles.reviewWritingArea}></textarea>
       */}
      <div className={styles.reviewWritingArea}>
        <textarea
          placeholder="악의적 서평은 삭제될 수 있습니다."
          maxLength="800"
        />
        <button>등록</button>
      </div>
      <button className={styles.expandButton} onClick={onExpandBtnClick}>
        {isExpanded ? '>닫기' : '<서평'}
      </button>
    </div>
  );
}

export default BookReviewContainer;
