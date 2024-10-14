import styles from '../styles/BookReviewContainer.module.css';
import { useRef, useState } from 'react';

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

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.reviewWrapper}></div>
      <textarea className={styles.reviewWritingArea}></textarea>
      <button className={styles.expandButton} onClick={onExpandBtnClick}>
        {isExpanded ? '>' : '<'}
      </button>
    </div>
  );
}

export default BookReviewContainer;
